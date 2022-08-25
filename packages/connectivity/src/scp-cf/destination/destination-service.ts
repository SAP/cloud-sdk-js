import {
  createLogger,
  ErrorWithCause,
  propertyExists,
  removeTrailingSlashes
} from '@sap-cloud-sdk/util';
import CircuitBreaker from 'opossum';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { decodeJwt, wrapJwtInHeader } from '../jwt';
import {
  circuitBreakerDefaultOptions,
  defaultResilienceBTPServices,
  ResilienceOptions
} from '../resilience-options';
import { urlAndAgent } from '../../http-agent';
import {
  DestinationConfiguration,
  DestinationJson,
  getDestinationConfig,
  parseCertificate,
  parseDestination,
  validateDestinationConfig
} from './destination';
import {
  Destination,
  DestinationCertificate,
  DestinationType
} from './destination-service-types';
import { destinationServiceCache } from './destination-service-cache';
import { DestinationFetchOptions } from './destination-accessor-types';

const logger = createLogger({
  package: 'connectivity',
  messageContext: 'destination-service'
});

type DestinationCircuitBreaker<ResponseType> = CircuitBreaker<
  [requestConfig: AxiosRequestConfig],
  AxiosResponse<ResponseType>
>;

type DestinationsServiceOptions = ResilienceOptions &
  Pick<DestinationFetchOptions, 'useCache'>;
type DestinationServiceOptions = ResilienceOptions &
  Pick<DestinationFetchOptions, 'destinationName'>;

let circuitBreaker: DestinationCircuitBreaker<
  DestinationCertificateJson | DestinationConfiguration | DestinationJson
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
  return fetchDestinations(
    destinationServiceUri,
    jwt,
    DestinationType.Instance,
    options
  );
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
  return fetchDestinations(
    destinationServiceUri,
    jwt,
    DestinationType.Subaccount,
    options
  );
}

function isParsable(
  destinationResponse: DestinationConfiguration | DestinationJson
): boolean {
  const config = getDestinationConfig(destinationResponse);
  try {
    validateDestinationConfig(config);
    return true;
  } catch (err) {
    logger.debug(
      `Parsing of destination with name "${config.Name}" failed - skip this destination in parsing.`
    );
    return false;
  }
}

async function fetchDestinations(
  destinationServiceUri: string,
  jwt: string,
  type: DestinationType,
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

  return callDestinationEndpoint(targetUri, headers, options)
    .then(response => {
      const destinations: Destination[] = response.data
        .filter(isParsable)
        .map(parsableDestination => parseDestination(parsableDestination));

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
      `The provided truststore ${certificateName} is not in 'pem' format which is currently the only supported format. Trustore is ignored.`
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
    const response = await callCertificateEndpoint(accountUri, header).catch(
      () => callCertificateEndpoint(instanceUri, header)
    );
    return parseCertificate(response.data);
  } catch (err) {
    logger.warn(
      `Failed to fetch truststore certificate ${certificateName} - Continuing without certificate. This may cause failing requests`,
      err
    );
  }
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

  return callDestinationEndpoint(targetUri, authHeader, options)
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

type DestinationCertificateJson = {
  [Property in keyof DestinationCertificate as `${Capitalize<
    string & Property
  >}`]: DestinationCertificate[Property];
};

async function callCertificateEndpoint(
  uri: string,
  headers: Record<string, any>,
  options?: ResilienceOptions
): Promise<AxiosResponse<DestinationCertificateJson>> {
  if (!uri.includes('Certificates')) {
    throw new Error(
      `callCertificateEndpoint was called with illegal arrgument: ${uri}. URL must be certificate endpoint of destination service.`
    );
  }
  return callDestinationService(uri, headers, options) as Promise<
    AxiosResponse<DestinationCertificateJson>
  >;
}

async function callDestinationEndpoint(
  uri: string,
  headers: Record<string, any>,
  options?: ResilienceOptions
): Promise<AxiosResponse<DestinationJson | DestinationConfiguration>> {
  if (!uri.match(/[instance|subaccount]Destinations|v1\/destinations/)) {
    throw new Error(
      `callDestinationEndpoint was called with illegal arrgument: ${uri}. URL must be destination(s) endpoint of destination service.`
    );
  }
  return callDestinationService(uri, headers, options) as Promise<
    AxiosResponse<DestinationConfiguration | DestinationJson>
  >;
}

async function callDestinationService(
  uri: string,
  headers: Record<string, any>,
  options?: ResilienceOptions
): Promise<
  AxiosResponse<
    DestinationCertificateJson | DestinationConfiguration | DestinationJson
  >
> {
  const { enableCircuitBreaker, timeout } = {
    ...defaultResilienceBTPServices,
    ...options
  };
  const config: AxiosRequestConfig = {
    ...urlAndAgent(uri),
    proxy: false,
    method: 'get',
    timeout,
    headers
  };

  if (enableCircuitBreaker) {
    return getCircuitBreaker().fire(config);
  }

  return axios.request(config);
}

function getCircuitBreaker(): DestinationCircuitBreaker<
  DestinationCertificateJson | DestinationConfiguration | DestinationJson
> {
  const request: (
    config: AxiosRequestConfig
  ) => Promise<
    AxiosResponse<
      DestinationCertificateJson | DestinationConfiguration | DestinationJson
    >
  > = axios.request;
  if (!circuitBreaker) {
    circuitBreaker = new CircuitBreaker(request, circuitBreakerDefaultOptions);
  }
  return circuitBreaker;
}
