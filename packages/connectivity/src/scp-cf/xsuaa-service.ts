import * as xssec from '@sap/xssec';
import { executeWithMiddleware } from '@sap-cloud-sdk/resilience/internal';
import { resilience, MiddlewareContext } from '@sap-cloud-sdk/resilience';
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
  const resolvedService = resolveService(service);
  const serviceCredentials = resolvedService.credentials;
  const subdomainAndZoneId = getSubdomainAndZoneId(userJwt);

  const fnArgs = [
    subdomainAndZoneId.subdomain,
    serviceCredentials,
    null,
    subdomainAndZoneId.zoneId
  ];

  const xssecPromise: (
    args: typeof fnArgs
  ) => Promise<ClientCredentialsResponse> = args =>
    new Promise((resolve, reject) => {
      xssec.requests.requestClientCredentialsToken(
        ...args,
        (err: Error, token: string, tokenResponse: ClientCredentialsResponse) =>
          err ? reject(err) : resolve(tokenResponse)
      );
    });
  return executeWithMiddleware<
    typeof fnArgs,
    ClientCredentialsResponse,
    MiddlewareContext<typeof fnArgs>
  >(
    resilience(),
    {
      uri: serviceCredentials.url,
      tenantId: subdomainAndZoneId.zoneId ?? serviceCredentials.tenantid,
      fnArgument: fnArgs
    },
    xssecPromise
  ).catch(err => {
    throw new Error(
      `Could not fetch client credentials token for service of type ${resolvedService.label}: ${err.message}`
    );
  });
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

  const fnArgs = [
    userJwt,
    service.credentials,
    null,
    null,
    subdomainAndZoneId.subdomain,
    subdomainAndZoneId.zoneId
  ];

  const xssecPromise: (args: typeof fnArgs) => Promise<string> = args =>
    new Promise((resolve: (token: string) => void, reject) =>
      xssec.requests.requestUserToken(...args, (err: Error, token: string) =>
        err ? reject(err) : resolve(token)
      )
    );

  return executeWithMiddleware<
    typeof fnArgs,
    string,
    MiddlewareContext<typeof fnArgs>
  >(
    resilience(),
    {
      uri: service.credentials.url,
      tenantId: subdomainAndZoneId.zoneId ?? service.credentials.tenantid,
      fnArgument: fnArgs
    },
    xssecPromise
  ).catch(err => {
    throw new Error(
      `Could not fetch JWT bearer token for service of type ${service.label}: ${err.message}`
    );
  });
}
