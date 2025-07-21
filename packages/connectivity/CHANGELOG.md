# @sap-cloud-sdk/connectivity

## 4.1.0

### Minor Changes

- 3c19ffa: [Compatibility Note] The `getDestinationFromDestinationService()` function no longer verifies the incoming XSUAA JWT against the application's bound XSUAA instance. Consequently, the `cacheVerificationKeys` option is now deprecated and has no effect.
- 3c19ffa: [Improvement] Remove dependency on XSUAA service binding while retrieving destinations using `getDestinationFromDestinationService()` and `getAllDestinationsFromDestinationService()` functions.

### Patch Changes

- @sap-cloud-sdk/resilience@4.1.0
- @sap-cloud-sdk/util@4.1.0

## 4.0.2

### Patch Changes

- 4a187d6: [Fixed Issue] Remove destination cache in `getDestinationFromServiceBinding()` function to let cached destinations retrieved in `getDestinationFromDestinationService()` function be added with the `proxyConfiguration` property.
  - @sap-cloud-sdk/resilience@4.0.2
  - @sap-cloud-sdk/util@4.0.2

## 4.0.1

### Patch Changes

- @sap-cloud-sdk/resilience@4.0.1
- @sap-cloud-sdk/util@4.0.1

## 4.0.0

### Major Changes

- 7d92a1b: [Compatibility Note] The following deprecated content has been removed from the package:
  - The behaviour of `getAgentConfig()` function is changed to be asynchronous. The temporary asynchronous function `getAgentConfigAsync()` has been removed.
  - The `destinationForServiceBinding()` function has been removed. Use `getDestinationFromServiceBinding()` instead.
  - The `PartialDestinationFetchOptions` type has been removed. Use either `ServiceBindingTransformOptions` or `getDestinationFromServiceBinding()` function.
  - The `serviceToken()` function no longer takes `xsuaaCredentials` as part of the `options` parameter.
  - The `parseDestination()` function is no longer a public API.
  - The `DestinationForServiceBindingOptions` interface has been renamed to `DestinationFromServiceBindingOptions`.
- d69325a: [Compatibility Note] Enable destination caching by default when retrieving destinations via the destination service. Change affects behavior of `getDestination()` method, `getAllDestinationsFromDestinationService()` method, generated client's `execute()` method and generic HTTP requests execution using `executeHttpRequest()`.
- 25c9dd8: [Compatibility Note] Disable `iasToXsuaaTokenExchange` by default if not defined.

### Patch Changes

- e7cf4e7: [Fixed Issue] Reintroduce option to pass `iss` property to `getClientCredentialsToken` function.
- 40fa8d9: [Fixed Issue] Add `proxyConfiguration` on the fly to avoid expired proxy authorization token in cached destination if it lives shorter than the token for destination service.
- Updated dependencies [7d92a1b]
- Updated dependencies [7d92a1b]
- Updated dependencies [936a6eb]
- Updated dependencies [4228412]
  - @sap-cloud-sdk/resilience@4.0.0
  - @sap-cloud-sdk/util@4.0.0

## 3.24.0

### Minor Changes

- 7ccc9a3: [New Functionality] Add transform function to create OAuth2ClientCredentials destinations from service bindings.

### Patch Changes

- @sap-cloud-sdk/resilience@3.24.0
- @sap-cloud-sdk/util@3.24.0

## 3.23.0

### Patch Changes

- @sap-cloud-sdk/resilience@3.23.0
- @sap-cloud-sdk/util@3.23.0

## 3.22.2

### Patch Changes

- @sap-cloud-sdk/resilience@3.22.2
- @sap-cloud-sdk/util@3.22.2

## 3.22.1

### Patch Changes

- @sap-cloud-sdk/resilience@3.22.1
- @sap-cloud-sdk/util@3.22.1

## 3.22.0

### Patch Changes

- @sap-cloud-sdk/resilience@3.22.0
- @sap-cloud-sdk/util@3.22.0

## 3.21.0

### Patch Changes

- @sap-cloud-sdk/resilience@3.21.0
- @sap-cloud-sdk/util@3.21.0

## 3.20.0

### Minor Changes

- 39eb88c: [Compatibility Note] Throw an error if a JWT for caching was provided, but doesn't contain tenant information.

### Patch Changes

- 39eb88c: [Fixed Issue] Derive tenant information for destination caching also for IAS tokens.
  - @sap-cloud-sdk/resilience@3.20.0
  - @sap-cloud-sdk/util@3.20.0

## 3.19.0

### Patch Changes

- @sap-cloud-sdk/resilience@3.19.0
- @sap-cloud-sdk/util@3.19.0

## 3.18.1

### Patch Changes

- c1bf319: [Fixed Issue] Fix IAS to XSUAA token exchange to have less strict verification.
  - @sap-cloud-sdk/resilience@3.18.1
  - @sap-cloud-sdk/util@3.18.1

## 3.18.0

### Minor Changes

- 06e5c72: [New Functionality] Support IAS tokens without the need to pass `iss` in the destination fetch options.

### Patch Changes

- c23ccfd: [Fixed Issue] Fix the JwtPayload import.
  - @sap-cloud-sdk/resilience@3.18.0
  - @sap-cloud-sdk/util@3.18.0

## 3.17.0

### Minor Changes

- 54a46a3: [Improvement] Use tenant ID instead of tenant-aware authentication URL for the client credentials cache.
- dbad36f: [New Functionality] Add `getTenantId()` function for convenience.
- 99b5009: [Improvement] Retrieve service token for OAuth2ClientCredentials authentication only once.

### Patch Changes

- 86f4158: [Fixed Issue] Fix token fetching for mail multi-tenancy scenarios.
  - @sap-cloud-sdk/resilience@3.17.0
  - @sap-cloud-sdk/util@3.17.0

## 3.16.0

### Minor Changes

- efa75d3: [New Functionality] Add convenience function `transformServiceBindingToDestination()` to create destination from service bindings.
  The following service bindings are supported:
  - business-logging
  - destination
  - s4-hana-cloud
  - saas-registry
  - workflow
  - service-manager
  - xsuaa
  - aicore

- efa75d3: [Improvement] Expose `getServiceBinding()`. This was previously an internal function.
- 4f29615: [Compatibility Note] The JKU header in JWTs is no longer verified. Instead the signature of the JWT is verified, which is more secure.

### Patch Changes

- @sap-cloud-sdk/resilience@3.16.0
- @sap-cloud-sdk/util@3.16.0

## 3.15.0

### Patch Changes

- @sap-cloud-sdk/resilience@3.15.0
- @sap-cloud-sdk/util@3.15.0

## 3.14.0

### Patch Changes

- @sap-cloud-sdk/resilience@3.14.0
- @sap-cloud-sdk/util@3.14.0

## 3.13.0

### Minor Changes

- f72986a: [New Functionality] Support the AI Core Service Binding when creating destinations from service bindings

### Patch Changes

- @sap-cloud-sdk/resilience@3.13.0
- @sap-cloud-sdk/util@3.13.0

## 3.12.1

### Patch Changes

- 60fdc04: [Fixed Issue] Fix `fetchDestinationWithoutTokenRetrieval` to correctly return instance and subaccount destinations.
  - @sap-cloud-sdk/resilience@3.12.1
  - @sap-cloud-sdk/util@3.12.1

## 3.12.0

### Minor Changes

- 36be489: [New Functionality] Support certificates in PEM format for `ClientCertificateAuthentication`.

### Patch Changes

- @sap-cloud-sdk/resilience@3.12.0
- @sap-cloud-sdk/util@3.12.0

## 3.11.0

### Patch Changes

- @sap-cloud-sdk/resilience@3.11.0
- @sap-cloud-sdk/util@3.11.0

## 3.10.0

### Minor Changes

- c721bbd: [Compatibility Note] The SAP Cloud SDK used to get all subaccount and instance destinations, that are available with your JWT (without potentially required token retrieval), through two requests to the destination service (`/subaccountDestinations` and `/instanceDestinations`). While this approach can have advantages when caching, it can cause severe performance issues without caching. Therefore, from now on, only one destination is retrieved per requested destination through `/destinations`.
  You can no longer rely on the SDK to automatically cache all destinations on the first request. If needed, you can call `getAllDestinationsFromDestinationService()` with cache enabled instead.
- c721bbd: [Improvement] Retrieve only one destination per requested destination instead of all subaccount and instance destinations. (See compatibility notes.)
- 28c9cb7: [Fixed Issue] Allow the use of authentication type `NoAuthentication` with proxy type `OnPremise` without requiring the `SAP-Connectivity-Authentication` header.
- 28c9cb7: [Compatibility Note] Using Principal Propagation through authentication type `NoAuthentication` is no longer supported. This resulted in erroneous behavior for destinations with authentication type `NoAuthentication`. If you need to use Principal Propagation use authentication type `PrincipalPropagation`.

### Patch Changes

- Updated dependencies [4d2b49b]
  - @sap-cloud-sdk/util@3.10.0
  - @sap-cloud-sdk/resilience@3.10.0

## 3.9.0

### Patch Changes

- @sap-cloud-sdk/resilience@3.9.0
- @sap-cloud-sdk/util@3.9.0

## 3.8.1

### Patch Changes

- @sap-cloud-sdk/resilience@3.8.1
- @sap-cloud-sdk/util@3.8.1

## 3.8.0

### Minor Changes

- 693cd655f: [Compatibility Note] Remove unused internal functionality around JWT property access, like `userFromJwt` (removed) and `audiences` (changed).

### Patch Changes

- @sap-cloud-sdk/resilience@3.8.0
- @sap-cloud-sdk/util@3.8.0

## 3.7.0

### Patch Changes

- @sap-cloud-sdk/resilience@3.7.0
- @sap-cloud-sdk/util@3.7.0

## 3.6.0

### Minor Changes

- 025b6aa2c: [Fixed Issue] Use axios native proxy, instead of proxy agent, which causes connection issues for write requests on SAP Cloud Connector.
- 025b6aa2c: [Compatibility Note] Proxy configuration is no longer realized through a proxy agent, but with the native axios proxy setting instead.

### Patch Changes

- @sap-cloud-sdk/resilience@3.6.0
- @sap-cloud-sdk/util@3.6.0

## 3.5.0

### Minor Changes

- 7ed5ceb52: [Fixed Issue] Compare `selectionStrategy` in `DestinationFetchOptions` based on value instead of reference.
- bf54df09b: [Fixed Issue] Fix destination caching for destinations from service bindings. The destinations are not cached repeatedly. The function `getDestinationFromServiceBinding()` returns `undefined` for destinations which have expired JWTs.

### Patch Changes

- 2277f9443: [Fixed Issue] Support destinations of type `ClientCertificateAuthentication` without password.
  - @sap-cloud-sdk/resilience@3.5.0
  - @sap-cloud-sdk/util@3.5.0

## 3.4.0

### Minor Changes

- db0780f1b: [New Functionality] Always add a name to destinations from service bindings created with `getDestinationFromServiceBinding()`.
- bde64634d: [Compatibility Note] Deprecate `destinationForServiceBinding()` and `PartialDestinationFetchOptions`. Use `getDestinationFromServiceBinding()` and `ServiceBindingTransformOptions` instead.
- bde64634d: [New Functionality] Support forwarding of auth tokens for destinations from the destination service, service bindings and environment variables.

### Patch Changes

- @sap-cloud-sdk/resilience@3.4.0
- @sap-cloud-sdk/util@3.4.0

## 3.3.0

### Minor Changes

- 0583836bc: [Improvement] Do not rely on XSUAA service when caching service tokens. Cache keys are now based on service credentials URL.
- 8f54207b6: [Improvement] Do not rely on the XSUAA service binding to retrieve tenant information when registering destinations. If tenant is unknown and no binding is found, set it to a default value (`'tenant_id'`).
- 36a01f775: [New Functionality] Add option to cache mTLS certificates.
- 6b58354e8: [Fixed Issue] Remove dependency to XSUAA service binding when checking whether a JWT was issued by XSUAA for destination retrieval. Now, the `ext_attr.ehancer` property is checked.
- c09b1d06f: [Compatibility Note] The `expiresIn` property of `authTokens` on a `Destination` can be undefined.
- 36a01f775: [Compatibility Note] Deprecate `getAgentConfig()`:
  - Temporarily use replacement function `getAgentConfigAsync()`.
  - Rename `getAgentConfigAsync()` to `getAgentConfig()` in next major version.

- 36a01f775: [Improvement] Read mTLS certificates asynchronously.

### Patch Changes

- @sap-cloud-sdk/resilience@3.3.0
- @sap-cloud-sdk/util@3.3.0

## 3.2.0

### Minor Changes

- 616d77b85: [New Functionality] Enable the use of mTLS certificates for registered destinations on CloudFoundry.
- 56c3f70f4: [Fixed Issue] Forward the user JWT irrespective of the destination authentication type when `forwardAuthToken` is set to true on a destination
- 782b9e37e: [Improvement] Set the default validity time of the client credentials token cache to 5 minutes instead of never expiring.

### Patch Changes

- Updated dependencies [234675fc3]
  - @sap-cloud-sdk/resilience@3.2.0
  - @sap-cloud-sdk/util@3.2.0

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
