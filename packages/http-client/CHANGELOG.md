# @sap-cloud-sdk/http-client

## 2.9.0

### Patch Changes

- Updated dependencies [4c51d3dc]
- Updated dependencies [24029503]
  - @sap-cloud-sdk/util@2.9.0
  - @sap-cloud-sdk/connectivity@2.9.0

## 2.8.0

### Patch Changes

- Updated dependencies [15e9ef4b]
- Updated dependencies [15e9ef4b]
- Updated dependencies [15e9ef4b]
  - @sap-cloud-sdk/connectivity@2.8.0
  - @sap-cloud-sdk/util@2.8.0

## 2.7.1

### Patch Changes

- @sap-cloud-sdk/connectivity@2.7.1
- @sap-cloud-sdk/util@2.7.1

## 2.7.0

### Patch Changes

- Updated dependencies [3bff42e1]
- Updated dependencies [010a46fa]
  - @sap-cloud-sdk/connectivity@2.7.0
  - @sap-cloud-sdk/util@2.7.0

## 2.6.0

### Minor Changes

- e44c214a: [Fixed Issue] Fix the `executeHttpRequest`/`executeHttpRequestWithOrigin` function, so the warning is only shown when overwriting headers by using custom headers.
- e46bb51d: [Improvement] Make `requestConfig` of `OriginOptions` optional.

### Patch Changes

- Updated dependencies [cb598c16]
- Updated dependencies [09094607]
- Updated dependencies [93d41281]
- Updated dependencies [8fdfebd6]
  - @sap-cloud-sdk/connectivity@2.6.0
  - @sap-cloud-sdk/util@2.6.0

## 2.5.0

### Minor Changes

- 9481ec69: [Fixed Issue] Fix the `executeHttpRequest` function, so it accepts the same parameters as in version 1.
  [Compatibility Note] Deprecate one overload of the `executeHttpRequest` function, that accepts `HttpRequestConfigWithOrigin` as a parameter. Use the new function `executeHttpRequestWithOrigin` as replacement.
  [New Functionality] Support defining header options and query parameter options with origins.

### Patch Changes

- Updated dependencies [89f1c423]
  - @sap-cloud-sdk/util@2.5.0
  - @sap-cloud-sdk/connectivity@2.5.0

## 2.4.0

### Minor Changes

- 04726a35: [Improvement] Reduce default log output on the `info` level significantly.
  [Compatibility Note] Only log the successful retrieval of destinations on the`info` log level, log everything else is on the `debug` or `warn` level.

### Patch Changes

- Updated dependencies [04726a35]
- Updated dependencies [0a008674]
- Updated dependencies [0a008674]
- Updated dependencies [0a008674]
  - @sap-cloud-sdk/connectivity@2.4.0
  - @sap-cloud-sdk/util@2.4.0
