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

/**
 * @internal
 */
class DestinationFromServiceRetriever {
  public static async getDestinationFromDestinationService(
    name: string,
    options: DestinationOptions
  ): Promise<Destination | null> {
    const subscriberToken =
        await DestinationFromServiceRetriever.getSubscriberToken(options);

    const xsuaaCredentials = getXsuaaServiceCredentials(options.userJwt);
    const providerToken =
        await DestinationFromServiceRetriever.getProviderServiceToken(
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

    if (
        destination.authentication === 'OAuth2UserTokenExchange' ||
        destination.authentication === 'OAuth2JWTBearer' ||
        (destination.authentication === 'OAuth2SAMLBearerAssertion' &&
            !da.usesSystemUser(destination))
    ) {
      destination = await da.fetchDestinationWithUserExchangeFlows(
          destinationResult
      );
    }

    if (
        destination.authentication === 'OAuth2Password' ||
        destination.authentication === 'ClientCertificateAuthentication' ||
        destination.authentication === 'OAuth2ClientCredentials' ||
        da.usesSystemUser(destination)
    ) {
      destination = await da.fetchDestinationWithNonUserExchangeFlows(
          destinationResult
      );
    }

    const withProxySetting = await da.addProxyConfiguration(destination);
    da.updateDestinationCache(withProxySetting, destinationResult.origin);
    return withProxySetting;
  }

  private static async getSubscriberToken(
      options: DestinationFetchOptions
  ): Promise<SubscriberTokens | undefined> {
    if (options.jwt) {
      if (options.iss) {
        logger.warn(
            'You have provided the `userJwt` and `iss` options to fetch the destination. This is most likely unintentional. Ignoring `iss`.'
        );
      }
      const encoded = await serviceToken('destination', {
        ...options
      });
      return {
        userJwt: {
          decoded: await verifyJwt(options.jwt, options),
          encoded: options.jwt
        },
        serviceJwt: { encoded, decoded: decodeJwt(encoded) }
      };
    }

    if (options.iss) {
      logger.info(
          'Using `iss` option to fetch a destination instead of a full JWT. No validation is performed.'
      );
      const payload = { iss: options.iss };
      const encoded = await serviceToken('destination', {
        ...options,
        jwt: payload
      });
      const clientCertJwt = { encoded, decoded: decodeJwt(encoded) };
      return { serviceJwt: clientCertJwt };
    }
  }

  private static async getProviderServiceToken(
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

  private options: RequiredProperties<
      Omit<DestinationOptions, 'userJwt' | 'iss'>,
      'isolationStrategy' | 'selectionStrategy' | 'useCache'
      >;

  private constructor(
      readonly name: string,
      options: DestinationOptions & { xsuaaCredentials: XsuaaServiceCredentials },
      readonly subscriberToken: SubscriberTokens | undefined,
      readonly providerServiceToken: JwtPair
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
    if (destination.authentication !== 'OAuth2ClientCredentials') {
      return undefined;
    }
    if (destination.originalProperties!['tokenServiceURLType'] !== 'Common') {
      return undefined;
    }
    const subdomainSubscriber = getSubdomainAndZoneId(
        this.subscriberToken?.userJwt?.encoded
    ).subdomain;
    const subdomainProvider = getSubdomainAndZoneId(
        this.providerServiceToken?.encoded
    ).subdomain;
    return subdomainSubscriber || subdomainProvider || undefined;
  }

  private async getAuthTokenForOAuth2ClientCrendentials(
      destinationResult: DestinationSearchResult
  ): Promise<AuthAndExchangeTokens> {
    const { destination, origin } = destinationResult;
    // This covers the X-Tenant case https://api.sap.com/api/SAP_CP_CF_Connectivity_Destination/resource
    const exchangeTenant = this.getExchangeTenant(destination);
    const clientGrant = await serviceToken('destination', {
      jwt:
          origin === 'subscriber'
              ? this.subscriberToken!.serviceJwt.decoded
              : this.providerServiceToken.decoded
    });
    return { authHeaderJwt: clientGrant, exchangeTenant };
  }

  // This covers the two technical user propagation https://help.sap.com/viewer/cca91383641e40ffbe03bdc78f00f681/Cloud/en-US/3cb7b81115c44cf594e0e3631291af94.html
  private usesSystemUser(destination: Destination): boolean {
    // put this in the non user dependent block
    if (
        destination.systemUser &&
        destination.authentication === 'OAuth2SAMLBearerAssertion'
    ) {
      logger.debug(
          `System user found on destination: "${destination.name}". 
The property SystemUser has been deprecated. 
It is highly recommended that you stop using it.
Possible alternatives for such technical user authentication are BasicAuthentication, OAuth2ClientCredentials, or ClientCertificateAuthentication`
      );
      return true;
    }

    return false;
  }

  private async getAuthTokenForOAuth2UserBasedTokenExchanges(
      destinationResult: DestinationSearchResult
  ): Promise<AuthAndExchangeTokens> {
    const { destination, origin } = destinationResult;
    if (!this.subscriberToken || !isUserToken(this.subscriberToken.userJwt)) {
      throw Error(
          `No user token (JWT) has been provided. This is strictly necessary for '${destination.authentication}'.`
      );
    }
    // This covers OAuth to user dependend auth flows https://help.sap.com/viewer/cca91383641e40ffbe03bdc78f00f681/Cloud/en-US/39d42654093e4f8db20398a06f7eab2b.html and https://api.sap.com/api/SAP_CP_CF_Connectivity_Destination/resource
    // Which is the same for: OAuth2UserTokenExchange, OAuth2JWTBearer and OAuth2SAMLBearerAssertion

    // Case 1 Destination in provider and jwt issued for provider account -> not extra x-user-token header needed
    if (this.isProviderAndSubscriberSameTenant()) {
      logger.debug(
          `UserExchange flow started without user exchange token for destination ${this.name} of the provider account.`
      );
      return {
        authHeaderJwt: await jwtBearerToken(
            this.subscriberToken.userJwt.encoded,
            getDestinationService(),
            this.options
        )
      };
    }
    // Case 2 Subscriber and provider account not the same -> x-user-token  header passed to determine user and tenant in token service URL and service token to get the destination
    const serviceJwt =
        origin === 'subscriber'
            ? this.subscriberToken.serviceJwt
            : this.providerServiceToken;
    logger.debug(
        `UserExchange flow started for destination ${this.name} of the ${origin} account.`
    );

    return {
      authHeaderJwt: serviceJwt.encoded, // token to get destination from service
      exchangeHeaderJwt: this.subscriberToken.userJwt.encoded // token considered for user and tenant
    };

    throw new Error(
        `Not possible to build tokens for ${destination.authentication} flow for destination ${destination.name}.`
    );
  }

  /**
   * @internal
   * This method calls the 'find destination by name' endpoint of the destination service using a client credentials grant.
   * For the find by name endpoint, the destination service will take care of OAuth flows and include the token in the destination.
   * @param destinationResult - Result of the getDestinations call for which the exchange flow is triggred
   * @returns Destination containing the auth token.
   */
  private async fetchDestinationWithNonUserExchangeFlows(
      destinationResult: DestinationSearchResult
  ): Promise<Destination> {
    const token = await this.getAuthTokenForOAuth2ClientCrendentials(
        destinationResult
    );

    return this.fetchDestinationByToken(token);
  }

  private async fetchDestinationWithUserExchangeFlows(
      destinationResult: DestinationSearchResult
  ): Promise<Destination> {
    const token = await this.getAuthTokenForOAuth2UserBasedTokenExchanges(
        destinationResult
    );
    return this.fetchDestinationByToken(token);
  }

  private async addProxyConfiguration(
      destination: Destination
  ): Promise<Destination> {
    switch (proxyStrategy(destination)) {
      case ProxyStrategy.ON_PREMISE_PROXY:
        return addProxyConfigurationOnPrem(
            destination,
            this.subscriberToken?.userJwt
        );
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

  // For iss token the userJwt may be undefined.
  private selectSubscriberJwt(): JwtPayload {
    if (!this.subscriberToken) {
      throw new Error('Try to get subscriber token but value is undefined.');
    }
    return (
        this.subscriberToken.userJwt?.decoded ||
        this.subscriberToken.serviceJwt.decoded
    );
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
            ? this.selectSubscriberJwt()
            : this.providerServiceToken.decoded,
        destination,
        this.options.isolationStrategy
    );
  }

  private async getProviderDestinationService(): Promise<
      DestinationSearchResult | undefined
      > {
    const provider = await this.getInstanceAndSubaccountDestinations(
        this.providerServiceToken.encoded
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
        this.providerServiceToken.decoded,
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

    const subscriber = await this.getInstanceAndSubaccountDestinations(
        this.subscriberToken.serviceJwt.encoded
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
        this.selectSubscriberJwt(),
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
            this.subscriberToken.serviceJwt.decoded,
            this.providerServiceToken.decoded
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
