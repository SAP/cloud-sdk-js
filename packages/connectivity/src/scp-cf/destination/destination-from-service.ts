import { createLogger } from '@sap-cloud-sdk/util';
import { JwtPayload } from '../jsonwebtoken-type';
import {
  decodeJwt,
  decodeJwtComplete,
  getJwtPair,
  isXsuaaToken,
  JwtPair,
  verifyJwt
} from '../jwt';
import { jwtBearerToken, serviceToken } from '../token-accessor';
import { addProxyConfigurationOnPrem } from '../connectivity-service';
import {
  getDestinationService,
  getDestinationServiceCredentialsList
} from '../environment-accessor';
import { isIdenticalTenant } from '../tenant';
import { exchangeToken, isTokenExchangeEnabled } from '../identity-service';
import { getSubdomainAndZoneId } from '../xsuaa-service';
import { DestinationServiceCredentials } from '../environment-accessor-types';
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
  fetchCertificate,
  fetchInstanceDestinations,
  fetchSubaccountDestinations
} from './destination-service';
import {
  destinationCache,
  getDefaultIsolationStrategy
} from './destination-cache';
import {
  addProxyConfigurationInternet,
  ProxyStrategy,
  proxyStrategy
} from './http-proxy-util';

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

/**
 * When a destination is fetched from the SDK the user can pass different tokens.
 * The token determines from which tenant the destination is obtained (provider or subscriber) and if it contains user information so that user propagation flows are possible.
 * Possible types are: A user specific JWT issued by the XSUAA, a JWT from a custom IdP or only the `iss` property to get destinations from a different tenant.
 * We name these tokens "subscriber tokens", because they are related to the subscriber account in contrast to the"provider account", where the application is running.
 * The tenant defined in the subscriber token is the provider tenant for single tenant applications.
 */
type SubscriberToken = IssToken | XsuaaToken | CustomToken;

/**
 * User provided a dummy token with the `iss` property.
 * This is used if a tenant other than the provider tenant should be accessed but no user related login (JWT) is available for this tenant.
 * Therefore, the `userJwt` is undefined and only a destination service token has been issued.
 */
interface IssToken {
  type: 'iss';
  userJwt: undefined;
  serviceJwt: JwtPair;
}

/**
 * User provided a token issued form the XSUAA.
 * This token has the JKU properties to be verified by the SDK.
 * The provided token is the userJwt containing the `zid` and `user_id` properties.
 * The service token was derived from this token and is for the same tenant.
 */
interface XsuaaToken {
  type: 'xsuaa';
  userJwt: JwtPair;
  serviceJwt: JwtPair;
}

/**
 * User provided a token from a custom issuer (not XSUAA).
 * Such a token can not be converted to a service token by the XSUAA.
 * Therefore, the serviceJwt is undefined and the SDK does not do a token validation - the destination service does this based on jwks properties on the destination.
 * For service calls the provider service token is used so this types works only for single tenant application.
 */
interface CustomToken {
  type: 'custom';
  userJwt: JwtPair;
  serviceJwt: undefined;
}

const emptyDestinationByType: DestinationsByType = {
  instance: [],
  subaccount: []
};

/**
 * Utility function to get destination service credentails, including error handling.
 * @internal
 */
export function getDestinationServiceCredentials(): DestinationServiceCredentials {
  const credentials = getDestinationServiceCredentialsList();
  if (!credentials || credentials.length === 0) {
    throw Error(
      'No binding to a destination service instance found. Please bind a destination service instance to your application.'
    );
  }
  if (credentials.length > 1) {
    logger.warn(
      'Found more than one destination service instance. Using the first one.'
    );
  }

  return credentials[0];
}

/**
 * Retrieves a destination with the given name from the Cloud Foundry destination service.
 * Returns `null`, if no destination can be found.
 * Requires the following service bindings: destination, XSUAA
 * By default, selects subscriber over provider and instance over subaccount destinations.
 * @param options - Configuration for how to retrieve destinations from the destination service.
 * @returns A promise returning the requested destination on success.
 */
export async function getDestinationFromDestinationService(
  options: DestinationFetchOptions
): Promise<Destination | null> {
  logger.debug('Attempting to retrieve destination from destination service.');
  return DestinationFromServiceRetriever.getDestinationFromDestinationService(
    options
  );
}

/**
 * @internal
 */
export class DestinationFromServiceRetriever {
  public static async getDestinationFromDestinationService(
    options: DestinationFetchOptions
  ): Promise<Destination | null> {
    if (isTokenExchangeEnabled(options)) {
      options.jwt = await exchangeToken(options);
    }

    const subscriberToken =
      await DestinationFromServiceRetriever.getSubscriberToken(options);

    const providerToken =
      await DestinationFromServiceRetriever.getProviderServiceToken(options);

    const da = new DestinationFromServiceRetriever(
      options,
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
      destination.authentication === 'SAMLAssertion' ||
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
    const withTrustStore = await da.addTrustStoreConfiguration(
      withProxySetting,
      destinationResult.origin
    );
    await da.updateDestinationCache(withTrustStore, destinationResult.origin);
    return withTrustStore;
  }

  public static async getSubscriberToken(
    options: DestinationOptions
  ): Promise<SubscriberToken | undefined> {
    if (options.jwt) {
      if (options.iss) {
        logger.warn(
          'You have provided the `userJwt` and `iss` options to fetch the destination. This is most likely unintentional. Ignoring `iss`.'
        );
      }

      if (isXsuaaToken(decodeJwtComplete(options.jwt))) {
        await verifyJwt(options.jwt, options);
        const serviceJwtEncoded = await serviceToken('destination', {
          ...options,
          jwt: options.jwt
        });
        return {
          type: 'xsuaa',
          userJwt: getJwtPair(options.jwt),
          serviceJwt: getJwtPair(serviceJwtEncoded)
        };
      }
      return {
        type: 'custom',
        userJwt: getJwtPair(options.jwt),
        serviceJwt: undefined
      };
    }

    if (options.iss) {
      logger.debug(
        'Using `iss` option to fetch a destination instead of a full JWT. No validation is performed.'
      );
      const serviceJwtEncoded = await serviceToken('destination', {
        ...options,
        jwt: { iss: options.iss }
      });
      return {
        type: 'iss',
        userJwt: undefined,
        serviceJwt: getJwtPair(serviceJwtEncoded)
      };
    }
  }

  public static async getProviderServiceToken(
    options: DestinationOptions
  ): Promise<JwtPair> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { jwt, ...optionsWithoutJwt } = options;
    const encoded = await serviceToken('destination', {
      ...optionsWithoutJwt
    });
    return { encoded, decoded: decodeJwt(encoded) };
  }

  private static checkDestinationForCustomJwt(destination: Destination): void {
    if (!destination.jwks && !destination.jwksUri) {
      throw new Error(
        'Failed to verify the JWT with no JKU! Destination must have `x_user_token.jwks` or `x_user_token.jwks_uri` property.'
      );
    }
  }

  private static isUserJwt(
    token: SubscriberToken | undefined
  ): token is CustomToken | XsuaaToken {
    return !!token && token.type !== 'iss';
  }

  private options: RequiredProperties<
    Omit<DestinationFetchOptions, 'userJwt' | 'iss'>,
    'isolationStrategy' | 'selectionStrategy' | 'useCache'
  >;

  private constructor(
    options: DestinationFetchOptions,
    readonly subscriberToken: SubscriberToken | undefined,
    readonly providerServiceToken: JwtPair
  ) {
    const defaultOptions = {
      isolationStrategy: getDefaultIsolationStrategy(
        subscriberToken?.userJwt?.decoded
      ),
      selectionStrategy: subscriberFirst,
      useCache: !!options.isolationStrategy
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
      logger.debug('Could not retrieve destination from destination service.');
    }

    return destinationSearchResult;
  }

  private async getInstanceAndSubaccountDestinations(
    accessToken: string
  ): Promise<DestinationsByType> {
    const [instance, subaccount] = await Promise.all([
      fetchInstanceDestinations(
        getDestinationServiceCredentials().uri,
        accessToken,
        this.options
      ),
      fetchSubaccountDestinations(
        getDestinationServiceCredentials().uri,
        accessToken,
        this.options
      )
    ]);

    return {
      instance,
      subaccount
    };
  }

  private async fetchDestinationByToken(
    jwt: string | AuthAndExchangeTokens
  ): Promise<Destination> {
    return fetchDestination(
      getDestinationServiceCredentials().uri,
      jwt,
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
        origin === 'provider'
          ? this.providerServiceToken.decoded
          : this.subscriberToken!.serviceJwt!.decoded
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
    const { destinationName } = this.options;
    if (!DestinationFromServiceRetriever.isUserJwt(this.subscriberToken)) {
      throw Error(
        `No user token (JWT) has been provided. This is strictly necessary for '${destination.authentication}'.`
      );
    }
    // This covers OAuth to user dependend auth flows https://help.sap.com/viewer/cca91383641e40ffbe03bdc78f00f681/Cloud/en-US/39d42654093e4f8db20398a06f7eab2b.html and https://api.sap.com/api/SAP_CP_CF_Connectivity_Destination/resource
    // Which is the same for: OAuth2UserTokenExchange, OAuth2JWTBearer and OAuth2SAMLBearerAssertion

    // If user JWT is not XSUAA enforce the JWKS properties are there - destination service would do that as wll. https://help.sap.com/docs/CP_CONNECTIVITY/cca91383641e40ffbe03bdc78f00f681/d81e1683bd434823abf3ceefc4ff157f.html
    if (this.subscriberToken.type === 'custom') {
      DestinationFromServiceRetriever.checkDestinationForCustomJwt(destination);
    }

    // Case 1 Destination in provider and jwt issued for provider account But not custom JWT given-> not extra x-user-token header needed
    if (
      this.subscriberToken.type !== 'custom' &&
      isIdenticalTenant(
        this.subscriberToken.userJwt.decoded,
        this.providerServiceToken.decoded
      )
    ) {
      logger.debug(
        `UserExchange flow started without user exchange token for destination ${destinationName} of the provider account.`
      );
      return {
        authHeaderJwt: await jwtBearerToken(
          this.subscriberToken.userJwt.encoded,
          getDestinationService(),
          this.options
        )
      };
    }
    // Case 2 Subscriber and provider account not the same OR custom jwt -> x-user-token  header passed to determine user and tenant in token service URL and service token to get the destination
    const serviceJwt =
      origin === 'provider'
        ? this.providerServiceToken
        : this.subscriberToken.serviceJwt!;
    logger.debug(
      `UserExchange flow started for destination ${destinationName} of the ${origin} account.`
    );

    return {
      authHeaderJwt: serviceJwt.encoded, // token to get destination from service
      exchangeHeaderJwt: this.subscriberToken.userJwt.encoded // token considered for user and tenant
    };
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
      case ProxyStrategy.PRIVATELINK_PROXY:
        return addProxyConfigurationInternet(destination);
      case ProxyStrategy.NO_PROXY:
        return destination;
      default:
        throw new Error(
          'Illegal argument: No valid proxy configuration found in the destination input to be added.'
        );
    }
  }

  private selectSubscriberJwt(): JwtPayload {
    if (!this.subscriberToken) {
      throw new Error('Try to get subscriber token but value is undefined.');
    }
    switch (this.subscriberToken.type) {
      case 'custom':
        return this.subscriberToken.userJwt.decoded;
      case 'iss':
        return this.subscriberToken.serviceJwt.decoded;
      case 'xsuaa':
        return this.subscriberToken.userJwt.decoded;
    }
  }

  private async updateDestinationCache(
    destination: Destination,
    destinationOrigin: DestinationOrigin
  ) {
    if (!this.options.useCache) {
      return destination;
    }
    await destinationCache.cacheRetrievedDestination(
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
      this.options.destinationName
    );
    if (destination) {
      return {
        destination,
        fromCache: false,
        origin: 'provider'
      };
    }
  }

  private async getProviderDestinationCache(): Promise<
    DestinationSearchResult | undefined
  > {
    const destination = await destinationCache.retrieveDestinationFromCache(
      this.providerServiceToken.decoded,
      this.options.destinationName,
      this.options.isolationStrategy
    );

    if (destination) {
      return { destination, fromCache: true, origin: 'subscriber' };
    }
  }

  private async getSubscriberDestinationService(): Promise<
    DestinationSearchResult | undefined
  > {
    if (!this.subscriberToken || this.subscriberToken.type === 'custom') {
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
      this.options.destinationName
    );

    if (destination) {
      return { destination, fromCache: false, origin: 'subscriber' };
    }
  }

  private async getSubscriberDestinationCache(): Promise<
    DestinationSearchResult | undefined
  > {
    const destination = await destinationCache.retrieveDestinationFromCache(
      this.selectSubscriberJwt(),
      this.options.destinationName,
      this.options.isolationStrategy
    );

    if (destination) {
      return { destination, fromCache: true, origin: 'subscriber' };
    }
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

    if (this.subscriberToken.type === 'custom') {
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
      (this.options.useCache && (await this.getProviderDestinationCache())) ||
      this.getProviderDestinationService()
    );
  }

  private async searchSubscriberAccountForDestination(): Promise<
    DestinationSearchResult | undefined
  > {
    return (
      (this.options.useCache && (await this.getSubscriberDestinationCache())) ||
      this.getSubscriberDestinationService()
    );
  }

  private async addTrustStoreConfiguration(
    destination: Destination,
    origin: DestinationOrigin
  ): Promise<Destination> {
    if (destination.originalProperties?.TrustStoreLocation) {
      const trustStoreCertificate = await fetchCertificate(
        getDestinationServiceCredentials().uri,
        origin === 'provider'
          ? this.providerServiceToken.encoded
          : this.subscriberToken!.serviceJwt!.encoded,
        destination.originalProperties.TrustStoreLocation
      );
      destination.trustStoreCertificate = trustStoreCertificate;
    }
    return destination;
  }
}
