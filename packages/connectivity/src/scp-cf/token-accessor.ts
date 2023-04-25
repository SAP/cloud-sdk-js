import { ErrorWithCause } from '@sap-cloud-sdk/util';
import { JwtPayload } from './jsonwebtoken-type';
import { decodeJwt } from './jwt';
import { CachingOptions } from './cache';
import { clientCredentialsTokenCache } from './client-credentials-token-cache';
import {
  getXsuaaServiceCredentials,
  resolveServiceBinding
} from './environment-accessor';
import {
  Service,
  XsuaaServiceCredentials
} from './environment-accessor/environment-accessor-types';
import { replaceSubdomain } from './subdomain-replacer';
import { getClientCredentialsToken, getUserToken } from './xsuaa-service';

/**
 * Returns an access token that can be used to call the given service. The token is fetched via a client credentials grant with the credentials of the given service.
 * If multiple instances of the provided service exist, the first instance will be selected.
 * When a JWT is passed, the tenant of the JWT will be used when performing the grant.
 * When no JWT is passed, the grant will be performed using the provider tenant.
 *
 * Throws an error if there is no instance of the given service type or the XSUAA service, or if the request to the XSUAA service fails.
 * @param service - The type of the service or an instance of {@link Service}.
 * @param options - Options to influence caching behavior (see {@link CachingOptions}) and a JWT. By default, caching and usage of a circuit breaker are enabled.
 * @returns Access token.
 */
export async function serviceToken(
  service: string | Service,
  options?: CachingOptions & {
    jwt?: string | JwtPayload;
    // TODO 2.0 Once the xssec supports caching remove all xsuaa related content here and use their cache.
    xsuaaCredentials?: XsuaaServiceCredentials;
  }
): Promise<string> {
  const opts = {
    useCache: true,
    enableCircuitBreaker: true,
    ...options
  };

  service = resolveServiceBinding(service);
  const serviceCredentials = service.credentials;

  // TODO 2.0 Once the xssec supports caching remove all xsuaa related content here and use their cache.
  if (opts.useCache) {
    const xsuaa = multiTenantXsuaaCredentials(options);

    const cachedToken = clientCredentialsTokenCache.getToken(
      xsuaa.url,
      serviceCredentials.clientid
    );
    if (cachedToken) {
      return cachedToken.access_token;
    }
  }

  try {
    const token = await getClientCredentialsToken(service, options?.jwt);

    if (opts.useCache) {
      const xsuaa = multiTenantXsuaaCredentials(options);

      clientCredentialsTokenCache.cacheToken(
        xsuaa.url,
        serviceCredentials.clientid,
        token
      );
    }

    return token.access_token;
  } catch (err) {
    throw new ErrorWithCause(
      `Could not fetch client credentials token for service of type "${service.label}".`,
      err
    );
  }
}

/**
 * Returns a jwt bearer token that can be used to call the given service.
 * The token is fetched via a JWT bearer token grant using the user token + client credentials.
 *
 * Throws an error if there is no instance of the given service type or the XSUAA service, or if the request to the XSUAA service fails.
 * @param jwt - The JWT of the user for whom the access token should be fetched.
 * @param service - The type of the service or an instance of {@link Service}.
 * @returns A jwt bearer token.
 */
export async function jwtBearerToken(
  jwt: string,
  service: string | Service
): Promise<string> {
  const resolvedService = resolveServiceBinding(service);

  return getUserToken(resolvedService, jwt);
}

function multiTenantXsuaaCredentials(
  options: {
    jwt?: string | JwtPayload;
    xsuaaCredentials?: XsuaaServiceCredentials;
  } = {}
): XsuaaServiceCredentials {
  const xsuaa = options.xsuaaCredentials
    ? { ...options.xsuaaCredentials }
    : getXsuaaServiceCredentials(options.jwt);

  if (options.jwt) {
    const decodedJwt =
      typeof options.jwt === 'string' ? decodeJwt(options.jwt) : options.jwt;

    if (!decodedJwt.iss) {
      throw Error('Property `iss` is missing in the provided user token.');
    }

    xsuaa.url = replaceSubdomain(decodedJwt.iss, xsuaa.url);
  }

  return xsuaa;
}
