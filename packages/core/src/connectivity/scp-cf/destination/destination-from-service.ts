import { createLogger } from '@sap-cloud-sdk/util';
import { DecodedJWT, decodeJwt, isIdenticalTenant, verifyJwt } from '../jwt';
import {
  addProxyConfigurationInternet,
  ProxyStrategy,
  proxyStrategy
} from '../proxy-util';
import { IsolationStrategy } from '../cache';
import { serviceToken, userApprovedServiceToken } from '../token-accessor';
import { addProxyConfigurationOnPrem } from '../connectivity-service';
import {
  getDestinationServiceCredentialsList,
  getService
} from '../environment-accessor';
import type { DestinationOptions } from './destination-accessor';
import { Destination } from './destination-service-types';
import {
  alwaysProvider,
  alwaysSubscriber,
  subscriberFirst
} from './destination-selection-strategies';
import { DestinationsByType } from './destination-accessor-types';
import {
  fetchDestination,
  fetchInstanceDestinations,
  fetchSubaccountDestinations
} from './destination-service';
import { destinationCache } from './destination-cache';

type DestinationOrigin = 'subscriber' | 'provider';

const logger = createLogger({
  package: 'core',
  messageContext: 'destination-accessor-service'
});

interface DestinationSearchResult {
  destination: Destination;
  fromCache: boolean;
  origin: DestinationOrigin;
}

const emptyDestinationByType: DestinationsByType = {
  instance: [],
  subaccount: []
};

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
  options: DestinationOptions
): Promise<Destination | null> {
  return DestinationFromServiceRetriever.getDestinationFromDestinationService(
    name,
    options
  );
}

class DestinationFromServiceRetriever {
  public static async getDestinationFromDestinationService(
    name: string,
    options: DestinationOptions
  ): Promise<Destination | null> {
    const decodedUserJwt = await DestinationFromServiceRetriever.getDecodedUserJwt(
      options
    );
    const providerToken = await DestinationFromServiceRetriever.getProviderClientCredentialsToken(
      options
    );
    const da = new DestinationFromServiceRetriever(
      name,
      options,
      decodedUserJwt,
      providerToken
    );

    const destinationResult = await da.searchDestinationWithSelectionStrategyAndCache();
    if (!destinationResult) {
      return null;
    }

    if (destinationResult.fromCache) {
      return destinationResult.destination;
    }

    let { destination } = destinationResult;
    if (destination.authentication === 'OAuth2SAMLBearerAssertion') {
      destination = await da.addOAuthSamlAuth(
        destination,
        destinationResult.origin
      );
    }
    if (destination.authentication === 'ClientCertificateAuthentication') {
      destination = await da.addClientCertAuth();
    }

    const withProxySetting = await da.addProxyConfiguration(destination);
    da.updateDestinationCache(withProxySetting, destinationResult.origin);
    return withProxySetting;
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

  private static async getProviderClientCredentialsToken(
    options: DestinationOptions
  ): Promise<string> {
    const { userJwt, ...optionsWithoutJwt } = options;
    return serviceToken('destination', optionsWithoutJwt);
  }

  private static async getSubscriberClientCredentialsToken(
    options: DestinationOptions
  ): Promise<string> {
    if (!options.userJwt) {
      throw new Error(
        'User JWT is needed to obtain a client credentials token for the subscriber account.'
      );
    }
    return serviceToken('destination', options);
  }

  readonly decodedProviderClientCredentialsToken: DecodedJWT;
  private options: DestinationOptions;

  private constructor(
    readonly name: string,
    options: DestinationOptions,
    readonly decodedUserJwt: DecodedJWT | undefined,
    readonly providerClientCredentialsToken: string
  ) {
    this.options = { ...options };
    this.decodedProviderClientCredentialsToken = decodeJwt(
      providerClientCredentialsToken
    );

    this.options.isolationStrategy =
      options.isolationStrategy || IsolationStrategy.Tenant;
    this.options.selectionStrategy =
      options.selectionStrategy || subscriberFirst;
    this.options.useCache = options.useCache || false;
  }

  private async searchDestinationWithSelectionStrategyAndCache(): Promise<
    DestinationSearchResult | undefined
  > {
    let destinationSearchResult;
    if (this.isSubscriberNeeded()) {
      destinationSearchResult = await this.searchSubscriberAccountForDestination();
    }

    if (this.isProviderNeeded(destinationSearchResult)) {
      destinationSearchResult = await this.searchProviderAccountForDestination();
    }
    if (destinationSearchResult && !destinationSearchResult.fromCache) {
      logger.info(
        'Successfully retrieved destination from destination service.'
      );
    }
    if (destinationSearchResult && destinationSearchResult.fromCache) {
      logger.info(
        `Successfully retrieved destination from destination service cache for ${destinationSearchResult.origin} destinations.`
      );
    }
    if (!destinationSearchResult) {
      logger.info('Could not retrieve destination from destination service.');
    }

    return destinationSearchResult;
  }

  private async getInstanceAndSubaccountDestinations(
    accessToken: string
  ): Promise<DestinationsByType> {
    const [instance, subaccount] = await Promise.all([
      fetchInstanceDestinations(
        this.destinationServiceCredentials.uri,
        accessToken,
        this.options
      ),
      fetchSubaccountDestinations(
        this.destinationServiceCredentials.uri,
        accessToken,
        this.options
      )
    ]);

    return {
      instance,
      subaccount
    };
  }

  private get destinationServiceCredentials() {
    const credentials = getDestinationServiceCredentialsList();
    if (!credentials || credentials.length === 0) {
      throw Error(
        'No binding to a Destination service instance found. Please bind a destination service instance to your application!'
      );
    }

    return credentials[0];
  }

  private async addOAuthSamlAuth(
    destination: Destination,
    destinationOrigin: DestinationOrigin
  ): Promise<Destination> {
    const destinationService = getService('destination');

    if (!destinationService) {
      throw Error(
        `Failed to fetch destination "${this.name}"! No binding to a destination service found.`
      );
    }
    /* This covers the two technical user propagation cases https://help.sap.com/viewer/cca91383641e40ffbe03bdc78f00f681/Cloud/en-US/3cb7b81115c44cf594e0e3631291af94.html
    If the destination comes from the provider account the client credentials token from the xsuaa.url is used (provider token).
    If the destination comes from the subscriber account the subscriber subdomain is used fetch the client credentials token (subscriber token).
    */
    if (destination.systemUser) {
      const token =
        destinationOrigin === 'provider'
          ? this.providerClientCredentialsToken
          : await DestinationFromServiceRetriever.getSubscriberClientCredentialsToken(
              this.options
            );
      logger.debug(
        `System user found on destination. The ${destinationOrigin} token: ${token} is used for destination fetching`
      );

      if (destinationOrigin) {
        return fetchDestination(
          destinationService.credentials.uri,
          token,
          this.name,
          this.options
        );
      }
    }
    /* This covers the two business user propagation cases https://help.sap.com/viewer/cca91383641e40ffbe03bdc78f00f681/Cloud/en-US/3cb7b81115c44cf594e0e3631291af94.html
     The two cases are JWT issued from provider or JWT from subscriber - the two cases are handled automatically.
     In the provider case the subdomain replacement in the xsuaa.url with the iss value does nothing but this does not hurt. */
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
      this.destinationServiceCredentials.uri,
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

  private updateDestinationCache(
    destination: Destination,
    destinationOrigin: DestinationOrigin
  ) {
    if (!this.options.useCache) {
      return destination;
    }
    destinationCache.cacheRetrievedDestination(
      destinationOrigin === 'subscriber'
        ? this.decodedUserJwt!
        : this.decodedProviderClientCredentialsToken,
      destination,
      this.options.isolationStrategy!
    );
  }

  private async getProviderDestinationService(): Promise<
    DestinationSearchResult | undefined
  > {
    const provider = await this.getInstanceAndSubaccountDestinations(
      this.providerClientCredentialsToken
    );
    const destination = await this.options.selectionStrategy!(
      {
        subscriber: emptyDestinationByType,
        provider
      },
      this.name
    );
    if (destination) {
      return {
        destination,
        fromCache: false,
        origin: 'provider'
      };
    }
  }

  private getProviderDestinationCache(): DestinationSearchResult | undefined {
    const destination = destinationCache.retrieveDestinationFromCache(
      this.decodedProviderClientCredentialsToken,
      this.name,
      this.options.isolationStrategy!
    );

    if (destination) {
      return { destination, fromCache: true, origin: 'subscriber' };
    }
  }

  private async getSubscriberDestinationService(): Promise<
    DestinationSearchResult | undefined
  > {
    const accessToken = await serviceToken('destination', {
      userJwt: this.decodedUserJwt,
      ...this.options
    });
    const subscriber = await this.getInstanceAndSubaccountDestinations(
      accessToken
    );
    const destination = this.options.selectionStrategy!(
      {
        subscriber,
        provider: emptyDestinationByType
      },
      this.name
    );

    if (destination) {
      return { destination, fromCache: false, origin: 'subscriber' };
    }
  }

  private getSubscriberDestinationCache(): DestinationSearchResult | undefined {
    const destination = destinationCache.retrieveDestinationFromCache(
      this.decodedUserJwt!,
      this.name,
      this.options.isolationStrategy!
    );

    if (destination) {
      return { destination, fromCache: true, origin: 'subscriber' };
    }
  }

  private isProviderAndSubscriberSameTenant() {
    return (
      this.decodedUserJwt &&
      isIdenticalTenant(
        this.decodedUserJwt,
        this.decodedProviderClientCredentialsToken
      )
    );
  }

  private isProviderNeeded(
    resultFromSubscriber: DestinationSearchResult
  ): boolean {
    if (this.options.selectionStrategy === alwaysSubscriber) {
      return false;
    }
    if (
      this.options.selectionStrategy === subscriberFirst &&
      resultFromSubscriber
    ) {
      return false;
    }

    return true;
  }

  private isSubscriberNeeded(): boolean {
    if (!this.decodedUserJwt) {
      return false;
    }

    if (this.options.selectionStrategy === alwaysProvider) {
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
    let destination;
    if (this.options.useCache) {
      destination = this.getProviderDestinationCache();
    }

    return destination || this.getProviderDestinationService();
  }

  private async searchSubscriberAccountForDestination(): Promise<
    DestinationSearchResult | undefined
  > {
    let destination;
    if (this.options.useCache) {
      destination = this.getSubscriberDestinationCache();
    }

    return destination || this.getSubscriberDestinationService();
  }
}
