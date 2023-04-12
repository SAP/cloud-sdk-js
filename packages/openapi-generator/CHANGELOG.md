# @sap-cloud-sdk/openapi-generator

## 3.1.0

### Patch Changes

- @sap-cloud-sdk/generator-common@3.1.0
- @sap-cloud-sdk/openapi@3.1.0
- @sap-cloud-sdk/util@3.1.0

## 3.0.2

### Patch Changes

- @sap-cloud-sdk/generator-common@3.0.2
- @sap-cloud-sdk/openapi@3.0.2
- @sap-cloud-sdk/util@3.0.2

## 3.0.1

### Patch Changes

- Updated dependencies [c78c16ddf]
  - @sap-cloud-sdk/generator-common@3.0.1
  - @sap-cloud-sdk/openapi@3.0.1
  - @sap-cloud-sdk/util@3.0.1

## 3.0.0

### Major Changes

- fde964e37: [Compatibility Note] The internal option `packageVersion` of the OpenAPI generator is removed.
- fde964e37: [Compatibility Note] Removed the option `versionInPackageJson` from the OData and OpenAPI generator.
  If the option `packageJson` is enabled now a `package.json` with a default version `1.0.0` is created.
  If necessary use the `include` option to add a `package.json` with a custom value.
  [Compatibility Note] Removed the option `licenseInPackageJson` from the OData and OpenAPI generator.
  If the option `packageJson` is enabled now a `package.json` with a default license `UNLICENSED` is created.
  If necessary use the `include` option to add a `package.json` with a custom value.
- fde964e37: [Compatibility Note] Rename servicePath to basePath.
- fde964e37: [Compatibility Note] Switch the compilerOptions.module to `Node16` instead of `CommonJS` for better interoperability with ES modules. See the [TypeScript handbook](https://www.typescriptlang.org/docs/handbook/esm-node.html) for technical details if needed.
- fde964e37: [Compatibility Note] The `serviceMapping` option of the OData generator has been renamed to `optionsPerService`. The mapping file, `service-mapping.json` has also been renamed to `options-per-service.json`. By default, an options file will not be generated.
- fde964e37: [Compatibility Note] `tsConfig` option has been renamed to `tsconfig`.
- fde964e37: [Compatibility Note] The two generators use the same CLI parsing code now, aligning the way paths are resolved.
  In case you experience problems with the new logic, enable the `verbose` flag to investigate the new paths.

### Patch Changes

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
  - @sap-cloud-sdk/util@3.0.0
  - @sap-cloud-sdk/generator-common@3.0.0
  - @sap-cloud-sdk/openapi@3.0.0

## 2.11.0

### Minor Changes

- 74e14427a: [New Functionality] Generated sources are formatted using prettier with default config. Use the CLI option `prettierConfigPath` to provide a custom config.

### Patch Changes

- Updated dependencies [74e14427a]
  - @sap-cloud-sdk/generator-common@2.11.0
  - @sap-cloud-sdk/openapi@2.11.0
  - @sap-cloud-sdk/util@2.11.0

## 2.10.0

### Patch Changes

- f76da3060: [Fixed Issue] Show detailed error message of compilation errors instead of `[object Object]`.
- f76da3060: [Improvement] Add `force` option to`rm` commands, when setting `clearOutputDir` to true.
- Updated dependencies [f76da3060]
  - @sap-cloud-sdk/generator-common@2.10.0
  - @sap-cloud-sdk/openapi@2.10.0
  - @sap-cloud-sdk/util@2.10.0

## 2.9.0

### Patch Changes

- Updated dependencies [4c51d3dc]
  - @sap-cloud-sdk/util@2.9.0
  - @sap-cloud-sdk/generator-common@2.9.0
  - @sap-cloud-sdk/openapi@2.9.0

## 2.8.0

### Minor Changes

- 15e9ef4b: [Compatibility Note] Description for package.json in a generated client has changed.

### Patch Changes

- Updated dependencies [15e9ef4b]
  - @sap-cloud-sdk/generator-common@2.8.0
  - @sap-cloud-sdk/openapi@2.8.0
  - @sap-cloud-sdk/util@2.8.0

## 2.7.1

### Patch Changes

- @sap-cloud-sdk/generator-common@2.7.1
- @sap-cloud-sdk/openapi@2.7.1
- @sap-cloud-sdk/util@2.7.1

## 2.7.0

### Minor Changes

- 3f70b0c9: [New Functionality] Support globs in the `input` option.

### Patch Changes

- @sap-cloud-sdk/generator-common@2.7.0
- @sap-cloud-sdk/openapi@2.7.0
- @sap-cloud-sdk/util@2.7.0

## 2.6.0

### Patch Changes

- @sap-cloud-sdk/generator-common@2.6.0
- @sap-cloud-sdk/openapi@2.6.0
- @sap-cloud-sdk/util@2.6.0

## 2.5.0

### Patch Changes

- Updated dependencies [89f1c423]
  - @sap-cloud-sdk/util@2.5.0
  - @sap-cloud-sdk/generator-common@2.5.0
  - @sap-cloud-sdk/openapi@2.5.0

## 2.4.0

### Patch Changes

- Updated dependencies [0a008674]
  - @sap-cloud-sdk/util@2.4.0
  - @sap-cloud-sdk/generator-common@2.4.0
  - @sap-cloud-sdk/openapi@2.4.0
