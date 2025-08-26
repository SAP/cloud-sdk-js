import { createLogger } from '@sap-cloud-sdk/util';
import { addProxyConfigurationOnPrem } from '../connectivity-service';
import {
  getDestinationServiceCredentials,
  getServiceBinding
} from '../environment-accessor';
import { shouldExchangeToken } from '../identity-service';
import { getSubdomain, isXsuaaToken } from '../jwt';
import { isIdenticalTenant } from '../tenant';
import { jwtBearerToken } from '../token-accessor';
import {
  destinationCache,
  getDefaultIsolationStrategy
} from './destination-cache';
import {
  alwaysProvider,
  alwaysSubscriber,
  subscriberFirst
} from './destination-selection-strategies';
import {
  fetchCertificate,
  fetchDestinationWithTokenRetrieval,
  fetchDestinationWithoutTokenRetrieval
} from './destination-service';
import { assertHttpDestination } from './destination-service-types';
import { getProviderServiceToken } from './get-provider-token';
import {
  getRequiredSubscriberToken,
  getSubscriberToken,
  hasTokens
} from './get-subscriber-token';
import {
  addProxyConfigurationInternet,
  proxyStrategy
} from './http-proxy-util';
import { addForwardedAuthTokenIfNeeded } from './forward-auth-token';
import type { SubscriberToken } from './get-subscriber-token';
import type { Destination } from './destination-service-types';
import type { AuthAndExchangeTokens } from './destination-service';
import type {
  DestinationFetchOptions,
  DestinationsByType
} from './destination-accessor-types';
import type { JwtPair } from '../jwt';
import type { Service } from '../environment-accessor';

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
    // Exchange the IAS token to a XSUAA token using the destination service credentials
    if (shouldExchangeToken(options)) {
      options.jwt = await jwtBearerToken(options.jwt!, 'destination');
    }

    // Create retriever with subscriber and provider tokens
    const retriever = new DestinationFromServiceRetriever(
      options,
      await getSubscriberToken(options),
      await getProviderServiceToken(options)
    );

    // Search destination with selection strategy and cache
    const destinationSearchResult =
      await retriever.searchDestinationWithSelectionStrategyAndCache();

    // Immediately return null if no destination found
    if (!destinationSearchResult) {
      return null;
    }

    const { origin, fromCache } = destinationSearchResult;
    let { destination } = destinationSearchResult;

    if (!fromCache) {
      /* Destination NOT from cache */

      // Fetch and add auth token if needed,
      // meaning `forwardAuthToken` is `false`
      // AND authentication is one of the supported types

      // TODO: Check if the auth token is bound to options.jwt which might change next time for caching.

      //
      destination = await retriever.fetchAndAddAuthTokenIfNeeded(
        destination,
        origin
      );

      // Add trust store configuration if needed,
      // meaning `TrustStoreLocation` is defined
      destination = await retriever.addTrustStoreConfigurationIfNeeded(
        destination,
        origin
      );

      // Cache the destination
      await retriever.cacheDestination(destination, origin);
    }

    // Add auth token based on the given `options.jwt` if needed
    // meaning `forwardAuthToken` is `true`
    destination = addForwardedAuthTokenIfNeeded(destination, options.jwt);

    // Add proxy configuration based on the proxy strategy
    destination = await retriever.addProxyConfiguration(destination);

    return destination;
  }

  private static throwUserTokenMissing(destination: Destination) {
    throw Error(
      `No user token (JWT) has been provided. This is strictly necessary for '${destination.authentication}'.`
    );
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
  ): token is SubscriberToken & { userJwt: JwtPair } {
    return !!token?.userJwt;
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
      useCache: true
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
    if (destinationSearchResult) {
      if (destinationSearchResult.fromCache) {
        logger.debug(
          `Successfully retrieved destination from destination service cache for ${destinationSearchResult.origin} destinations.`
        );
      } else {
        logger.debug(
          'Successfully retrieved destination from destination service.'
        );
      }
    } else {
      logger.debug('Could not retrieve destination from destination service.');
    }

    return destinationSearchResult;
  }

  private getExchangeTenant(destination: Destination): string | undefined {
    if (destination.authentication !== 'OAuth2ClientCredentials') {
      return undefined;
    }
    if (destination.originalProperties?.['tokenServiceURLType'] !== 'Common') {
      return undefined;
    }
    const subdomainSubscriber =
      getSubdomain(this.subscriberToken?.serviceJwt?.decoded) ||
      getSubdomain(this.subscriberToken?.userJwt?.decoded);
    const subdomainProvider = getSubdomain(this.providerServiceToken?.decoded);
    return subdomainSubscriber || subdomainProvider || undefined;
  }

  private async getAuthTokenForOAuth2ClientCredentials(
    destination: Destination,
    origin: DestinationOrigin
  ): Promise<AuthAndExchangeTokens> {
    // This covers the x-tenant case https://api.sap.com/api/SAP_CP_CF_Connectivity_Destination/resource
    const exchangeTenant = this.getExchangeTenant(destination);
    const authHeaderJwt =
      origin === 'provider'
        ? this.providerServiceToken.encoded
        : this.subscriberToken?.serviceJwt?.encoded;

    if (!authHeaderJwt) {
      throw Error(
        'Could not retrieve service token for the destination service.'
      );
    }
    return { authHeaderJwt, exchangeTenant };
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
    destination: Destination,
    origin: DestinationOrigin
  ): Promise<AuthAndExchangeTokens> {
    const { destinationName } = this.options;
    if (!DestinationFromServiceRetriever.isUserJwt(this.subscriberToken)) {
      throw DestinationFromServiceRetriever.throwUserTokenMissing(destination);
    }
    // This covers OAuth to user-dependent auth flows https://help.sap.com/viewer/cca91383641e40ffbe03bdc78f00f681/Cloud/en-US/39d42654093e4f8db20398a06f7eab2b.html and https://api.sap.com/api/SAP_CP_CF_Connectivity_Destination/resource
    // Which is the same for: OAuth2UserTokenExchange, OAuth2JWTBearer and OAuth2SAMLBearerAssertion

    const isXsuaaUserJwt = isXsuaaToken(this.subscriberToken.userJwt.decoded);
    // If subscriber user token was not issued by XSUAA enforce the JWKS properties are there - destination service would do that as well. https://help.sap.com/docs/CP_CONNECTIVITY/cca91383641e40ffbe03bdc78f00f681/d81e1683bd434823abf3ceefc4ff157f.html
    if (!isXsuaaUserJwt) {
      DestinationFromServiceRetriever.checkDestinationForCustomJwt(destination);
    }

    // Case 1: subscriber account is the provider account, user JWT is from XSUAA
    // x-user-token header not needed
    if (
      isXsuaaUserJwt &&
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
          getDestinationService()
        )
      };
    }

    // Case 2a: subscriber and provider account not the same
    // Case 2b: user token is not an XSUAA token
    // x-user-token needed
    const serviceJwt =
      origin === 'provider'
        ? this.providerServiceToken
        : // on type level this could be undefined, but logically if the origin is subscriber, it must be defined.
          this.subscriberToken.serviceJwt!;

    logger.debug(
      `UserExchange flow started for destination ${destinationName} of the ${origin} account.`
    );

    return {
      authHeaderJwt: serviceJwt.encoded, // token to get destination from service
      exchangeHeaderJwt: this.subscriberToken.userJwt.encoded // token considered for user and tenant
    };
  }

  private async getAuthTokenForOAuth2RefreshToken(
    destination: Destination,
    origin: DestinationOrigin
  ): Promise<AuthAndExchangeTokens> {
    const { refreshToken } = this.options;
    if (!refreshToken) {
      throw Error(
        `No refresh token has been provided. This is strictly necessary for '${destination.authentication}'.`
      );
    }
    const clientGrant =
      origin === 'provider'
        ? this.providerServiceToken.encoded
        : this.subscriberToken!.serviceJwt!.encoded;
    return { authHeaderJwt: clientGrant, refreshToken };
  }

  /**
   * @internal
   * This method calls the 'find destination by name' endpoint of the destination service using a client credentials grant.
   * For the find by name endpoint, the destination service will take care of OAuth flows and include the token in the destination.
   * @param destination - The destination for which the token should be fetched.
   * @param origin - The origin of the destination, either 'subscriber' or 'provider'.
   * @returns Destination containing the auth token.
   */
  private async fetchDestinationWithNonUserExchangeFlows(
    destination: Destination,
    origin: DestinationOrigin
  ): Promise<Destination> {
    const token = await this.getAuthTokenForOAuth2ClientCredentials(
      destination,
      origin
    );

    return fetchDestinationWithTokenRetrieval(
      getDestinationServiceCredentials().uri,
      token,
      this.options
    );
  }

  private async fetchDestinationWithUserExchangeFlows(
    destination: Destination,
    origin: DestinationOrigin
  ): Promise<Destination> {
    const token = await this.getAuthTokenForOAuth2UserBasedTokenExchanges(
      destination,
      origin
    );

    return fetchDestinationWithTokenRetrieval(
      getDestinationServiceCredentials().uri,
      token,
      this.options
    );
  }

  private async fetchDestinationWithRefreshTokenFlow(
    destination: Destination,
    origin: DestinationOrigin
  ): Promise<Destination> {
    const token = await this.getAuthTokenForOAuth2RefreshToken(
      destination,
      origin
    );

    return fetchDestinationWithTokenRetrieval(
      getDestinationServiceCredentials().uri,
      token,
      this.options
    );
  }

  private async fetchAndAddAuthTokenIfNeeded(
    destination: Destination,
    origin: DestinationOrigin
  ): Promise<Destination> {
    const { forwardAuthToken, authentication } = destination;
    if (forwardAuthToken) {
      return destination;
    }

    if (
      authentication === 'OAuth2UserTokenExchange' ||
      authentication === 'OAuth2JWTBearer' ||
      authentication === 'SAMLAssertion' ||
      (authentication === 'OAuth2SAMLBearerAssertion' &&
        !this.usesSystemUser(destination))
    ) {
      destination = await this.fetchDestinationWithUserExchangeFlows(
        destination,
        origin
      );
    } else if (
      authentication === 'OAuth2Password' ||
      authentication === 'ClientCertificateAuthentication' ||
      authentication === 'OAuth2ClientCredentials' ||
      this.usesSystemUser(destination)
    ) {
      destination = await this.fetchDestinationWithNonUserExchangeFlows(
        destination,
        origin
      );
    } else if (authentication === 'OAuth2RefreshToken') {
      destination = await this.fetchDestinationWithRefreshTokenFlow(
        destination,
        origin
      );
    } else if (authentication === 'PrincipalPropagation') {
      if (!DestinationFromServiceRetriever.isUserJwt(this.subscriberToken)) {
        DestinationFromServiceRetriever.throwUserTokenMissing(destination);
      }
    }
    return destination;
  }

  private async addProxyConfiguration(
    destination: Destination
  ): Promise<Destination> {
    switch (proxyStrategy(destination)) {
      case 'on-premise':
        return addProxyConfigurationOnPrem(
          destination,
          hasTokens(this.subscriberToken)
            ? getRequiredSubscriberToken(this.subscriberToken)
            : undefined
        );
      case 'internet':
      case 'private-link':
        assertHttpDestination(destination);
        return addProxyConfigurationInternet(destination);
      case 'no-proxy':
        return destination;
      default:
        throw new Error(
          'Illegal argument: No valid proxy configuration found in the destination input to be added.'
        );
    }
  }

  private async cacheDestination(
    destination: Destination,
    destinationOrigin: DestinationOrigin
  ): Promise<void> {
    if (!this.options.useCache) {
      return;
    }
    await destinationCache.cacheRetrievedDestination(
      destinationOrigin === 'subscriber'
        ? getRequiredSubscriberToken(this.subscriberToken)
        : this.providerServiceToken.decoded,
      destination,
      this.options.isolationStrategy
    );
  }

  private async getProviderDestinationService(): Promise<
    DestinationSearchResult | undefined
  > {
    const providerDestination = await fetchDestinationWithoutTokenRetrieval(
      this.options.destinationName,
      getDestinationServiceCredentials().uri,
      this.providerServiceToken.encoded
    );

    const destination = this.options.selectionStrategy(
      {
        subscriber: emptyDestinationByType,
        provider: providerDestination
      },
      this.options.destinationName
    );

    if (destination) {
      return { destination, fromCache: false, origin: 'provider' };
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
      return { destination, fromCache: true, origin: 'provider' };
    }
  }

  private async getSubscriberDestinationService(): Promise<
    DestinationSearchResult | undefined
  > {
    if (!this.subscriberToken?.serviceJwt) {
      throw new Error(
        'Try to get destinations from subscriber account but service JWT was not set.'
      );
    }

    const subscriberDestination = await fetchDestinationWithoutTokenRetrieval(
      this.options.destinationName,
      getDestinationServiceCredentials().uri,
      this.subscriberToken.serviceJwt.encoded
    );

    const destination = this.options.selectionStrategy(
      {
        subscriber: subscriberDestination,
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
      getRequiredSubscriberToken(this.subscriberToken),
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
    if (
      this.options.selectionStrategy.toString() === alwaysSubscriber.toString()
    ) {
      return false;
    }

    if (
      this.options.selectionStrategy.toString() ===
        subscriberFirst.toString() &&
      resultFromSubscriber
    ) {
      return false;
    }

    return true;
  }

  private isSubscriberNeeded(): boolean {
    if (!this.subscriberToken?.serviceJwt) {
      return false;
    }

    return (
      this.options.selectionStrategy.toString() !== alwaysProvider.toString()
    );
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

  private async addTrustStoreConfigurationIfNeeded(
    destination: Destination,
    origin: DestinationOrigin
  ): Promise<Destination> {
    const trustStoreLocation =
      destination.originalProperties?.TrustStoreLocation;
    if (trustStoreLocation) {
      const trustStoreCertificate = await fetchCertificate(
        getDestinationServiceCredentials().uri,
        origin === 'provider'
          ? this.providerServiceToken.encoded
          : this.subscriberToken!.serviceJwt!.encoded,
        trustStoreLocation
      );
      return {
        ...destination,
        trustStoreCertificate
      };
    }
    return destination;
  }
}

function getDestinationService(): Service {
  const destinationService = getServiceBinding('destination');

  if (!destinationService) {
    throw Error('No binding to a destination service found.');
  }
  return destinationService;
}
