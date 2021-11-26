import { createLogger, encodeBase64 } from '@sap-cloud-sdk/util';
import { decodeJwt, isUserToken, JwtPair, verifyJwt } from '../jwt';
import { IsolationStrategy } from '../cache';
import { jwtBearerToken, serviceToken } from '../token-accessor';
import { addProxyConfigurationOnPrem } from '../connectivity-service';
import {
  getDestinationService,
  getDestinationServiceCredentialsList,
  getXsuaaServiceCredentials
} from '../environment-accessor';
import { isIdenticalTenant } from '../tenant';
import {
  DestinationServiceCredentials,
  XsuaaServiceCredentials
} from '../environment-accessor-types';
import { exchangeToken, isTokenExchangeEnabled } from '../identity-service';
import { getSubdomainAndZoneId } from '../xsuaa-service';
import { Destination } from './destination-service-types';
import {
  alwaysProvider,
  alwaysSubscriber,
  subscriberFirst
} from './destination-selection-strategies';
import {
  DestinationFetchOptions,
  DestinationOptions,
  DestinationsByType
} from './destination-accessor-types';
import {
  AuthAndExchangeTokens,
  fetchDestination,
  fetchInstanceDestinations,
  fetchSubaccountDestinations
} from './destination-service';
import { destinationCache } from './destination-cache';
import {
  addProxyConfigurationInternet,
  ProxyStrategy,
  proxyStrategy
} from './proxy-util';

type DestinationOrigin = 'subscriber' | 'provider';

type RequiredProperties<T, P extends keyof T> = Required<Pick<T, P>> &
  Omit<T, P>;

const logger = createLogger({
  package: 'connectivity',
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
 * Returns `null`, if no destination can be found.
 * Requires the following service bindings: destination, XSUAA
 * By default, selects subscriber over provider and instance over subaccount destinations.
 *
 * If the destinations are read from the environment, the jwt will be ignored.
 * @param options - Configuration for how to retrieve destinations from the destination service.
 * @returns A promise returning the requested destination on success.
 */
export async function getDestinationFromDestinationService(
  options: DestinationFetchOptions
): Promise<Destination | null> {
  logger.info('Attempting to retrieve destination from destination service.');
  return DestinationFromServiceRetriever.getDestinationFromDestinationService(
    options
  );
}

/**
 * @internal
 */
class DestinationFromServiceRetriever {
  public static async getDestinationFromDestinationService(
    options: DestinationFetchOptions
  ): Promise<Destination | null> {
    if (isTokenExchangeEnabled(options)) {
      options.jwt = await exchangeToken(options);
    }

    const subscriberToken =
      await DestinationFromServiceRetriever.getSubscriberToken(options);

    const xsuaaCredentials = getXsuaaServiceCredentials(options.jwt);
    const providerToken =
      await DestinationFromServiceRetriever.getProviderClientCredentialsToken(
        xsuaaCredentials,
        options
      );
    const da = new DestinationFromServiceRetriever(
      options.destinationName,
      { ...options, xsuaaCredentials },
      subscriberToken,
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
      /*
    This covers the two technical user propagation cases https://help.sap.com/viewer/cca91383641e40ffbe03bdc78f00f681/Cloud/en-US/3cb7b81115c44cf594e0e3631291af94.html (fetchDestinationBySystemUser)
    If no system user is set the subscriber or provider destination is fetched depending on the content of the JWT (fetchDestinationByUserJwt)
    */
      destination =
        (await da.fetchDestinationBySystemUser(destinationResult)) ||
        (await da.fetchDestinationByUserJwt(destinationResult.origin));
    }
    if (destination.authentication === 'OAuth2UserTokenExchange') {
      destination = await da.fetchDestinationByUserTokenExchange(
        destinationResult.origin
      );
    }
    if (destination.authentication === 'OAuth2ClientCredentials') {
      destination = await da.fetchDestinationByClientCredentialsExchange(
        destinationResult
      );
    }

    if (destination.authentication === 'OAuth2Password') {
      destination = await da.fetchDestinationByClientCrendentialsGrant();
    }
    if (destination.authentication === 'OAuth2JWTBearer') {
      destination = await da.fetchDestinationByUserJwt(destinationResult.origin);
    }
    if (destination.authentication === 'ClientCertificateAuthentication') {
      destination = await da.addClientCertAuth(destinationResult.origin);
    }

    const withProxySetting = await da.addProxyConfiguration(destination);
    da.updateDestinationCache(withProxySetting, destinationResult.origin);
    return withProxySetting;
  }

  private static async getSubscriberToken(
    options: DestinationFetchOptions
  ): Promise<JwtPair | undefined> {
    if (options.jwt) {
      if (options.iss) {
        logger.warn(
          'You have provided the `userJwt` and `iss` options to fetch the destination. This is most likely unintentional. Ignoring `iss`.'
        );
      }
      return {
        decoded: await verifyJwt(options.jwt, options),
        encoded: options.jwt
      };
    }

    if (options.iss) {
      logger.info(
        'Using `iss` option to fetch a destination instead of a full JWT. No validation is performed.'
      );
      const payload = { iss: options.iss };
      return {
        decoded: payload,
        encoded: encodeBase64(JSON.stringify(payload))
      };
    }
  }

  private static async getProviderClientCredentialsToken(
    xsuaaCredentials: XsuaaServiceCredentials,
    options: DestinationFetchOptions
  ): Promise<JwtPair> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { jwt, ...optionsWithoutJwt } = options;
    const encoded = await serviceToken('destination', {
      ...optionsWithoutJwt,
      xsuaaCredentials
    });
    return { encoded, decoded: decodeJwt(encoded) };
  }

  private static async getSubscriberClientCredentialsToken(
    options: DestinationOptions
  ): Promise<string> {
    if (!options.jwt) {
      throw new Error(
        'User JWT is needed to obtain a client credentials token for the subscriber account.'
      );
    }
    return serviceToken('destination', options);
  }

  private options: RequiredProperties<
    Omit<DestinationOptions, 'userJwt' | 'iss'>,
    'isolationStrategy' | 'selectionStrategy' | 'useCache'
  >;

  private constructor(
    readonly name: string,
    options: DestinationOptions & { xsuaaCredentials: XsuaaServiceCredentials },
    readonly subscriberToken: JwtPair | undefined,
    readonly providerClientCredentialsToken: JwtPair
  ) {
    const defaultOptions = {
      isolationStrategy: IsolationStrategy.Tenant_User,
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

  private get destinationServiceCredentials(): DestinationServiceCredentials {
    const credentials = getDestinationServiceCredentialsList();
    if (!credentials || credentials.length === 0) {
      throw Error(
        'No binding to a destination service instance found. Please bind a destination service instance to your application.'
      );
    }
    if (credentials.length > 1) {
      logger.info(
        'Found more than one destination service instance. Using the first one.'
      );
    }

    return credentials[0];
  }

  private async fetchDestinationByToken(
    jwt: string | AuthAndExchangeTokens
  ): Promise<Destination> {
    return fetchDestination(
      this.destinationServiceCredentials.uri,
      jwt,
      this.name,
      this.options
    );
  }

  private getExchangeTenant(destination: Destination): string | undefined {
    if (destination.originalProperties!['tokenServiceURLType'] !== 'Common') {
      return undefined;
    }
    const subdomainSubscriber = getSubdomainAndZoneId(
      this.subscriberToken?.encoded
    ).subdomain;
    const subdomainProvider = getSubdomainAndZoneId(
      this.providerClientCredentialsToken?.encoded
    ).subdomain;
    return subdomainSubscriber || subdomainProvider;
  }

  private async getAuthTokenForOAuth2ClientCrendentials(
    destinationResult: DestinationSearchResult
  ): Promise<AuthAndExchangeTokens> {
    const { destination, origin } = destinationResult;
    const exchangeTenant = this.getExchangeTenant(destination);
    const clientGrant = await serviceToken('destination', {
      jwt:
        origin === 'subscriber'
          ? this.subscriberToken?.decoded
          : this.providerClientCredentialsToken.decoded
    });
    return { authHeaderJwt: clientGrant, exchangeTenant };
  }

  private async getAuthTokenForOAuth2UserTokenExchange(
    destinationOrigin: DestinationOrigin
  ): Promise<AuthAndExchangeTokens> {
    if (!isUserToken(this.subscriberToken)) {
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
          this.subscriberToken.encoded,
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
        authHeaderJwt: this.providerClientCredentialsToken.encoded,
        exchangeHeaderJwt: this.subscriberToken.encoded
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
        exchangeHeaderJwt: this.subscriberToken.encoded
      };
    }
    throw new Error(
      'Not possible to build tokens for OAuth2UserTokenExchange flow.'
    );
  }

  private async fetchDestinationByUserTokenExchange(
    destinationOrigin: DestinationOrigin
  ): Promise<Destination> {
    // This covers the three OAuth2UserTokenExchange cases https://help.sap.com/viewer/cca91383641e40ffbe03bdc78f00f681/Cloud/en-US/39d42654093e4f8db20398a06f7eab2b.html
    const token = await this.getAuthTokenForOAuth2UserTokenExchange(
      destinationOrigin
    );
    return this.fetchDestinationByToken(token);
  }

  private async fetchDestinationByClientCredentialsExchange(
    destResult: DestinationSearchResult
  ): Promise<Destination> {
    // This covers the X-Tenant case https://api.sap.com/api/SAP_CP_CF_Connectivity_Destination/resource
    const token = await this.getAuthTokenForOAuth2ClientCrendentials(
      destResult
    );
    return this.fetchDestinationByToken(token);
  }

  /**
   * @internal
   * This method calls the 'find destination by name' endpoint of the destination service using a client credentials grant.
   * For the find by name endpoint, the destination service will take care of OAuth flows and include the token in the destination.
   */
  private async fetchDestinationByClientCrendentialsGrant(): Promise<Destination> {
    const clientGrant = await serviceToken('destination', {
      jwt:
        this?.subscriberToken?.decoded ||
        this.providerClientCredentialsToken.decoded
    });

    return this.fetchDestinationByToken(clientGrant);
  }

  private async fetchDestinationBySystemUser(
    destinationResult: DestinationSearchResult
  ): Promise<Destination | undefined> {
    if (destinationResult.destination.systemUser) {
      const token =
        destinationResult.origin === 'provider'
          ? this.providerClientCredentialsToken.encoded
          : await DestinationFromServiceRetriever.getSubscriberClientCredentialsToken(
              this.options
            );
      logger.debug(
        `System user found on destination: "${destinationResult.destination.name}".`
      );

      if (destinationResult.origin) {
        return this.fetchDestinationByToken(token);
      }
    }
  }

  private async fetchDestinationByUserJwt(destinationOrigin: DestinationOrigin): Promise<Destination> {
    const destinationService = getDestinationService();

      /* This covers the two business user propagation cases https://help.sap.com/viewer/cca91383641e40ffbe03bdc78f00f681/Cloud/en-US/3cb7b81115c44cf594e0e3631291af94.html
       The two cases are JWT issued from provider or JWT from subscriber - the two cases are handled automatically.
       In the provider case the subdomain replacement in the xsuaa.url with the iss value does nothing but this does not hurt. */
      if (!isUserToken(this.subscriberToken)) {
        throw Error(
            'No user token (JWT) has been provided. This is strictly necessary for principal propagation.'
        );
      }
      //Take the subscriber/provider token for service acces and sets the x-user-token header for the user/tenat propagation https://api.sap.com/api/SAP_CP_CF_Connectivity_Destination/resource
      const authHeaderJwt = await serviceToken('destination', {
        jwt:
            destinationOrigin === "subscriber" ? this?.subscriberToken?.decoded : this.providerClientCredentialsToken.decoded
      });
      const exchangeHeaderJwt = await jwtBearerToken(
          this.subscriberToken.encoded,
          destinationService,
          this.options
      )
      return this.fetchDestinationByToken({authHeaderJwt,exchangeHeaderJwt});
  }

  private async addClientCertAuth(
    origin: DestinationOrigin
  ): Promise<Destination> {
    const accessToken = await serviceToken('destination', {
      ...this.options,
      jwt:
        origin === 'subscriber'
          ? this.subscriberToken!.decoded
          : this.providerClientCredentialsToken.decoded
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
        return addProxyConfigurationOnPrem(destination, this.subscriberToken);
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
        ? this.subscriberToken!.decoded
        : this.providerClientCredentialsToken.decoded,
      destination,
      this.options.isolationStrategy
    );
  }

  private async getProviderDestinationService(): Promise<
    DestinationSearchResult | undefined
  > {
    const provider = await this.getInstanceAndSubaccountDestinations(
      this.providerClientCredentialsToken.encoded
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
      this.providerClientCredentialsToken.decoded,
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
    if (!this.subscriberToken) {
      throw new Error(
        'Try to get destinations from subscriber account but user JWT was not set.'
      );
    }

    const accessToken = await serviceToken('destination', {
      ...this.options,
      jwt: this.subscriberToken.decoded
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
      this.subscriberToken!.decoded,
      this.name,
      this.options.isolationStrategy
    );

    if (destination) {
      return { destination, fromCache: true, origin: 'subscriber' };
    }
  }

  private isProviderAndSubscriberSameTenant() {
    return (
      this.subscriberToken &&
      isIdenticalTenant(
        this.subscriberToken.decoded,
        this.providerClientCredentialsToken.decoded
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
    if (!this.subscriberToken) {
      return false;
    }

    if (this.options.selectionStrategy === alwaysProvider) {
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
