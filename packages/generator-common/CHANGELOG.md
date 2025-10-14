# @sap-cloud-sdk/generator-common

## 4.1.2

### Patch Changes

- Updated dependencies [011b841]
  - @sap-cloud-sdk/util@4.1.2

## 4.1.1

### Patch Changes

- Updated dependencies [b502b40]
  - @sap-cloud-sdk/util@4.1.1

## 4.1.0

### Patch Changes

- @sap-cloud-sdk/util@4.1.0

## 4.0.2

### Patch Changes

- @sap-cloud-sdk/util@4.0.2

## 4.0.1

### Patch Changes

- @sap-cloud-sdk/util@4.0.1

## 4.0.0

### Patch Changes

- Updated dependencies [7d92a1b]
- Updated dependencies [936a6eb]
- Updated dependencies [4228412]
  - @sap-cloud-sdk/util@4.0.0

## 3.24.0

### Patch Changes

- @sap-cloud-sdk/util@3.24.0

## 3.23.0

### Minor Changes

- 745766e: [Fixed Issue] Fix ESM client code compilation by allowing the `module` option to be set to `nodenext` or `node16` in a custom `tsconfig.json` file.

### Patch Changes

- @sap-cloud-sdk/util@3.23.0

## 3.22.2

### Patch Changes

- @sap-cloud-sdk/util@3.22.2

## 3.22.1

### Patch Changes

- @sap-cloud-sdk/util@3.22.1

## 3.22.0

### Patch Changes

- @sap-cloud-sdk/util@3.22.0

## 3.21.0

### Patch Changes

- @sap-cloud-sdk/util@3.21.0

## 3.20.0

### Patch Changes

- @sap-cloud-sdk/util@3.20.0

## 3.19.0

### Patch Changes

- @sap-cloud-sdk/util@3.19.0

## 3.18.1

### Patch Changes

- @sap-cloud-sdk/util@3.18.1

## 3.18.0

### Minor Changes

- 3a93e38: [New Functionality] Introduce option `generateESM` in OpenAPI generator to generate ESM compatible code.

### Patch Changes

- @sap-cloud-sdk/util@3.18.0

## 3.17.0

### Patch Changes

- @sap-cloud-sdk/util@3.17.0

## 3.16.0

### Patch Changes

- @sap-cloud-sdk/util@3.16.0

## 3.15.0

### Patch Changes

- @sap-cloud-sdk/util@3.15.0

## 3.14.0

### Patch Changes

- @sap-cloud-sdk/util@3.14.0

## 3.13.0

### Patch Changes

- @sap-cloud-sdk/util@3.13.0

## 3.12.1

### Patch Changes

- @sap-cloud-sdk/util@3.12.1

## 3.12.0

### Patch Changes

- @sap-cloud-sdk/util@3.12.0

## 3.11.0

### Patch Changes

- @sap-cloud-sdk/util@3.11.0

## 3.10.0

### Patch Changes

- Updated dependencies [4d2b49b]
  - @sap-cloud-sdk/util@3.10.0

## 3.9.0

### Patch Changes

- @sap-cloud-sdk/util@3.9.0

## 3.8.1

### Patch Changes

- @sap-cloud-sdk/util@3.8.1

## 3.8.0

### Patch Changes

- @sap-cloud-sdk/util@3.8.0

## 3.7.0

### Minor Changes

- bdcf14f85: [Fixed Issue] Do not send `null` values in the request payload for properties that are not set while creating or updating an entity.
  [Fixed Issue] Fix `RangeError: Maximum call stack size exceeded` error that occurs when updating an entity after calling `getByKey`.

### Patch Changes

- @sap-cloud-sdk/util@3.7.0

## 3.6.0

### Patch Changes

- @sap-cloud-sdk/util@3.6.0

## 3.5.0

### Patch Changes

- @sap-cloud-sdk/util@3.5.0

## 3.4.0

### Patch Changes

- @sap-cloud-sdk/util@3.4.0

## 3.3.0

### Patch Changes

- @sap-cloud-sdk/util@3.3.0

## 3.2.0

### Patch Changes

- @sap-cloud-sdk/util@3.2.0

## 3.1.1

### Patch Changes

- @sap-cloud-sdk/util@3.1.1

## 3.1.0

### Patch Changes

- @sap-cloud-sdk/util@3.1.0

## 3.0.2

### Patch Changes

- @sap-cloud-sdk/util@3.0.2

## 3.0.1

### Patch Changes

- c78c16ddf: [Improvement] Improve logs when generating OData clients without package.json
  - @sap-cloud-sdk/util@3.0.1

## 3.0.0

### Major Changes

- fde964e37: [New Functionality] Introduced options `transpile` and `tsconfig` to configure transpilation for generated OData clients.
- fde964e37: [Compatibility Note] The generator does not create `d.ts.map` files per default anymore. If you need them include a custom `tsconfig.json`.
  [Compatibility Note] All SAP Cloud SDK packages ship without `d.ts.map` files from now on.
  Modern IDEs don't require those files for code navigation, thus they are removed to decrease download size of the SDK.
- fde964e37: [Compatibility Note] Removed the option `versionInPackageJson` from the OData and OpenAPI generator.
  If the option `packageJson` is enabled now a `package.json` with a default version `1.0.0` is created.
  If necessary use the `include` option to add a `package.json` with a custom value.
  [Compatibility Note] Removed the option `licenseInPackageJson` from the OData and OpenAPI generator.
  If the option `packageJson` is enabled now a `package.json` with a default license `UNLICENSED` is created.
  If necessary use the `include` option to add a `package.json` with a custom value.
- fde964e37: [Compatibility Note] Switch the compilerOptions.module to `Node16` instead of `CommonJS` for better interoperability with ES modules. See the [TypeScript handbook](https://www.typescriptlang.org/docs/handbook/esm-node.html) for technical details if needed.
- fde964e37: [Compatibility Note] The two generators use the same CLI parsing code now, aligning the way paths are resolved.
  In case you experience problems with the new logic, enable the `verbose` flag to investigate the new paths.

### Patch Changes

- Updated dependencies [fde964e37]
- Updated dependencies [fde964e37]
- Updated dependencies [fde964e37]
- Updated dependencies [fde964e37]
  - @sap-cloud-sdk/util@3.0.0

## 2.11.0

### Minor Changes

- 74e14427a: [New Functionality] Generated sources are formatted using prettier with default config. Use the CLI option `prettierConfigPath` to provide a custom config.

### Patch Changes

- @sap-cloud-sdk/util@2.11.0

## 2.10.0

### Patch Changes

- f76da3060: [Fixed Issue] Show detailed error message of compilation errors instead of `[object Object]`.
  - @sap-cloud-sdk/util@2.10.0

## 2.9.0

### Patch Changes

- Updated dependencies [4c51d3dc]
  - @sap-cloud-sdk/util@2.9.0

## 2.8.0

### Minor Changes

- 15e9ef4b: [Compatibility Note] Description for package.json in a generated client has changed.

### Patch Changes

- @sap-cloud-sdk/util@2.8.0

## 2.7.1

### Patch Changes

- @sap-cloud-sdk/util@2.7.1

## 2.7.0

### Patch Changes

- @sap-cloud-sdk/util@2.7.0

## 2.6.0

### Patch Changes

- @sap-cloud-sdk/util@2.6.0

## 2.5.0

### Patch Changes

- Updated dependencies [89f1c423]
  - @sap-cloud-sdk/util@2.5.0

## 2.4.0

### Patch Changes

- Updated dependencies [0a008674]
  - @sap-cloud-sdk/util@2.4.0
