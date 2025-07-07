import { executeWithMiddleware } from '@sap-cloud-sdk/resilience/internal';
import { resilience } from '@sap-cloud-sdk/resilience';
import {
  getXsuaaInstanceFromServiceCredentials,
  resolveServiceBinding
} from './environment-accessor';
import { decodeJwt, getSubdomain, getTenantId } from './jwt';
import type { MiddlewareContext } from '@sap-cloud-sdk/resilience';
import type { JwtPayload } from './jsonwebtoken-type';
import type { Service, ServiceCredentials } from './environment-accessor';
import type { ClientCredentialsResponse } from './xsuaa-service-types';

interface XsuaaParameters {
  subdomain?: string;
  zoneId?: string;
  serviceCredentials: ServiceCredentials;
  userJwt?: string;
}

/**
 * Make a client credentials request against the XSUAA credentials inside {@param service}.
 * @param service - Service as it is defined in the environment variable.
 * @param jwt - User JWT or object containing the `iss` property.
 * @returns Client credentials token.
 */
export async function getClientCredentialsToken(
  service: string | Service,
  jwt?: string | JwtPayload
): Promise<ClientCredentialsResponse> {
  const decodedJwt = jwt ? decodeJwt(jwt) : {};
  const fnArgument: XsuaaParameters = {
    subdomain: getSubdomain(decodedJwt),
    zoneId: getTenantId(decodedJwt),
    serviceCredentials: resolveServiceBinding(service).credentials
  };

  const xssecPromise = function (arg): Promise<ClientCredentialsResponse> {
    const xsuaaService = getXsuaaInstanceFromServiceCredentials(
      arg.serviceCredentials
    );

    return xsuaaService.fetchClientCredentialsToken({
      // tenant is the subdomain, not tenant ID
      tenant: arg.zoneId ? undefined : arg.subdomain,
      zid: arg.zoneId
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
        resolveServiceBinding(service).label
      }: ${err.message}`
    );
  });
}

/**
 * Make a user token request against the XSUAA credentials inside {@param service}.
 * @param service - Service as it is defined in the environment variable.
 * @param userJwt - User JWT.
 * @returns User token.
 */
export function getUserToken(
  service: Service,
  userJwt: string
): Promise<string> {
  const decodedUserJwt = decodeJwt(userJwt);
  const fnArgument: XsuaaParameters = {
    subdomain: getSubdomain(decodedUserJwt),
    zoneId: getTenantId(decodedUserJwt),
    serviceCredentials: service.credentials,
    userJwt
  };

  const xssecPromise = function (arg: XsuaaParameters): Promise<string> {
    const xsuaaService = getXsuaaInstanceFromServiceCredentials(
      arg.serviceCredentials
    );
    return xsuaaService
      .fetchJwtBearerToken(arg.userJwt, {
        // tenant is the subdomain, not tenant ID
        tenant: arg.zoneId ? undefined : arg.subdomain,
        zid: arg.zoneId
      })
      .then(token => token.access_token);
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
