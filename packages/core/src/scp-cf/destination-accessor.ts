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
import { DestinationsByType } from './destination-accessor-types';
import { destinationCache } from './destination-cache';
import {
  alwaysProvider,
  alwaysSubscriber,
  DestinationSelectionStrategies,
  DestinationSelectionStrategy
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

  /**
   * @hidden
   */
  iss?: string;
  // FIXME This is used to put a subscriber domain in without having a JWT like for background processes.
  // We will create a seperate method for this on the destination accessor wit proper JS doc. This will be deprecated.
}

export type DestinationOptions = DestinationAccessorOptions &
  DestinationRetrievalOptions &
  VerifyJwtOptions;

type accountType = 'subscriber' | 'provider';

interface DestinationSearchResult {
  destination: Destination;
  fromCache: boolean;
  account: accountType;
}

const emptyDestinationByType: DestinationsByType = {
  instance: [],
  subaccount: []
};

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
  return DestinationAccessor.getDestination(name, options);
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
  return DestinationAccessor.getDestinationFromDestinationService(
    name,
    options
  );
}

class DestinationAccessor {
  public static async getDestination(
    name: string,
    options: DestinationOptions = {}
  ): Promise<Destination | null> {
    return (
      DestinationAccessor.searchEnvVariablesForDestination(name) ??
      DestinationAccessor.searchServiceBindingForDestination(name) ??
      DestinationAccessor.getDestinationFromDestinationService(name, options)
    );
  }

  public static async getDestinationFromDestinationService(
    name: string,
    options: DestinationOptions
  ): Promise<Destination | null> {
    const decodedUserJwt = await DestinationAccessor.getDecodedUserJwt(options);
    const providerToken = await DestinationAccessor.getProviderToken(options);
    const da = new DestinationAccessor(
      name,
      options,
      decodedUserJwt,
      providerToken
    );
    const destinationResult =
      (await da.searchSubscriberAccountForDestination()) ??
      (await da.searchProviderAccountForDestination());

    if (destinationResult?.fromCache) {
      return destinationResult.destination;
    }

    if (destinationResult) {
      logger.info(
        'Successfully retrieved destination from destination service.'
      );
    } else {
      logger.info('Could not retrieve destination from destination service.');
      return null;
    }

    let { destination } = destinationResult;
    if (destination.authentication === 'OAuth2SAMLBearerAssertion') {
      destination = await da.addOAuthSamlAuth(destination);
    }
    if (destination.authentication === 'ClientCertificateAuthentication') {
      destination = await da.addClientCertAuth();
    }

    const withProxySetting = await da.addProxyConfiguration(destination);
    await da.updateDestinationCache(
      withProxySetting,
      destinationResult.account
    );
    return withProxySetting;
  }

  private static searchServiceBindingForDestination(
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
    }
  }

  private static searchEnvVariablesForDestination(
    name: string
  ): Destination | undefined {
    logger.info(
      'Attempting to retrieve destination from environment variable.'
    );

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

    logger.info('No environment variable set.');
  }

  private static async getDecodedUserJwt(
    options: DestinationOptions
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

  readonly decodedProviderToken: DecodedJWT;
  readonly isolationStrategy: IsolationStrategy;
  readonly selectionStrategy: DestinationSelectionStrategy;
  readonly useCache: boolean;
  private options: DestinationOptions;

  private constructor(
    readonly name: string,
    options: DestinationOptions,
    readonly decodedUserJwt: DecodedJWT | undefined,
    readonly providerToken: string
  ) {
    this.options = { ...options };
    this.decodedProviderToken = decodeJwt(providerToken);

    this.isolationStrategy =
      options.isolationStrategy ?? IsolationStrategy.Tenant;
    this.options.isolationStrategy = this.isolationStrategy;

    this.selectionStrategy =
      options.selectionStrategy ??
      DestinationSelectionStrategies.subscriberFirst;
    this.options.selectionStrategy = this.selectionStrategy;

    this.useCache = options.useCache ?? false;
    this.options.useCache = this.useCache;
  }

  private async getInstanceAndSubaccountDestinations(
    accessToken: string
  ): Promise<DestinationsByType> {
    const destinations = await Promise.all([
      fetchInstanceDestinations(
        this.destionationServiceCredentials.uri,
        accessToken,
        this.options
      ),
      fetchSubaccountDestinations(
        this.destionationServiceCredentials.uri,
        accessToken,
        this.options
      )
    ]);

    return {
      instance: destinations[0],
      subaccount: destinations[1]
    };
  }

  private get destionationServiceCredentials() {
    const credentials = getDestinationServiceCredentialsList();
    if (!credentials || credentials.length === 0) {
      throw Error(
        'No binding to a Destination service instance found. Please bind a destination service instance to your application!'
      );
    }

    return credentials[0];
  }

  private async addOAuthSamlAuth(
    destination: Destination
  ): Promise<Destination> {
    const destinationService = getService('destination');

    if (!destinationService) {
      throw Error(
        `Failed to fetch destination "${this.name}"! No binding to a destination service found.`
      );
    }

    if (destination.systemUser) {
      logger.debug(
        `System user found on destination. The provider token: ${this.providerToken} is used for destination fetching`
      );
      return fetchDestination(
        destinationService.credentials.uri,
        this.providerToken,
        this.name,
        this.options
      );
    }

    if (!this.options.userJwt) {
      throw Error(
        'No user token (JWT) has been provided! This is strictly necessary for principal propagation.'
      );
    }
    const accessToken = await userApprovedServiceToken(
      this.options.userJwt,
      destinationService,
      this.options
    );
    return fetchDestination(
      destinationService.credentials.uri,
      accessToken,
      this.name,
      this.options
    );
  }

  private async addClientCertAuth(): Promise<Destination> {
    const accessToken = await serviceToken('destination', {
      userJwt: this.decodedUserJwt,
      ...this.options
    });

    return fetchDestination(
      this.destionationServiceCredentials.uri,
      accessToken,
      this.name,
      this.options
    );
  }

  private async addProxyConfiguration(
    destination: Destination
  ): Promise<Destination> {
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

  private async updateDestinationCache(
    destination: Destination,
    account: accountType
  ) {
    if (!this.useCache) {
      return destination;
    }
    destinationCache.cacheRetrievedDestination(
      account === 'subscriber'
        ? this.decodedUserJwt!
        : this.decodedProviderToken,
      destination,
      this.isolationStrategy
    );
  }

  private async getProviderDestinationService(): Promise<
    DestinationSearchResult | undefined
  > {
    const destination = await this.selectionStrategy(
      {
        subscriber: emptyDestinationByType,
        provider: await this.getInstanceAndSubaccountDestinations(
          this.providerToken
        )
      },
      this.name
    );
    if (destination) {
      return {
        destination,
        fromCache: false,
        account: 'provider'
      };
    }
  }

  private getProviderDestinationCache(): DestinationSearchResult | undefined {
    const destination = destinationCache.retrieveDestinationFromCache(
      this.decodedProviderToken,
      this.name,
      this.isolationStrategy
    );

    if (destination) {
      logger.info(
        'Successfully retrieved destination from destination service cache for provider destinations.'
      );
      return { destination, fromCache: true, account: 'provider' };
    }
  }

  private async getSubscriberDestinationService(): Promise<
    DestinationSearchResult | undefined
  > {
    const accessToken = await serviceToken('destination', {
      userJwt: this.decodedUserJwt,
      ...this.options
    });
    const destination = this.selectionStrategy(
      {
        subscriber: await this.getInstanceAndSubaccountDestinations(
          accessToken
        ),
        provider: emptyDestinationByType
      },
      this.name
    );

    if (destination) {
      return { destination, fromCache: false, account: 'subscriber' };
    }
  }

  private getSubscriberDestinationCache(): DestinationSearchResult | undefined {
    const destination = destinationCache.retrieveDestinationFromCache(
      this.decodedUserJwt!,
      this.name,
      this.isolationStrategy
    );

    if (destination) {
      logger.info(
        'Successfully retrieved destination from destination service cache for subscriber destinations.'
      );
      return { destination, fromCache: true, account: 'subscriber' };
    }
  }

  private isProviderAndSubscriberSameTenant() {
    return (
      this.decodedUserJwt &&
      isIdenticalTenant(this.decodedUserJwt, this.decodedProviderToken)
    );
  }

  private isProviderNeeded(): boolean {
    if (this.selectionStrategy === alwaysSubscriber) {
      return false;
    }

    return true;
  }

  private isSubscriberNeeded(
    decodedUserJwt: DecodedJWT | undefined
  ): decodedUserJwt is DecodedJWT {
    if (!this.decodedUserJwt) {
      return false;
    }

    if (this.selectionStrategy === alwaysProvider) {
      return false;
    }

    if (this.isProviderAndSubscriberSameTenant()) {
      return false;
    }

    return true;
  }

  private async searchProviderAccountForDestination(): Promise<
    DestinationSearchResult | undefined
  > {
    if (!this.isProviderNeeded()) {
      return;
    }

    if (this.useCache) {
      return (
        this.getProviderDestinationCache() ??
        this.getProviderDestinationService()
      );
    }

    return this.getProviderDestinationService();
  }

  private async searchSubscriberAccountForDestination(): Promise<
    DestinationSearchResult | undefined
  > {
    if (!this.isSubscriberNeeded(this.decodedUserJwt)) {
      return;
    }

    if (this.useCache) {
      return (
        this.getSubscriberDestinationCache() ??
        this.getSubscriberDestinationService()
      );
    }

    return this.getSubscriberDestinationService();
  }
}
