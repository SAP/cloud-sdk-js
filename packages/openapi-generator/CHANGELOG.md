# @sap-cloud-sdk/openapi-generator

## 4.1.0

### Patch Changes

- @sap-cloud-sdk/generator-common@4.1.0
- @sap-cloud-sdk/openapi@4.1.0
- @sap-cloud-sdk/util@4.1.0

## 4.0.2

### Patch Changes

- @sap-cloud-sdk/generator-common@4.0.2
- @sap-cloud-sdk/openapi@4.0.2
- @sap-cloud-sdk/util@4.0.2

## 4.0.1

### Patch Changes

- @sap-cloud-sdk/generator-common@4.0.1
- @sap-cloud-sdk/openapi@4.0.1
- @sap-cloud-sdk/util@4.0.1

## 4.0.0

### Minor Changes

- 936a6eb: [New Functionality] Add `basePath` option in the `options-per-service.json` file in the OpenAPI generator. This option prepends the base URL path to the API path parameter for every request.
- d816f5e: [New Functionality] Add `resolveExternal` option to determine whether external $ref pointers will be resolved.

### Patch Changes

- Updated dependencies [7d92a1b]
- Updated dependencies [936a6eb]
- Updated dependencies [936a6eb]
- Updated dependencies [4228412]
  - @sap-cloud-sdk/util@4.0.0
  - @sap-cloud-sdk/openapi@4.0.0
  - @sap-cloud-sdk/generator-common@4.0.0

## 3.24.0

### Patch Changes

- @sap-cloud-sdk/generator-common@3.24.0
- @sap-cloud-sdk/openapi@3.24.0
- @sap-cloud-sdk/util@3.24.0

## 3.23.0

### Patch Changes

- Updated dependencies [745766e]
  - @sap-cloud-sdk/generator-common@3.23.0
  - @sap-cloud-sdk/openapi@3.23.0
  - @sap-cloud-sdk/util@3.23.0

## 3.22.2

### Patch Changes

- @sap-cloud-sdk/generator-common@3.22.2
- @sap-cloud-sdk/openapi@3.22.2
- @sap-cloud-sdk/util@3.22.2

## 3.22.1

### Patch Changes

- @sap-cloud-sdk/generator-common@3.22.1
- @sap-cloud-sdk/openapi@3.22.1
- @sap-cloud-sdk/util@3.22.1

## 3.22.0

### Minor Changes

- d073a48: [New Functionality] Add support for discriminator properties in schemas that include `oneOf` and `anyOf`. Also add support for incorrect usage of the discriminator property with schemas of type `object`.
- c4153b9: [Fixed Issue] Ignore charset parameter in media types given in OpenAPI specification.

### Patch Changes

- @sap-cloud-sdk/generator-common@3.22.0
- @sap-cloud-sdk/openapi@3.22.0
- @sap-cloud-sdk/util@3.22.0

## 3.21.0

### Minor Changes

- d2a2394: [Improvement] Update generation of properties with `nullable: true` in the spec to include `type | null` in the output types.
- d2a2394: [Improvement] Normalize schemas that have `allOf`, `anyOf`, or `oneOf` alongside properties defined at the same level.
- 89f77cd: [Improvement] Configure generated OpenAPI clients to handle `text/plain`, `application/octet-stream`, and wildcard `*/*` content types in response headers.

### Patch Changes

- @sap-cloud-sdk/generator-common@3.21.0
- @sap-cloud-sdk/openapi@3.21.0
- @sap-cloud-sdk/util@3.21.0

## 3.20.0

### Patch Changes

- @sap-cloud-sdk/generator-common@3.20.0
- @sap-cloud-sdk/openapi@3.20.0
- @sap-cloud-sdk/util@3.20.0

## 3.19.0

### Minor Changes

- a566fdd: [Fixed Issue] Prevent query parameters from being optional when header parameters are required in signature.

### Patch Changes

- @sap-cloud-sdk/generator-common@3.19.0
- @sap-cloud-sdk/openapi@3.19.0
- @sap-cloud-sdk/util@3.19.0

## 3.18.1

### Patch Changes

- @sap-cloud-sdk/generator-common@3.18.1
- @sap-cloud-sdk/openapi@3.18.1
- @sap-cloud-sdk/util@3.18.1

## 3.18.0

### Minor Changes

- 3a93e38: [New Functionality] Introduce option `generateESM` in OpenAPI generator to generate ESM compatible code.

### Patch Changes

- Updated dependencies [3a93e38]
  - @sap-cloud-sdk/generator-common@3.18.0
  - @sap-cloud-sdk/openapi@3.18.0
  - @sap-cloud-sdk/util@3.18.0

## 3.17.0

### Minor Changes

- e9a243a: [Improvement] Generated OpenAPI clients support `application/merge-patch+json` media type for patch requests.

### Patch Changes

- @sap-cloud-sdk/generator-common@3.17.0
- @sap-cloud-sdk/openapi@3.17.0
- @sap-cloud-sdk/util@3.17.0

## 3.16.0

### Minor Changes

- aa0b849: [Improvement] Generate OpenAPI clients with header parameters.

### Patch Changes

- @sap-cloud-sdk/generator-common@3.16.0
- @sap-cloud-sdk/openapi@3.16.0
- @sap-cloud-sdk/util@3.16.0

## 3.15.0

### Patch Changes

- Updated dependencies [4b3ebfd]
  - @sap-cloud-sdk/openapi@3.15.0
  - @sap-cloud-sdk/generator-common@3.15.0
  - @sap-cloud-sdk/util@3.15.0

## 3.14.0

### Minor Changes

- ff3ede6: [Fixed Issue] Fix nested array type in generated OpenAPI schemas such that array wraps the whole object.
- b4bc9ad: [Fixed Issue] Fix serialization of path params that contain quotes to avoid syntax error and failing client generation

### Patch Changes

- @sap-cloud-sdk/generator-common@3.14.0
- @sap-cloud-sdk/openapi@3.14.0
- @sap-cloud-sdk/util@3.14.0

## 3.13.0

### Patch Changes

- @sap-cloud-sdk/generator-common@3.13.0
- @sap-cloud-sdk/openapi@3.13.0
- @sap-cloud-sdk/util@3.13.0

## 3.12.1

### Patch Changes

- Updated dependencies [60fdc04]
  - @sap-cloud-sdk/openapi@3.12.1
  - @sap-cloud-sdk/generator-common@3.12.1
  - @sap-cloud-sdk/util@3.12.1

## 3.12.0

### Patch Changes

- 6bbdd4d: [Fixed Issue] Fix types in generated OpenAPI schemas to have proper types instead of type `any`.
- Updated dependencies [d6b1c5b]
  - @sap-cloud-sdk/openapi@3.12.0
  - @sap-cloud-sdk/generator-common@3.12.0
  - @sap-cloud-sdk/util@3.12.0

## 3.11.0

### Patch Changes

- @sap-cloud-sdk/generator-common@3.11.0
- @sap-cloud-sdk/openapi@3.11.0
- @sap-cloud-sdk/util@3.11.0

## 3.10.0

### Patch Changes

- Updated dependencies [4d2b49b]
  - @sap-cloud-sdk/util@3.10.0
  - @sap-cloud-sdk/generator-common@3.10.0
  - @sap-cloud-sdk/openapi@3.10.0

## 3.9.0

### Patch Changes

- @sap-cloud-sdk/generator-common@3.9.0
- @sap-cloud-sdk/openapi@3.9.0
- @sap-cloud-sdk/util@3.9.0

## 3.8.1

### Patch Changes

- @sap-cloud-sdk/generator-common@3.8.1
- @sap-cloud-sdk/openapi@3.8.1
- @sap-cloud-sdk/util@3.8.1

## 3.8.0

### Patch Changes

- @sap-cloud-sdk/generator-common@3.8.0
- @sap-cloud-sdk/openapi@3.8.0
- @sap-cloud-sdk/util@3.8.0

## 3.7.0

### Patch Changes

- Updated dependencies [bdcf14f85]
  - @sap-cloud-sdk/generator-common@3.7.0
  - @sap-cloud-sdk/openapi@3.7.0
  - @sap-cloud-sdk/util@3.7.0

## 3.6.0

### Patch Changes

- @sap-cloud-sdk/generator-common@3.6.0
- @sap-cloud-sdk/openapi@3.6.0
- @sap-cloud-sdk/util@3.6.0

## 3.5.0

### Patch Changes

- @sap-cloud-sdk/generator-common@3.5.0
- @sap-cloud-sdk/openapi@3.5.0
- @sap-cloud-sdk/util@3.5.0

## 3.4.0

### Patch Changes

- @sap-cloud-sdk/generator-common@3.4.0
- @sap-cloud-sdk/openapi@3.4.0
- @sap-cloud-sdk/util@3.4.0

## 3.3.0

### Patch Changes

- @sap-cloud-sdk/generator-common@3.3.0
- @sap-cloud-sdk/openapi@3.3.0
- @sap-cloud-sdk/util@3.3.0

## 3.2.0

### Patch Changes

- @sap-cloud-sdk/generator-common@3.2.0
- @sap-cloud-sdk/openapi@3.2.0
- @sap-cloud-sdk/util@3.2.0

## 3.1.1

### Patch Changes

- @sap-cloud-sdk/generator-common@3.1.1
- @sap-cloud-sdk/openapi@3.1.1
- @sap-cloud-sdk/util@3.1.1

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
