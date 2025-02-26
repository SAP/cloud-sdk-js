---
'@sap-cloud-sdk/connectivity': major
---

[Compatibility Note] The following deprecated content has been removed from the package:
  - The behaviour of `getAgentConfig()` function is changed to be asynchronous. The temporary asynchroneous function `getAgentConfigAsync()` has been removed.
  - The `destinationForServiceBinding()` function has been removed. Use `getDestinationFromServiceBinding()` instead.
  - The `PartialDestinationFetchOptions` type has been removed. Use either `ServiceBindingTransformOptions` or `getDestinationFromServiceBinding()` function.
  - The `serviceToken()` function no longer takes `xsuaaCredentials` as part of the `options` parameter.
  - The `parseDestination()` function is no longer a public API.
  - 
