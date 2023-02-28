# @sap-cloud-sdk/generator-common

## 3.0.0

### Major Changes

- db5bcf8da: [New Functionality] Introduced options `transpile` and `tsconfig` to configure transpilation for generated OData clients.
- 0bc92f0e2: [Compatibility Note] The generator does not create `d.ts.map` files per default anymore. If you need them include a custom `tsconfig.json`.
  [Compatibility Note] All SAP Cloud SDK packages ship without `d.ts.map` files from now on.
  Modern IDEs don't require those files for code navigation, thus they are removed to decrease download size of the SDK.
- 9cc19716f: [Compatibility Note] Removed the option `versionInPackageJson` from the OData and OpenAPI generator.
  If the option `packageJson` is enabled now a `package.json` with a default version `1.0.0` is created.
  If necessary use the `include` option to add a `package.json` with a custom value.
  [Compatibility Note] Removed the option `licenseInPackageJson` from the OData and OpenAPI generator.
  If the option `packageJson` is enabled now a `package.json` with a default license `UNLICENSED` is created.
  If necessary use the `include` option to add a `package.json` with a custom value.
- f9a5a766c: [Compatibility Note] Switch the compilerOptions.module to `Node16` instead of `CommonJS` for better interoperability with ES modules. See the [TypeScript handbook](https://www.typescriptlang.org/docs/handbook/esm-node.html) for technical details if needed.
- b1eb72868: [Compatibility Note] The two generators use the same CLI parsing code now, aligning the way paths are resolved.
  In case you experience problems with the new logic, enable the `verbose` flag to investigate the new paths.

### Patch Changes

- Updated dependencies [7cc8dab4b]
- Updated dependencies [350843baa]
- Updated dependencies [f9a5a766c]
- Updated dependencies [350843baa]
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
