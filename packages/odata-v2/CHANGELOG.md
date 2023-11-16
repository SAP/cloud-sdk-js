# @sap-cloud-sdk/odata-v2

## 3.8.0

### Patch Changes

- Updated dependencies [693cd655f]
  - @sap-cloud-sdk/connectivity@3.8.0
  - @sap-cloud-sdk/http-client@3.8.0
  - @sap-cloud-sdk/odata-common@3.8.0
  - @sap-cloud-sdk/util@3.8.0

## 3.7.0

### Minor Changes

- bdcf14f85: [Fixed Issue] Do not send `null` values in the request payload for properties that are not set while creating or updating an entity.
  [Fixed Issue] Fix `RangeError: Maximum call stack size exceeded` error that occurs when updating an entity after calling `getByKey`.

### Patch Changes

- Updated dependencies [bdcf14f85]
  - @sap-cloud-sdk/odata-common@3.7.0
  - @sap-cloud-sdk/connectivity@3.7.0
  - @sap-cloud-sdk/http-client@3.7.0
  - @sap-cloud-sdk/util@3.7.0

## 3.6.0

### Patch Changes

- Updated dependencies [c2a2987c5]
- Updated dependencies [025b6aa2c]
- Updated dependencies [025b6aa2c]
  - @sap-cloud-sdk/http-client@3.6.0
  - @sap-cloud-sdk/connectivity@3.6.0
  - @sap-cloud-sdk/odata-common@3.6.0
  - @sap-cloud-sdk/util@3.6.0

## 3.5.0

### Patch Changes

- ee7477ce2: [Fixed Issue] Fix OData v2 serialization for `Edm.Decimal` to serialize to `string`.
- Updated dependencies [ee7477ce2]
- Updated dependencies [7ed5ceb52]
- Updated dependencies [2277f9443]
- Updated dependencies [bf54df09b]
  - @sap-cloud-sdk/odata-common@3.5.0
  - @sap-cloud-sdk/connectivity@3.5.0
  - @sap-cloud-sdk/http-client@3.5.0
  - @sap-cloud-sdk/util@3.5.0

## 3.4.0

### Patch Changes

- Updated dependencies [db0780f1b]
- Updated dependencies [bde64634d]
- Updated dependencies [bde64634d]
- Updated dependencies [431d2a542]
  - @sap-cloud-sdk/connectivity@3.4.0
  - @sap-cloud-sdk/odata-common@3.4.0
  - @sap-cloud-sdk/http-client@3.4.0
  - @sap-cloud-sdk/util@3.4.0

## 3.3.0

### Patch Changes

- Updated dependencies [0583836bc]
- Updated dependencies [8f54207b6]
- Updated dependencies [8f54207b6]
- Updated dependencies [36a01f775]
- Updated dependencies [6b58354e8]
- Updated dependencies [c09b1d06f]
- Updated dependencies [36a01f775]
- Updated dependencies [36a01f775]
  - @sap-cloud-sdk/connectivity@3.3.0
  - @sap-cloud-sdk/http-client@3.3.0
  - @sap-cloud-sdk/odata-common@3.3.0
  - @sap-cloud-sdk/util@3.3.0

## 3.2.0

### Patch Changes

- Updated dependencies [616d77b85]
- Updated dependencies [56c3f70f4]
- Updated dependencies [782b9e37e]
- Updated dependencies [73ff0ab03]
- Updated dependencies [aa1a4bdb0]
  - @sap-cloud-sdk/connectivity@3.2.0
  - @sap-cloud-sdk/http-client@3.2.0
  - @sap-cloud-sdk/odata-common@3.2.0
  - @sap-cloud-sdk/util@3.2.0

## 3.1.1

### Patch Changes

- @sap-cloud-sdk/connectivity@3.1.1
- @sap-cloud-sdk/http-client@3.1.1
- @sap-cloud-sdk/odata-common@3.1.1
- @sap-cloud-sdk/util@3.1.1

## 3.1.0

### Patch Changes

- Updated dependencies [039412e59]
- Updated dependencies [cc8425abc]
- Updated dependencies [28b7af86f]
- Updated dependencies [28b7af86f]
  - @sap-cloud-sdk/connectivity@3.1.0
  - @sap-cloud-sdk/odata-common@3.1.0
  - @sap-cloud-sdk/http-client@3.1.0
  - @sap-cloud-sdk/util@3.1.0

## 3.0.2

### Patch Changes

- 2fa8c36a6: [Compatibility Note] The `ActionFunctionImportRequestBuilderBase` has an additional mandatory type parameter to pass the according (de-)serializer type. This was missing previously due to a bug.
- 2fa8c36a6: [Fixed Issue] Fix batch requests to accept only functions or actions.
- Updated dependencies [47fc7278d]
- Updated dependencies [2fa8c36a6]
- Updated dependencies [2fa8c36a6]
  - @sap-cloud-sdk/connectivity@3.0.2
  - @sap-cloud-sdk/odata-common@3.0.2
  - @sap-cloud-sdk/http-client@3.0.2
  - @sap-cloud-sdk/util@3.0.2

## 3.0.1

### Patch Changes

- @sap-cloud-sdk/connectivity@3.0.1
- @sap-cloud-sdk/http-client@3.0.1
- @sap-cloud-sdk/odata-common@3.0.1
- @sap-cloud-sdk/util@3.0.1

## 3.0.0

### Major Changes

- fde964e37: [Compatibility Note] Remove the options `timeout` and `enableCircuitBreaker` from all BTP service interactions i.e. destination and token fetching.
- fde964e37: [Compatibility Note] Switch the compilerOptions.module to `Node16` instead of `CommonJS` for better interoperability with ES modules. See the [TypeScript handbook](https://www.typescriptlang.org/docs/handbook/esm-node.html) for technical details if needed.

### Patch Changes

- fde964e37: [Fixed Issue] Allow to update OData v2 entities to `null`. Fixes [3204](https://github.com/SAP/cloud-sdk-js/issues/3204).
- Updated dependencies [fde964e37]
- Updated dependencies [fde964e37]
- Updated dependencies [fde964e37]
- Updated dependencies [fde964e37]
- Updated dependencies [fde964e37]
- Updated dependencies [fde964e37]
- Updated dependencies [fde964e37]
- Updated dependencies [fde964e37]
- Updated dependencies [fde964e37]
- Updated dependencies [fde964e37]
- Updated dependencies [fde964e37]
- Updated dependencies [fde964e37]
- Updated dependencies [fde964e37]
- Updated dependencies [fde964e37]
- Updated dependencies [fde964e37]
- Updated dependencies [fde964e37]
- Updated dependencies [fde964e37]
- Updated dependencies [fde964e37]
- Updated dependencies [fde964e37]
- Updated dependencies [fde964e37]
- Updated dependencies [fde964e37]
- Updated dependencies [fde964e37]
- Updated dependencies [fde964e37]
  - @sap-cloud-sdk/odata-common@3.0.0
  - @sap-cloud-sdk/util@3.0.0
  - @sap-cloud-sdk/connectivity@3.0.0
  - @sap-cloud-sdk/http-client@3.0.0

## 2.11.0

### Patch Changes

- Updated dependencies [79e0fe811]
- Updated dependencies [79e0fe811]
  - @sap-cloud-sdk/odata-common@2.11.0
  - @sap-cloud-sdk/connectivity@2.11.0
  - @sap-cloud-sdk/http-client@2.11.0
  - @sap-cloud-sdk/util@2.11.0

## 2.10.0

### Minor Changes

- 144ff66f4: [Compatibility Note] Changed constructor argument of class `EntityBase` from `schema` to `_entityApi`.

### Patch Changes

- f76da3060: [Fixed Issue] Fix the "entity generic type" of the "delete request builder".
- Updated dependencies [144ff66f4]
  - @sap-cloud-sdk/odata-common@2.10.0
  - @sap-cloud-sdk/connectivity@2.10.0
  - @sap-cloud-sdk/http-client@2.10.0
  - @sap-cloud-sdk/util@2.10.0

## 2.9.0

### Patch Changes

- Updated dependencies [f62eb0d3]
- Updated dependencies [4c51d3dc]
- Updated dependencies [24029503]
  - @sap-cloud-sdk/odata-common@2.9.0
  - @sap-cloud-sdk/util@2.9.0
  - @sap-cloud-sdk/connectivity@2.9.0
  - @sap-cloud-sdk/http-client@2.9.0

## 2.8.0

### Patch Changes

- Updated dependencies [15e9ef4b]
- Updated dependencies [15e9ef4b]
- Updated dependencies [15e9ef4b]
- Updated dependencies [15e9ef4b]
  - @sap-cloud-sdk/connectivity@2.8.0
  - @sap-cloud-sdk/odata-common@2.8.0
  - @sap-cloud-sdk/http-client@2.8.0
  - @sap-cloud-sdk/util@2.8.0

## 2.7.1

### Patch Changes

- @sap-cloud-sdk/connectivity@2.7.1
- @sap-cloud-sdk/http-client@2.7.1
- @sap-cloud-sdk/odata-common@2.7.1
- @sap-cloud-sdk/util@2.7.1

## 2.7.0

### Patch Changes

- Updated dependencies [3bff42e1]
- Updated dependencies [010a46fa]
  - @sap-cloud-sdk/connectivity@2.7.0
  - @sap-cloud-sdk/http-client@2.7.0
  - @sap-cloud-sdk/odata-common@2.7.0
  - @sap-cloud-sdk/util@2.7.0

## 2.6.0

### Patch Changes

- 9ffe0824: [Fixed Issue] Support negative epoch timestamps in serialization.
- Updated dependencies [cb598c16]
- Updated dependencies [de851289]
- Updated dependencies [09094607]
- Updated dependencies [e44c214a]
- Updated dependencies [0675ee3b]
- Updated dependencies [93d41281]
- Updated dependencies [e46bb51d]
- Updated dependencies [8fdfebd6]
  - @sap-cloud-sdk/connectivity@2.6.0
  - @sap-cloud-sdk/odata-common@2.6.0
  - @sap-cloud-sdk/http-client@2.6.0
  - @sap-cloud-sdk/util@2.6.0

## 2.5.0

### Patch Changes

- Updated dependencies [c3166ff6]
- Updated dependencies [89f1c423]
- Updated dependencies [9481ec69]
  - @sap-cloud-sdk/odata-common@2.5.0
  - @sap-cloud-sdk/util@2.5.0
  - @sap-cloud-sdk/http-client@2.5.0
  - @sap-cloud-sdk/connectivity@2.5.0

## 2.4.0

### Patch Changes

- Updated dependencies [04726a35]
- Updated dependencies [0a008674]
- Updated dependencies [0a008674]
- Updated dependencies [0a008674]
  - @sap-cloud-sdk/connectivity@2.4.0
  - @sap-cloud-sdk/http-client@2.4.0
  - @sap-cloud-sdk/util@2.4.0
  - @sap-cloud-sdk/odata-common@2.4.0
