import { executeWithMiddleware } from '@sap-cloud-sdk/resilience/internal';
import { resilience } from '@sap-cloud-sdk/resilience';
import { IdentityServiceToken, type IdentityService } from '@sap/xssec';
import { ErrorWithCause } from '@sap-cloud-sdk/util';
import { decodeJwt, isXsuaaToken } from './jwt';
import {
  resolveServiceBinding,
  getIdentityServiceInstanceFromCredentials
} from './environment-accessor';
import type {
  DestinationOptions,
  IasOptions,
  IasResource
} from './destination';
import type { MiddlewareContext } from '@sap-cloud-sdk/resilience';
import type { Service, ServiceCredentials } from './environment-accessor';
import type { ClientCredentialsResponse } from './xsuaa-service-types';
import type { JwtPayload } from './jsonwebtoken-type';

export { identityServicesCache } from './environment-accessor';

/**
 * @internal
 * Represents the response to an IAS client credentials request.
 * Extends the XSUAA response with IAS-specific fields.
 */
export interface IasClientCredentialsResponse extends ClientCredentialsResponse {
  /**
   * Audience claim from the JWT token.
   */
  aud: string | string[];
  /**
   * IAS API resources. Empty when no resource parameter is specified in the token request.
   */
  ias_apis: string[];
  /**
   * The SCIM ID of the user (not present for technical user tokens).
   */
  scim_id?: string;
  /**
   * Custom issuer claim from the JWT token.
   */
  custom_iss?: string;
  /**
   * Application tenant ID claim from the JWT token.
   */
  app_tid?: string;
  /**
   * IAS tokens don't have scope property.
   */
  scope: '';
}

/**
 * @internal
 * Checks whether the IAS token to XSUAA token exchange should be applied.
 * @param options - Configuration for how to retrieve destinations from the destination service.
 * @returns A boolean value, that indicates whether the token exchange should be applied.
 */
export function shouldExchangeToken(options: DestinationOptions): boolean {
  // iasToXsuaaTokenExchange is optional, token exchange is disabled by default
  return (
    options.iasToXsuaaTokenExchange === true &&
    !!options.jwt &&
    !isXsuaaToken(decodeJwt(options.jwt))
  );
}

type IasParameters = {
  jwt?: JwtPayload;
  serviceCredentials: ServiceCredentials;
} & IasOptions;

/**
 * Make a client credentials request against the IAS OAuth2 endpoint.
 * Supports both certificate-based (mTLS) and client secret authentication.
 * @param service - Service as it is defined in the environment variable.
 * @param options - Options for token fetching, including authenticationType to specify authentication mode, optional resource parameter for app2app, appTid for multi-tenant scenarios, and extraParams for additional OAuth2 parameters.
 * @returns Client credentials token response.
 * @internal
 * @experimental
 */
export async function getIasClientCredentialsToken(
  service: string | Service,
  options: IasOptions & { jwt?: JwtPayload } = {}
): Promise<IasClientCredentialsResponse> {
  const resolvedService = resolveServiceBinding(service);

  const fnArgument: IasParameters = {
    serviceCredentials: resolvedService.credentials,
    ...options
  };

  const token = await executeWithMiddleware<
    IasParameters,
    IasClientCredentialsResponse,
    MiddlewareContext<IasParameters>
  >(resilience(), {
    fn: getIasClientCredentialsTokenImpl,
    fnArgument,
    context: {
      uri: fnArgument.serviceCredentials.url,
      tenantId: fnArgument.serviceCredentials.app_tid
    }
  }).catch(err => {
    const serviceName =
      typeof service === 'string' ? service : service.name || 'unknown';
    let message = `Could not fetch IAS client credentials token for service "${serviceName}" of type ${resolvedService.label}`;

    // Add contextual hints based on error status code (similar to Java SDK)
    if (err.response?.status === 401) {
      message +=
        '. In case you are accessing a multi-tenant BTP service on behalf of a subscriber tenant, ensure that the service instance is declared as dependency to SaaS Provisioning Service or Subscription Manager (SMS) and subscribed for the current tenant';
    }

    throw new ErrorWithCause(
      message + (err.message ? `: ${err.message}` : '.'),
      err
    );
  });
  return token;
}

/**
 * Converts an IAS resource to the URN format expected by @sap/xssec.
 * @param resource - The IAS resource to convert.
 * @returns The resource in URN format.
 * @internal
 */
function convertResourceToUrn(resource: IasResource): string {
  if (!resource) {
    throw new Error('Resource parameter is required');
  }

  if ('name' in resource) {
    return `urn:sap:identity:application:provider:name:${resource.name}`;
  }

  let urn = `urn:sap:identity:application:provider:clientid:${resource.providerClientId}`;
  if (resource.providerTenantId) {
    urn += `:apptid:${resource.providerTenantId}`;
  }
  return urn;
}

/**
 * Implementation of the IAS client credentials token retrieval using @sap/xssec.
 * @param arg - The parameters for IAS token retrieval.
 * @returns A promise resolving to the client credentials response.
 * @internal
 */
async function getIasClientCredentialsTokenImpl(
  arg: IasParameters
): Promise<IasClientCredentialsResponse> {
  const identityService = getIdentityServiceInstanceFromCredentials(
    arg.serviceCredentials,
    arg.assertion
  );

  const authenticationType =
    arg.authenticationType || 'OAuth2ClientCredentials';

  const tokenOptions: IdentityService.TokenFetchOptions &
    IdentityService.IdentityServiceTokenFetchOptions = {
    token_format: 'jwt'
  };

  // Stringify resource
  if (arg.resource) {
    tokenOptions.resource = convertResourceToUrn(arg.resource);
  }

  if (arg.appTid) {
    tokenOptions.app_tid = arg.appTid;
  }

  // Add any extra parameters
  if (arg.extraParams) {
    Object.assign(tokenOptions, arg.extraParams);
  }

  let response: undefined | IdentityService.TokenFetchResponse;

  if (authenticationType === 'OAuth2JWTBearer') {
    // JWT bearer grant for business user propagation
    if (!arg.assertion) {
      throw new Error(
        'JWT assertion required for authenticationType: "OAuth2JWTBearer". Provide iasOptions.assertion.'
      );
    }

    // Workaround for IAS bug
    // https://github.com/SAP/cloud-sdk-java/blob/61903347b607a8397f7930709cd52526f05269b1/cloudplatform/connectivity-oauth/src/main/java/com/sap/cloud/sdk/cloudplatform/connectivity/OAuth2Service.java#L225-L236
    if (arg.appTid) {
      (tokenOptions as any).refresh_token = '0';
    }

    response = await identityService.fetchJwtBearerToken(
      arg.assertion,
      tokenOptions
    );
  } else {
    if (!arg.appTid) {
      const requestAs = arg?.requestAs ?? 'current-tenant';
      if (requestAs === 'provider-tenant') {
        tokenOptions.app_tid = arg.serviceCredentials.app_tid;
      } else if (requestAs === 'current-tenant') {
        tokenOptions.app_tid = arg.jwt?.app_tid;
      }
    }

    // Client credentials for technical users
    response = await identityService.fetchClientCredentialsToken(tokenOptions);
  }

  const decodedJwt = new IdentityServiceToken(response.access_token);

  return {
    access_token: response.access_token,
    token_type: response.token_type,
    expires_in: response.expires_in,
    // IAS tokens don't have scope property
    scope: '',
    jti: decodedJwt.payload?.jti ?? '',
    // `decodedJwt.audiences` always returns an array, preserve original type
    aud: decodedJwt.payload?.aud ?? [],
    app_tid: decodedJwt.appTid,
    scim_id: decodedJwt.scimId,
    // Added if resource parameter was specified
    ias_apis: decodedJwt?.consumedApis,
    custom_iss: decodedJwt.customIssuer ?? undefined
  };
}
