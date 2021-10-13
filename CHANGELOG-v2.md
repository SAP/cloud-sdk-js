This changelog contains all changes introduced by v2

# 2.0.0

Release Date: TBD<br>
API Docs: https://sap.github.io/cloud-sdk/api/2.00.0<br>
Blog: TBD<br>

## Breaking Changes

- [generator] Remove aggregator package
- [connectivity] Created a new package with minimal API.

  |old API|new minimal API|
  |---|---|
  |AllDestinations<br>AuthAndExchangeTokens<br>AuthenticationType<br>Cache<br>CacheEntry<br>CachingOptions<br>ClientCredentials<br>ClientCredentialsResponse<br>Destination<br>DestinationAccessorOptions<br>DestinationAuthToken<br>DestinationCertificate<br>DestinationConfiguration<br>DestinationForServiceBindingsOptions<br>DestinationJson<br>DestinationNameAndJwt<br>DestinationOptions<br>DestinationProxyType<br>DestinationRetrievalOptions<br>DestinationSelectionStrategies<br>DestinationSelectionStrategy<br>DestinationServiceCredentials<br>DestinationType<br>DestinationsByType<br>HttpAgentConfig<br>HttpsAgentConfig<br>IsolationStrategy<br>JwtKeyMapping<br>JwtPair<br>Protocol<br>ProxyConfiguration<br>ProxyConfigurationHeaders<br>ProxyStrategy<br>ResilienceOptions<br>Scope<br>Service<br>ServiceBinding<br>ServiceCredentials<br>Tenant<br>TokenKey<br>User<br>UserData<br>UserTokenResponse<br>VerifyJwtOptions<br>XsuaaServiceCredentials<br>addProxyConfigurationInternet<br>addProxyConfigurationOnPrem<br>alwaysProvider<br>alwaysSubscriber<br>audiences<br>basicHeader<br>buildAuthorizationHeaders<br>buildHeadersForDestination<br>checkMandatoryValue<br>circuitBreakerDefaultOptions<br>clientCredentialsTokenCache<br>customAttributes<br>decodeJwt<br>decodeJwtComplete<br>destinationCache<br>destinationForServiceBinding<br>destinationServiceCache<br>extractClientCredentials<br>fetchDestination<br>fetchInstanceDestinations<br>fetchSubaccountDestinations<br>fetchVerificationKeys<br>fetchVerificationKeys<br>fetchVerificationKeys<br>getAgentConfig<br>getAuthHeaders<br>getClientCredentialsToken<br>getDestination<br>getDestinationBasicCredentials<br>getDestinationCacheKey<br>getDestinationConfig<br>getDestinationFromDestinationService<br>getDestinationFromEnvByName<br>getDestinationService<br>getDestinationServiceCredentials<br>getDestinationServiceCredentialsList<br>getDestinationServiceUri<br>getDestinationsEnvVariable<br>getDestinationsFromEnv<br>getEnvironmentVariable<br>getGrantTokenCacheKey<br>getProtocolOrDefault<br>getService<br>getServiceCredentialsList<br>getServiceList<br>getSubdomainAndZoneId<br>getUserToken<br>getVcapService<br>getXsuaaServiceCredentials<br>isDestination<br>isDestinationConfiguration<br>isDestinationJson<br>isDestinationNameAndJwt<br>isIdenticalTenant<br>isUserToken<br>issuerUrl<br>jwtBearerToken<br>mappingTenantFields<br>mappingUserFields<br>noDestinationErrorMessage<br>parseDestination<br>parseProxyEnv<br>parseSubdomain<br>proxyAgent<br>proxyHostAndPort<br>proxyStrategy<br>readPropertyWithWarn<br>replaceSubdomain<br>resolveService<br>retrieveJwt<br>sanitizeDestination<br>searchEnvVariablesForDestination<br>searchServiceBindingForDestination<br>serviceToken<br>subscriberFirst<br>tenantFromJwt<br>tenantId<br>tenantName<br>toDestinationNameUrl<br>urlAndAgent<br>useOrFetchDestination<br>userEmail<br>userFamilyName<br>userFromJwt<br>userGivenName<br>userId<br>userName<br>userScopes<br>verificationKeyCache<br>verifyJwt<br>verifyJwtWithKey<br>wrapJwtInHeader|Destination<br>DestinationNameAndJwt<br>DestinationOptions<br>DestinationRetrievalOptions<br>buildHeadersForDestination<br>getAgentConfig<br>noDestinationErrorMessage<br>sanitizeDestination<br>toDestinationNameUrl<br>useOrFetchDestination|


## New Functionality

-

## Improvements

-

## Known Issues

-

## Compatibility Notes

-

## Fixed Issues

-
