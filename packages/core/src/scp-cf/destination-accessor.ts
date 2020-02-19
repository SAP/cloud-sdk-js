/*!
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { createLogger } from '@sap-cloud-sdk/util';
import { DecodedJWT, decodeJwt, isIdenticalTenant, verifyJwt, VerifyJwtOptions } from '../util/jwt';
import { addProxyConfigurationInternet, ProxyStrategy, proxyStrategy } from '../util/proxy-util';
import { IsolationStrategy } from './cache';
import { addProxyConfigurationOnPrem } from './connectivity-service';
import { sanitizeDestination } from './destination';
import { DestinationsByType } from './destination-accessor-types';
import { destinationCache } from './destination-cache';
import { alwaysProvider, alwaysSubscriber, DestinationSelectionStrategy, subscriberFirst } from './destination-selection-strategies';
import { fetchDestination, fetchInstanceDestinations, fetchSubaccountDestinations } from './destination-service';
import { Destination, DestinationNameAndJwt, DestinationRetrievalOptions, isDestinationNameAndJwt } from './destination-service-types';
import { getDestinationFromEnvByName, getDestinationsEnvVariable } from './env-destination-accessor';
import { getDestinationServiceCredentialsList, getService } from './environment-accessor';
import { DestinationServiceCredentials } from './environment-accessor-types';
import { serviceToken, userApprovedServiceToken } from './token-accessor';
import { destinationForServiceBinding } from './vcap-service-destination';

const logger = createLogger({
  package: 'core',
  messageContext: 'destination-accessor'
});

/**
 * Returns the parameter if it is a destination, calls [[getDestination]] otherwise (which will try to fetch the destination
 * from the Cloud Foundry destination service).
 *
 * Fetching a destination requires:
 * - a binding to exactly one XSUAA service instance with service plan "application"
 * - a binding to a destination service instance
 *
 * If either of the prerequisites is not met or one of the services returns an error, this function will either throw an error or return a promise that rejects.
 *
 * @param destination A destination or the necessary parameters to fetch one.
 * @param options Caching options by fetching destination.
 * @returns A promise resolving to the requested destination on success.
 */
export async function useOrFetchDestination(
  destination: Destination | DestinationNameAndJwt,
  options: DestinationOptions = {}
): Promise<Destination | null> {
  return isDestinationNameAndJwt(destination)
    ? getDestination(destination.destinationName, {
        userJwt: destination.jwt,
        ...options
      })
    : sanitizeDestination(destination);
}

export interface DestinationAccessorOptions {
  /**
   * Method that implements the selection strategy of the retrieved destination. Uses [[subscriberFirst]] per default. Use the selector helper [[DestinationSelectionStrategies]] to select the appropriate selection strategy.
   */
  selectionStrategy?: DestinationSelectionStrategy;
  /**
   * The user token of the current request.
   */
  userJwt?: string;
}

export type DestinationOptions = DestinationAccessorOptions & DestinationRetrievalOptions & VerifyJwtOptions;

/**
 * @deprecated Since v1.0.1. Use [[getDestination]] instead.
 *
 * Retrieves a destination with the given name from the Cloud Foundry destination service.
 * Returns null if no destination can be found.
 * Requires the following service bindings: destination, XSUAA
 * By default, selects subscriber over provider and instance over subaccount destinations.
 *
 * If the destinations are read from the environment, the jwt will be ignored.
 *
 * @param name The name of the destination to be retrieved.
 * @param options The options of the fetching query of the destination that include the JWT of the current request and the strategy for selecting a destination.
 * @returns A promise returning the requested destination on success.
 */
export async function getDestinationOptions(name: string, options: DestinationOptions = {}): Promise<Destination | null> {
  return getDestination(name, options);
}

/**
 * Builds a destination from one of three sources (in the given order):
 * - from the environment variable "destinations"
 * - from service bindings
 * - from the destination service
 *
 * If you want to get a destination only from a specific source, use the corresponding function directly
 *  (`getDestinationFromEnvByName`, `destinationForServiceBinding`, `getDestinationFromDestinationService`).
 *
 * @param name The name of the destination to be retrieved.
 * @param options Configuration for how to retrieve destinations from the destination service.
 * @returns A promise returning the requested destination on success.
 */
export async function getDestination(name: string, options: DestinationOptions = {}): Promise<Destination | null> {
  const destination = await (tryDestinationFromEnv(name) ||
    tryDestinationForServiceBinding(name) ||
    getDestinationFromDestinationService(name, options));

  return destination;
}

//Remove it for OSS
// function newGetDestinationFromDestinationService(name: string, options?: DestinationOptions): Promise<Destination | null> {
//   // TODO: Promise<Destination | null> is not a good type
//   // step 1: fix the options
//   const defaultOptions: DestinationOptions = {
//     useCache: true,
//     cacheVerificationKeys: true,
//     enableCircuitBreaker: true,
//     isolationStrategy: IsolationStrategy.Tenant,
//     selectionStrategy: subscriberFirst,
//     userJwt: undefined // wow this feels awkward. either there is one or there is none
//   };

//Perhaps an issue instead having this in the code-base
// // TODO: for non-system user principal propagation, the default isolation strategy should always be Tenant_User. only tenant will lead to critical errors (also consider the On-Premise case here (that is not yet implemented))

//   // step 2: check the cache

//   // step 3: if the destination isn't cached OR it's a principal prop destination, go get it again

//   // step 4: cache it
// }

// function destinationFromCache(name: string, options?: DestinationOptions): Destination | undefined {
//   if (destinationCache.retrieveDestinationFromCache(options.userJwt, name, options.isolationStrategy)) {
//   }
// }

/**
 * Retrieves a destination with the given name from the Cloud Foundry destination service.
 * Returns null if no destination can be found.
 * Requires the following service bindings: destination, XSUAA
 * By default, selects subscriber over provider and instance over subaccount destinations.
 *
 * If the destinations are read from the environment, the jwt will be ignored.
 *
 * @param name The name of the destination to be retrieved.
 * @param options Configuration for how to retrieve destinations from the destination service.
 * @returns A promise returning the requested destination on success.
 */
export async function getDestinationFromDestinationService(
  name: string,
  options: DestinationOptions & { iss?: string }
): Promise<Destination | null> {
  //Perhasps an issue instead this TODO in the code?
  // TODO: default options are missing. for example caching is deactivated by default...
  const decodedUserJwt = options.userJwt ? await verifyJwt(options.userJwt, options) : options.iss ? { iss: options.iss } : undefined;
  const isolation = options.isolationStrategy ? options.isolationStrategy : IsolationStrategy.Tenant; // TODO: should be part of options
  const selectionStrategy = options.selectionStrategy ? options.selectionStrategy : subscriberFirst; // TODO: should be part of options
  let providerDestinationCache;

  if (options.useCache && options.userJwt && subscriberDestinationIsSelected(selectionStrategy)) {
    const subscriberDestinationCache = destinationCache.retrieveDestinationFromCache(decodedUserJwt!, name, isolation);
    if (subscriberDestinationCache) {
      return subscriberDestinationCache;
    }
  }

  const { userJwt, ...optionsWithoutJwt } = options;
  const providerToken = await serviceToken('destination', optionsWithoutJwt);
  const decodedProviderJwt = await decodeJwt(providerToken);

  if (options.useCache) {
    providerDestinationCache = destinationCache.retrieveDestinationFromCache(decodedProviderJwt, name, isolation);
    if (
      providerDestinationCache &&
      (selectionStrategy === alwaysProvider || (decodedUserJwt && isIdenticalTenant(decodedUserJwt!, decodedProviderJwt)))
    ) {
      return providerDestinationCache;
    }
  }

  const shouldExecuteSubscriberCalls =
    decodedUserJwt && !isIdenticalTenant(decodedUserJwt!, decodedProviderJwt) && selectionStrategy !== alwaysProvider;

  const subscriberDestinations = shouldExecuteSubscriberCalls ? await getAllSubscriberDestinations(decodedUserJwt!, options) : emptyDestinationByType;

  if (emptyDestinationsByType(subscriberDestinations) && providerDestinationCache && selectionStrategy !== alwaysSubscriber) {
    return providerDestinationCache;
  }

  const providerDestinations =
    selectionStrategy !== alwaysSubscriber ? await getAllProviderDestinations(providerToken, options) : emptyDestinationByType;

  if (options.useCache) {
    if (options.userJwt) {
      destinationCache.cacheRetrievedDestinations(decodedUserJwt!, subscriberDestinations, isolation);
    }
    destinationCache.cacheRetrievedDestinations(decodedProviderJwt, providerDestinations, isolation);
  }

  const allDestinations = {
    subscriber: subscriberDestinations,
    provider: providerDestinations
  };

  let destination: Destination | null = selectionStrategy(allDestinations, name);

  if (destination) {
    if (destination.authentication === 'OAuth2SAMLBearerAssertion') {
      if (destination.systemUser) {
        const destinationService = getService('destination');

        if (!destinationService) {
          throw Error(`Failed to fetch destination "${name}"! No binding to a destination service found.`);
        }
        logger.debug(providerToken);
        destination = await fetchDestination(destinationService.credentials.uri, providerToken, name, options);
      } else {
        throwErrorWhenNull(options.userJwt, 'user jwt');
        destination = await getDestinationWithAuthTokens(name, options.userJwt!, options);
      }
    } else if (destination.authentication === 'ClientCertificateAuthentication') {
      destination = await getDestinationWithCertificates(name, decodedUserJwt, options);
    }

    if (destination) {
      if (proxyStrategy(destination) === ProxyStrategy.ON_PREMISE_PROXY) {
        destination = await addProxyConfigurationOnPrem(destination, options.userJwt);
      }
      if (proxyStrategy(destination) === ProxyStrategy.INTERNET_PROXY) {
        destination = addProxyConfigurationInternet(destination);
      }
    }

    destinationCache.cacheRetrievedDestinations(
      decodedUserJwt || decodedProviderJwt,
      { instance: [], subaccount: [destination] },
      options.isolationStrategy || IsolationStrategy.Tenant
    );
  }

  return destination;
}

function tryDestinationForServiceBinding(name: string): Destination | undefined {
  try {
    return destinationForServiceBinding(name);
  } catch (error) {
    logger.warn(error.message);
    return undefined;
  }
}

function tryDestinationFromEnv(name: string): Destination | undefined {
  if (getDestinationsEnvVariable()) {
    logger.warn(
      "Environment variable 'destinations' is set. Destinations will be read from this variable. " +
        'This is discouraged for a productive application! ' +
        'Unset the variable to read destinations from the destination service on SAP Cloud Platform.'
    );

    return getDestinationFromEnvByName(name) || undefined;
  }
}

/**
 * This function will fetch a destination of a subscriber given a destination name and the subscriber JWT.
 *
 * @param userJwt The (encoded) JWT of the current request.
 * @param options Destination retrieval options.
 * @returns A promise, that (if it resolves) contains the subscriber destinations, grouped by type (instance, subaccount).
 */
async function getAllSubscriberDestinations(userJwt: DecodedJWT, options: DestinationRetrievalOptions): Promise<DestinationsByType> {
  const destinationServiceCreds = getDestinationServiceCredentials();

  const accessToken = await serviceToken('destination', { userJwt, ...options });
  return getInstanceAndSubaccountDestinations(destinationServiceCreds.uri, accessToken, options);
}

async function getAllProviderDestinations(providerJwt: string, options: DestinationRetrievalOptions): Promise<DestinationsByType> {
  const destinationServiceCreds = getDestinationServiceCredentials();

  return getInstanceAndSubaccountDestinations(destinationServiceCreds.uri, providerJwt, options);
}

async function getInstanceAndSubaccountDestinations(
  destinationServiceUri: string,
  accessToken: string,
  options: DestinationRetrievalOptions
): Promise<DestinationsByType> {
  const destinations = await Promise.all([
    fetchInstanceDestinations(destinationServiceUri, accessToken, options),
    fetchSubaccountDestinations(destinationServiceUri, accessToken, options)
  ]);

  return {
    instance: destinations[0],
    subaccount: destinations[1]
  };
}

async function getDestinationWithCertificates(
  name: string,
  userJwt: string | DecodedJWT | undefined,
  options: DestinationRetrievalOptions
): Promise<Destination> {
  const destinationServiceCreds = getDestinationServiceCredentials();
  const accessToken = await serviceToken('destination', { userJwt, ...options });

  return fetchDestination(destinationServiceCreds.uri, accessToken, name, options);
}

async function getDestinationWithAuthTokens(name: string, userJwt: string, options?: DestinationRetrievalOptions): Promise<Destination> {
  const destinationService = getService('destination');

  if (!destinationService) {
    throw Error(`Failed to fetch destination "${name}"! No binding to a destination service found.`);
  }

  const accessToken = await userApprovedServiceToken(userJwt, destinationService, options);
  return fetchDestination(destinationService.credentials.uri, accessToken, name, options);
}

function getDestinationServiceCredentials(): DestinationServiceCredentials {
  const credentials = getDestinationServiceCredentialsList();
  if (!credentials || credentials.length === 0) {
    throw new Error('No binding to a Destination service instance found. Please bind a destination service instance to your application!');
  }

  return credentials[0];
}

const emptyDestinationByType: DestinationsByType = { instance: [], subaccount: [] };

function subscriberDestinationIsSelected(selectionStrategy: DestinationSelectionStrategy): boolean {
  return selectionStrategy === subscriberFirst || selectionStrategy === alwaysSubscriber;
}

function emptyDestinationsByType(destinationByType: DestinationsByType): boolean {
  return destinationByType.instance.length + destinationByType.instance.length === 0;
}

function throwErrorWhenNull(obj: any, readableName: string) {
  if (!obj) {
    throw new Error(`The ${readableName} is ${obj}.`);
  }
}
