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
import { getIasClientCredentialsToken } from './identity-service';
import type { Service } from './environment-accessor';
import type { CachingOptions } from './cache';
import type { JwtPayload } from './jsonwebtoken-type';
import type { IasOptions } from './destination';

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
      'authenticationType' | 'assertion' | 'destinationUrl' | 'appTid'
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
    const token =
      serviceBinding.label === 'identity'
        ? await getIasClientCredentialsToken(serviceBinding, {
            ...(options?.iasOptions ?? {}),
            authenticationType: 'OAuth2ClientCredentials',
            appTid: tenantForCaching
          })
        : await getClientCredentialsToken(serviceBinding, options?.jwt);

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
      `Could not fetch client credentials token for service of type "${serviceBinding.label}".`,
      err
    );
  }
}

/**
 * Returns a JWT bearer token that can be used to call the given service.
 * The token is fetched via a JWT bearer token grant using the user token + client credentials.
 *
 * This function automatically detects the service type (XSUAA or IAS) based on the label
 * and uses the appropriate authentication flow.
 * For IAS services, you can pass IAS-specific options like `resource` and `appTid` in `options.iasOptions`.
 *
 * Throws an error if there is no instance of the given service type.
 * @param jwt - The JWT of the user for whom the access token should be fetched.
 * @param service - The type of the service or an instance of {@link Service}.
 * @param options - Optional options to modify token fetching behaviour.
 * @param options.iasOptions - Options to change IAS token fetching (see {@link IasOptions}).
 * @returns A JWT bearer token.
 */
export async function jwtBearerToken(
  jwt: string,
  service: string | Service,
  options?: {
    iasOptions?: Omit<
      IasOptions,
      'authenticationType' | 'assertion' | 'destinationUrl'
    >;
  }
): Promise<string> {
  const resolvedService = resolveServiceBinding(service);

  // Detect if this is an IAS service
  if (resolvedService.label === 'identity') {
    return (
      await getIasClientCredentialsToken(resolvedService, {
        ...(options?.iasOptions ?? {}),
        authenticationType: 'OAuth2JWTBearer',
        assertion: jwt
      })
    ).access_token;
  }

  // XSUAA flow
  return getUserToken(resolvedService, jwt);
}
