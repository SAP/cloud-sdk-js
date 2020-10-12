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
import { IsolationStrategy } from './cache';
import { addProxyConfigurationOnPrem } from './connectivity-service';
import { sanitizeDestination } from './destination';
import {
  AllDestinations,
  DestinationsByType
} from './destination-accessor-types';
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
    DestinationAccessor.getDestinationFromDestinationService(name, options));

  return destination ?? null;
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
  return (
    (DestinationAccessor.getDestinationFromDestinationService(
      name,
      options
    )) ?? null
  );
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

function emptyDestinationsByType(
  destinationByType: DestinationsByType
): boolean {
  return (
    !destinationByType.instance.length && !destinationByType.subaccount.length
  );
}

class DestinationAccessor {
  public static async getDestinationFromDestinationService(
    name: string,
    options: DestinationOptions & { iss?: string }
  ): Promise<Destination | undefined> {
    const decodedUserJwt = await DestinationAccessor.getDecodedUserJwt(options);
    const providerToken = await DestinationAccessor.getProviderToken(options);
    const da = new DestinationAccessor(
      name,
      options,
      decodedUserJwt,
      providerToken
    );

    return (
      da.trySubscriberCache() ??
      (await da.tryProviderCache()) ??
      (await da.processDestinationResult(await da.tryForOAuth())) ??
      (await da.processDestinationResult(await da.tryForCert())) ??
      (await da.processDestinationResult(await da.tryService())) ??
      undefined
    );
  }

  private static async getDecodedUserJwt(
    options: DestinationOptions & { iss?: string }
  ): Promise<DecodedJWT | undefined> {
    return options.userJwt
      ? verifyJwt(options.userJwt, options)
      : options.iss
      ? { iss: options.iss }
      : undefined;
  }

  private static async getProviderToken(
    options: DestinationOptions
  ): Promise<string> {
    const { userJwt, ...optionsWithoutJwt } = options;
    return serviceToken('destination', optionsWithoutJwt);
  }

  private subscriberDestinationCache: DestinationsByType | undefined;
  private providerDestinationCache: DestinationsByType | undefined;

  private constructor(
    private name: string,
    private options: DestinationOptions,
    private decodedUserJwt: DecodedJWT | undefined,
    private providerToken: string
  ) {
    this.providerDestinationCache = undefined;
    this.subscriberDestinationCache = undefined;
  }

  private get useCache(): boolean {
    return !!this.options.useCache;
  }

  private get selectionStrategy(): DestinationSelectionStrategy {
    return this.options.selectionStrategy
      ? this.options.selectionStrategy
      : subscriberFirst;
  }

  private get isolationStrategy(): IsolationStrategy {
    return this.options.isolationStrategy
      ? this.options.isolationStrategy
      : IsolationStrategy.Tenant;
  }

  private get decodedProviderToken(): DecodedJWT {
    return decodeJwt(this.providerToken);
  }

  private async tryForOAuth(): Promise<Destination | undefined> {
    const destination = await this.tryService();
    if (
      destination &&
      destination.authentication === 'OAuth2SAMLBearerAssertion'
    ) {
      if (destination.systemUser) {
        const destinationService = getService('destination');

        if (!destinationService) {
          throw Error(
            `Failed to fetch destination "${this.name}"! No binding to a destination service found.`
          );
        }
        logger.debug(this.providerToken);
        return fetchDestination(
          destinationService.credentials.uri,
          this.providerToken,
          this.name,
          this.options
        );
      }
      if (!this.options.userJwt) {
        throw Error(
          `No user token (JWT) has been provided! This is strictly necessary for principal propagation. Value of the JWT: ${this.options.userJwt}.`
        );
      }
      return getDestinationWithAuthTokens(
        this.name,
        this.options.userJwt,
        this.options
      );
    }
  }

  private async tryForCert(): Promise<Destination | undefined> {
    const destination = await this.tryService();
    if (
      destination &&
      destination.authentication === 'ClientCertificateAuthentication'
    ) {
      return getDestinationWithCertificates(
        this.name,
        this.decodedUserJwt,
        this.options
      );
    }
  }

  private async addProxyConfiguration(
    destination: Destination | undefined
  ): Promise<Destination | undefined> {
    if (!destination) {
      return;
    }

    switch (proxyStrategy(destination)) {
      case ProxyStrategy.ON_PREMISE_PROXY:
        return addProxyConfigurationOnPrem(destination, this.options.userJwt);
      case ProxyStrategy.INTERNET_PROXY:
        return addProxyConfigurationInternet(destination);
      case ProxyStrategy.NO_PROXY:
        return destination;
      default:
        throw new Error(
          'Illegal argument: No valid proxy configuration found in the destination input to be aded.'
        );
    }
  }

  private async processDestinationResult(
    destination: Destination | undefined
  ): Promise<Destination | undefined> {
    if (!destination) {
      return;
    }

    logger.info('Successfully retrieved destination from destination service.');

    return this.updateCacheSingle(
      await this.addProxyConfiguration(destination)
    );
  }

  private updateCacheService(
    token: DecodedJWT,
    destinations: DestinationsByType
  ) {
    if (this.useCache) {
      destinationCache.cacheRetrievedDestinations(
        token,
        destinations,
        this.isolationStrategy
      );
    }
  }

  private updateCacheSingle(
    destination: Destination | undefined
  ): Destination | undefined {
    if (!this.useCache || !destination) {
      return destination;
    }
    // The information if the destination originates from a instance of account service is not relevant for the caching.
    destinationCache.cacheRetrievedDestinations(
      this.decodedUserJwt || this.decodedProviderToken,
      { instance: [], subaccount: [destination] },
      this.isolationStrategy
    );
    return destination;
  }

  private async tryService(): Promise<Destination | undefined> {
    const allDest: AllDestinations = {
      provider: await this.getProviderDestinations(),
      subscriber: await this.getSubscriberDestination()
    };
    const selectedFromService = await this.selectionStrategy(
      allDest,
      this.name
    );

    if (!selectedFromService) {
      logger.info('Could not retrieve destination from destination service.');
    }
    return selectedFromService ?? undefined;
  }

  private async destinationFoundFromSubscriber(): Promise<boolean> {
    const subscriber = await this.getSubscriberDestination();
    if (
      this.selectionStrategy(
        {
          provider: emptyDestinationByType,
          subscriber
        },
        this.name
      )
    ) {
      return true;
    }
    return false;
  }

  private async getProviderDestinations(): Promise<DestinationsByType> {
    if (!(await this.isProviderNeeded())) {
      return emptyDestinationByType;
    }

    if (!this.providerDestinationCache) {
      const destinationServiceCreds = getDestinationServiceCredentials();

      this.providerDestinationCache = await getInstanceAndSubaccountDestinations(
        destinationServiceCreds.uri,
        this.providerToken,
        this.options
      );
      this.updateCacheService(
        this.decodedProviderToken,
        this.providerDestinationCache
      );
    }

    return this.providerDestinationCache;
  }

  private async getSubscriberDestination() {
    if (!this.isSubscriberNeeded()) {
      return emptyDestinationByType;
    }

    if (!this.subscriberDestinationCache) {
      const destinationServiceCreds = getDestinationServiceCredentials();

      const accessToken = await serviceToken('destination', {
        userJwt: this.decodedUserJwt,
        ...this.options
      });
      this.subscriberDestinationCache = await getInstanceAndSubaccountDestinations(
        destinationServiceCreds.uri,
        accessToken,
        this.options
      );
      this.updateCacheService(
        this.decodedUserJwt!,
        this.subscriberDestinationCache
      );
    }

    return this.subscriberDestinationCache;
  }

  private trySubscriberCache(): Destination | undefined {
    if (this.useCache && this.isSubscriberNeeded()) {
      const subscriberDestinationCache = destinationCache.retrieveDestinationFromCache(
        this.decodedUserJwt!,
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
  private isSubscriberNeeded(): boolean {
    if (!this.decodedUserJwt) {
      return false;
    }
    if (this.selectionStrategy === alwaysProvider) {
      return false;
    }
    if (isIdenticalTenant(this.decodedUserJwt, this.decodedProviderToken)) {
      return false;
    }

    return true;
  }

  private async isProviderNeeded(): Promise<boolean> {
    if (this.selectionStrategy === alwaysSubscriber) {
      return false;
    }
    if (this.selectionStrategy === alwaysProvider) {
      return true;
    }
    if (
      this.decodedUserJwt &&
      isIdenticalTenant(this.decodedUserJwt, this.decodedProviderToken)
    ) {
      return true;
    }
    // We are in selection strategy subscriberFirst here. So if we get something from subscriber ignore provider.
    if (await this.destinationFoundFromSubscriber()) {
      return false;
    }
    return true;
  }

  private async tryProviderCache(): Promise<Destination | undefined> {
    if (this.useCache) {
      const providerDestinationCache = destinationCache.retrieveDestinationFromCache(
        this.decodedProviderToken,
        this.name,
        this.isolationStrategy
      );
      if (!providerDestinationCache) {
        return;
      }

      if (await this.isProviderNeeded()) {
        logger.info(
          'Successfully retrieved destination from destination service cache for provider destinations.'
        );
        return providerDestinationCache;
      }
    }
  }
}
