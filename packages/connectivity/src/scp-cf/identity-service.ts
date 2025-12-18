import { executeWithMiddleware } from '@sap-cloud-sdk/resilience/internal';
import { resilience } from '@sap-cloud-sdk/resilience';
import { decodeJwt, isIasToken } from './jwt';
import {
  resolveServiceBinding,
  getIdentityServiceInstanceFromCredentials
} from './environment-accessor';
import type { IdentityService } from '@sap/xssec';
import type {
  DestinationOptions,
  IasOptions,
  IasResource
} from './destination';
import type { MiddlewareContext } from '@sap-cloud-sdk/resilience';
import type { Service, ServiceCredentials } from './environment-accessor';
import type { ClientCredentialsResponse } from './xsuaa-service-types';

export { clearIdentityServices } from './environment-accessor';

/**
 * @internal
 * Represents the response to an IAS client credentials request.
 * Extends the XSUAA response with IAS-specific fields.
 */
export interface IasClientCredentialsResponse
  extends ClientCredentialsResponse {
  /**
   * Audience claim from the JWT token.
   */
  aud?: string | string[];
  /**
   * IAS API resources. Present when resource parameter is specified in the token request.
   */
  ias_apis?: string[];
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
    isIasToken(decodeJwt(options.jwt))
  );
}

type IasParameters = {
  serviceCredentials: ServiceCredentials;
} & IasOptions;

type FirstArg<T> = T extends (arg1: infer U, ...args: any[]) => any ? U : never;
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

// xssec does not properly export these
type IdTokenFetchOptions = FirstArg<
  InstanceType<typeof IdentityService>['fetchClientCredentialsToken']
>;
type TokenFetchResponse = UnwrapPromise<
  ReturnType<
    InstanceType<typeof IdentityService>['fetchClientCredentialsToken']
  >
>;

/**
 * Make a client credentials request against the IAS OAuth2 endpoint.
 * Supports both certificate-based (mTLS) and client secret authentication.
 * @param service - Service as it is defined in the environment variable.
 * @param options - Options for token fetching, including authenticationType to specify authentication mode, optional resource parameter for app2app, appTid for multi-tenant scenarios, and extraParams for additional OAuth2 parameters.
 * @returns Client credentials token response.
 * @internal
 */
export async function getIasClientCredentialsToken(
  service: string | Service,
  options: IasOptions = {}
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
      tenantId: fnArgument.serviceCredentials.tenantid
    }
  }).catch(err => {
    throw new Error(
      `Could not fetch IAS client credentials token for service of type ${resolvedService.label}: ${err.message}`
    );
  });
  return token;
}

/**
 * Converts an IasResource to the URN format expected by @sap/xssec.
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

  let urn = `urn:sap:identity:application:provider:clientid:${resource.clientId}`;
  if (resource.tenantId) {
    urn += `:tenantid:${resource.tenantId}`;
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
    arg.serviceCredentials
  );

  const authenticationType =
    arg.authenticationType || 'OAuth2ClientCredentials';

  const tokenOptions: IdTokenFetchOptions = {
    token_format: 'jwt'
  };

  // Stringify resource(s)
  if (arg.resource) {
    tokenOptions.resource = Array.isArray(arg.resource)
      ? arg.resource.map(convertResourceToUrn)
      : convertResourceToUrn(arg.resource);
  }

  if (arg.appTid) {
    tokenOptions.app_tid = arg.appTid;
  }

  // Add any extra parameters
  if (arg.extraParams) {
    Object.assign(tokenOptions, arg.extraParams);
  }

  let response: undefined | TokenFetchResponse;

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
    // Client credentials for technical users
    response = await identityService.fetchClientCredentialsToken(tokenOptions);
  }

  const decodedJwt = decodeJwt(response.access_token);

  return {
    access_token: response.access_token,
    token_type: response.token_type,
    expires_in: response.expires_in,
    // IAS tokens don't have scope property
    scope: '',
    jti: decodedJwt.jti ?? '',
    aud: decodedJwt.aud,
    // Added if resource parameter was specified
    ias_apis: decodedJwt?.ias_apis
  };
}
