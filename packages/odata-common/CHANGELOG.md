# @sap-cloud-sdk/odata-common

## 2.12.0

### Patch Changes

- @sap-cloud-sdk/connectivity@2.12.0
- @sap-cloud-sdk/http-client@2.12.0
- @sap-cloud-sdk/util@2.12.0

## 2.11.0

### Minor Changes

- 79e0fe811: [Improvement] Change the place where batch ID is generated from on serialization to request creation.
- 79e0fe811: [New Functionality] Add `getBatchReference()` and `setBatchId()` in request builders to use the batch ID as a reference to an entity in a batch request changeset.
  Batch reference are available in `create`, `delete`, `getByKey`, `update` and `actions/functions` request builder.

### Patch Changes

- @sap-cloud-sdk/connectivity@2.11.0
- @sap-cloud-sdk/http-client@2.11.0
- @sap-cloud-sdk/util@2.11.0

## 2.10.0

### Minor Changes

- 144ff66f4: [Compatibility Note] Changed constructor argument of class `EntityBase` from `schema` to `_entityApi`.

### Patch Changes

- @sap-cloud-sdk/connectivity@2.10.0
- @sap-cloud-sdk/http-client@2.10.0
- @sap-cloud-sdk/util@2.10.0

## 2.9.0

### Minor Changes

- f62eb0d3: [Improvement] Make OderBy() set in asscending order by defalt.

### Patch Changes

- Updated dependencies [4c51d3dc]
- Updated dependencies [24029503]
  - @sap-cloud-sdk/util@2.9.0
  - @sap-cloud-sdk/connectivity@2.9.0
  - @sap-cloud-sdk/http-client@2.9.0

## 2.8.0

### Minor Changes

- 15e9ef4b: [New Functionality] Allow function imports using GET http method in batch requests.

### Patch Changes

- Updated dependencies [15e9ef4b]
- Updated dependencies [15e9ef4b]
- Updated dependencies [15e9ef4b]
  - @sap-cloud-sdk/connectivity@2.8.0
  - @sap-cloud-sdk/http-client@2.8.0
  - @sap-cloud-sdk/util@2.8.0

## 2.7.1

### Patch Changes

- @sap-cloud-sdk/connectivity@2.7.1
- @sap-cloud-sdk/http-client@2.7.1
- @sap-cloud-sdk/util@2.7.1

## 2.7.0

### Patch Changes

- Updated dependencies [3bff42e1]
- Updated dependencies [010a46fa]
  - @sap-cloud-sdk/connectivity@2.7.0
  - @sap-cloud-sdk/http-client@2.7.0
  - @sap-cloud-sdk/util@2.7.0

## 2.6.0

### Patch Changes

- de851289: [Fixed Issue] Fix parsing of `Edm.DateTimeOffset` with high-precision fractional seconds and edge-cases like 5-digit years.
- 0675ee3b: [Fixed Issue] Allow OData service to contain an entity name 'entity'.
- Updated dependencies [cb598c16]
- Updated dependencies [09094607]
- Updated dependencies [e44c214a]
- Updated dependencies [93d41281]
- Updated dependencies [e46bb51d]
- Updated dependencies [8fdfebd6]
  - @sap-cloud-sdk/connectivity@2.6.0
  - @sap-cloud-sdk/http-client@2.6.0
  - @sap-cloud-sdk/util@2.6.0

## 2.5.0

### Minor Changes

- c3166ff6: [Compatibility Note] Change `Edm.String`, `Edm.Boolean` and `Edm.Guid` to be orderable to support `lt`/`lessThan()`, `le`/`lessOrEqual()`, `gt`/`greaterThan()`, and `ge`/`greaterOrEqual` operators. Re-generate odata services to adopt the changes.

### Patch Changes

- Updated dependencies [89f1c423]
- Updated dependencies [9481ec69]
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
