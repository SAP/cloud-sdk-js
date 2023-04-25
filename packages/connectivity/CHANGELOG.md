# @sap-cloud-sdk/connectivity

## 3.1.1

### Patch Changes

- Updated dependencies [166a16d82]
  - @sap-cloud-sdk/resilience@3.1.1
  - @sap-cloud-sdk/util@3.1.1

## 3.1.0

### Minor Changes

- 039412e59: [New Functionality] Add support for authentication type `NoAuthentication` on-premise destinations.
- 28b7af86f: [Compatibility Note] The combination of `iss` and `jwt` is now supported when fetching destinations. When both properties are set, the `iss` property is no longer ignored.
- 28b7af86f: [New Functionality] Allow combination of `iss` an `jwt` when fetching a destination. In this case the `iss` URL will be used to fetch the destination service token and `jwt` will be used for the `x-user-token` header of user based authentication types.

### Patch Changes

- @sap-cloud-sdk/resilience@3.1.0
- @sap-cloud-sdk/util@3.1.0

## 3.0.2

### Patch Changes

- 47fc7278d: [Fixed Issue] Fix the `The proxy configuration is undefined` error for OnPrem `MAIL` destinations by removing the `isHttpDestination` check when adding proxyConfiguration to the destination object.
  - @sap-cloud-sdk/resilience@3.0.2
  - @sap-cloud-sdk/util@3.0.2

## 3.0.1

### Patch Changes

- Updated dependencies [fcab06c4b]
  - @sap-cloud-sdk/resilience@3.0.1
  - @sap-cloud-sdk/util@3.0.1

## 3.0.0

### Major Changes

- fde964e37: [Compatibility Note] The generic types of `JwtKeyMapping` is simplified so the second type argument `JwtKeysT` are always strings.
- fde964e37: [Compatibility Note] The `Protocol` enum was replaced with a string literal union type. Now, instead of passing `Protocol.HTTPS` pass 'https'.
- fde964e37: [Compatibility Note] Remove the options `timeout` and `enableCircuitBreaker` from all BTP service interactions i.e. destination and token fetching.
- fde964e37: [Compatibility Note] Switch the compilerOptions.module to `Node16` instead of `CommonJS` for better interoperability with ES modules. See the [TypeScript handbook](https://www.typescriptlang.org/docs/handbook/esm-node.html) for technical details if needed.
- fde964e37: [Compatibility Note] The enum `IsolationStrategy` was replaced with a string literal union type of the same name. Use 'tenant' and 'tenant-user' instead of `IsolationStrategy.Tenant` and `IsolationStrategy.Tenant_User`.
- fde964e37: [Improvement] Replace `Protocol` enum with a string literal union type.
- fde964e37: [Compatibility Note]] The `url` property in `Destination` is now optional as destinations of type `MAIL` do not have a URL.
- fde964e37: [Improvement] Replace `IsolationStrategy` enum with union type.

### Minor Changes

- fde964e37: [New Functionality] Support `OAuth2RefreshToken` authentication type
- fde964e37: [New Functionality] Add a `retry` option in the `DestinationFetchOption`.
  Enable this options if the token exchange done by the destination service is unstable.
- fde964e37: [Fixed Issue] Fix the combination of providing the `iss` together with `OnPremise` basic destinations.
- fde964e37: [New Functionality] Add `ResilienceOptions` and `resilience()` function. The function returns an array of middlewares based on the provided options.

### Patch Changes

- Updated dependencies [fde964e37]
- Updated dependencies [fde964e37]
- Updated dependencies [fde964e37]
- Updated dependencies [fde964e37]
- Updated dependencies [fde964e37]
- Updated dependencies [fde964e37]
- Updated dependencies [fde964e37]
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
