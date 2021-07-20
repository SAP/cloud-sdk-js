import { ErrorWithCause } from '@sap-cloud-sdk/util';
import { JwtPayload } from 'jsonwebtoken';
import { decodeJwt } from './jwt';
import { CachingOptions } from './cache';
import { clientCredentialsTokenCache } from './client-credentials-token-cache';
import {
  extractClientCredentials,
  getXsuaaServiceCredentials,
  resolveService
} from './environment-accessor';
import { Service } from './environment-accessor-types';
import { ResilienceOptions } from './resilience-options';
import { replaceSubdomain } from './subdomain-replacer';
import {
  clientCredentialsGrant,
  jwtBearerTokenGrant,
  refreshTokenGrant,
  userTokenGrant
} from './xsuaa-service';
import {
  ClientCredentialsResponse,
  UserTokenResponse
} from './xsuaa-service-types';

/**
 * Returns an access token that can be used to call the given service. The token is fetched via a client credentials grant with the credentials of the given service.
 * If multiple instances of the provided service exist, the first instance will be selected.
 * When a JWT is passed, the tenant of the JWT will be used when performing the grant.
 * When no JWT is passed, the grant will be performed using the provider tenant.
 *
 * Throws an error if there is no instance of the given service type or the XSUAA service, or if the request to the XSUAA service fails.
 *
 * @param service - The type of the service or an instance of [[Service]].
 * @param options - Options to influence caching and resilience behavior (see [[CachingOptions]] and [[ResilienceOptions]], respectively) and a JWT. By default, caching and usage of a circuit breaker are enabled.
 * @returns Access token.
 */
export async function serviceToken(
  service: string | Service,
  options?: CachingOptions &
    ResilienceOptions & {
      userJwt?: string | JwtPayload;
    }
): Promise<string> {
  const resolvedService = resolveService(service);

  const opts = {
    useCache: true,
    enableCircuitBreaker: true,
    ...options
  };

  const xsuaa = multiTenantXsuaaCredentials(opts.userJwt);
  const serviceCreds = extractClientCredentials(resolvedService.credentials);

  if (opts.useCache) {
    const cachedToken = clientCredentialsTokenCache.getGrantTokenFromCache(
      xsuaa.url,
      serviceCreds
    );
    if (cachedToken) {
      return cachedToken.access_token;
    }
  }
  try {
    const resp = await clientCredentialsGrant(xsuaa, serviceCreds, opts);
    if (opts.useCache) {
      clientCredentialsTokenCache.cacheRetrievedToken(
        xsuaa.url,
        serviceCreds,
        resp
      );
    }
    return resp.access_token;
  } catch (error) {
    throw new ErrorWithCause(
      `Fetching an access token for service "${resolvedService.label}" failed.`,
      error
    );
  }
}

/**
 * @deprecated Since v1.41.0 Use [[jwtBearerToken]] instead.
 * Returns a user approved access token that can be used to call the given service on behalf of the given user. The token is fetched via user token + refresh token grant.
 * This can be necessary for scenarios in which a token for a service is required, but the service needs
 * to know about the user on whose behalf the request is performed (for example to let the destination
 * service perform principal propagation with SAP S/4HANA Cloud).
 *
 * Throws an error if there is no instance of the given service type or the XSUAA service, or if the request to the XSUAA service fails.
 *
 * @param userJwt - The JWT of the user for whom the access token should be fetched.
 * @param service - The type of the service or an instance of [[Service]].
 * @param options - Options to influence resilience behavior (see [[ResilienceOptions]]). By default, usage of a circuit breaker is enabled.
 * @returns A user approved access token.
 */
export async function userApprovedServiceToken(
  userJwt: string,
  service: string | Service,
  options?: ResilienceOptions
): Promise<string> {
  const resolvedService = resolveService(service);

  const opts: ResilienceOptions = {
    enableCircuitBreaker: true,
    ...options
  };

  const xsuaa = multiTenantXsuaaCredentials(userJwt);
  const serviceCreds = extractClientCredentials(resolvedService.credentials);

  return userTokenGrant(xsuaa, userJwt, serviceCreds.username, opts)
    .then(userToken =>
      refreshTokenGrant(xsuaa, serviceCreds, userToken.refresh_token, opts)
    )
    .then((refreshToken: UserTokenResponse) => refreshToken.access_token)
    .catch(error => {
      throw new ErrorWithCause(
        `Fetching a user approved access token for service "${resolvedService.label}" failed!`,
        error
      );
    });
}

/**
 * Returns a jwt bearer token that can be used to call the given service.
 * The token is fetched via a JWT bearer token grant using the user token + client credentials.
 *
 * Throws an error if there is no instance of the given service type or the XSUAA service, or if the request to the XSUAA service fails.
 *
 * @param userJwt  - The JWT of the user for whom the access token should be fetched
 * @param service  - The type of the service or an instance of [[Service]].
 * @param options - Options to influence resilience behaviour (see [[ResilienceOptions]]). By defaul,t usage of a circuit breaker is enabled.
 * @returns A jwt bearer token.
 */
export async function jwtBearerToken(
  userJwt: string,
  service: string | Service,
  options?: ResilienceOptions
): Promise<string> {
  const xsuaa = multiTenantXsuaaCredentials(userJwt);
  const resolvedService = resolveService(service);
  const serviceCreds = extractClientCredentials(resolvedService.credentials);
  const opts: ResilienceOptions = {
    enableCircuitBreaker: true,
    ...options
  };

  return jwtBearerTokenGrant(xsuaa, serviceCreds, userJwt, opts)
    .then((response: ClientCredentialsResponse) => response.access_token)
    .catch(error => {
      throw new ErrorWithCause(
        `Fetching a JWT Bearer Token for service "${resolvedService.label}" failed!`,
        error
      );
    });
}

function multiTenantXsuaaCredentials(userJwt?: string | JwtPayload) {
  const xsuaa = getXsuaaServiceCredentials(userJwt);

  if (userJwt) {
    const decodedJwt =
      typeof userJwt === 'string' ? decodeJwt(userJwt) : userJwt;

    if (!decodedJwt.iss) {
      throw Error('Property `iss` is missing in the provided user token.');
    }

    xsuaa.url = replaceSubdomain(decodedJwt.iss, xsuaa.url);
  }

  return xsuaa;
}
