import { createLogger } from '@sap-cloud-sdk/util';
import { JwtPayload } from 'jsonwebtoken';
import { decodeJwt, verifyJwt } from '../jwt';
import {
  addProxyConfigurationInternet,
  ProxyStrategy,
  proxyStrategy
} from '../proxy-util';
import { IsolationStrategy } from '../cache';
import { jwtBearerToken, serviceToken } from '../token-accessor';
import { addProxyConfigurationOnPrem } from '../connectivity-service';
import {
  getDestinationService,
  getDestinationServiceCredentialsList
} from '../environment-accessor';
import { isIdenticalTenant } from '../tenant';
import { Destination } from './destination-service-types';
import {
  alwaysProvider,
  alwaysSubscriber,
  subscriberFirst
} from './destination-selection-strategies';
import { DestinationsByType } from './destination-accessor-types';
import {
  AuthAndExchangeTokens,
  fetchDestination,
  fetchInstanceDestinations,
  fetchSubaccountDestinations
} from './destination-service';
import { destinationCache } from './destination-cache';
import type { DestinationOptions } from './destination-accessor';

type DestinationOrigin = 'subscriber' | 'provider';

type RequiredProperties<T, P extends keyof T> = Required<Pick<T, P>> &
  Omit<T, P>;

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
  logger.info('Attempting to retrieve destination from destination service.');
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
    const decodedUserJwt =
      await DestinationFromServiceRetriever.getDecodedUserJwt(options);
    const providerToken =
      await DestinationFromServiceRetriever.getProviderClientCredentialsToken(
        options
      );
    const da = new DestinationFromServiceRetriever(
      name,
      options,
      decodedUserJwt,
      providerToken
    );

    const destinationResult =
      await da.searchDestinationWithSelectionStrategyAndCache();
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
    if (destination.authentication === 'OAuth2UserTokenExchange') {
      destination = await da.addOAuth2UserTokenExchange(
        destinationResult.origin
      );
    }
    if (destination.authentication === 'OAuth2ClientCredentials') {
      destination = await da.addOAuth2ClientCredentials();
    }
    if (destination.authentication === 'OAuth2JWTBearer') {
      destination = await da.fetchDestinationByUserJwt();
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
  ): Promise<JwtPayload | undefined> {
    return options.userJwt
      ? verifyJwt(options.userJwt, options)
      : options.iss
      ? { iss: options.iss }
      : undefined;
  }

  private static async getProviderClientCredentialsToken(
    options: DestinationOptions
  ): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  readonly decodedProviderClientCredentialsToken: JwtPayload;
  private options: RequiredProperties<
    DestinationOptions,
    'isolationStrategy' | 'selectionStrategy' | 'useCache'
  >;

  private constructor(
    readonly name: string,
    options: DestinationOptions,
    readonly decodedUserJwt: JwtPayload | undefined,
    readonly providerClientCredentialsToken: string
  ) {
    this.decodedProviderClientCredentialsToken = decodeJwt(
      providerClientCredentialsToken
    );

    const defaultOptions = {
      isolationStrategy: IsolationStrategy.Tenant,
      selectionStrategy: subscriberFirst,
      useCache: false,
      ...options
    };
    this.options = { ...defaultOptions, ...options };
  }

  private async searchDestinationWithSelectionStrategyAndCache(): Promise<
    DestinationSearchResult | undefined
  > {
    let destinationSearchResult: DestinationSearchResult | undefined;
    if (this.isSubscriberNeeded()) {
      destinationSearchResult =
        await this.searchSubscriberAccountForDestination();
    }

    if (this.isProviderNeeded(destinationSearchResult)) {
      destinationSearchResult =
        await this.searchProviderAccountForDestination();
    }
    if (destinationSearchResult && !destinationSearchResult.fromCache) {
      logger.debug(
        'Successfully retrieved destination from destination service.'
      );
    }
    if (destinationSearchResult && destinationSearchResult.fromCache) {
      logger.debug(
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
        'No binding to a destination service instance found. Please bind a destination service instance to your application.'
      );
    }

    return credentials[0];
  }

  private async fetchDestinationByToken(
    jwt: string | AuthAndExchangeTokens
  ): Promise<Destination> {
    const destinationService = getDestinationService();

    return fetchDestination(
      destinationService.credentials.uri,
      jwt,
      this.name,
      this.options
    );
  }

  private async getAuthTokenForOAuth2UserTokenExchange(
    destinationOrigin: DestinationOrigin
  ): Promise<AuthAndExchangeTokens> {
    if (!this.options.userJwt) {
      throw Error(
        'No user token (JWT) has been provided. This is strictly necessary for `OAuth2UserTokenExchange`.'
      );
    }

    // Case 1 Destination in provider and jwt issued for provider account
    if (this.isProviderAndSubscriberSameTenant()) {
      logger.debug(
        `OAuth2UserTokenExchange flow started without user exchange token for destination ${this.name} of the provider account.`
      );
      return {
        authHeaderJwt: await jwtBearerToken(
          this.options.userJwt,
          getDestinationService(),
          this.options
        )
      };
    }
    // Case 2 Destination in provider and jwt issued for subscriber account
    if (destinationOrigin === 'provider') {
      logger.debug(
        `OAuth2UserTokenExchange flow started for destination ${this.name} of the provider account.`
      );
      return {
        authHeaderJwt: this.providerClientCredentialsToken,
        exchangeHeaderJwt: this.options.userJwt
      };
    }

    // Case 3 Destination in subscriber and jwt issued for subscriber account
    if (destinationOrigin === 'subscriber') {
      logger.debug(
        `OAuth2UserTokenExchange flow started for destination ${this.name} of the subscriber account.`
      );
      return {
        authHeaderJwt:
          await DestinationFromServiceRetriever.getSubscriberClientCredentialsToken(
            this.options
          ),
        exchangeHeaderJwt: this.options.userJwt
      };
    }
    throw new Error(
      'Not possible to build tokens for OAuth2UserTokenExchange flow.'
    );
  }

  private async addOAuth2UserTokenExchange(
    destinationOrigin: DestinationOrigin
  ): Promise<Destination> {
    // This covers the three OAuth2UserTokenExchange cases https://help.sap.com/viewer/cca91383641e40ffbe03bdc78f00f681/Cloud/en-US/39d42654093e4f8db20398a06f7eab2b.html
    const token = await this.getAuthTokenForOAuth2UserTokenExchange(
      destinationOrigin
    );
    return this.fetchDestinationByToken(token);
  }

  private async addOAuth2ClientCredentials(): Promise<Destination> {
    const clientGrant = await serviceToken('destination', {
      userJwt: this.options.userJwt || this.providerClientCredentialsToken
    });

    return fetchDestination(
      this.destinationServiceCredentials.uri,
      clientGrant,
      this.name
    );
  }

  private async addOAuthSamlAuth(
    destination: Destination,
    destinationOrigin: DestinationOrigin
  ): Promise<Destination> {
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
        `System user found on destination. The ${destinationOrigin} token: ${token} is used for destination fetching.`
      );

      if (destinationOrigin) {
        return this.fetchDestinationByToken(token);
      }
    }

    return this.fetchDestinationByUserJwt();
  }

  private async fetchDestinationByUserJwt(): Promise<Destination> {
    const destinationService = getDestinationService();

    /* This covers the two business user propagation cases https://help.sap.com/viewer/cca91383641e40ffbe03bdc78f00f681/Cloud/en-US/3cb7b81115c44cf594e0e3631291af94.html
     The two cases are JWT issued from provider or JWT from subscriber - the two cases are handled automatically.
     In the provider case the subdomain replacement in the xsuaa.url with the iss value does nothing but this does not hurt. */
    if (!this.options.userJwt) {
      throw Error(
        'No user token (JWT) has been provided. This is strictly necessary for principal propagation.'
      );
    }
    const accessToken = await jwtBearerToken(
      this.options.userJwt,
      destinationService,
      this.options
    );
    return this.fetchDestinationByToken(accessToken);
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
      this.options.isolationStrategy
    );
  }

  private async getProviderDestinationService(): Promise<
    DestinationSearchResult | undefined
  > {
    const provider = await this.getInstanceAndSubaccountDestinations(
      this.providerClientCredentialsToken
    );
    const destination = this.options.selectionStrategy(
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
      this.options.isolationStrategy
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
    const destination = this.options.selectionStrategy(
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
      this.options.isolationStrategy
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
    resultFromSubscriber: DestinationSearchResult | undefined
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
    return (
      (this.options.useCache && this.getProviderDestinationCache()) ||
      this.getProviderDestinationService()
    );
  }

  private async searchSubscriberAccountForDestination(): Promise<
    DestinationSearchResult | undefined
  > {
    return (
      (this.options.useCache && this.getSubscriberDestinationCache()) ||
      this.getSubscriberDestinationService()
    );
  }
}
