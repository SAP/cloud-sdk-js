# @sap-cloud-sdk/eslint-config

## 3.0.0

### Major Changes

- 94b45b10b: [Compatibility Note] Switch the compilerOptions.module to `Node16` instead of `CommonJS` for better interoperability with ES modules. See the [TypeScript handbook](https://www.typescriptlang.org/docs/handbook/esm-node.html) for technical details if needed.

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
