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

- 

### Function moved

- 

### Signature changed

-

### Implementation changed

-
 
# 4.3.1
## Improvements

- [eslint-config] Open the peer dependency range of the `eslint` module to include version 8 and 9. Version 9 can now be used without the potentially unsafe npm flag `--legacy-peer-deps`. (6431463)

# 4.3.0
## New Features

- [connectivity] Support certificates in JKS format for `ClientCertificateAuthentication`. (ab96aff)

# 4.2.0
## New Features

- [generator, generator-common] Introduce option `generateESM` in OData generator to generate ESM compatible code. (c73c7fa)

## Fixed Issues

- [openapi] Fix missing `type: module` in generated `package.json` when `--generateESM` option is enabled. (e09754a)
- [openapi-generator] Improve the handling of arrays of enums (f17ca59)

# 4.1.2
## Fixed Issues

- [connectivity, http-client, openapi, resilience, util] Update `axios` to `1.12.2` to fix vulnerability to DoS attack. Refer [here](https://github.com/advisories/GHSA-4hjh-wcwx-xvwj) for more details. (011b841)

# 4.1.1
## Fixed Issues

- [connectivity, http-client, openapi, resilience, util] Update `axios` to `1.11.0` to use non-vulnerable version of `form-data`. (b502b40)

# 4.1.0
## Compatibility Notes

- [connectivity] The `getDestinationFromDestinationService()` function no longer verifies the incoming XSUAA JWT against the application's bound XSUAA instance. Consequently, the `cacheVerificationKeys` option is now deprecated and has no effect. (3c19ffa)

## Improvements

- [connectivity] Remove dependency on XSUAA service binding while retrieving destinations using `getDestinationFromDestinationService()` and `getAllDestinationsFromDestinationService()` functions. (3c19ffa)

# 4.0.2
## Fixed Issues

- [connectivity] Remove destination cache in `getDestinationFromServiceBinding()` function to let cached destinations retrieved in `getDestinationFromDestinationService()` function be added with the `proxyConfiguration` property.
  - @sap-cloud-sdk/resilience@4.0.2
  - @sap-cloud-sdk/util@4.0.2 (4a187d6)

# 4.0.1
## Fixed Issues

- [eslint-config] Downgrade `@stylistic/eslint-plugin` to v3 as v4 is EMS-only. (97ad0ad)

# 4.0.0
## Improvements

- [connectivity] Enable destination caching by default when retrieving destinations via the destination service. Change affects behavior of `getDestination()` method, `getAllDestinationsFromDestinationService()` method, generated client's `execute()` method and generic HTTP requests execution using `executeHttpRequest()`. (d69325a)
- [generator, odata-common, odata-v4] Support precision handling during serialization of `Edm.DateTimeOffset` fields in OData v4. (ab6ca60)

## Compatibility Notes

- [connectivity] The following deprecated content has been removed from the package:
  - The behaviour of `getAgentConfig()` function is changed to be asynchronous. The temporary asynchronous function `getAgentConfigAsync()` has been removed.
  - The `destinationForServiceBinding()` function has been removed. Use `getDestinationFromServiceBinding()` instead.
  - The `PartialDestinationFetchOptions` type has been removed. Use either `ServiceBindingTransformOptions` or `getDestinationFromServiceBinding()` function.
  - The `serviceToken()` function no longer takes `xsuaaCredentials` as part of the `options` parameter.
  - The `parseDestination()` function is no longer a public API.
  - The `DestinationForServiceBindingOptions` interface has been renamed to `DestinationFromServiceBindingOptions`. (7d92a1b)
- [connectivity] Disable `iasToXsuaaTokenExchange` by default if not defined. (25c9dd8)
- [odata-common] The following deprecated content has been removed from the package:
  - The `FunctionImportParameters` type has been removed. Use `OperationParameters` instead.
  - The `ODataFunctionImportRequestConfig` constant has been removed. Use `ODataFunctionRequestConfig` instead.
  - The `FunctionImportParameter` constant has been removed. Use `OperationParameter` instead.
  - The `ActionFunctionImportRequestBuilderBase` constant has been removed. Use `OperationRequestBuilderBase` instead. (7d92a1b)
- [odata-v2] The following deprecated content has been removed from the package:
  - The `ODataFunctionImportRequestConfig` constant has been removed. Use `ODataFunctionRequestConfig` instead.
  - The `FunctionImportRequestBuilder` constant has been removed. Use `OperationRequestBuilder` instead. (7d92a1b)
- [odata-v4] The following deprecated content has been removed from the package:
  - The `ODataFunctionImportRequestConfig` constant has been removed. Use `ODataFunctionRequestConfig` instead.
  - The `ActionImportParameter` class has been removed. Use `OperationParameter` instead.
  - The `ActionImportParameters` type has been removed. Use `OperationParameters` instead.
  - The `FunctionImportRequestBuilder` class has been removed. Use `OperationRequestBuilder` instead.
  - The `BoundFunctionImportRequestBuilder` class has been removed. Use `OperationRequestBuilder` instead.
  - The `BoundActionImportRequestBuilder` class has been removed. Use `OperationRequestBuilder` instead.
  - The `ODataActionImportRequestConfig` constant has been removed. Use `ODataActionRequestConfig` instead.
  - The `ODataBoundActionImportRequestConfig` class has been removed. Use `ODataBoundActionRequestConfig` instead.
  - The `OdataBoundFunctionImportRequestConfig` constant has been removed. Use `ODataBoundFunctionRequestConfig` instead.
  - The `ActionImportRequestBuilder` class has been removed. Use `OperationRequestBuilder` instead. (7d92a1b)
- [resilience] The following deprecated content has been removed from the package:
  - The `circuitBreakerHttp` constant has been removed. Use `circuitBreaker` instead. (7d92a1b)
- [util] The following deprecated content has been removed from the package:
  - The `assoc` constant has been removed. There is no replacement. (7d92a1b)
