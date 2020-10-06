import { createLogger } from '@sap-cloud-sdk/util';
import {
  DecodedJWT,
  decodeJwt,
  isIdenticalTenant,
  verifyJwt,
  VerifyJwtOptions
} from '../util/jwt';
import {
  addProxyConfigurationInternet,
  ProxyStrategy,
  proxyStrategy
} from '../util/proxy-util';
import { Cache, IsolationStrategy } from './cache';
import { addProxyConfigurationOnPrem } from './connectivity-service';
import { sanitizeDestination } from './destination';
import { DestinationsByType } from './destination-accessor-types';
import { destinationCache } from './destination-cache';
import {
  alwaysProvider,
  alwaysSubscriber,
  DestinationSelectionStrategy,
  subscriberFirst
} from './destination-selection-strategies';
import {
  fetchDestination,
  fetchInstanceDestinations,
  fetchSubaccountDestinations
} from './destination-service';
import {
  Destination,
  DestinationNameAndJwt,
  DestinationRetrievalOptions,
  isDestinationNameAndJwt
} from './destination-service-types';
import {
  getDestinationFromEnvByName,
  getDestinationsEnvVariable
} from './env-destination-accessor';
import {
  getDestinationServiceCredentialsList,
  getService
} from './environment-accessor';
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
 * @param destination - A destination or the necessary parameters to fetch one.
 * @param options - Caching options by fetching destination.
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

export type DestinationOptions = DestinationAccessorOptions &
  DestinationRetrievalOptions &
  VerifyJwtOptions;

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
 * @param name - The name of the destination to be retrieved.
 * @param options - The options of the fetching query of the destination that include the JWT of the current request and the strategy for selecting a destination.
 * @returns A promise returning the requested destination on success.
 */
export async function getDestinationOptions(
  name: string,
  options: DestinationOptions = {}
): Promise<Destination | null> {
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
 * @param name - The name of the destination to be retrieved.
 * @param options - Configuration for how to retrieve destinations from the destination service.
 * @returns A promise returning the requested destination on success.
 */
export async function getDestination(
  name: string,
  options: DestinationOptions = {}
): Promise<Destination | null> {
  const destination = await (tryDestinationFromEnv(name) ||
    tryDestinationForServiceBinding(name) ||
    getDestinationFromDestinationService(name, options));

  return destination;
}


class DestinationAccessor{
  // private decodedProviderJwt:DecodedJWT
  // private providerToken:string

  // private isolationStrategy: IsolationStrategy
  // private selectionStrategy:DestinationSelectionStrategy
pri

  get useCache():boolean {
    return this.options.useCache||false
  }

  get selectionStrategy():DestinationSelectionStrategy {
    return  this.options.selectionStrategy
      ? this.options.selectionStrategy
      : subscriberFirst;
  }

  get isolationStrategy():IsolationStrategy {
    return this.options.isolationStrategy
      ? this.options.isolationStrategy
      : IsolationStrategy.Tenant;
  }

  //see how often called caching???
  async getProviderToken():Promise<string> {
      const { userJwt, ...optionsWithoutJwt } = this.options;
      return serviceToken('destination', optionsWithoutJwt);
  }

  static async getDecodedUserJwt(options: DestinationOptions & { iss?: string }):Promise<DecodedJWT|undefined>{
  return options.userJwt
    ? await verifyJwt(options.userJwt, options)
    : options.iss
      ? { iss: options.iss }
      : undefined;
  }


  private constructor( private name:string,
  private options:DestinationOptions,
                       private decodedUserJwt:DecodedJWT|undefined) {

  }

  async getDestinationFromDestinationService(name:string,options: DestinationOptions & { iss?: string } ):Promise<Destination>{
    let cached = this.trySubscriberCache()
    if(cached){
      return cached
    }
    const subscriberDestination = await this.getSubscriberDestination();
    cached = this.tryProviderCahce(subscriberDestination)



  }


  private async getProviderDestinations():Promise<DestinationsByType>{
    if(this.selectionStrategy===alwaysSubscriber){
      return emptyDestinationByType;
    }

    const providerToken = await this.getProviderToken();
    const decodedProviderToken = decodeJwt(providerToken);
    if(this.useCache){
      const cached = destinationCache.retrieveDestinationFromCache(decodedProviderToken,this.name,this.isolationStrategy)
      if(cached) {
        return { subaccount: [cached], instance: [] }
      }
    }

      const providerDestinations = await getAllProviderDestinations(providerToken, this.options)
      if (this.useCache && providerDestinations ) {
       destinationCache.cacheRetrievedDestinations(
        decodedProviderToken,
        providerDestinations,
        this.isolationStrategy
      );
    }

   return providerDestinations
  }

  private async getSubscriberDestination(){
    if(!this.decodedUserJwt){
      return emptyDestinationByType
    }
    const providerToken = await this.getProviderToken();
    const decodedProviderToken = decodeJwt(providerToken);

    const shouldExecuteSubscriberCalls =
      !isIdenticalTenant(this.decodedUserJwt, decodedProviderToken) &&
      this.selectionStrategy !== alwaysProvider;

    if(!shouldExecuteSubscriberCalls){
      return emptyDestinationByType
    }

    if(this.useCache){
      const cached = destinationCache.retrieveDestinationFromCache(this.decodedUserJwt,this.name,this.isolationStrategy)
      if(cached) {
        return { subaccount: [cached], instance: [] }
      }
    }

  const subscriberDestinations =  await getAllSubscriberDestinations(this.decodedUserJwt!, this.options)
    if (this.useCache && subscriberDestinations ) {
      destinationCache.cacheRetrievedDestinations(
        decodedProviderToken,
        subscriberDestinations,
        this.isolationStrategy
      );
    }
    return subscriberDestinations;
  }

  private trySubscriberCache():Destination|undefined{
    if (
      this.useCache &&
      this.decodedUserJwt &&
      subscriberDestinationIsSelected(this.selectionStrategy)
    ) {
      const subscriberDestinationCache = destinationCache.retrieveDestinationFromCache(
        this.decodedUserJwt,
        this.name,
        this.isolationStrategy
      );
      if (subscriberDestinationCache) {
        logger.info(
          'Successfully retrieved destination from destination service cache for subscriber destinations.'
        );
        return subscriberDestinationCache;
      }
    }
  }

  private tryProviderCahce(subscriberDestinations:DestinationsByType):Destination|undefined{
    if (this.useCache) {
      const providerDestinationCache = destinationCache.retrieveDestinationFromCache(
        this.decodedProviderJwt,
        this.name,
        this.isolationStrategy
      );    this.selectionStrategy !== alwaysSubscriber
      if (providerDestinationCache){

        const providerRequested = this.selectionStrategy === alwaysProvider ||
          (this.decodedUserJwt &&
            isIdenticalTenant(this.decodedUserJwt, this.decodedProviderJwt))
        const providerIsFallback =  emptyDestinationsByType(subscriberDestinations) && this.selectionStrategy!==alwaysSubscriber
        if(providerRequested || providerIsFallback){
          logger.info(
            'Successfully retrieved destination from destination service cache for provider destinations.'
          );
          return providerDestinationCache;
        }
  }}}

}
/**
 * Retrieves a destination with the given name from the Cloud Foundry destination service.
 * Returns null if no destination can be found.
 * Requires the following service bindings: destination, XSUAA
 * By default, selects subscriber over provider and instance over subaccount destinations.
 *
 * If the destinations are read from the environment, the jwt will be ignored.
 *
 * @param name - The name of the destination to be retrieved.
 * @param options - Configuration for how to retrieve destinations from the destination service.
 * @returns A promise returning the requested destination on success.
 */
export async function getDestinationFromDestinationService(
  name: string,
  options: DestinationOptions & { iss?: string }
): Promise<Destination | null> {

  /**Things to consider:

   destinationCache global const

   iss in options=>leads to JWT
   decodedUserJwt (default undefined)
   isolationStrategy (default Tenant)
   selectionStrategy (default subscriberFirst) related subscriberDestinationIsSelected

   providerToken = await serviceToken('destination', optionsWithoutJwt) related decodedProviderJwt
   providerDestinationCache fallback value case 3 set in case2

   shouldExecuteSubscriberCalls true if subscriber needs exectution (decodedUserJwt,decodedProviderJwt,selectionStrategy)
   subscriberDestinations filled if shouldExecuteSubscriberCalls (actual call)
   providerDestinations filled if selectionStra !== alwaysSubscriber (actual call_)

   destination = apply selection to provider&subscriber

   Flow:

   case1: cache && userJwt && subscriber selection
   =>return cache value if there

   case2:cache && alwaysProvider || userJwtTenant==providerJwtTennat
   =>return cache value if there (providerDestinationCache)

   get subscriberDestinationsServiceInfo

   case3:empty(subscriberDestinations) && providerDestinationCache && selectionStrategy provider
   =>return providerDestinationCache

   get providerDestinations
   update caches provider + destination

   case4:destination
   =>return after enrichment

   Enrich destinations:
   - OAuth2SAMLBearerAssertion
   - ClientCertificateAuthentication
   - Proxy Setting

   Good for optimizing after case 1+2"
   const shouldExecuteSubscriberCalls = longer (decodedUserJwt,decodedProviderJwt,selectionStrategy) else emptyDestinationByType
   const shouldExecuteProviderCalls = !== alwaysSubscriber else emptyDestinationByType


  **/


  logger.info('Attempting to retrieve destination from destination service.');
  const decodedUserJwt = options.userJwt
    ? await verifyJwt(options.userJwt, options)
    : options.iss
    ? { iss: options.iss }
    : undefined;
  const isolation = options.isolationStrategy
    ? options.isolationStrategy
    : IsolationStrategy.Tenant;
  const selectionStrategy = options.selectionStrategy
    ? options.selectionStrategy
    : subscriberFirst;
  let providerDestinationCache;

  // if (
  //   options.useCache &&
  //   options.userJwt &&
  //   subscriberDestinationIsSelected(selectionStrategy)
  // ) {
  //   const subscriberDestinationCache = destinationCache.retrieveDestinationFromCache(
  //     decodedUserJwt!,
  //     name,
  //     isolation
  //   );
  //   if (subscriberDestinationCache) {
  //     logger.info(
  //       'Successfully retrieved destination from destination service cache for subscriber destinations.'
  //     );
  //     return subscriberDestinationCache;
  //   }
  // }

  const { userJwt, ...optionsWithoutJwt } = options;
  const providerToken = await serviceToken('destination', optionsWithoutJwt);
  const decodedProviderJwt = await decodeJwt(providerToken);

  // if (options.useCache) {
  //   providerDestinationCache = destinationCache.retrieveDestinationFromCache(
  //     decodedProviderJwt,
  //     name,
  //     isolation
  //   );
  //   if (
  //     providerDestinationCache &&
  //     (selectionStrategy === alwaysProvider ||
  //       (decodedUserJwt &&
  //         isIdenticalTenant(decodedUserJwt!, decodedProviderJwt)))
  //   ) {
  //     logger.info(
  //       'Successfully retrieved destination from destination service cache for provider destinations.'
  //     );
  //     return providerDestinationCache;
  //   }
  // }

  const shouldExecuteSubscriberCalls =
    decodedUserJwt &&
    !isIdenticalTenant(decodedUserJwt!, decodedProviderJwt) &&
    selectionStrategy !== alwaysProvider;

  const subscriberDestinations = shouldExecuteSubscriberCalls
    ? await getAllSubscriberDestinations(decodedUserJwt!, options)
    : emptyDestinationByType;

  // if (
  //   emptyDestinationsByType(subscriberDestinations) &&
  //   providerDestinationCache &&
  //   selectionStrategy !== alwaysSubscriber
  // ) {
  //   logger.info(
  //     'Successfully retrieved destination from destination service cache for provider destinations.'
  //   );
  //   return providerDestinationCache;
  // }

  const providerDestinations =
    selectionStrategy !== alwaysSubscriber
      ? await getAllProviderDestinations(providerToken, options)
      : emptyDestinationByType;

  if (options.useCache) {
    if (options.userJwt) {
      destinationCache.cacheRetrievedDestinations(
        decodedUserJwt!,
        subscriberDestinations,
        isolation
      );
    }
    destinationCache.cacheRetrievedDestinations(
      decodedProviderJwt,
      providerDestinations,
      isolation
    );
  }

  const allDestinations = {
    subscriber: subscriberDestinations,
    provider: providerDestinations
  };

  let destination: Destination | null = selectionStrategy(
    allDestinations,
    name
  );

  if (destination) {
    if (destination.authentication === 'OAuth2SAMLBearerAssertion') {
      if (destination.systemUser) {
        const destinationService = getService('destination');

        if (!destinationService) {
          throw Error(
            `Failed to fetch destination "${name}"! No binding to a destination service found.`
          );
        }
        logger.debug(providerToken);
        destination = await fetchDestination(
          destinationService.credentials.uri,
          providerToken,
          name,
          options
        );
      } else {
        if (!options.userJwt) {
          throw Error(
            `No user token (JWT) has been provided! This is strictly necessary for principal propagation. Value of the JWT: ${options.userJwt}.`
          );
        }
        destination = await getDestinationWithAuthTokens(
          name,
          options.userJwt,
          options
        );
      }
    } else if (
      destination.authentication === 'ClientCertificateAuthentication'
    ) {
      destination = await getDestinationWithCertificates(
        name,
        decodedUserJwt,
        options
      );
    }

    if (destination) {
      logger.info(
        'Successfully retrieved destination from destination service.'
      );
      if (proxyStrategy(destination) === ProxyStrategy.ON_PREMISE_PROXY) {
        destination = await addProxyConfigurationOnPrem(
          destination,
          options.userJwt
        );
      }
      if (proxyStrategy(destination) === ProxyStrategy.INTERNET_PROXY) {
        destination = addProxyConfigurationInternet(destination);
      }
    } else {
      logger.info('Could not retrieve destination from destination service.');
    }

    destinationCache.cacheRetrievedDestinations(
      decodedUserJwt || decodedProviderJwt,
      { instance: [], subaccount: [destination] },
      options.isolationStrategy || IsolationStrategy.Tenant
    );
  }

  return destination;
}

function tryDestinationForServiceBinding(
  name: string
): Destination | undefined {
  logger.info('Attempting to retrieve destination from service binding.');
  try {
    const destination = destinationForServiceBinding(name);
    logger.info('Successfully retrieved destination from service binding.');
    return destination;
  } catch (error) {
    logger.info(error.message);
    logger.info('Could not retrieve destination from service binding.');
    logger.info(
      'If you are not using SAP Extension Factory, this information probably does not concern you.'
    );
    return undefined;
  }
}

function tryDestinationFromEnv(name: string): Destination | undefined {
  logger.info('Attempting to retrieve destination from environment variable.');

  if (getDestinationsEnvVariable()) {
    logger.warn(
      "Environment variable 'destinations' is set. Destinations will be read from this variable. " +
        'This is discouraged for a productive application! ' +
        'Unset the variable to read destinations from the destination service on SAP Cloud Platform.'
    );

    try {
      const destination = getDestinationFromEnvByName(name);
      if (destination) {
        logger.info(
          'Successfully retrieved destination from environment variable.'
        );
        return destination;
      }
    } catch (error) {
      logger.info(error.message);
    }
  }

  logger.info('Could not retrieve destination from environment variable.');
}

/**
 * This function will fetch a destination of a subscriber given a destination name and the subscriber JWT.
 *
 * @param userJwt - The (encoded) JWT of the current request.
 * @param options - Destination retrieval options.
 * @returns A promise, that (if it resolves) contains the subscriber destinations, grouped by type (instance, subaccount).
 */
async function getAllSubscriberDestinations(
  userJwt: DecodedJWT,
  options: DestinationRetrievalOptions
): Promise<DestinationsByType> {
  const destinationServiceCreds = getDestinationServiceCredentials();

  const accessToken = await serviceToken('destination', {
    userJwt,
    ...options
  });
  return getInstanceAndSubaccountDestinations(
    destinationServiceCreds.uri,
    accessToken,
    options
  );
}

async function getAllProviderDestinations(
  providerJwt: string,
  options: DestinationRetrievalOptions
): Promise<DestinationsByType> {
  const destinationServiceCreds = getDestinationServiceCredentials();

  return getInstanceAndSubaccountDestinations(
    destinationServiceCreds.uri,
    providerJwt,
    options
  );
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
  const accessToken = await serviceToken('destination', {
    userJwt,
    ...options
  });

  return fetchDestination(
    destinationServiceCreds.uri,
    accessToken,
    name,
    options
  );
}

async function getDestinationWithAuthTokens(
  name: string,
  userJwt: string,
  options?: DestinationRetrievalOptions
): Promise<Destination> {
  const destinationService = getService('destination');

  if (!destinationService) {
    throw Error(
      `Failed to fetch destination "${name}"! No binding to a destination service found.`
    );
  }

  const accessToken = await userApprovedServiceToken(
    userJwt,
    destinationService,
    options
  );
  return fetchDestination(
    destinationService.credentials.uri,
    accessToken,
    name,
    options
  );
}

function getDestinationServiceCredentials(): DestinationServiceCredentials {
  const credentials = getDestinationServiceCredentialsList();
  if (!credentials || credentials.length === 0) {
    throw Error(
      'No binding to a Destination service instance found. Please bind a destination service instance to your application!'
    );
  }

  return credentials[0];
}

const emptyDestinationByType: DestinationsByType = {
  instance: [],
  subaccount: []
};

function subscriberDestinationIsSelected(
  selectionStrategy: DestinationSelectionStrategy
): boolean {
  return (
    selectionStrategy === subscriberFirst ||
    selectionStrategy === alwaysSubscriber
  );
}

function emptyDestinationsByType(
  destinationByType: DestinationsByType
): boolean {
  return (
    !destinationByType.instance.length && !destinationByType.instance.length
  );
}
