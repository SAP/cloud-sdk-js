## Switch to Open Source version

Some packages of the SAP Cloud SDK for JavaScript have been migrated to [github.com](https://github.com/SAP/cloud-sdk-js).
As a result, the packages were renamed as shown in the table below. No Breaking changes were made. Please use the new packages from now on.

| old package name         | new package name         |
| ------------------------ | ------------------------ |
| @sap/cloud-sdk-util      | @sap-cloud-sdk/util      |
| @sap/cloud-sdk-analytics | @sap-cloud-sdk/analytics |
| @sap/cloud-sdk-core      | @sap-cloud-sdk/core      |
| @sap/cloud-sdk-generator | @sap-cloud-sdk/generator |
| @sap/cloud-sdk-test-util | @sap-cloud-sdk/test-util |

##### How to use the Open Source version

1.  Search for all your `dependencies`/`devDependencies`/`peerDependencies` in your `package.json`.
1.  Replace the old package name e.g., `@sap/cloud-sdk-core` with the new one e. g.`@sap-cloud-sdk/core`.
1.  Use a stable version of the SDK e.g., `^1.18.0`.
1.  Delete your `node_modules` and the `package-lock.json`.
1.  Install your dependencies, run: `npm i`.
1.  Search your source code for references to the old packages (e. g. in import statements) and replace them with the new names.
