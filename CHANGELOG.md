[//]: # (Please don't delete the following comments and keep them in the beginning of this document. Also, keep the first line empty.)

[//]: # (Example known issue: Making OData requests using a proxy defined in the environment variables is not possible \(see improvements\).)
[//]: # (Example compatibility note: [core] Rename `entityConstructor`, `linkedEntity`, `fieldName` [properties]\(https://help.sap.com/doc/7f30fcdb8c424be9b1d4ecbfd7dd972f/1.0/en-US/classes/_sap_cloud_sdk_core.entity.html\) in generated entities to `_entityConstructor`, `_linkedEntity`, `_fieldName`.)
[//]: # (Example new functionality: [generator] Support the generation of clients for services using nested complex types.)
[//]: # (Example improvement: Allow setting the log levels of SDK loggers more conveniently through a single function [`setLogLevel\(\)`]\(https://help.sap.com/doc/7f30fcdb8c424be9b1d4ecbfd7dd972f/1.0/en-US/modules/_sap_cloud_sdk_util.html#setloglevel\).)
[//]: # (Example fixed issue: Fix the parameter type of `fromJson` method so that passing a json object with illegal attributes is not allowed. For example, `{ bupa : '1' }` cannot be passed to the method when building a `BusinessPartner`.)

# Next

## Known Issues

-

## Compatibility Notes

-

## New Functionalities

-

## Improvements

-

## Fixed Issues

-

# 2.9.0

API Docs: https://sap.github.io/cloud-sdk/api/2.9.0

## New Functionalities

- [connectivity] Support fetching all subaccount- and service instance destinations from the destination service simultaneously. (24029503)
- [mail-client] Expose SMTP transport options of `nodemailer`. (d1bf2dee)
- [util] Add method `setGlobalTransports` to support setting custom transport globally. (4c51d3dc)

## Improvements

- [odata-common] Make OderBy() set in asscending order by defalt. (f62eb0d3)

# 2.8.0

API Docs: https://sap.github.io/cloud-sdk/api/2.8.0

## Compatibility Notes

- [eslint-config] Activated the eslint rule 'check-tag-names' to allowed jsdoc tags. If you use custom tags add them via the 'definedTags' in the eslint options. (15e9ef4b)
- [generator] Deprecated `generateNpmrc` cli option. This option was only used to configure the now defunct npm registry hosted by SAP. It now has no effect anymore and should be removed in all invocations of the generator cli. (15e9ef4b)
- [generator, openapi-generator, generator-common] Description for package.json in a generated client has changed. (15e9ef4b)

## New Functionalities

- [mail-client] Support defining the strategy of sending emails. By default, the emails are sent "in parallel" and can be set to "in sequential". (15e9ef4b)
- [odata-common, generator] Allow function imports using GET http method in batch requests. (15e9ef4b)

## Improvements

- [connectivity] Reduce default logs for failing requests in @sap-cloud-sdk/http-client.
  - @sap-cloud-sdk/util@2.8.0 (15e9ef4b)

## Fixed Issues

- [connectivity] Remove last explicit references to 'VCAP_SERVICES' and replace them with '@sap/xsenv'. (15e9ef4b)
- [connectivity] Fix that unparsable destinations in the subaccount prevent other destinations from beeing fetched. (15e9ef4b)

# 2.7.1

API Docs: https://sap.github.io/cloud-sdk/api/2.7.1

## Fixed Issues

- [mail-client] Fix proxy authorization for sending emails.
  - @sap-cloud-sdk/connectivity@2.7.1
  - @sap-cloud-sdk/util@2.7.1 (e7fa8d35)

# 2.7.0

API Docs: https://sap.github.io/cloud-sdk/api/2.7.0

## New Functionalities

- [openapi-generator] Support globs in the `input` option. (3f70b0c9)

## Improvements

- [connectivity] Support consumption of the XSUAA API via destinations. (010a46fa)

## Fixed Issues

- [connectivity] Fix a breaking change of `serviceToken` introduced in 2.0, so it accepts `XsuaaServiceCredentials` again as an option. (3bff42e1)

# 2.6.0

API Docs: https://sap.github.io/cloud-sdk/api/2.6.0

## Compatibility Notes

- [odata-v4, temporal-de-serializers] Adjust parsing of `Edm.Date`, `Edm.DateTimeOffset`, `Edm.Time`, and `Edm.Duration` to be closer to the OData v4 specification.
  There may be loss of precision if using the default (de-)serializers with high-precision fractional seconds. (de851289)
- [generator] Deprecate generator option `versionInPackageJson`. If you need to set the version, use the new `include` option to add your own `package.json` file instead. (069aa168)
- [generator] The hidden generator option `additionalFiles` is renamed to `include`. (069aa168)

## New Functionalities

- [connectivity] Support JWTs without a `JKU` property. (cb598c16)
- [connectivity] Add interface `DestinationCacheInterface` and method `setDestinationCache` to support implementation of custom destination cache. (09094607)
- [connectivity] Fetch client credential token for destinations created by service bindings. (93d41281)
- [generator] New generator option `include` which allows to add files to generated packages. (069aa168)

## Improvements

- [http-client] Make `requestConfig` of `OriginOptions` optional. (e46bb51d)

## Fixed Issues

- [connectivity] Fix `getDestination()` to allow passing an async transform function `serviceBindingTransformFn` in `options`. The transform function can also be passed by `execute()`, `executeHttpRequest()`, `executeRaw()`, etc.
  [Compatibility Note] Rename `transformationFn` into `serviceBindingTransformFn` in `DestinationForServiceBindingsOptions` to avoid ambiguity and make the function async. (8fdfebd6)
- [http-client] Fix the `executeHttpRequest`/`executeHttpRequestWithOrigin` function, so the warning is only shown when overwriting headers by using custom headers. (e44c214a)
- [odata-common, odata-v4, temporal-de-serializers] Fix parsing of `Edm.DateTimeOffset` with high-precision fractional seconds and edge-cases like 5-digit years. (de851289)
- [odata-common, generator] Allow OData service to contain an entity name 'entity'. (0675ee3b)
- [odata-v2] Support negative epoch timestamps in serialization. (9ffe0824)

# 2.5.0

API Docs: https://sap.github.io/cloud-sdk/api/2.5.0

## Compatibility Notes

- [odata-common, generator] Change `Edm.String`, `Edm.Boolean` and `Edm.Guid` to be orderable to support `lt`/`lessThan()`, `le`/`lessOrEqual()`, `gt`/`greaterThan()`, and `ge`/`greaterOrEqual` operators. Re-generate odata services to adopt the changes. (c3166ff6)
- [util] Stop using `VCAP_SERVICES` to determine the log format. Use `setLogFormat` and `setGlobalLogFormat` to specify the log format. By default, the log format is set to `kibana` for `NODE_ENV=production` and `local` otherwise. (89f1c423)

## Fixed Issues

- [http-client] Fix the `executeHttpRequest` function, so it accepts the same parameters as in version 1.
  [Compatibility Note] Deprecate one overload of the `executeHttpRequest` function, that accepts `HttpRequestConfigWithOrigin` as a parameter. Use the new function `executeHttpRequestWithOrigin` as replacement.
  [New Functionality] Support defining header options and query parameter options with origins. (9481ec69)

# 2.4.0

API Docs: https://sap.github.io/cloud-sdk/api/2.4.0

## Compatibility Notes

- [connectivity] Mark the function `noDestinationErrorMessage` as internal API. (0a008674)
- [odata-v4] Mark the function `uriConverter` as internal API. (0a008674)
- [eslint-config] Switch the following `jsdoc` related levels from `warn` to `error`:
  - `jsdoc/check-param-names`
  - `jsdoc/require-description-complete-sentence`
  - `jsdoc/require-jsdoc`
  - `jsdoc/require-param`
  - `jsdoc/require-returns` (0a008674)
- [connectivity, http-client] Only log the successful retrieval of destinations on the `info` log level, log everything else as `debug` or `warn`. (04726a35)

## New Functionality

- [connectivity] Support self-signed certificate using the `trustStore` property of the destination object. (0a008674)

## Improvements

- [connectivity, http-client] Reduce default log output on the `info` level significantly. (04726a35)

## Fixed Issues

- [util] Fix a bug in the implementation of the trim method. (0a008674)

# 2.3.0

Release Date: TBD<br>
API Docs: https://sap.github.io/cloud-sdk/api/2.3.0<br>
Blog: TBD<br>

## Compatibility Notes

- [odata-common, odata-v2, odata-v4] Remove all `$format=json` query parameters since header `Accept: application/json` is sent by default.

## New Functionality

- [odata-common] Generate mandatory `Content-Id` headers for changeset parts in batch request payloads (see [OData Spec](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_MultipartBatchRequestBody)).
- [odata-common] Support transforming response data for function and action imports before deserialization. [#682](https://github.com/SAP/cloud-sdk-js/issues/682).

## Improvements

- [generator] Change log level from `warn` to `error` if service path cannot be determined from the service specification (`VALUE_IS_UNDEFINED`).
- [generator] Reduce memory usage of `schema` in API classes (e.g., `BusinessPartnerAPI`).

## Fixed Issues

- [openapi-generator, openapi] Support path parameters that are not separated by '/', e.g., `/path/{param}:{param}`.

# 2.2.0

Release Date: Apr 06, 2022<br>
API Docs: https://sap.github.io/cloud-sdk/api/2.2.0<br>
Blog: TBD<br>

## Compatibility Notes

- [eslint-config] Since the `valid-jsdoc` rule is deprecated in ESLint, it is replaced by the `eslint-plugin-jsdoc` plugin for checking JSDoc comments. To stop your project from using a specific rule, turn it off by setting the rule ID to `off` under the `rules` key inside your configuration file.
- [generator] Stop exporting service classes (e.g., `BusinessPartnerService`) from generated clients, use `businessPartnerService()` instead.
- [generator] Stop exporting API classes (e.g., `BusinessPartnerAPI`) from generated clients, use `businessPartnerService().businessPartnerApi` instead.

## New Functionality

- [http-client] Introduce the `parameterEncoder` option to the request config of the `http-client` to allow custom parameter encoding.
- [http-client] Remove `method` from `defaultDisallowedKeys` to not filter out custom http method when using `filterCustomRequestConfig`.
- [odata-common] Support adding custom http method in `addCustomRequestConfiguration` to overwrite the default http method.
- [openapi] Support adding custom http method in `addCustomRequestConfiguration` to overwrite the default http method.

## Improvements

- [generator] Remove unused imports (e.g, `moment`, `bignumber.js` and `EdmTypeField`) in API classes (e.g., `BusinessPartnerAPI`) to reduce memory usage.
- [http-client] Introduce consistent query parameter encoding for all non custom parameters.

# 2.1.0

Release Date: Feb 17, 2022<br>
API Docs: https://sap.github.io/cloud-sdk/api/2.1.0<br>
Blog: TBD<br>

## Improvements

- [connectivity] Add details to error message for missing "URL" properties in destinations.
- [util] Add `sanitizeRecord` function to `cloud-sdk-logger` which replaces potentially sensitive information in a `Record<string, any>` based on a list of sensitive keys.
- [generator] The new CLI option `licenceInPackageJson` offers the possibility to specify the license property in a generated `package.json`.
- [connectivity] Use the cache of `xssec` library to cache verification certificates.

## Fixed Issues

- [openapi-generator] Add `@sap-cloud-sdk/openapi` as a dependency to the OpenAPI generator to fix errors during generation with `--transpile` enabled.
- [connectivity] Fix an issue when using registering destinations with a JWT but without XSUAA service binding.
- [connectivity] Fix a missing export `DestinationSelectionStrategies`.
- [odata-common] Fix URL encoding for `getByKey`

# 2.0.0

Release Date: Feb 03, 2022<br>
API Docs: https://sap.github.io/cloud-sdk/api/2.0.0<br>
Blog: TBD<br>

### Function removed

- [generator] Remove the option: `aggregatorDirectoryName` and `aggregatorNpmPackageName`
- [generator] Remove the option: `generateTypedocJson`
- [generator] Remove `packageJson` function from aggregator-package
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
  - `DestinationServiceCredentials`
  - `DestinationType`
  - `DestinationsByType`
  - `EdmTypeForEdmOrFieldType`
  - `HttpAgentConfig`
  - `HttpsAgentConfig`
  - `IsolationStrategy`
  - `JwtKeyMapping`
  - `JwtPair`
  - `MapType`
  - `ODataBatchChangeSet`
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
  - `applySuffixOnConflict`
  - `applySuffixOnConflictDash`
  - `applyPrefixOnJsConfictParam`
  - `applySuffixOnConflictUnderscore`
  - `applyPrefixOnJsConfictFunctionImports`
  - `assocSome`
  - `asyncPipe`
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
  - `errorWithCause`
  - `extractClientCredentials`
  - `fetchDestination`
  - `fetchInstanceDestinations`
  - `fetchSubaccountDestinations`
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
  - `legacyNoAuthOnPremiseProxy`
  - `mappingTenantFields`
  - `mappingUserFields`
  - `mergeSome`
  - `parseDestination`
  - `parseProxyEnv`
  - `parseSubdomain`
  - `parseType`
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
  - `convertToNumber`

- [analytics] Remove the `@sap-cloud-sdk/analytics` package

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
- [core] Move the following functions to `generator-common` package
  - helpfulLinksSection

### Signature changed

- [core] `EdmTypeField` only support EDM types, no field types in generics

### Implementation changed

- [generator] changed the following implementations
  - `ServiceNameFormatter` deprecated constructor removed, reserverdName parameter from typeNameToFactoryName method removed
  - `VdmNavigationpropety` multiplicity, isMultiLink removed
  - `VdmFunctionImportReturnType` isMulti removed
- [openapi] changed the following implementations
  - `execute` Request Builder APIs changed to use single parameter, either a Destination or DestinationFetchOptions.
  - `executeRaw` Request Builder APIs changed to use single parameter, either a Destination or DestinationFetchOptions.
- [odata-common] changed the following implementations
  - `ComplexTypeField` deprecated constructors removed
  - `Constructable` Selectable removed
  - `CreateRequestBuilderBase` prepare removed
  - `EntityBase` getCurrentMapKey, initializeCustomFields removed
  - `EnumField` edmType removed
  - `Filter` \_fieldName property removed
  - `FilterFunction` toString, transformParameter removed
  - `Link` clone, selects removed
  - `MethodRequestBuilder` withCustomHeaders, withCustomQueryParameters, withCustomServicePath removed, build protected
  - `ODataRequestConfig` contentType, deprecated constructor removed
  - `ODataBatchRequestConfig` batchId, content_type_prefix removed
  - `OneToOneLink` clone removed
  - `UpdateRequestBuilderBase` prepare, requiredFields, ignoredFields, withCustomVersionIdentifier removed
  - `execute` Request Builder APIs changed to use single parameter, either a Destination or DestinationFetchOptions..
  - `executeRaw` Request Builder APIs changed to use single parameter, either a Destination or DestinationFetchOptions.
- [odata-v2] changed the following implementations
  - `execute` Request Builder APIs changed to use single parameter, either a Destination or DestinationFetchOptions.
  - `executeRaw` Request Builder APIs changed to use single parameter, either a Destination or DestinationFetchOptions.
- [odata-v4] changed the following implementations
  - `execute` Request Builder APIs changed to use single parameter, either a Destination or DestinationFetchOptions.
  - `executeRaw` Request Builder APIs changed to use single parameter, either a Destination or DestinationFetchOptions.
- [connectivity] changed the following implementations
  - `getDestination` changed to use DestinationFetchOptions as single parameter.
  - `getProxyRelatedAuthHeaders` legacyNoAuthOnPremiseProxy case removed
  - `serviceToken` uses jwt instead of userJwt now.
  - `jwtBearerToken` uses jwt instead of userJwt now.
  - `fetchVerificationKeys` merged with `executeFetchVerificationKeys`, now only accepts url as parameter
- [http-client] changed the following implementations
  - `executeHttpRequest` fetches CsrfToken for non-GET requests by default.

## Known Issues

-

## Compatibility Notes

- Upgrade the ES version to `es2019`.

## New Functionality

- [connectivity] Create a new package with minimal API.
- [connectivity] Add `registerDestination` function to create destinations in the `destinations` environment variable.
- [connectivity] Support the `SamlAssertion` flow in destination retrieval.
- [http-client] Create a new package with minimal API.

## Improvements

-

## Fixed Issues

-
