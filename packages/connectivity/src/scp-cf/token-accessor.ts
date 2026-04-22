import { ErrorWithCause } from '@sap-cloud-sdk/util';
import {
  getDefaultTenantId,
  getSubdomain,
  getTenantId,
  getTenantIdFromBinding
} from './jwt';
import { clientCredentialsTokenCache } from './client-credentials-token-cache';
import { resolveServiceBinding } from './environment-accessor';
import { getClientCredentialsToken, getUserToken } from './xsuaa-service';
import { fetchIasToken, getIasAppTid } from './identity-service';
import { buildIasDestination } from './destination/build-ias-destination';
import type {
  IasOptions,
  IasTokenOptions,
  IasTokenResult
} from './destination/ias-types';
import type { Destination } from './destination/destination-service-types';
import type { Service, ServiceCredentials } from './environment-accessor';
import type { CachingOptions } from './cache';
import type { JwtPayload } from './jsonwebtoken-type';

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
      serviceCredentials.clientid
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

/**
 * @internal
 */
async function resolveIdentityService(
  service: ServiceCredentials | 'identity' | Service
): Promise<Service> {
  if (typeof service === 'string') {
    return resolveServiceBinding(service);
  }
  return 'credentials' in service
    ? (service as Service)
    : { name: 'identity', label: 'identity', tags: [], credentials: service };
}

/**
 * Returns an IAS token from the Identity Authentication Service.
 * Supports both technical user (OAuth2ClientCredentials) and business user (OAuth2JWTBearer) flows.
 * @remarks
 * Prefer using `'identity'` (default) for the `service` parameter.
 * Passing raw ServiceCredentials or Service directly is only recommended for environments where service bindings are unavailable as they hardcode the credentials.
 * @param service - Service credentials {@link ServiceCredentials}, the service type (always 'identity' for IAS), or a {@link Service} binding.
 * @param options - Options for IAS token retrieval. See {@link IasTokenOptions}.
 * @returns An {@link IasTokenResult} containing the access token, expiration, and optional refresh token.
 */
export async function getIasToken(
  service: ServiceCredentials | 'identity' | Service = 'identity',
  options?: IasTokenOptions
): Promise<IasTokenResult> {
  const useCache = options?.useCache !== false;
  const jwt = options?.jwt;
  const iasOptions: IasOptions = {
    authenticationType: 'OAuth2ClientCredentials',
    ...options
  };

  const resolvedService: Service = await resolveIdentityService(service);
  // Resolve appTid from requestAs for technical user flows
  if (
    iasOptions.authenticationType !== 'OAuth2JWTBearer' &&
    !iasOptions.appTid
  ) {
    iasOptions.appTid = getIasAppTid(iasOptions, resolvedService, jwt);
  }

  const response = await fetchIasToken(resolvedService, {
    ...iasOptions,
    jwt,
    useCache
  });

  return {
    token: response.access_token,
    expiresIn: response.expires_in,
    refreshToken: response.refresh_token
  };
}

/**
 * Creates an {@link Destination} from IAS service credentials.
 * Fetches an IAS token and builds a destination with the token, mTLS key pair (if available),
 * and the target URL.
 * @remarks
 * Prefer using `'identity'` (default) for the `service` parameter.
 * Passing raw ServiceCredentials or Service directly is only recommended for environments where service bindings are unavailable as they hardcode the credentials.
 * @param service - Service credentials {@link ServiceCredentials}, the service type (always 'identity' for IAS), or a {@link Service} binding.
 * @param options - Options for IAS token retrieval and destination configuration. See {@link IasTokenOptions}.
 * @returns A promise that resolves to an HTTP destination.
 */
export async function getIasDestination(
  service: ServiceCredentials | 'identity' | Service = 'identity',
  options?: IasTokenOptions
): Promise<Destination> {
  const resolvedService = await resolveIdentityService(service);
  const { token } = await getIasToken(resolvedService, options);

  const iasOptions: IasOptions = {
    authenticationType: 'OAuth2ClientCredentials',
    ...options
  };

  return buildIasDestination(token, resolvedService, iasOptions);
}
