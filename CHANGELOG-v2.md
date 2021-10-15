[//]: # "Please don't delete the following comments and keep them in the beginning of this document. Also, keep the first line empty."

[//]: # (Example known issue: Making OData requests using a proxy defined in the environment variables is not possible \(see improvements\).)
[//]: # (Example compatibility note: [core] Rename `entityConstructor`, `linkedEntity`, `fieldName` [properties]\(https://help.sap.com/doc/7f30fcdb8c424be9b1d4ecbfd7dd972f/1.0/en-US/classes/_sap_cloud_sdk_core.entity.html\) in generated entities to `_entityConstructor`, `_linkedEntity`, `_fieldName`.)
[//]: # (Example new functionality: [generator] Support the generation of clients for services using nested complex types.)
[//]: # (Example improvement: Allow setting the log levels of SDK loggers more conveniently through a single function [`setLogLevel\(\)`]\(https://help.sap.com/doc/7f30fcdb8c424be9b1d4ecbfd7dd972f/1.0/en-US/modules/_sap_cloud_sdk_util.html#setloglevel\).)
[//]: # (Example fixed issue: Fix the parameter type of `fromJson` method so that passing a json object with illegal attributes is not allowed. For example, `{ bupa : '1' }` cannot be passed to the method when building a `BusinessPartner`.)
[//]: # (Example function removed: [generator] Remove the option: `aggregatorDirectoryName`)
[//]: # (Example function moved: Move the following functions to `connectivity` package)

# Next

## Breaking Changes

### Function removed

- [generator] Remove the option: `aggregatorDirectoryName` and `aggregatorNpmPackageName`
- [generator] Remove aggregator package
- [connectivity] Created a new package with minimal API.

  | old API                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | new minimal API                                                                                                                                                                                                                                |
  | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | AllDestinations<br>AuthAndExchangeTokens<br>AuthenticationType<br>Cache<br>CacheEntry<br>CachingOptions<br>ClientCredentials<br>ClientCredentialsResponse<br>Destination<br>DestinationAccessorOptions<br>DestinationAuthToken<br>DestinationCertificate<br>DestinationConfiguration<br>DestinationForServiceBindingsOptions<br>DestinationJson<br>DestinationNameAndJwt<br>DestinationOptions<br>DestinationProxyType<br>DestinationRetrievalOptions<br>DestinationSelectionStrategies<br>DestinationSelectionStrategy<br>DestinationServiceCredentials<br>DestinationType<br>DestinationsByType<br>HttpAgentConfig<br>HttpsAgentConfig<br>IsolationStrategy<br>JwtKeyMapping<br>JwtPair<br>Protocol<br>ProxyConfiguration<br>ProxyConfigurationHeaders<br>ProxyStrategy<br>ResilienceOptions<br>Scope<br>Service<br>ServiceBinding<br>ServiceCredentials<br>Tenant<br>TokenKey<br>User<br>UserData<br>UserTokenResponse<br>VerifyJwtOptions<br>XsuaaServiceCredentials<br>addProxyConfigurationInternet<br>addProxyConfigurationOnPrem<br>alwaysProvider<br>alwaysSubscriber<br>audiences<br>basicHeader<br>buildAuthorizationHeaders<br>buildHeadersForDestination<br>checkMandatoryValue<br>circuitBreakerDefaultOptions<br>clientCredentialsTokenCache<br>customAttributes<br>decodeJwt<br>decodeJwtComplete<br>destinationCache<br>destinationForServiceBinding<br>destinationServiceCache<br>extractClientCredentials<br>fetchDestination<br>fetchInstanceDestinations<br>fetchSubaccountDestinations<br>fetchVerificationKeys<br>fetchVerificationKeys<br>fetchVerificationKeys<br>getAgentConfig<br>getAuthHeaders<br>getClientCredentialsToken<br>getDestination<br>getDestinationBasicCredentials<br>getDestinationCacheKey<br>getDestinationConfig<br>getDestinationFromDestinationService<br>getDestinationFromEnvByName<br>getDestinationService<br>getDestinationServiceCredentials<br>getDestinationServiceCredentialsList<br>getDestinationServiceUri<br>getDestinationsEnvVariable<br>getDestinationsFromEnv<br>getEnvironmentVariable<br>getGrantTokenCacheKey<br>getProtocolOrDefault<br>getService<br>getServiceCredentialsList<br>getServiceList<br>getSubdomainAndZoneId<br>getUserToken<br>getVcapService<br>getXsuaaServiceCredentials<br>isDestination<br>isDestinationConfiguration<br>isDestinationJson<br>isDestinationNameAndJwt<br>isIdenticalTenant<br>isUserToken<br>issuerUrl<br>jwtBearerToken<br>mappingTenantFields<br>mappingUserFields<br>noDestinationErrorMessage<br>parseDestination<br>parseProxyEnv<br>parseSubdomain<br>proxyAgent<br>proxyHostAndPort<br>proxyStrategy<br>readPropertyWithWarn<br>replaceSubdomain<br>resolveService<br>retrieveJwt<br>sanitizeDestination<br>searchEnvVariablesForDestination<br>searchServiceBindingForDestination<br>serviceToken<br>subscriberFirst<br>tenantFromJwt<br>tenantId<br>tenantName<br>toDestinationNameUrl<br>urlAndAgent<br>useOrFetchDestination<br>userEmail<br>userFamilyName<br>userFromJwt<br>userGivenName<br>userId<br>userName<br>userScopes<br>verificationKeyCache<br>verifyJwt<br>verifyJwtWithKey<br>wrapJwtInHeader | Destination<br>DestinationNameAndJwt<br>DestinationOptions<br>DestinationRetrievalOptions<br>buildHeadersForDestination<br>getAgentConfig<br>noDestinationErrorMessage<br>sanitizeDestination<br>toDestinationNameUrl<br>useOrFetchDestination |

### Function moved

- Move the following functions to `connectivity` package
  - `AllDestinations`
  - `AuthAndExchangeTokens`
  - `AuthenticationType`
  - `Cache`
  - `CacheEntry`
  - `CachingOptions`
  - `ClientCredentials`
  - `ClientCredentialsResponse`
  - `DestinationAccessorOptions`
  - `DestinationAuthToken`
  - `DestinationCertificate`
  - `DestinationConfiguration`
  - `DestinationForServiceBindingsOptions`
  - `DestinationJson`
  - `DestinationProxyType`
  - `DestinationSelectionStrategies`
  - `DestinationSelectionStrategy`
  - `DestinationServiceCredentials`
  - `DestinationType`
  - `DestinationsByType`
  - `HttpAgentConfig`
  - `HttpsAgentConfig`
  - `IsolationStrategy`
  - `JwtKeyMapping`
  - `JwtPair`
  - `Protocol`
  - `ProxyConfiguration`
  - `ProxyConfigurationHeaders`
  - `ProxyStrategy`
  - `ResilienceOptions`
  - `Scope`
  - `Service`
  - `ServiceBinding`
  - `ServiceCredentials`
  - `Tenant`
  - `TokenKey`
  - `User`
  - `UserData`
  - `UserTokenResponse`
  - `VerifyJwtOptions`
  - `XsuaaServiceCredentials`
  - `addProxyConfigurationInternet`
  - `addProxyConfigurationOnPrem`
  - `alwaysProvider`
  - `alwaysSubscriber`
  - `audiences`
  - `basicHeader`
  - `buildAuthorizationHeaders`
  - `checkMandatoryValue`
  - `circuitBreakerDefaultOptions`
  - `clientCredentialsTokenCache`
  - `customAttributes`
  - `decodeJwt`
  - `decodeJwtComplete`
  - `destinationCache`
  - `destinationForServiceBinding`
  - `destinationServiceCache`
  - `extractClientCredentials`
  - `fetchDestination`
  - `fetchInstanceDestinations`
  - `fetchSubaccountDestinations`
  - `fetchVerificationKeys`
  - `fetchVerificationKeys`
  - `fetchVerificationKeys`
  - `getAuthHeaders`
  - `getClientCredentialsToken`
  - `getDestination`
  - `getDestinationBasicCredentials`
  - `getDestinationCacheKey`
  - `getDestinationConfig`
  - `getDestinationFromDestinationService`
  - `getDestinationFromEnvByName`
  - `getDestinationService`
  - `getDestinationServiceCredentials`
  - `getDestinationServiceCredentialsList`
  - `getDestinationServiceUri`
  - `getDestinationsEnvVariable`
  - `getDestinationsFromEnv`
  - `getEnvironmentVariable`
  - `getGrantTokenCacheKey`
  - `getProtocolOrDefault`
  - `getService`
  - `getServiceCredentialsList`
  - `getServiceList`
  - `getSubdomainAndZoneId`
  - `getUserToken`
  - `getVcapService`
  - `getXsuaaServiceCredentials`
  - `isDestination`
  - `isDestinationConfiguration`
  - `isDestinationJson`
  - `isDestinationNameAndJwt`
  - `isIdenticalTenant`
  - `isUserToken`
  - `issuerUrl`
  - `jwtBearerToken`
  - `mappingTenantFields`
  - `mappingUserFields`
  - `parseDestination`
  - `parseProxyEnv`
  - `parseSubdomain`
  - `proxyAgent`
  - `proxyHostAndPort`
  - `proxyStrategy`
  - `readPropertyWithWarn`
  - `replaceSubdomain`
  - `resolveService`
  - `retrieveJwt`
  - `searchEnvVariablesForDestination`
  - `searchServiceBindingForDestination`
  - `serviceToken`
  - `subscriberFirst`
  - `tenantFromJwt`
  - `tenantId`
  - `tenantName`
  - `urlAndAgent`
  - `userEmail`
  - `userFamilyName`
  - `userFromJwt`
  - `userGivenName`
  - `userId`
  - `userName`
  - `userScopes`
  - `verificationKeyCache`
  - `verifyJwt`
  - `verifyJwtWithKey`
  - `wrapJwtInHeader`

### Signature changed

-

### Implementation changed

-

## Known Issues

-

## Compatibility Notes

-

## New Functionality

-

## Improvements

-

## Fixed Issues

-
