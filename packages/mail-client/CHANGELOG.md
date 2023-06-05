# @sap-cloud-sdk/mail-client

## 3.2.0

### Patch Changes

- Updated dependencies [616d77b85]
- Updated dependencies [56c3f70f4]
- Updated dependencies [782b9e37e]
  - @sap-cloud-sdk/connectivity@3.2.0
  - @sap-cloud-sdk/util@3.2.0

## 3.1.1

### Patch Changes

- @sap-cloud-sdk/connectivity@3.1.1
- @sap-cloud-sdk/util@3.1.1

## 3.1.0

### Patch Changes

- Updated dependencies [039412e59]
- Updated dependencies [28b7af86f]
- Updated dependencies [28b7af86f]
  - @sap-cloud-sdk/connectivity@3.1.0
  - @sap-cloud-sdk/util@3.1.0

## 3.0.2

### Patch Changes

- 47fc7278d: [Fixed Issue] Fix error `Greeting never received` when sending emails to On-Premise mail servers. The `_readableListening` property of socket is set to `true` to allow nodemailer to receive SMTP greeting messages.
- be04dafc2: [Fixed Issue] Fix `Invalid greeting` error from nodemailer by removing the `transport.verify` function call.
- Updated dependencies [47fc7278d]
  - @sap-cloud-sdk/connectivity@3.0.2
  - @sap-cloud-sdk/util@3.0.2

## 3.0.1

### Patch Changes

- @sap-cloud-sdk/connectivity@3.0.1
- @sap-cloud-sdk/util@3.0.1

## 3.0.0

### Major Changes

- fde964e37: [Compatibility Note] Switch the compilerOptions.module to `Node16` instead of `CommonJS` for better interoperability with ES modules. See the [TypeScript handbook](https://www.typescriptlang.org/docs/handbook/esm-node.html) for technical details if needed.

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
- Updated dependencies [fde964e37]
- Updated dependencies [fde964e37]
- Updated dependencies [fde964e37]
- Updated dependencies [fde964e37]
  - @sap-cloud-sdk/util@3.0.0
  - @sap-cloud-sdk/connectivity@3.0.0

## 2.11.0

### Patch Changes

- @sap-cloud-sdk/connectivity@2.11.0
- @sap-cloud-sdk/util@2.11.0

## 2.10.0

### Patch Changes

- @sap-cloud-sdk/connectivity@2.10.0
- @sap-cloud-sdk/util@2.10.0

## 2.9.0

### Minor Changes

- d1bf2dee: [New Functionality] Expose SMTP transport options of `nodemailer`.

### Patch Changes

- Updated dependencies [4c51d3dc]
- Updated dependencies [24029503]
  - @sap-cloud-sdk/util@2.9.0
  - @sap-cloud-sdk/connectivity@2.9.0

## 2.8.0

### Minor Changes

- 15e9ef4b: [New Functionality] Support defining the strategy of sending emails. By default, the emails are sent "in parallel" and can be set to "in sequential".

### Patch Changes

- Updated dependencies [15e9ef4b]
- Updated dependencies [15e9ef4b]
- Updated dependencies [15e9ef4b]
  - @sap-cloud-sdk/connectivity@2.8.0
  - @sap-cloud-sdk/util@2.8.0

## 2.7.1

### Patch Changes

- e7fa8d35: [Fixed Issue] Fix proxy authorization for sending emails.
  - @sap-cloud-sdk/connectivity@2.7.1
  - @sap-cloud-sdk/util@2.7.1

## 2.7.0

### Patch Changes

- Updated dependencies [3bff42e1]
- Updated dependencies [010a46fa]
  - @sap-cloud-sdk/connectivity@2.7.0
  - @sap-cloud-sdk/util@2.7.0
