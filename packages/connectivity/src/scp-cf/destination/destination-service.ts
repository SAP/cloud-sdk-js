import {
  createLogger,
  ErrorWithCause,
  propertyExists,
  removeTrailingSlashes
} from '@sap-cloud-sdk/util';
import axios from 'axios';
import { executeWithMiddleware } from '@sap-cloud-sdk/resilience/internal';
import { resilience } from '@sap-cloud-sdk/resilience';
import asyncRetry from 'async-retry';
import { decodeJwt, getTenantId, wrapJwtInHeader } from '../jwt';
import { urlAndAgent } from '../../http-agent';
import { buildAuthorizationHeaders } from '../authorization-header';
import { parseCertificate, parseDestination } from './destination';
import { destinationServiceCache } from './destination-service-cache';
import type { DestinationConfiguration, DestinationJson } from './destination';
import type {
  DestinationFetchOptions,
  DestinationsByType
} from './destination-accessor-types';
import type { Middleware, MiddlewareContext } from '@sap-cloud-sdk/resilience';
import type { RawAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import type {
  Destination,
  DestinationCertificate
} from './destination-service-types';

const logger = createLogger({
  package: 'connectivity',
  messageContext: 'destination-service'
});

type DestinationsServiceOptions = Pick<DestinationFetchOptions, 'useCache'>;
type DestinationServiceOptions = Pick<
  DestinationFetchOptions,
  'destinationName' | 'retry'
>;

/**
 * @internal
 * Fetch either subaccount or instance destinations (no token retrieval).
 * @param destinationServiceUri - The URI of the destination service
 * @param serviceToken - The service token for the destination service.
 * @param type - Either 'instance' or 'subaccount', depending on what destinations should be fetched.
 * @param options - Options to use for retrieving destinations.
 * @returns A promise resolving to a list of destinations of the requested type.
 */
export async function fetchDestinations(
  destinationServiceUri: string,
  serviceToken: string,
  type: 'instance' | 'subaccount',
  options?: DestinationsServiceOptions
): Promise<Destination[]> {
  const targetUri = `${removeTrailingSlashes(
    destinationServiceUri
  )}/destination-configuration/v1/${type}Destinations`;

  if (options?.useCache) {
    const destinationsFromCache =
      destinationServiceCache.retrieveDestinationsFromCache(
        targetUri,
        decodeJwt(serviceToken)
      );
    if (destinationsFromCache) {
      logger.debug(
        `Destinations retrieved from cache. There were ${destinationsFromCache.length} destinations returned from the cache.`
      );
      return destinationsFromCache;
    }
  }

  const headers = wrapJwtInHeader(serviceToken).headers;

  return callDestinationEndpoint(
    { uri: targetUri, tenantId: getTenantIdFromTokens(serviceToken) },
    headers
  )
    .then(response => {
      const destinations: Destination[] = response.data.map(destination =>
        parseDestination(destination)
      );

      if (options?.useCache) {
        destinationServiceCache.cacheRetrievedDestinations(
          targetUri,
          decodeJwt(serviceToken),
          destinations
        );
      }
      return destinations;
    })
    .catch(error => {
      throw new ErrorWithCause(
        `Failed to fetch ${type} destinations.${errorMessageFromResponse(
          error
        )}`,
        error
      );
    });
}

/**
 * @internal
 */
export interface AuthAndExchangeTokens {
  /**
   * @internal
   */
  authHeaderJwt: string;
  /**
   * @internal
   */
  exchangeHeaderJwt?: string;
  /**
   * @internal
   */
  exchangeTenant?: string;
  /**
   * @internal
   */
  refreshToken?: string;
}

/**
 * @internal
 * Fetch a destination from the destination find API (`/destinations`) and skip the automatic token retrieval.
 * @param destinationName - Name of the destination.
 * @param destinationServiceUri - The URI of the destination service.
 * @param serviceToken - The service token for the destination service.
 * @returns A promise resolving to the requested destination.
 */
export async function fetchDestinationWithoutTokenRetrieval(
  destinationName: string,
  destinationServiceUri: string,
  serviceToken: string
): Promise<DestinationsByType> {
  const targetUri = `${removeTrailingSlashes(
    destinationServiceUri
  )}/destination-configuration/v1/destinations/${destinationName}?$skipTokenRetrieval=true`;

  try {
    const response = await callDestinationEndpoint(
      { uri: targetUri, tenantId: getTenantIdFromTokens(serviceToken) },
      { Authorization: `Bearer ${serviceToken}` }
    );
    const destination = parseDestination(
      response.data.destinationConfiguration
    );

    return {
      instance: response.data.owner?.InstanceId ? [destination] : [],
      subaccount:
        !response.data.owner?.InstanceId && response.data.owner?.SubaccountId
          ? [destination]
          : []
    };
  } catch (err) {
    if (
      err.response?.status === 404 &&
      err.response?.data?.ErrorMessage ===
        'Configuration with the specified name was not found'
    ) {
      return {
        instance: [],
        subaccount: []
      };
    }
    throw new ErrorWithCause(
      `Failed to fetch destination.${errorMessageFromResponse(err)}`,
      err
    );
  }
}

/**
 * Fetches a certificate from the subaccount and destination instance for a given a name.
 * Subaccount is tried first.
 * @param destinationServiceUri - The URI of the destination service
 * @param token - The access token for destination service.
 * @param certificateName - Name of the Certificate to be fetched
 * @returns A Promise resolving to the destination
 * @internal
 */
export async function fetchCertificate(
  destinationServiceUri: string,
  token: string,
  certificateName: string
): Promise<DestinationCertificate | undefined> {
  const filetype = certificateName.split('.')[1];
  if (filetype.toLowerCase() !== 'pem') {
    logger.warn(
      `The provided truststore ${certificateName} is not in 'pem' format which is currently the only supported format. Truststore is ignored.`
    );
    return;
  }
  const accountUri = `${removeTrailingSlashes(
    destinationServiceUri
  )}/destination-configuration/v1/subaccountCertificates/${certificateName}`;
  const instanceUri = `${removeTrailingSlashes(
    destinationServiceUri
  )}/destination-configuration/v1/instanceCertificates/${certificateName}`;
  const header = wrapJwtInHeader(token).headers;

  try {
    const response = await callCertificateEndpoint(
      { uri: accountUri, tenantId: getTenantIdFromTokens(token) },
      header
    ).catch(() =>
      callCertificateEndpoint(
        {
          uri: instanceUri,
          tenantId: getTenantIdFromTokens(token)
        },
        header
      )
    );
    return parseCertificate(response.data);
  } catch (err) {
    logger.warn(
      `Failed to fetch truststore certificate ${certificateName} - Continuing without certificate. This may cause failing requests`,
      err
    );
  }
}

function getTenantIdFromTokens(token: AuthAndExchangeTokens | string): string {
  let tenant: string | undefined;
  if (typeof token === 'string') {
    tenant = getTenantId(token);
  } else {
    tenant =
      // represents the tenant as string already see https://api.sap.com/api/SAP_CP_CF_Connectivity_Destination/resource
      token.exchangeTenant ||
      getTenantId(token.exchangeHeaderJwt) ||
      getTenantId(token.authHeaderJwt);
  }

  if (!tenant) {
    throw new Error('Could not obtain tenant identifier from JWT.');
  }
  return tenant;
}

/**
 * @internal
 * Fetches a specific destination including authorization tokens from the given URI.
 * For destinations with authenticationType `OAuth2SAMLBearerAssertion`, this call will trigger the `OAuth2SAMLBearer` flow against the target destination.
 * @param destinationServiceUri - The URI of the destination service
 * @param token - The access token or `AuthAndExchangeTokens` if you want to include other token headers for e.g. `OAuth2UserTokenExchange`.
 * @param options - Options to use for retrieving destinations.
 * @returns A promise resolving to the destination.
 */
export async function fetchDestinationWithTokenRetrieval(
  destinationServiceUri: string,
  token: string | AuthAndExchangeTokens,
  options: DestinationServiceOptions
): Promise<Destination> {
  const targetUri = `${removeTrailingSlashes(
    destinationServiceUri
  )}/destination-configuration/v1/destinations/${options.destinationName}`;

  token = typeof token === 'string' ? { authHeaderJwt: token } : token;

  let authHeader = wrapJwtInHeader(token.authHeaderJwt).headers;
  authHeader = token.exchangeHeaderJwt
    ? { ...authHeader, 'X-user-token': token.exchangeHeaderJwt }
    : authHeader;

  authHeader = token.exchangeTenant
    ? { ...authHeader, 'X-tenant': token.exchangeTenant }
    : authHeader;

  authHeader = token.refreshToken
    ? { ...authHeader, 'X-refresh-token': token.refreshToken }
    : authHeader;

  return callDestinationEndpoint(
    { uri: targetUri, tenantId: getTenantIdFromTokens(token) },
    authHeader,
    options
  )
    .then(response => {
      const destination: Destination = parseDestination(response.data);
      return destination;
    })
    .catch(error => {
      {
        throw new ErrorWithCause(
          `Failed to fetch destination ${
            options.destinationName
          }.${errorMessageFromResponse(error)}`,
          error
        );
      }
    });
}

function errorMessageFromResponse(
  error: AxiosError<{ ErrorMessage: string }>
): string {
  return propertyExists(error, 'response', 'data', 'ErrorMessage')
    ? ` ${error.response!.data.ErrorMessage}`
    : '';
}

function retryDestination(
  destinationName: string
): Middleware<
  RawAxiosRequestConfig,
  AxiosResponse<DestinationJson>,
  MiddlewareContext<RawAxiosRequestConfig>
> {
  return options => arg => {
    let retryCount = 1;
    return asyncRetry(
      async bail => {
        try {
          const destination = await options.fn(arg);
          if (retryCount < 3) {
            retryCount++;
            // this will throw if the destination does not contain valid auth headers and a second try is done to get a destination with valid tokens.
            await buildAuthorizationHeaders(parseDestination(destination.data));
          }
          return destination;
        } catch (error) {
          const status = error?.response?.status;
          if (status.toString().startsWith('4')) {
            bail(
              new ErrorWithCause(
                `Request failed with status code ${status}`,
                error
              )
            );
            // We need to return something here but the actual value does not matter
            return undefined as any;
          }
          throw error;
        }
      },
      {
        retries: 3,
        onRetry: (err: Error) =>
          logger.warn(
            `Failed to retrieve destination ${destinationName} - doing a retry. Original Error ${err.message}`
          )
      }
    );
  };
}

type DestinationCertificateJson = {
  [Property in keyof DestinationCertificate as `${Capitalize<
    string & Property
  >}`]: DestinationCertificate[Property];
};

async function callCertificateEndpoint(
  context: Omit<MiddlewareContext<RawAxiosRequestConfig>, 'fnArgument'>,
  headers: Record<string, any>
): Promise<AxiosResponse<DestinationCertificateJson>> {
  if (!context.uri.includes('Certificates')) {
    throw new Error(
      `callCertificateEndpoint was called with illegal argument: ${context.uri}. URL must be certificate endpoint of destination service.`
    );
  }
  return callDestinationService(context, headers) as Promise<
    AxiosResponse<DestinationCertificateJson>
  >;
}

async function callDestinationEndpoint(
  context: Omit<MiddlewareContext<RawAxiosRequestConfig>, 'fnArgument'>,
  headers: Record<string, any>,
  options?: DestinationServiceOptions
): Promise<AxiosResponse<DestinationJson | DestinationConfiguration>> {
  if (
    !context.uri.match(/[instance|subaccount]Destinations|v1\/destinations/)
  ) {
    throw new Error(
      `callDestinationEndpoint was called with illegal argument: ${context.uri}. URL must be destination(s) endpoint of destination service.`
    );
  }
  return callDestinationService(context, headers, options) as Promise<
    AxiosResponse<DestinationConfiguration | DestinationJson>
  >;
}

async function callDestinationService(
  context: Omit<MiddlewareContext<RawAxiosRequestConfig>, 'fnArgument'>,
  headers: Record<string, any>,
  options?: DestinationServiceOptions
): Promise<
  AxiosResponse<
    DestinationCertificateJson | DestinationConfiguration | DestinationJson
  >
> {
  const { destinationName, retry } = options || {};

  const requestConfig: RawAxiosRequestConfig = {
    ...(await urlAndAgent(context.uri)),
    method: 'get',
    headers
  };

  const resilienceMiddleware = resilience<
    RawAxiosRequestConfig,
    AxiosResponse<DestinationJson>,
    MiddlewareContext<RawAxiosRequestConfig>
  >();
  if (destinationName && retry) {
    resilienceMiddleware.unshift(retryDestination(destinationName));
  }

  return executeWithMiddleware(resilienceMiddleware, {
    context,
    fnArgument: requestConfig,
    fn: config => axios.request(config)
  });
}
