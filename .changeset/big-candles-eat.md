---
'@sap-cloud-sdk/connectivity': major
'@sap-cloud-sdk/odata-common': major
'@sap-cloud-sdk/resilience': major
'@sap-cloud-sdk/odata-v2': major
'@sap-cloud-sdk/odata-v4': major
'@sap-cloud-sdk/util': major
---

[Compatibility Note] `@sap-cloud-sdk/connectivity`
  - The behaviour of `getAgentConfig()` function is changed to be asynchronous. The temporary asynchroneous function `getAgentConfigAsync()` has been removed.
  - The `destinationForServiceBinding()` function has been removed. Use `getDestinationFromServiceBinding()` instead.
  - The `PartialDestinationFetchOptions` type has been removed. Use either `ServiceBindingTransformOptions` or `getDestinationFromServiceBinding()` function.
[Compatibility Note] `@sap-cloud-sdk/odata-common`
  - The `FunctionImportParameters` type has been removed. Use `OperationParameters` instead.
  - The `ODataFunctionImportRequestConfig` constant has been removed. Use `ODataFunctionRequestConfig` instead.
  - The `FunctionImportParameter` constant has been removed. Use `OperationParameter` instead.
  - The `ActionFunctionImportRequestBuilderBase` constant has been removed. Use `OperationRequestBuilderBase` instead.
[Compatibility Note] `@sap-cloud-sdk/odata-v2`
  - The `ODataFunctionImportRequestConfig` constant has been removed. Use `ODataFunctionRequestConfig` instead.
  - The `FunctionImportRequestBuilder` constant has been removed. Use `OperationRequestBuilder` instead.
[Compatibility Note] `@sap-cloud-sdk/odata-v4`
  - The `ODataFunctionImportRequestConfig` constant has been removed. Use `ODataFunctionRequestConfig` instead.
  - The `ActionImportParameter` class has been removed. Use `OperationParameter` instead.
  - The `ActionImportParameters` type has been removed. Use `OperationParameters` instead.
  - The `FunctionImportRequestBuilder` class has been removed. Use `OperationRequestBuilder` instead.
  - The `BoundFunctionImportRequestBuilder` class has been removed. Use `OperationRequestBuilder` instead.
  - The `BoundActionImportRequestBuilder` class has been removed. Use `OperationRequestBuilder` instead.
  - The `ODataActionImportRequestConfig` constant has been removed. Use `ODataActionRequestConfig` instead.
  - The `ODataBoundActionImportRequestConfig` class has been removed. Use `ODataBoundActionRequestConfig` instead.
  - The `OdataBoundFunctionImportRequestConfig` constant has been removed. Use `ODataBoundFunctionRequestConfig` instead.
  - The `ActionImportRequestBuilder` class has been removed. Use `OperationRequestBuilder` instead.
[Compatibility Note] `@sap-cloud-sdk/resilience`
  - The `circuitBreakerHttp` constant has been removed. Use `circuitBreaker` instead.
[Compatibility Note] `@sap-cloud-sdk/util`
  - The `assoc` constant has been removed. There is no replacement.
