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
 * Represents the response to an IAS token request using client credentials or JWT bearer grant.
 * This interface extends the XSUAA `ClientCredentialsResponse` response with IAS-specific fields.
 */
export interface IasTokenResponse extends ClientCredentialsResponse {
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
  /**
   * @internal
   */
  refresh_token?: string;
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
 */
export async function getIasToken(
  service: string | Service,
  options: IasOptions & { jwt?: JwtPayload } = {}
): Promise<IasTokenResponse> {
  const resolvedService = resolveServiceBinding(service);

  const fnArgument: IasParameters = {
    serviceCredentials: resolvedService.credentials,
    ...options
  };

  const token = await executeWithMiddleware<
    IasParameters,
    IasTokenResponse,
    MiddlewareContext<IasParameters>
  >(resilience(), {
    fn: getIasTokenImpl,
    fnArgument,
    context: {
      uri: fnArgument.serviceCredentials.url,
      tenantId: fnArgument.serviceCredentials.app_tid
    }
  }).catch(err => {
    const serviceName =
      typeof service === 'string' ? service : service.name || 'unknown';
    let message = `Could not fetch IAS client for service "${serviceName}" of type ${resolvedService.label}`;

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

  const segments = [
    `urn:sap:identity:application:provider:clientid:${resource.providerClientId}`
  ];
  if (resource.providerTenantId) {
    segments.push(`apptid:${resource.providerTenantId}`);
  }
  return segments.join(':');
}

/**
 * Transforms IAS options to the format expected by @sap/xssec.
 * @param arg - The IAS parameters including options.
 * @returns The transformed token fetch options.
 * @internal
 */
function transformIasOptionsToXssecArgs(
  arg: IasParameters
): IdentityService.TokenFetchOptions &
  IdentityService.IdentityServiceTokenFetchOptions {
  const tokenOptions = {
    token_format: 'jwt',
    ...(arg.resource && { resource: convertResourceToUrn(arg.resource) }),
    ...(arg.appTid && { app_tid: arg.appTid }),
    ...(arg.extraParams || {})
  } satisfies IdentityService.TokenFetchOptions &
    IdentityService.IdentityServiceTokenFetchOptions;

  if (arg.authenticationType === 'OAuth2JWTBearer') {
    // JWT bearer grant for business user propagation
    if (!arg.assertion) {
      throw new Error(
        'JWT assertion required for authenticationType: "OAuth2JWTBearer". Provide iasOptions.assertion.'
      );
    }

    // Disable refresh token for App-To-App JWT bearer token exchange (recommended for better performance)
    if (arg.resource && tokenOptions.refresh_expiry === undefined) {
      tokenOptions.refresh_expiry = 0;
    }

    // Extract appTid from assertion if not provided
    const token = new IdentityServiceToken(arg.assertion);
    if (!tokenOptions.app_tid) {
      // Set to `null` if not set to prevent xssec from also trying to extract it internally
      tokenOptions.app_tid = token?.appTid || (null as unknown as undefined);
    }

    // Workaround for IAS bug
    // JAVA SDK: https://github.com/SAP/cloud-sdk-java/blob/61903347b607a8397f7930709cd52526f05269b1/cloudplatform/connectivity-oauth/src/main/java/com/sap/cloud/sdk/cloudplatform/connectivity/OAuth2Service.java#L225-L236
    // Issue: https://jira.tools.sap/browse/SECREQ-5220
    if (tokenOptions.app_tid) {
      tokenOptions.refresh_expiry = 0;
    }
  }

  return tokenOptions;
}

/**
 * Implementation of the IAS client credentials token retrieval using @sap/xssec.
 * @param arg - The parameters for IAS token retrieval.
 * @returns A promise resolving to the client credentials response.
 * @internal
 */
async function getIasTokenImpl(arg: IasParameters): Promise<IasTokenResponse> {
  const identityService = getIdentityServiceInstanceFromCredentials(
    arg.serviceCredentials,
    arg.assertion
  );

  const tokenOptions = transformIasOptionsToXssecArgs(arg);

  const response: IdentityService.TokenFetchResponse =
    arg.authenticationType === 'OAuth2JWTBearer'
      ? // JWT bearer grant for business user access
        await identityService.fetchJwtBearerToken(arg.assertion, tokenOptions)
      : // Technical user client credentials grant
        await identityService.fetchClientCredentialsToken(tokenOptions);

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
    custom_iss: decodedJwt.customIssuer ?? undefined,
    // fetchJwtBearerToken may return a refresh token
    refresh_token: (
      response as unknown as IdentityService.RefreshableTokenFetchResponse
    )?.refresh_token
  };
}
