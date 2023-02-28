# @sap-cloud-sdk/resilience

## 3.0.0

### Major Changes

- afaf93408: [Compatibility Note] Remove the options `timeout` and `enableCircuitBreaker` from all BTP service interactions i.e. destination and token fetching.
- f9a5a766c: [Compatibility Note] Switch the compilerOptions.module to `Node16` instead of `CommonJS` for better interoperability with ES modules. See the [TypeScript handbook](https://www.typescriptlang.org/docs/handbook/esm-node.html) for technical details if needed.

### Minor Changes

- fe1ef5419: [New Functionality] The request configuration used in the final request is now part of the middleware context.
  User can implement middlewares to change request properties like `headers` using this reference in the middleware context.
  The request configuration contains the `url`, `headers` and all other properties of the HTTP request.
- a47ebcfd7: [New Functionality] Add `ResilienceOptions` and `resilience()` function. The function returns an array of middlewares based on the provided options.

### Patch Changes

- Updated dependencies [7cc8dab4b]
- Updated dependencies [350843baa]
- Updated dependencies [f9a5a766c]
- Updated dependencies [350843baa]
  - @sap-cloud-sdk/util@3.0.0
