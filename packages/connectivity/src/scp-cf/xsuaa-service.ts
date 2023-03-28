import { MiddlewareContext, resilience } from '@sap-cloud-sdk/resilience';
import { executeWithMiddleware } from '@sap-cloud-sdk/resilience/internal';
import * as xssec from '@sap/xssec';
import { resolveService } from './environment-accessor';
import { Service, ServiceCredentials } from './environment-accessor-types';
import { JwtPayload } from './jsonwebtoken-type';
import { decodeJwt } from './jwt';
import { parseSubdomain } from './subdomain-replacer';
import { ServiceTokenOptions } from './token-accessor';
import { ClientCredentialsResponse } from './xsuaa-service-types';

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

interface XsuaaParameters {
  subdomain: string | null;
  zoneId: string | null;
  serviceCredentials: ServiceCredentials;
  userJwt?: string;
}

function isServiceTokenOptions(jwtOrOptions?: string | JwtPayload | ServiceTokenOptions): jwtOrOptions is ServiceTokenOptions {
  return (jwtOrOptions as any)?.iss !== undefined;
}

function getFnArg(service: string | Service, jwtOrOptions?: string | JwtPayload | ServiceTokenOptions): XsuaaParameters {
  if (isServiceTokenOptions(jwtOrOptions)) {
    if (jwtOrOptions.iss) {
      return {
        subdomain: parseSubdomain(jwtOrOptions.iss),
        zoneId: null,
        serviceCredentials: resolveService(service).credentials
      };
    }
    return {
      ...getSubdomainAndZoneId(jwtOrOptions.jwt),
      serviceCredentials: resolveService(service).credentials
    };
  }
  return {
    ...getSubdomainAndZoneId(jwtOrOptions),
    serviceCredentials: resolveService(service).credentials
  };
}

/**
 * Make a client credentials request against the XSUAA service.
 * @param service - Service as it is defined in the environment variable.
 * @param jwtOrOptions - User JWT or ServiceTokenOptions.
 * @returns Client credentials token.
 */
export async function getClientCredentialsToken(
  service: string | Service,
  jwtOrOptions?: string | JwtPayload
): Promise<ClientCredentialsResponse>;
export async function getClientCredentialsToken(
  service: string | Service,
  jwtOrOptions: ServiceTokenOptions
): Promise<ClientCredentialsResponse>;
/**
 * Make a client credentials request against the XSUAA service.
 * @param service - Service as it is defined in the environment variable.
 * @param jwtOrOptions - User JWT or ServiceTokenOptions.
 * @returns Client credentials token.
 */
export async function getClientCredentialsToken(
  service: string | Service,
  jwtOrOptions?: string | JwtPayload | ServiceTokenOptions
): Promise<ClientCredentialsResponse> {
  const fnArgument: XsuaaParameters = getFnArg(service, jwtOrOptions);

  const xssecPromise = function (arg): Promise<ClientCredentialsResponse> {
    return new Promise((resolve, reject) => {
      xssec.requests.requestClientCredentialsToken(
        arg.subdomain,
        arg.serviceCredentials,
        null,
        arg.zoneId,
        (err: Error, token: string, tokenResponse: ClientCredentialsResponse) =>
          err ? reject(err) : resolve(tokenResponse)
      );
    });
  };
  return executeWithMiddleware<
    XsuaaParameters,
    ClientCredentialsResponse,
    MiddlewareContext<XsuaaParameters>
  >(resilience(), {
    fn: xssecPromise,
    fnArgument,
    context: {
      uri: fnArgument.serviceCredentials.url,
      tenantId: fnArgument.zoneId ?? fnArgument.serviceCredentials.tenantid
    }
  }).catch(err => {
    throw new Error(
      `Could not fetch client credentials token for service of type ${
        resolveService(service).label
      }: ${err.message}`
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
  const fnArgument: XsuaaParameters = {
    ...getSubdomainAndZoneId(userJwt),
    serviceCredentials: service.credentials,
    userJwt
  };

  const xssecPromise = function (arg: XsuaaParameters): Promise<string> {
    return new Promise((resolve: (token: string) => void, reject) =>
      xssec.requests.requestUserToken(
        arg.userJwt,
        arg.serviceCredentials,
        null,
        null,
        arg.subdomain,
        arg.zoneId,
        (err: Error, token: string) => (err ? reject(err) : resolve(token))
      )
    );
  };

  return executeWithMiddleware<
    XsuaaParameters,
    string,
    MiddlewareContext<XsuaaParameters>
  >(resilience(), {
    fn: xssecPromise,
    fnArgument,
    context: {
      uri: service.credentials.url,
      tenantId: fnArgument.zoneId ?? service.credentials.tenantid
    }
  }).catch(err => {
    throw new Error(
      `Could not fetch JWT bearer token for service of type ${service.label}: ${err.message}`
    );
  });
}
