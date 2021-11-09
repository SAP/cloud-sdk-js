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
- [core] Remove the following functions:
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

### Function moved

- [core] Move the following functions to `connectivity` package
  - Destination,
  - DestinationNameAndJwt,
  - DestinationOptions,
  - DestinationRetrievalOptions,
  - buildHeadersForDestination,
  - getAgentConfig,
  - noDestinationErrorMessage,
  - sanitizeDestination,
  - toDestinationNameUrl,
  - useOrFetchDestination
- [core] Move the following functions to `http-client` package
  - DestinationHttpRequestConfig,
  - ExecuteHttpRequestFn,
  - HttpRequest,
  - HttpRequestConfig,
  - HttpRequestOptions,
  - HttpResponse,
  - Method,
  - addDestinationToRequestConfig,
  - buildAxiosRequestConfig,
  - buildCsrfHeaders,
  - buildHttpRequest,
  - execute,
  - executeHttpRequest,
  - filterCustomRequestConfig,
  - getAxiosConfigWithDefaults,
  - getAxiosConfigWithDefaultsWithoutMethod,
  - shouldHandleCsrfToken
- [core] Move the following functions to `openapi` package
  - ConstructorType,
  - FunctionReturnType,
  - OpenApiRequestBuilder,
  - ParametersType,
  - UnPromisify,
  - UnwrapAxiosResponse
- [core] Move the following functions to `odata-common` package
  - ActionFunctionImportRequestBuilderBase,
  - AllFields,
  - BatchChangeSet,
  - BatchRequestBuilder,
  - BatchResponse,
  - BatchResponseDeserializer,
  - BooleanFilterFunction,
  - CollectionField,
  - CollectionFilterFunction,
  - ComplexTypeField,
  - Constructable,
  - ConstructorOrField,
  - CreateRequestBuilderBase,
  - CustomField,
  - DeleteRequestBuilder,
  - EdmTypeCommon,
  - EdmTypeField,
  - EdmTypeShared,
  - EntityBase,
  - EntityBuilder,
  - EntityBuilderType,
  - EntityDeserializer,
  - EntityIdentifiable,
  - EntitySerializer,
  - EnumField,
  - ExclusiveEdmTypeV2,
  - ExclusiveEdmTypeV4,
  - Expandable,
  - Field,
  - FieldBuilder,
  - FieldOptions,
  - FieldType,
  - Filter,
  - FilterFunctionParameterType,
  - FilterFunctionPrimitiveParameterType,
  - FilterFunctionReturnType,
  - FilterLambdaExpression,
  - Filterable,
  - FunctionImportParameter,
  - FunctionImportParameters,
  - GetAllRequestBuilderBase,
  - GetByKeyRequestBuilderBase,
  - Link,
  - NumberFilterFunction,
  - ODataBatchRequestConfig,
  - ODataCreateRequestConfig,
  - ODataDeleteRequestConfig,
  - ODataFunctionImportRequestConfig,
  - ODataGetAllRequestConfig,
  - ODataGetByKeyRequestConfig,
  - ODataRequest,
  - ODataRequestConfig,
  - ODataUpdateRequestConfig,
  - ODataUri,
  - OneToManyLink,
  - OneToOneLink,
  - Orderable,
  - OrderableEdmTypeField,
  - OrderableFilterFunction,
  - PropertyMetadata,
  - RequestBuilder,
  - RequestMethodType,
  - ResponseDataAccessor,
  - Selectable,
  - StringFilterFunction,
  - Time,
  - UpdateRequestBuilderBase,
  - UriConverter,
  - and,
  - asc,
  - ceiling,
  - concat,
  - convertToUriForEdmString,
  - createFilterFunction,
  - createGetFilter,
  - createGetResourcePathForKeys,
  - day,
  - desc,
  - deserializeBatchResponse,
  - deserializersCommon,
  - endsWith,
  - entityDeserializer,
  - entitySerializer,
  - filterFunction,
  - filterFunctions,
  - floor,
  - getEntityKeys,
  - getOrderBy,
  - hour,
  - indexOf,
  - isNavigationProperty,
  - isOf,
  - length,
  - minute,
  - month,
  - not,
  - numberReturnTypeMapping,
  - or,
  - parseBatchResponse,
  - removePropertyOnCondition,
  - round,
  - second,
  - serializeBatchRequest,
  - serializeChangeSet,
  - serializeRequest,
  - serializersCommon,
  - startsWith,
  - substring,
  - throwErrorWhenReturnTypeIsUnionType,
  - toFilterableList,
  - toLower,
  - toUpper,
  - trim,
  - uriConvertersCommon,
  - year
- [core] Move the following functions to `odata-v2` package
  - CreateRequestBuilder,
  - CustomField,
  - DeleteRequestBuilder,
  - Entity,
  - FunctionImportRequestBuilder,
  - GetAllRequestBuilder,
  - GetByKeyRequestBuilder,
  - ODataBatchChangeSet,
  - ODataBatchRequestBuilder,
  - UpdateRequestBuilder,
  - deserializeComplexType,
  - edmToTs,
  - filterFunctions,
  - length,
  - oDataUri,
  - replace,
  - substring,
  - substringOf,
  - transformReturnValueForComplexType,
  - transformReturnValueForComplexTypeList,
  - transformReturnValueForEdmType,
  - transformReturnValueForEdmTypeList,
  - transformReturnValueForEntity,
  - transformReturnValueForEntityList,
  - transformReturnValueForUndefined
- [core] Move the following functions to `odata-v4` package
  - ActionImportParameter,
  - ActionImportRequestBuilder,
  - CreateRequestBuilder,
  - CustomField,
  - DeleteRequestBuilder,
  - Entity,
  - FunctionImportRequestBuilder,
  - GetAllRequestBuilder,
  - GetByKeyRequestBuilder,
  - ODataBatchChangeSet,
  - ODataBatchRequestBuilder,
  - UpdateRequestBuilder,
  - all,
  - any,
  - contains,
  - deserializeComplexType,
  - edmToTs,
  - filterFunction,
  - filterFunctions,
  - fractionalSeconds,
  - hasSubsequence,
  - hasSubset,
  - matchesPattern,
  - maxDateTime,
  - minDateTime,
  - now,
  - totalOffsetMinutes,
  - transformReturnValueForComplexType,
  - transformReturnValueForComplexTypeList,
  - transformReturnValueForEdmType,
  - transformReturnValueForEdmTypeList,
  - transformReturnValueForEntity,
  - transformReturnValueForEntityList,
  - transformReturnValueForUndefined,
  - uriConverter
  -

### Signature changed

-

### Implementation changed

-

## Known Issues

-

## Compatibility Notes

- Upgrade the ES version to `es2019`.

## New Functionality

- [connectivity] Create a new package with minimal API.
- [http-client] Create a new package with minimal API

## Improvements

-

## Fixed Issues

-
