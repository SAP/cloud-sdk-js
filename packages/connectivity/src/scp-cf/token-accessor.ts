import { createLogger, ErrorWithCause } from '@sap-cloud-sdk/util';
import {
  decodeJwt,
  getDefaultTenantId,
  getSubdomain,
  getTenantId,
  getTenantIdFromBinding,
  isXsuaaToken
} from './jwt';
import { clientCredentialsTokenCache } from './client-credentials-token-cache';
import { resolveServiceBinding } from './environment-accessor';
import { getClientCredentialsToken, getUserToken } from './xsuaa-service';
import { getIasClientCredentialsToken } from './identity-service';
import type { Service } from './environment-accessor';
import type { CachingOptions } from './cache';
import type { JwtPayload } from './jsonwebtoken-type';
import type { IasOptions } from './destination';

const logger = createLogger({
  package: 'connectivity',
  messageContext: 'token-accessor'
});

/**
 * Returns an access token that can be used to call the given service. The token is fetched via a client credentials grant with the credentials of the given service.
 * If multiple instances of the provided service exist, the first instance will be selected.
 * When a JWT is passed, the tenant of the JWT will be used when performing the grant.
 * When no JWT is passed, the grant will be performed using the provider tenant.
 *
 * Throws an error if there is no instance of the given service type or the XSUAA service, or if the request to the XSUAA service fails.
 * @param service - The type of the service or an instance of {@link Service}.
 * @param options - Options to influence caching behavior (see {@link CachingOptions}) and a JWT. By default, caching and usage of a circuit breaker are enabled.
 * @param options.iasOptions - Options to change IAS token fetching (see {@link IasOptions}).
 * @returns Access token.
 */
export async function serviceToken(
  service: string | Service,
  options?: CachingOptions & {
    jwt?: string | JwtPayload;
    iasOptions?: Omit<
      IasOptions,
      'authenticationType' | 'assertion' | 'targetUrl'
    >;
  }
): Promise<string> {
  const opts = {
    useCache: true,
    enableCircuitBreaker: true,
    ...options
  };

  const serviceBinding = resolveServiceBinding(service);

  const serviceCredentials = serviceBinding.credentials;
  const tenantForCaching = options?.jwt
    ? getTenantId(options.jwt) || getSubdomain(options.jwt)
    : getTenantIdFromBinding() || getDefaultTenantId();

  if (opts.useCache) {
    const cachedToken = clientCredentialsTokenCache.getToken(
      tenantForCaching,
      serviceCredentials.clientid,
      undefined
    );
    if (cachedToken) {
      return cachedToken.access_token;
    }
  }

  try {
    const token = await getClientCredentialsToken(serviceBinding, options?.jwt);

    if (opts.useCache) {
      clientCredentialsTokenCache.cacheToken(
        tenantForCaching,
        serviceCredentials.clientid,
        undefined,
        token
      );
    }

    return token.access_token;
  } catch (err) {
    throw new ErrorWithCause(
      `Could not fetch client credentials token for service of type "${serviceBinding.label}".`,
      err
    );
  }
}

/**
 * Returns an access token for an IAS (Identity Authentication Service) service binding.
 * The token is fetched via a client credentials grant with the credentials of the given service.
 * If a JWT is passed, the tenant of the JWT will be used when performing the grant.
 * When no JWT is passed, the grant will be performed using the provider tenant.
 *
 * Throws an error if there is no instance of the given service type or if the request to the IAS service fails.
 * @param service - The type of the service or an instance of {@link Service}.
 * @param options - Options to influence caching behavior (see {@link CachingOptions}) and IAS-specific options (see {@link IasOptions}).
 * @returns Access token.
 * @experimental This function is experimental and may change in future versions.
 */
export async function serviceTokenIas(
  service: string | Service,
  options?: CachingOptions & {
    jwt?: string | JwtPayload;
    iasOptions?: Omit<
      IasOptions,
      'authenticationType' | 'assertion' | 'targetUrl'
    >;
  }
): Promise<string> {
  const opts = {
    useCache: true,
    enableCircuitBreaker: true,
    ...options
  };

  const serviceBinding = resolveServiceBinding(service);
  const serviceCredentials = serviceBinding.credentials;
  // User-provided appTid takes precedence over automatically determined tenant for IAS
  const tenantForCaching = options?.iasOptions?.appTid
    ? options.iasOptions.appTid
    : options?.jwt
      ? getTenantId(options.jwt) || getSubdomain(options.jwt)
      : getTenantIdFromBinding() || getDefaultTenantId();
  const resourceForCaching = options?.iasOptions?.resource;

  if (opts.useCache) {
    const cachedToken = clientCredentialsTokenCache.getToken(
      tenantForCaching,
      serviceCredentials.clientid,
      resourceForCaching
    );
    if (cachedToken) {
      return cachedToken.access_token;
    }
  }

  try {
    // Warn if using IAS service with XSUAA jwt (should be more reliable than the IAS check)
    if (options?.jwt) {
      const decodedJwt = decodeJwt(options.jwt);
      if (isXsuaaToken(decodedJwt)) {
        logger.warn(
          'Requesting token for IAS service with a XSUAA JWT. ' +
            'The tenant information from the XSUAA token may not be compatible with IAS. ' +
            'Consider using an IAS JWT or omitting the JWT to use the provider tenant.'
        );
      }
    }

    const token = await getIasClientCredentialsToken(serviceBinding, {
      ...(options?.iasOptions ?? {}),
      authenticationType: 'OAuth2ClientCredentials',
      appTid: tenantForCaching
    });

    if (opts.useCache) {
      clientCredentialsTokenCache.cacheToken(
        tenantForCaching,
        serviceCredentials.clientid,
        resourceForCaching,
        token
      );
    }

    return token.access_token;
  } catch (err) {
    throw new ErrorWithCause(
      'Could not fetch client credentials token for IAS service.',
      err
    );
  }
}

/**
 * Returns a JWT bearer token that can be used to call the given service.
 * The token is fetched via a JWT bearer token grant using the user token + client credentials.
 *
 * Throws an error if there is no instance of the given service type.
 * @param jwt - The JWT of the user for whom the access token should be fetched.
 * @param service - The type of the service or an instance of {@link Service}.
 * @returns A JWT bearer token.
 */
export async function jwtBearerToken(
  jwt: string,
  service: string | Service
): Promise<string> {
  const resolvedService = resolveServiceBinding(service);
  return getUserToken(resolvedService, jwt);
}
