# @sap-cloud-sdk/resilience

## 3.0.2

### Patch Changes

- @sap-cloud-sdk/util@3.0.2

## 3.0.1

### Patch Changes

- fcab06c4b: [Compatibility Note] Deprecate erroneously exposed `circuitBreakerHttp()` function in favor of `circuitBreaker()`.
  - @sap-cloud-sdk/util@3.0.1

## 3.0.0

### Major Changes

- fde964e37: [Compatibility Note] Remove the options `timeout` and `enableCircuitBreaker` from all BTP service interactions i.e. destination and token fetching.
- fde964e37: [Compatibility Note] Switch the compilerOptions.module to `Node16` instead of `CommonJS` for better interoperability with ES modules. See the [TypeScript handbook](https://www.typescriptlang.org/docs/handbook/esm-node.html) for technical details if needed.

### Minor Changes

- fde964e37: [New Functionality] The request configuration used in the final request is now part of the middleware context.
  User can implement middlewares to change request properties like `headers` using this reference in the middleware context.
  The request configuration contains the `url`, `headers` and all other properties of the HTTP request.
- fde964e37: [New Functionality] Add `ResilienceOptions` and `resilience()` function. The function returns an array of middlewares based on the provided options.

### Patch Changes

- Updated dependencies [fde964e37]
- Updated dependencies [fde964e37]
- Updated dependencies [fde964e37]
- Updated dependencies [fde964e37]
  - @sap-cloud-sdk/util@3.0.0
