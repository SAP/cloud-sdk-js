import https from 'https';
import { executeWithMiddleware } from '@sap-cloud-sdk/resilience/internal';
import { resilience } from '@sap-cloud-sdk/resilience';
import { createLogger } from '@sap-cloud-sdk/util';
import axios from 'axios';
import { decodeJwt, isXsuaaToken } from './jwt';
import { resolveServiceBinding } from './environment-accessor';
import { iasTokenCache } from './ias-token-cache';
import type {
  DestinationOptions,
  ServiceBindingTransformOptions
} from './destination';
import type { MiddlewareContext } from '@sap-cloud-sdk/resilience';
import type { Service, ServiceCredentials } from './environment-accessor';
import type { RawAxiosRequestConfig } from 'axios';
import type { ClientCredentialsResponse } from './xsuaa-service-types';

const logger = createLogger({
  package: 'connectivity',
  messageContext: 'identity-service'
});

/**
 * Specifies which user identity should be used for authentication.
 * Determines whether to use technical client credentials or propagate a business user's identity.
 */
export type ActAs =
  /**
   * Technical user from the service binding (default).
   */
  | 'technical-user'
  /**
   * Business user from the current request context (requires JWT).
   */
  | 'business-user';

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
  serviceCredentials: ServiceCredentials;
} & ServiceBindingTransformOptions['iasOptions'];

/**
 * Make a client credentials request against the IAS OAuth2 endpoint.
 * Supports both certificate-based (mTLS) and client secret authentication.
 * @param service - Service as it is defined in the environment variable.
 * @param options - Options for token fetching, including actAs to specify authentication mode, optional resource parameter for app2app, appTenantId for multi-tenant scenarios, and extraParams for additional OAuth2 parameters.
 * @returns Client credentials token response.
 * @internal
 */
export async function getIasClientCredentialsToken(
  service: string | Service,
  options: ServiceBindingTransformOptions['iasOptions'] = {}
): Promise<ClientCredentialsResponse> {
  const resolvedService = resolveServiceBinding(service);
  const { clientid } = resolvedService.credentials;

  const cachedToken = iasTokenCache.getToken(clientid, options);
  if (cachedToken) {
    return cachedToken;
  }

  const fnArgument: IasParameters = {
    serviceCredentials: resolvedService.credentials,
    ...options
  };

  const token = await executeWithMiddleware<
    IasParameters,
    ClientCredentialsResponse,
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

  // Cache the token
  iasTokenCache.cacheToken(clientid, options, token);

  return token;
}

/**
 * Implementation of the IAS client credentials token retrieval.
 * @param arg - The parameters for IAS token retrieval.
 * @returns A promise resolving to the client credentials response.
 * @internal
 */
async function getIasClientCredentialsTokenImpl(
  arg: IasParameters
): Promise<ClientCredentialsResponse> {
  const { url, clientid, certificate, key, clientsecret } =
    arg.serviceCredentials;

  if (!url || !clientid) {
    throw new Error(
      'IAS credentials must contain "url" and "clientid" properties.'
    );
  }

  // Build form data
  const params = new URLSearchParams({
    client_id: clientid
  });

  // Determine grant type based on actAs parameter
  const actAs = arg.actAs || 'technical-user';

  if (actAs === 'business-user') {
    // JWT bearer grant for business user propagation
    if (!arg.assertion) {
      throw new Error(
        'JWT assertion required for actAs: "business-user". Provide iasOptions.assertion.'
      );
    }
    params.append('assertion', arg.assertion);
    params.append('grant_type', 'urn:ietf:params:oauth:grant-type:jwt-bearer');
    // Workaround for an IAS issue
    params.append('refresh_token', '0');
  } else {
    // Client credentials for technical users
    params.append('grant_type', 'client_credentials');
  }

  if (arg.resource) {
    let fullResource = '';
    if ('name' in arg.resource) {
      fullResource = `urn:sap:identity:application:provider:name:${arg.resource.name}`;
    } else {
      fullResource = `urn:sap:identity:application:provider:clientid:${arg.resource.clientId}`;
      if (arg.resource.tenantId) {
        fullResource += `:tenantid:${arg.resource.tenantId}`;
      }
    }

    params.append('resource', fullResource);
    logger.debug(`Fetching IAS token with resource parameter: ${fullResource}`);
  }

  if (arg.appTenantId) {
    params.append('app_tid', arg.appTenantId);
    logger.debug(
      `Fetching IAS token with app_tid parameter: ${arg.appTenantId}`
    );
  }

  // Ensure JWT token format, not mandatory but we expect JWTs
  // and the docs mention in some cases we may get opaque tokens otherwise
  params.append('token_format', 'jwt');

  const tokenUrl = `${url}/oauth2/token`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  const requestConfig: RawAxiosRequestConfig = {
    method: 'post',
    url: tokenUrl,
    headers
  };

  // Determine authentication method
  if (certificate && key) {
    // mTLS authentication
    logger.debug('Using certificate-based authentication for IAS token.');
    requestConfig.httpsAgent = new https.Agent({
      cert: certificate,
      key
    });
  } else if (clientsecret) {
    logger.debug('Using client secret authentication for IAS token.');
    params.append('client_secret', clientsecret);
  } else {
    throw new Error(
      'IAS credentials must contain either "certificate" and "key" for mTLS, or "clientsecret" for client secret authentication.'
    );
  }

  if (arg.extraParams) {
    for (const [paramKey, paramValue] of Object.entries(arg.extraParams)) {
      params.append(paramKey, paramValue);
    }
  }

  requestConfig.data = params.toString();

  const response =
    await axios.request<ClientCredentialsResponse>(requestConfig);
  return response.data;
}
