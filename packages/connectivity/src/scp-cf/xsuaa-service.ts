import * as xssec from '@sap/xssec';
import {
  executeWithMiddleware,
  circuitBreakerXSUAA,
  timeout
} from '@sap-cloud-sdk/resilience/internal';
import { JwtPayload } from './jsonwebtoken-type';
import { parseSubdomain } from './subdomain-replacer';
import { decodeJwt } from './jwt';
import { Service } from './environment-accessor-types';
import { ClientCredentialsResponse } from './xsuaa-service-types';
import { resolveService } from './environment-accessor';

// `@sap/xssec` sometimes checks `null` without considering `undefined`.
interface SubdomainAndZoneId {
  subdomain: string | null;
  zoneId: string | null;
}

/**
 * Get subdomain and zoneId value from a given JWT.
 * @param jwt - A JWT from the current user.
 * @returns subdomain and zoneId from the JWT
 * @internal
 */
export function getSubdomainAndZoneId(
  jwt?: string | JwtPayload
): SubdomainAndZoneId {
  let subdomain: string | null = null;
  let zoneId: string | null = null;

  if (jwt) {
    const jwtPayload = typeof jwt === 'string' ? decodeJwt(jwt) : jwt;

    if (jwtPayload.iss) {
      subdomain = parseSubdomain(jwtPayload.iss);
    }
    if (jwtPayload.zid) {
      zoneId = jwtPayload.zid;
    }
  }

  return { subdomain, zoneId };
}

/**
 * Make a user token request against the XSUAA service.
 * @param service - Service as it is defined in the environment variable.
 * @param userJwt - User JWT.
 * @returns Client credentials token.
 */
export async function getClientCredentialsToken(
  service: string | Service,
  userJwt?: string | JwtPayload
): Promise<ClientCredentialsResponse> {
  const serviceCredentials = resolveService(service).credentials;
  const subdomainAndZoneId = getSubdomainAndZoneId(userJwt);

  const xssecPromise: () => Promise<ClientCredentialsResponse> = () =>
    new Promise((resolve, reject) => {
      xssec.requests.requestClientCredentialsToken(
        subdomainAndZoneId.subdomain,
        serviceCredentials,
        null,
        subdomainAndZoneId.zoneId,
        (err: Error, token: string, tokenResponse: ClientCredentialsResponse) =>
          err ? reject(err) : resolve(tokenResponse)
      );
    });

  return executeWithMiddleware(
    [timeout(), circuitBreakerXSUAA()],
    {
      uri: serviceCredentials.url,
      tenantId: subdomainAndZoneId.zoneId ?? serviceCredentials.tenantid
    },
    xssecPromise
  );
}

/**
 * Make a user token request against the XSUAA service.
 * @param service - Service as it is defined in the environment variable.
 * @param userJwt - User JWT.
 * @returns User token.
 */
export function getUserToken(
  service: Service,
  userJwt: string
): Promise<string> {
  const subdomainAndZoneId = getSubdomainAndZoneId(userJwt);

  const xssecPromise: () => Promise<string> = () =>
    new Promise((resolve: (token: string) => void, reject) =>
      xssec.requests.requestUserToken(
        userJwt,
        service.credentials,
        null,
        null,
        subdomainAndZoneId.subdomain,
        subdomainAndZoneId.zoneId,
        (err: Error, token: string) => (err ? reject(err) : resolve(token))
      )
    );

  return executeWithMiddleware(
    [timeout(), circuitBreakerXSUAA()],
    {
      uri: service.credentials.url,
      tenantId: subdomainAndZoneId.zoneId ?? service.credentials.tenantid
    },
    xssecPromise
  );
}
