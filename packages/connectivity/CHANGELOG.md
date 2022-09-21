# @sap-cloud-sdk/connectivity

## 2.9.0

### Minor Changes

- 24029503: [New Functionality] Support fetching all subaccount- and service instance destinations from the destination service simultaneously.

### Patch Changes

- Updated dependencies [4c51d3dc]
  - @sap-cloud-sdk/util@2.9.0

## 2.8.0

### Minor Changes

- 15e9ef4b: [Fixed Issue] Remove last explicit references to 'VCAP_SERVICES' and replace them with '@sap/xsenv'.
- 15e9ef4b: [Fixed Issue] Fix that unparsable destinations in the subaccount prevent other destinations from beeing fetched.

### Patch Changes

- 15e9ef4b: [Improvement] Reduce default logs for failing requests in @sap-cloud-sdk/http-client.
  - @sap-cloud-sdk/util@2.8.0

## 2.7.1

### Patch Changes

- @sap-cloud-sdk/util@2.7.1

## 2.7.0

### Minor Changes

- 3bff42e1: [Fixed Issue] Fix a breaking change of `serviceToken` introduced in 2.0, so it accepts `XsuaaServiceCredentials` again as an option.
- 010a46fa: [Improvement] Support consumption of the XSUAA API via destinations.

### Patch Changes

- @sap-cloud-sdk/util@2.7.0

## 2.6.0

### Minor Changes

- cb598c16: [New Functionality] Support JWTs without a `JKU` property.
- 09094607: [New Functionality] Add interface `DestinationCacheInterface` and method `setDestinationCache` to support implementation of custom destination cache.
- 93d41281: [New Functionality] Fetch client credential token for destinations created by service bindings.
- 8fdfebd6: [Fixed Issue] Fix `getDestination()` to allow passing an async transform function `serviceBindingTransformFn` in `options`. The transform function can also be passed by `execute()`, `executeHttpRequest()`, `executeRaw()`, etc.
  [Compatibility Note] Rename `transformationFn` into `serviceBindingTransformFn` in `DestinationForServiceBindingsOptions` to avoid ambiguity and make the function async.

### Patch Changes

- @sap-cloud-sdk/util@2.6.0

## 2.5.0

### Patch Changes

- Updated dependencies [89f1c423]
  - @sap-cloud-sdk/util@2.5.0

## 2.4.0

### Minor Changes

- 04726a35: [Improvement] Reduce default log output on the `info` level significantly.
- 04726a35: [Compatibility Note] Only log the successful retrieval of destinations on the`info` log level, log everything else is on the `debug` or `warn` level.
- 0a008674: [Compatibility Note] Mark the function `noDestinationErrorMessage` as internal API.
- 0a008674: [New Functionality] Support self-signed certificate using the `trustStore` property of the destination object.

### Patch Changes

- Updated dependencies [0a008674]
  - @sap-cloud-sdk/util@2.4.0
