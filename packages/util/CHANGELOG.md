# @sap-cloud-sdk/util

## 4.3.0

## 4.2.0

## 4.1.2

### Patch Changes

- 011b841: [Fixed Issue] Update `axios` to `1.12.2` to fix vulnerability to DoS attack. Refer [here](https://github.com/advisories/GHSA-4hjh-wcwx-xvwj) for more details.

## 4.1.1

### Patch Changes

- b502b40: [Fixed Issue] Update `axios` to `1.11.0` to use non-vulnerable version of `form-data`.

## 4.1.0

## 4.0.2

## 4.0.1

## 4.0.0

### Major Changes

- 7d92a1b: [Compatibility Note] The following deprecated content has been removed from the package:
  - The `assoc` constant has been removed. There is no replacement.

### Minor Changes

- 936a6eb: [New Functionality] Add `basePath` option in the `options-per-service.json` file in the OpenAPI generator. This option prepends the base URL path to the API path parameter for every request.

### Patch Changes

- 4228412: [Fixed Issue] Stringify Axios response data object in the error stack of `ErrorWithCause` class.

## 3.24.0

## 3.23.0

## 3.22.2

## 3.22.1

## 3.22.0

## 3.21.0

## 3.20.0

## 3.19.0

## 3.18.1

## 3.18.0

## 3.17.0

## 3.16.0

## 3.15.0

## 3.14.0

## 3.13.0

## 3.12.1

## 3.12.0

## 3.11.0

## 3.10.0

### Minor Changes

- 4d2b49b: [New Functionality] Add support for setting log level for newly created logger using environment variable `SAP_CLOUD_SDK_LOG_LEVEL`.

## 3.9.0

## 3.8.1

## 3.8.0

## 3.7.0

## 3.6.0

## 3.5.0

## 3.4.0

## 3.3.0

## 3.2.0

## 3.1.1

## 3.1.0

## 3.0.2

## 3.0.1

## 3.0.0

### Major Changes

- fde964e37: [Compatibility Note] By default, generation of OData clients fails if a service path cannot be determined. Either provide `servicePath` value in the `options-per-service.json` or set `skipValidation` to true, in which case, `/` will be used.
- fde964e37: [Compatibility Note] The function `variadicArgumentToArray` is replaced by the function `transformVariadicArgumentToArray`.
- fde964e37: [Compatibility Note] Switch the compilerOptions.module to `Node16` instead of `CommonJS` for better interoperability with ES modules. See the [TypeScript handbook](https://www.typescriptlang.org/docs/handbook/esm-node.html) for technical details if needed.
- fde964e37: [Compatibility Note] The field `logger` on the interface `LoggerOptions` was not used and is removed from the interface.

## 2.11.0

## 2.10.0

## 2.9.0

### Minor Changes

- 4c51d3dc: [New Functionality] Add method `setGlobalTransports` to support setting custom transport globally.

## 2.8.0

## 2.7.1

## 2.7.0

## 2.6.0

## 2.5.0

### Minor Changes

- 89f1c423: [Compatibility Note] Stop using `VCAP_SERVICES` to determine the log format. Use `setLogFormat` and `setGlobalLogFormat` to specify the log format. By default, the log format is set to `kibana` for `NODE_ENV=production` and `local` otherwise.

## 2.4.0

### Patch Changes

- 0a008674: [Fixed Issue] Fix a bug in the implementation of the trim method.
