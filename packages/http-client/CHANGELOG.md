# @sap-cloud-sdk/http-client

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
