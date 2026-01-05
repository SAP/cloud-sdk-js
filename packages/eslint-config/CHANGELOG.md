# @sap-cloud-sdk/eslint-config

## 4.3.1

### Patch Changes

- 6431463: [Improvement] Open the peer dependency range of the `eslint` module to include version 8 and 9. Version 9 can now be used without the potentially unsafe npm flag `--legacy-peer-deps`.

## 4.3.0

## 4.2.0

## 4.1.2

## 4.1.1

## 4.1.0

## 4.0.2

## 4.0.1

### Patch Changes

- 97ad0ad: [Fixed Issue] Downgrade `@stylistic/eslint-plugin` to v3 as v4 is EMS-only.

## 4.0.0

## 3.24.0

## 3.23.0

## 3.22.2

## 3.22.1

### Patch Changes

- c1d53d2: [Fixed Issue] Fix incorrect reference of the stylistic plugin in the flat config.

## 3.22.0

### Minor Changes

- a729a72: [Fixed Issue] Fix incorrect resolution of imports for TypeScript. This may result in a lot more findings.
- 252c338: [New Functionality] Add `@typescript-eslint/consistent-type-imports` to the ruleset.
- a729a72: [Compatibility Note] Remove `import/no-relative-parent-imports` rule that has never worked correctly as provided.

## 3.21.0

## 3.20.0

## 3.19.0

## 3.18.1

## 3.18.0

## 3.17.0

## 3.16.0

## 3.15.0

### Minor Changes

- 7760692: [Improvement] Add a config based on the new Eslint flat config format. The new config can be used inside a `eslint.config.js` file.

## 3.14.0

## 3.13.0

## 3.12.1

## 3.12.0

## 3.11.0

## 3.10.0

## 3.9.0

## 3.8.1

### Patch Changes

- d6bbd3210: [Improvement] Update eslint plugins

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

- fde964e37: [Compatibility Note] Switch the compilerOptions.module to `Node16` instead of `CommonJS` for better interoperability with ES modules. See the [TypeScript handbook](https://www.typescriptlang.org/docs/handbook/esm-node.html) for technical details if needed.

## 2.11.0

## 2.10.0

## 2.9.0

## 2.8.0

### Minor Changes

- 15e9ef4b: [Compatibility Note] Activated the eslint rule 'check-tag-names' to allowed jsdoc tags. If you use custom tags add them via the 'definedTags' in the eslint options.

## 2.7.1

## 2.7.0

## 2.6.0

## 2.5.0

## 2.4.0

### Minor Changes

- 0a008674: [Compatibility Note] Switch the following `jsdoc` related levels from `warn` to `error`:
  - `jsdoc/check-param-names`
  - `jsdoc/require-description-complete-sentence`
  - `jsdoc/require-jsdoc`
  - `jsdoc/require-param`
  - `jsdoc/require-returns`
