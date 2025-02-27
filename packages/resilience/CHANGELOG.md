# @sap-cloud-sdk/resilience

## 3.24.0

### Patch Changes

- @sap-cloud-sdk/util@3.24.0

## 3.23.0

### Patch Changes

- @sap-cloud-sdk/util@3.23.0

## 3.22.2

### Patch Changes

- @sap-cloud-sdk/util@3.22.2

## 3.22.1

### Patch Changes

- @sap-cloud-sdk/util@3.22.1

## 3.22.0

### Patch Changes

- @sap-cloud-sdk/util@3.22.0

## 3.21.0

### Patch Changes

- @sap-cloud-sdk/util@3.21.0

## 3.20.0

### Patch Changes

- @sap-cloud-sdk/util@3.20.0

## 3.19.0

### Patch Changes

- @sap-cloud-sdk/util@3.19.0

## 3.18.1

### Patch Changes

- @sap-cloud-sdk/util@3.18.1

## 3.18.0

### Patch Changes

- @sap-cloud-sdk/util@3.18.0

## 3.17.0

### Patch Changes

- @sap-cloud-sdk/util@3.17.0

## 3.16.0

### Patch Changes

- @sap-cloud-sdk/util@3.16.0

## 3.15.0

### Patch Changes

- @sap-cloud-sdk/util@3.15.0

## 3.14.0

### Patch Changes

- @sap-cloud-sdk/util@3.14.0

## 3.13.0

### Patch Changes

- @sap-cloud-sdk/util@3.13.0

## 3.12.1

### Patch Changes

- @sap-cloud-sdk/util@3.12.1

## 3.12.0

### Patch Changes

- @sap-cloud-sdk/util@3.12.0

## 3.11.0

### Patch Changes

- @sap-cloud-sdk/util@3.11.0

## 3.10.0

### Patch Changes

- Updated dependencies [4d2b49b]
  - @sap-cloud-sdk/util@3.10.0

## 3.9.0

### Patch Changes

- @sap-cloud-sdk/util@3.9.0

## 3.8.1

### Patch Changes

- @sap-cloud-sdk/util@3.8.1

## 3.8.0

### Patch Changes

- @sap-cloud-sdk/util@3.8.0

## 3.7.0

### Patch Changes

- @sap-cloud-sdk/util@3.7.0

## 3.6.0

### Patch Changes

- @sap-cloud-sdk/util@3.6.0

## 3.5.0

### Patch Changes

- @sap-cloud-sdk/util@3.5.0

## 3.4.0

### Patch Changes

- @sap-cloud-sdk/util@3.4.0

## 3.3.0

### Patch Changes

- @sap-cloud-sdk/util@3.3.0

## 3.2.0

### Patch Changes

- 234675fc3: [Fixed Issue] Fix parsing error when the last response in a chain of retries returned undefined.
  - @sap-cloud-sdk/util@3.2.0

## 3.1.1

### Patch Changes

- 166a16d82: [Fixed Issue] Fix transpilation on OData generation, where types for 'opossum' could not be found.
  - @sap-cloud-sdk/util@3.1.1

## 3.1.0

### Patch Changes

- @sap-cloud-sdk/util@3.1.0

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
