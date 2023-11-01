# @sap-cloud-sdk/util

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
