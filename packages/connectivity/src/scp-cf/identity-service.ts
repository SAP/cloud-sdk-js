import https from 'https';
import { executeWithMiddleware } from '@sap-cloud-sdk/resilience/internal';
import { resilience } from '@sap-cloud-sdk/resilience';
import { createLogger } from '@sap-cloud-sdk/util';
import axios from 'axios';
import { decodeJwt, isXsuaaToken } from './jwt';
import { resolveServiceBinding } from './environment-accessor';
import type { DestinationOptions } from './destination';
import type { MiddlewareContext } from '@sap-cloud-sdk/resilience';
import type { Service, ServiceCredentials } from './environment-accessor';
import type { RawAxiosRequestConfig } from 'axios';
import type { ClientCredentialsResponse } from './xsuaa-service-types';

const logger = createLogger({
  package: 'connectivity',
  messageContext: 'identity-service'
});

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

interface IasParameters {
  serviceCredentials: ServiceCredentials;
  resource?: string;
  appTenantId?: string;
  extraParams?: Record<string, string>;
}

/**
 * Make a client credentials request against the IAS OAuth2 endpoint.
 * Supports both certificate-based (mTLS) and client secret authentication.
 * @param service - Service as it is defined in the environment variable.
 * @param options - Options for token fetching, including optional resource parameter for app2app, appTenantId for multi-tenant scenarios, and extraParams for additional OAuth2 parameters.
 * @returns Client credentials token response.
 * @internal
 */
export async function getIasClientCredentialsToken(
  service: string | Service,
  options?: {
    resource?: string;
    appTenantId?: string;
    extraParams?: Record<string, string>;
  }
): Promise<ClientCredentialsResponse> {
  const resolvedService = resolveServiceBinding(service);

  const fnArgument: IasParameters = {
    serviceCredentials: resolvedService.credentials,
    resource: options?.resource,
    appTenantId: options?.appTenantId,
    extraParams: options?.extraParams
  };

  const iasPromise = async function (
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
      grant_type: 'client_credentials',
      client_id: clientid
    });

    if (arg.resource) {
      const fullResource = `urn:sap:identity:application:provider:name:${arg.resource}`;
      params.append('resource', fullResource);
      logger.debug(
        `Fetching IAS token with resource parameter: ${fullResource}`
      );
    }

    if (arg.appTenantId) {
      params.append('app_tid', arg.appTenantId);
      logger.debug(
        `Fetching IAS token with app_tid parameter: ${arg.appTenantId}`
      );
    }

    for (const [paramKey, paramValue] of Object.entries(arg.extraParams || {})) {
      params.append(paramKey, paramValue);
    }

    const tokenUrl = `${url}/oauth2/token`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    const requestConfig: RawAxiosRequestConfig = {
      method: 'post',
      url: tokenUrl,
      headers,
      data: params.toString()
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
      // Client secret authentication
      logger.debug('Using client secret authentication for IAS token.');
      const credentials = Buffer.from(`${clientid}:${clientsecret}`).toString(
        'base64'
      );
      headers['Authorization'] = `Basic ${credentials}`;
    } else {
      throw new Error(
        'IAS credentials must contain either "certificate" and "key" for mTLS, or "clientsecret" for client secret authentication.'
      );
    }

    const response = await axios.request<ClientCredentialsResponse>(requestConfig);
    return response.data;
  };

  return executeWithMiddleware<
    IasParameters,
    ClientCredentialsResponse,
    MiddlewareContext<IasParameters>
  >(resilience(), {
    fn: iasPromise,
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
}
