# @sap-cloud-sdk/generator

## 2.9.0

### Patch Changes

- Updated dependencies [f62eb0d3]
- Updated dependencies [4c51d3dc]
  - @sap-cloud-sdk/odata-common@2.9.0
  - @sap-cloud-sdk/util@2.9.0
  - @sap-cloud-sdk/generator-common@2.9.0
  - @sap-cloud-sdk/odata-v2@2.9.0
  - @sap-cloud-sdk/odata-v4@2.9.0

## 2.8.0

### Minor Changes

- 15e9ef4b: [Compatibility Note] Deprecated `generateNpmrc` cli option. This option was only used to configure the now defunct npm registry hosted by SAP. It now has no effect anymore and should be removed in all invocations of the generator cli.
- 15e9ef4b: [Compatibility Note] Description for package.json in a generated client has changed.
- 15e9ef4b: [New Functionality] Allow function imports using GET http method in batch requests.

### Patch Changes

- Updated dependencies [15e9ef4b]
- Updated dependencies [15e9ef4b]
  - @sap-cloud-sdk/generator-common@2.8.0
  - @sap-cloud-sdk/odata-common@2.8.0
  - @sap-cloud-sdk/odata-v2@2.8.0
  - @sap-cloud-sdk/odata-v4@2.8.0
  - @sap-cloud-sdk/util@2.8.0

## 2.7.1

### Patch Changes

- @sap-cloud-sdk/generator-common@2.7.1
- @sap-cloud-sdk/odata-common@2.7.1
- @sap-cloud-sdk/odata-v2@2.7.1
- @sap-cloud-sdk/odata-v4@2.7.1
- @sap-cloud-sdk/util@2.7.1

## 2.7.0

### Patch Changes

- @sap-cloud-sdk/generator-common@2.7.0
- @sap-cloud-sdk/odata-common@2.7.0
- @sap-cloud-sdk/odata-v2@2.7.0
- @sap-cloud-sdk/odata-v4@2.7.0
- @sap-cloud-sdk/util@2.7.0

## 2.6.0

### Minor Changes

- 069aa168: [Compatibility Note] Deprecate generator option `versionInPackageJson`. If you need to set the version, use the new `include` option to add your own `package.json` file instead.
- 069aa168: [Compatibility Note] The hidden generator option `additionalFiles` is renamed to `include`.
- 069aa168: [New Functionality] New generator option `include` which allows to add files to generated packages.

### Patch Changes

- 0675ee3b: [Fixed Issue] Allow OData service to contain an entity name 'entity'.
- Updated dependencies [de851289]
- Updated dependencies [de851289]
- Updated dependencies [0675ee3b]
- Updated dependencies [9ffe0824]
  - @sap-cloud-sdk/odata-common@2.6.0
  - @sap-cloud-sdk/odata-v4@2.6.0
  - @sap-cloud-sdk/odata-v2@2.6.0
  - @sap-cloud-sdk/generator-common@2.6.0
  - @sap-cloud-sdk/util@2.6.0

## 2.5.0

### Minor Changes

- c3166ff6: [Compatibility Note] Change `Edm.String`, `Edm.Boolean` and `Edm.Guid` to be orderable to support `lt`/`lessThan()`, `le`/`lessOrEqual()`, `gt`/`greaterThan()`, and `ge`/`greaterOrEqual` operators. Re-generate odata services to adopt the changes.

### Patch Changes

- Updated dependencies [c3166ff6]
- Updated dependencies [89f1c423]
  - @sap-cloud-sdk/odata-common@2.5.0
  - @sap-cloud-sdk/util@2.5.0
  - @sap-cloud-sdk/generator-common@2.5.0
  - @sap-cloud-sdk/odata-v2@2.5.0
  - @sap-cloud-sdk/odata-v4@2.5.0

## 2.4.0

### Patch Changes

- Updated dependencies [0a008674]
- Updated dependencies [0a008674]
  - @sap-cloud-sdk/odata-v4@2.4.0
  - @sap-cloud-sdk/util@2.4.0
  - @sap-cloud-sdk/generator-common@2.4.0
  - @sap-cloud-sdk/odata-common@2.4.0
  - @sap-cloud-sdk/odata-v2@2.4.0
