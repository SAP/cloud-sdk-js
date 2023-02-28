# @sap-cloud-sdk/connectivity

## 3.0.0

### Major Changes

- 300cb37bb: [Compatibility Note] The generic types of `JwtKeyMapping` is simplified so the second type argument `JwtKeysT` are always strings.
- 300cb37bb: [Compatibility Note] The `Protocol` enum was replaced with a string literal union type. Now, instead of passing `Protocol.HTTPS` pass 'https'.
- 300cb37bb: [Compatibility Note] Remove the options `timeout` and `enableCircuitBreaker` from all BTP service interactions i.e. destination and token fetching.
- 300cb37bb: [Compatibility Note] Switch the compilerOptions.module to `Node16` instead of `CommonJS` for better interoperability with ES modules. See the [TypeScript handbook](https://www.typescriptlang.org/docs/handbook/esm-node.html) for technical details if needed.
- 300cb37bb: [Compatibility Note] The enum `IsolationStrategy` was replaced with a string literal union type of the same name. Use 'tenant' and 'tenant-user' instead of `IsolationStrategy.Tenant` and `IsolationStrategy.Tenant_User`.
- 300cb37bb: [Improvement] Replace `Protocol` enum with a string literal union type.
- 300cb37bb: [Compatibility Note]] The `url` property in `Destination` is now optional as destinations of type `MAIL` do not have a URL.
- 300cb37bb: [Improvement] Replace `IsolationStrategy` enum with union type.

### Minor Changes

- 300cb37bb: [New Functionality] Support `OAuth2RefreshToken` authentication type
- 300cb37bb: [New Functionality] Add a `retry` option in the `DestinationFetchOption`.
  Enable this options if the token exchange done by the destination service is unstable.
- 300cb37bb: [Fixed Issue] Fix the combination of providing the `iss` together with `OnPremise` basic destinations.
- 300cb37bb: [New Functionality] Add `ResilienceOptions` and `resilience()` function. The function returns an array of middlewares based on the provided options.

### Patch Changes

- Updated dependencies [300cb37bb]
- Updated dependencies [300cb37bb]
- Updated dependencies [300cb37bb]
- Updated dependencies [300cb37bb]
- Updated dependencies [300cb37bb]
- Updated dependencies [300cb37bb]
- Updated dependencies [300cb37bb]
  - @sap-cloud-sdk/util@3.0.0
  - @sap-cloud-sdk/resilience@3.0.0

## 2.11.0

### Patch Changes

- @sap-cloud-sdk/util@2.11.0

## 2.10.0

### Patch Changes

- @sap-cloud-sdk/util@2.10.0

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
