import { ErrorWithCause } from '@sap-cloud-sdk/util';
import { JwtPayload } from 'jsonwebtoken';
import { decodeJwt } from './jwt';
import { CachingOptions } from './cache';
import { clientCredentialsTokenCache } from './client-credentials-token-cache';
import {
  getXsuaaServiceCredentials,
  resolveService
} from './environment-accessor';
import { Service, XsuaaServiceCredentials } from './environment-accessor-types';
import { ResilienceOptions } from './resilience-options';
import { replaceSubdomain } from './subdomain-replacer';
import { getClientCredentialsToken, getUserToken } from './xsuaa-service';

/**
 * Returns an access token that can be used to call the given service. The token is fetched via a client credentials grant with the credentials of the given service.
 * If multiple instances of the provided service exist, the first instance will be selected.
 * When a JWT is passed, the tenant of the JWT will be used when performing the grant.
 * When no JWT is passed, the grant will be performed using the provider tenant.
 *
 * Throws an error if there is no instance of the given service type or the XSUAA service, or if the request to the XSUAA service fails.
 * @param service - The type of the service or an instance of [[Service]].
 * @param options - Options to influence caching and resilience behavior (see [[CachingOptions]] and [[ResilienceOptions]], respectively) and a JWT. By default, caching and usage of a circuit breaker are enabled.
 * @returns Access token.
 */
export async function serviceToken(
  service: string | Service,
  options?: CachingOptions &
    ResilienceOptions & {
      jwt?: string | JwtPayload;
    }
): Promise<string> {
  const opts = {
    useCache: true,
    enableCircuitBreaker: true,
    ...options
  };

  service = resolveService(service);
  const serviceCredentials = service.credentials;
  // TODO 2.0 Once the xssec supports caching remove all xsuaa related content here and use their cache.
  const xsuaa = multiTenantXsuaaCredentials(options);

  if (opts.useCache) {
    const cachedToken = clientCredentialsTokenCache.getGrantTokenFromCache(
      xsuaa.url,
      serviceCredentials.clientid
    );
    if (cachedToken) {
      return cachedToken.access_token;
    }
  }

  try {
    const token = await getClientCredentialsToken(
      service,
      options?.jwt,
      options
    );

    if (opts.useCache) {
      clientCredentialsTokenCache.cacheRetrievedToken(
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
 * @param jwt - The JWT of the user for whom the access token should be fetched
 * @param service - The type of the service or an instance of [[Service]].
 * @param options - Options to influence resilience behavior (see [[ResilienceOptions]]). By default, usage of a circuit breaker is enabled.
 * @returns A jwt bearer token.
 */
export async function jwtBearerToken(
  jwt: string,
  service: string | Service,
  options?: ResilienceOptions
): Promise<string> {
  const resolvedService = resolveService(service);

  const opts: ResilienceOptions = {
    enableCircuitBreaker: true,
    ...options
  };

  return getUserToken(resolvedService, jwt, opts);
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
