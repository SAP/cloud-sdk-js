# @sap-cloud-sdk/mail-client

## 3.9.0

### Patch Changes

- @sap-cloud-sdk/connectivity@3.9.0
- @sap-cloud-sdk/util@3.9.0

## 3.8.1

### Patch Changes

- @sap-cloud-sdk/connectivity@3.8.1
- @sap-cloud-sdk/util@3.8.1

## 3.8.0

### Minor Changes

- 8516b7f04: [New Functionality] Add Support for `Location ID` in destinations of type `MAIL`

### Patch Changes

- Updated dependencies [693cd655f]
  - @sap-cloud-sdk/connectivity@3.8.0
  - @sap-cloud-sdk/util@3.8.0

## 3.7.0

### Patch Changes

- @sap-cloud-sdk/connectivity@3.7.0
- @sap-cloud-sdk/util@3.7.0

## 3.6.0

### Patch Changes

- Updated dependencies [025b6aa2c]
- Updated dependencies [025b6aa2c]
  - @sap-cloud-sdk/connectivity@3.6.0
  - @sap-cloud-sdk/util@3.6.0

## 3.5.0

### Patch Changes

- Updated dependencies [7ed5ceb52]
- Updated dependencies [2277f9443]
- Updated dependencies [bf54df09b]
  - @sap-cloud-sdk/connectivity@3.5.0
  - @sap-cloud-sdk/util@3.5.0

## 3.4.0

### Patch Changes

- Updated dependencies [db0780f1b]
- Updated dependencies [bde64634d]
- Updated dependencies [bde64634d]
  - @sap-cloud-sdk/connectivity@3.4.0
  - @sap-cloud-sdk/util@3.4.0

## 3.3.0

### Patch Changes

- Updated dependencies [0583836bc]
- Updated dependencies [8f54207b6]
- Updated dependencies [36a01f775]
- Updated dependencies [6b58354e8]
- Updated dependencies [c09b1d06f]
- Updated dependencies [36a01f775]
- Updated dependencies [36a01f775]
  - @sap-cloud-sdk/connectivity@3.3.0
  - @sap-cloud-sdk/util@3.3.0

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
