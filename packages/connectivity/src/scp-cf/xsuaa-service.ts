import { XsuaaService } from '@sap/xssec';
import { executeWithMiddleware } from '@sap-cloud-sdk/resilience/internal';
import { resilience, MiddlewareContext } from '@sap-cloud-sdk/resilience';
import { JwtPayload } from './jsonwebtoken-type';
import {
  Service,
  ServiceCredentials
} from './environment-accessor/environment-accessor-types';
import { ClientCredentialsResponse } from './xsuaa-service-types';
import { resolveServiceBinding } from './environment-accessor';
import { getIssuerSubdomain } from './subdomain-replacer';
import { decodeJwt, tenantId } from './jwt';

interface XsuaaParameters {
  subdomain: string | null;
  zoneId: string | null;
  serviceCredentials: ServiceCredentials;
  userJwt?: string;
}

/**
 * Make a client credentials request against the XSUAA service.
 * @param service - Service as it is defined in the environment variable.
 * @param userJwt - User JWT.
 * @returns Client credentials token.
 */
export async function getClientCredentialsToken(
  service: string | Service,
  userJwt?: string | JwtPayload
): Promise<ClientCredentialsResponse> {
  const jwt = userJwt ? decodeJwt(userJwt) : {};
  const fnArgument: XsuaaParameters = {
    subdomain: getIssuerSubdomain(jwt) || null,
    zoneId: tenantId(jwt) || null,
    serviceCredentials: resolveServiceBinding(service).credentials
  };

  const xssecPromise = function (arg): Promise<ClientCredentialsResponse> {
    const xsuaaService = new XsuaaService(arg.serviceCredentials);
    return xsuaaService.fetchClientCredentialsToken({
      tenant: arg.zoneId || arg.subdomain
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
 * Make a user token request against the XSUAA service.
 * @param service - Service as it is defined in the environment variable.
 * @param userJwt - User JWT.
 * @returns User token.
 */
export function getUserToken(
  service: Service,
  userJwt: string
): Promise<string> {
  const jwt = decodeJwt(userJwt);
  const fnArgument: XsuaaParameters = {
    subdomain: getIssuerSubdomain(jwt) || null,
    zoneId: tenantId(jwt) || null,
    serviceCredentials: service.credentials,
    userJwt
  };

  const xssecPromise = function (arg: XsuaaParameters): Promise<string> {
    const xsuaaService = new XsuaaService(arg.serviceCredentials);
    return xsuaaService.fetchJwtBearerToken({
      tenant: arg.zoneId,
      jwt: arg.userJwt
    });
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
