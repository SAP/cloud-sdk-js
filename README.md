<a href="https://sap.github.io/cloud-sdk/docs/js/overview"><img src="https://help.sap.com/doc/2324e9c3b28748a4ae2ad08166d77675/1.0/en-US/logo-with-js.svg" alt="SAP Cloud SDK for JavaScript Logo" height="122.92" width="226.773"/></a>

![build](https://github.com/SAP/cloud-sdk-js/workflows/build/badge.svg)
[![REUSE status](https://api.reuse.software/badge/github.com/SAP/cloud-sdk-js)](https://api.reuse.software/info/github.com/SAP/cloud-sdk-js)
[![Fosstars security rating](https://github.com/SAP/cloud-sdk-js/blob/fosstars-report/fosstars_badge.svg)](https://github.com/SAP/cloud-sdk-js/blob/fosstars-report/fosstars_report.md)

# SAP Cloud SDK

An SDK to reduce your development effort when building side-by-side extension applications on SAP Business Technology Platform that integrate with SAP solutions and services such as SAP S/4HANA, SAP SuccessFactors, and many others.

## Announcement - Upgrade Strategy

We have released version 4 of the SAP Cloud SDK for JavaScript on npm.
Check out the [upgrade guide](https://sap.github.io/cloud-sdk/docs/js/guides/upgrade-to-version-4) for detailed instructions.
The upgrade effort should be less than 1 day for an average project and should not take more than a week for larger projects.

It is recommended to upgrade to version 4 as version 3.x will not be actively maintained, with the exception of critical security vulnerabilities for up to 3 months.

Please share your ideas, suggestions or improvements in our [GitHub discussion](https://github.com/SAP/cloud-sdk-js/discussions/3557).

## Looking for documentation?

Check our [API documentation](https://sap.github.io/cloud-sdk/api/latest/) and [getting started](https://sap.github.io/cloud-sdk/docs/js/getting-started) guide on our [documentation portal](https://sap.github.io/cloud-sdk/).

### Table of Contents

- [Announcement - Upgrade Strategy](#announcement---upgrade-strategy)
- [Looking for documentation?](#looking-for-documentation)
  - [Table of Contents](#table-of-contents)
- [Packages](#packages)
  - [@sap-cloud-sdk/http-client](#sap-cloud-sdkhttp-client)
  - [@sap-cloud-sdk/connectivity](#sap-cloud-sdkconnectivity)
  - [@sap-cloud-sdk/odata-v2](#sap-cloud-sdkodata-v2)
  - [@sap-cloud-sdk/generator](#sap-cloud-sdkgenerator)
  - [@sap-cloud-sdk/test-util](#sap-cloud-sdktest-util)
- [How to switch to the Open Source version of the SAP Cloud SDK](#how-to-switch-to-the-open-source-version-of-the-sap-cloud-sdk)
- [Related Projects](#related-projects)
  - [SAP Cloud SDK Sample Projects](#sap-cloud-sdk-sample-projects)
- [Feedback](#feedback)
- [Contribute](#contribute)
- [Links](#links)
- [License](#license)

## Packages

This project publishes multiple packages and is managed using [turborepo](https://github.com/vercel/turborepo).

### @sap-cloud-sdk/http-client

This package contains the generic http-client functionality with built-in connectivity with `executeHttpRequest()`. The generic http-client adds SAP infrastructure specific functionality on top of a standard HTTP Client.

To install the SAP Cloud SDK http-client in your project, run:

```bash
$ npm install @sap-cloud-sdk/http-client
```

### @sap-cloud-sdk/connectivity

This package contains all Cloud Foundry connectivity service related methods like `getDestination()` and `registerDestination()`.

To install the SAP Cloud SDK conectivity in your project, run:

```bash
$ npm install @sap-cloud-sdk/connectivity
```

### @sap-cloud-sdk/odata-v2

This package contains all OData version 2 specific functionality, like the request builders for create/update operations, predefined filter functions, batch. Package `@sap-cloud-sdk/odata-v4` contains the same functionality for OData verison 4.

To install the SAP Cloud SDK odata-v2 in your project, run:

```bash
$ npm install @sap-cloud-sdk/odata-v2
```

Similarly, to install the SAP Cloud SDK odata-v4, use:

```bash
$ npm install @sap-cloud-sdk/odata-v4
```

### @sap-cloud-sdk/generator

The SAP Cloud SDK generator is a command line interface (CLI) that allows you to create clients for your own OData services or other SAP systems besides SAP S/4HANA based on their service specifications.

To install the SAP Cloud SDK generator in your project, run:

```bash
$ npm install @sap-cloud-sdk/generator
```

### @sap-cloud-sdk/test-util

The test-util package makes writing tests for your SAP Business Technology Platform application more convenient.

To install the SAP Cloud SDK test-util as development dependencies in your project, run:

```bash
$ npm install -D @sap-cloud-sdk/test-util
```

## How to switch to the Open Source version of the SAP Cloud SDK

Please ignore this section, if you have never used the SAP Cloud SDK with a version `< 1.18.0`.
If you are using an old version of the SAP Cloud SDK, you might want to read [how to migrate to this Open Source version of the SAP Cloud SDK](https://sap.github.io/cloud-sdk/docs/js/guides/migrate-to-open-source-version-of-cloud-sdk-for-javascript-typescript).

## Related Projects

### SAP Cloud SDK Sample Projects

We have created multiple [sample projects](https://github.com/SAP-samples/cloud-sdk-js) which showcase the use of the SAP Cloud SDK for TypeScript/JavaScript in different scenarios.
Each project outlines the configurations needed to execute it locally and to deploy the project to SAP Business Technology Platform.

## Feedback

Feel free to leave your feedback in form of [GitHub issues](https://github.com/SAP/cloud-sdk-js/issues) for bugs and feature requests. If you have broader questions, we are active on [StackOverflow](https://stackoverflow.com/questions/tagged/sap-cloud-sdk+javascript) too.

## Contribute

Want to contribute? Check out our [contribution](./CONTRIBUTING.md) guide and follow our [code of conduct](./CODE_OF_CONDUCT).

## Links

- [Official support channel](https://github.com/SAP/cloud-sdk-js/issues/new/choose)
- [Github](https://github.com/SAP/cloud-sdk-js)
- [SAP Cloud SDK Documentation portal](https://sap.github.io/cloud-sdk)
  - [SAP Cloud SDK Documentation portal - Overview](https://sap.github.io/cloud-sdk/docs/js/overview)
  - [SAP Cloud SDK Documentation portal - Getting started guide](https://sap.github.io/cloud-sdk/docs/js/getting-started)
  - [SAP Cloud SDK Documentation portal - API documentation](https://sap.github.io/cloud-sdk/api/latest)
  - [SAP Cloud SDK Documentation portal - Release notes](https://sap.github.io/cloud-sdk/docs/js/release-notes)
- [Sample repository](https://github.com/SAP-samples/cloud-sdk-js)
- SAP Cloud SDK for AI
  - [SAP Cloud SDK for AI (JavaScript))](https://github.com/SAP/ai-sdk-js)
  - [SAP Cloud SDK for AI (Java))](https://github.com/SAP/ai-sdk-java)
  - [SAP Cloud SDK for AI Documentation portal](https://sap.github.io/ai-sdk)

## License

This project is licensed under the terms of the Apache 2.0 license as noted in the [license file](./LICENSES/Apache-2.0.txt).

This project depends on libraries licensed under the [SAP Developer license agreement](https://tools.eu1.hana.ondemand.com/developer-license-3_1.txt).
This limits the use of those dependencies to development purposes only.
