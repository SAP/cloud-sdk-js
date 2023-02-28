# @sap-cloud-sdk/resilience

## 3.0.0

### Major Changes

- 1b974095f: [Compatibility Note] Remove the options `timeout` and `enableCircuitBreaker` from all BTP service interactions i.e. destination and token fetching.
- 1b974095f: [Compatibility Note] Switch the compilerOptions.module to `Node16` instead of `CommonJS` for better interoperability with ES modules. See the [TypeScript handbook](https://www.typescriptlang.org/docs/handbook/esm-node.html) for technical details if needed.

### Minor Changes

- 1b974095f: [New Functionality] The request configuration used in the final request is now part of the middleware context.
  User can implement middlewares to change request properties like `headers` using this reference in the middleware context.
  The request configuration contains the `url`, `headers` and all other properties of the HTTP request.
- 1b974095f: [New Functionality] Add `ResilienceOptions` and `resilience()` function. The function returns an array of middlewares based on the provided options.

### Patch Changes

- Updated dependencies [1b974095f]
- Updated dependencies [1b974095f]
- Updated dependencies [1b974095f]
- Updated dependencies [1b974095f]
  - @sap-cloud-sdk/util@3.0.0
