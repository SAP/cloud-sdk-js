import {
  createLogger,
  ErrorWithCause,
  propertyExists,
  removeTrailingSlashes
} from '@sap-cloud-sdk/util';
// eslint-disable-next-line import/named
import axios, { RawAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { executeWithMiddleware } from '@sap-cloud-sdk/resilience/internal';
import {
  resilience,
  Middleware,
  MiddlewareContext
} from '@sap-cloud-sdk/resilience';
import * as asyncRetry from 'async-retry';
import { decodeJwt, wrapJwtInHeader } from '../jwt';
import { urlAndAgent } from '../../http-agent';
import { buildAuthorizationHeaders } from '../authorization-header';
import { getSubdomainAndZoneId } from '../tenant';
import {
  DestinationConfiguration,
  DestinationJson,
  parseCertificate,
  parseDestination
} from './destination';
import { DestinationFetchOptions } from './destination-accessor-types';
import { destinationServiceCache } from './destination-service-cache';
import {
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
 * Fetches all instance destinations from the given URI.
 * @param destinationServiceUri - The URI of the destination service
 * @param jwt - The access token
 * @param options - Options to use by retrieving destinations
 * @returns A promise resolving to a list of instance destinations
 * @internal
 */
export function fetchInstanceDestinations(
  destinationServiceUri: string,
  jwt: string,
  options?: DestinationsServiceOptions
): Promise<Destination[]> {
  return fetchDestinations(destinationServiceUri, jwt, 'instance', options);
}

/**
 * Fetches all subaccount destinations from the given URI.
 * @param destinationServiceUri - The URI of the destination service
 * @param jwt - The access token
 * @param options - Options to use by retrieving destinations
 * @returns A promise resolving to a list of subaccount destinations
 * @internal
 */
export function fetchSubaccountDestinations(
  destinationServiceUri: string,
  jwt: string,
  options?: DestinationsServiceOptions
): Promise<Destination[]> {
  return fetchDestinations(destinationServiceUri, jwt, 'subaccount', options);
}

async function fetchDestinations(
  destinationServiceUri: string,
  jwt: string,
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
        decodeJwt(jwt)
      );
    if (destinationsFromCache) {
      logger.debug(
        `Destinations retrieved from cache. There were ${destinationsFromCache.length} destinations returned from the cache.`
      );
      return destinationsFromCache;
    }
  }

  const headers = wrapJwtInHeader(jwt).headers;

  return callDestinationEndpoint(
    { uri: targetUri, tenantId: getTenantFromTokens(jwt) },
    headers
  )
    .then(response => {
      const destinations: Destination[] = response.data.map(destination =>
        parseDestination(destination)
      );

      if (options?.useCache) {
        destinationServiceCache.cacheRetrievedDestinations(
          targetUri,
          decodeJwt(jwt),
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
 * Fetches a specific destination by name from the given URI, including authorization tokens.
 * For destinations with authenticationType OAuth2SAMLBearerAssertion, this call will trigger the OAuth2SAMLBearerFlow against the target destination.
 * In this pass the access token as string.
 * Fetches a specific destination with authenticationType OAuth2UserTokenExchange by name from the given URI, including authorization tokens.
 * @param destinationServiceUri - The URI of the destination service
 * @param token - The access token or AuthAndExchangeTokens if you want to include the X-user-token for OAuth2UserTokenExchange.
 * @param options - Options to use by retrieving destinations
 * @returns A Promise resolving to the destination
 * @internal
 */
export async function fetchDestination(
  destinationServiceUri: string,
  token: string | AuthAndExchangeTokens,
  options: DestinationServiceOptions
): Promise<Destination> {
  return fetchDestinationByTokens(
    destinationServiceUri,
    typeof token === 'string' ? { authHeaderJwt: token } : token,
    options
  );
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
      { uri: accountUri, tenantId: getTenantFromTokens(token) },
      header
    ).catch(() =>
      callCertificateEndpoint(
        {
          uri: instanceUri,
          tenantId: getTenantFromTokens(token)
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

function getTenantFromTokens(token: AuthAndExchangeTokens | string): string {
  let tenant: string | undefined;
  if (typeof token === 'string') {
    tenant = getTenantId(token);
  } else {
    tenant =
      token.exchangeTenant || // represents the tenant as string already see https://api.sap.com/api/SAP_CP_CF_Connectivity_Destination/resource
      getTenantId(token.exchangeHeaderJwt) ||
      getTenantId(token.authHeaderJwt);
  }

  if (!tenant) {
    throw new Error('Could not obtain tenant identifier from JWT.');
  }
  return tenant;
}

// TODO: Why is this different than for caching? => the token is always already there #provider
function getTenantId(token: string | undefined): string | undefined {
  const { zoneId, subdomain } = getSubdomainAndZoneId(token);
  return zoneId || subdomain || undefined;
}

async function fetchDestinationByTokens(
  destinationServiceUri: string,
  tokens: AuthAndExchangeTokens,
  options: DestinationServiceOptions
): Promise<Destination> {
  const targetUri = `${removeTrailingSlashes(
    destinationServiceUri
  )}/destination-configuration/v1/destinations/${options.destinationName}`;

  let authHeader = wrapJwtInHeader(tokens.authHeaderJwt).headers;
  authHeader = tokens.exchangeHeaderJwt
    ? { ...authHeader, 'X-user-token': tokens.exchangeHeaderJwt }
    : authHeader;

  authHeader = tokens.exchangeTenant
    ? { ...authHeader, 'X-tenant': tokens.exchangeTenant }
    : authHeader;

  authHeader = tokens.refreshToken
    ? { ...authHeader, 'X-refresh-token': tokens.refreshToken }
    : authHeader;

  return callDestinationEndpoint(
    { uri: targetUri, tenantId: getTenantFromTokens(tokens) },
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
    return asyncRetry.default(
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
            bail(new Error(`Request failed with status code ${status}`));
            // We need to return something here but the actual value does not matter
            return undefined as any;
          }
          throw error;
        }
      },
      {
        retries: 3,
        onRetry: err =>
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
    ...urlAndAgent(context.uri),
    proxy: false,
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
