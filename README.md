<a href="https://sap.com/s4sdk"><img src="https://help.sap.com/doc/2324e9c3b28748a4ae2ad08166d77675/1.0/en-US/logo-with-js.svg" alt="SAP Cloud SDK for JavaScript Logo" height="122.92" width="226.773"/></a>

![build](https://github.com/SAP/cloud-sdk-js/workflows/build/badge.svg)
[![REUSE status](https://api.reuse.software/badge/github.com/SAP/cloud-sdk-js)](https://api.reuse.software/info/github.com/SAP/cloud-sdk-js)
[![Fosstars security rating](https://github.com/SAP/cloud-sdk-js/blob/fosstars-report/fosstars_badge.svg)](https://github.com/SAP/cloud-sdk-js/blob/fosstars-report/fosstars_report.md)

# SAP Cloud SDK

An SDK to reduce your development effort when building side-by-side extension applications on SAP Business Technology Platform that integrate with SAP solutions and services such as SAP S/4HANA, SAP SuccessFactors, and many others.

## Announcement - Upgrade Strategy

We have released version 2 of the SAP Cloud SDK for JavaScript on npm.
Check out the [upgrade guide](https://sap.github.io/cloud-sdk/docs/js/guides/upgrade-to-version-2) for detailed instructions.
The upgrade effort should be around 1 day for an average project and should not take more than a week for larger projects.

It is recommended to upgrade to version 2 as version 1.x will not be actively maintained, with the exception of critical security vulnerabilities for up to 6 months.

Please share your ideas, suggestions or improvements in our [GitHub discussion](https://github.com/SAP/cloud-sdk-js/discussions/1518).

## Looking for documentation?

Check our [API documentation](https://sap.github.io/cloud-sdk/docs/js/api) and [getting started](https://sap.github.io/cloud-sdk/docs/js/getting-started) guide on our [documentation portal](https://sap.github.io/cloud-sdk/).

### Table of Contents

- [Packages](#packages)
  - [@sap-cloud-sdk/connectivity](#sap-cloud-connectivity)
  - [@sap-cloud-sdk/http-client](#sap-cloud-http-client)
  - [@sap-cloud-sdk/odata-v2](#sap-cloud-odata-v2)
  - [@sap-cloud-sdk/generator](#sap-cloud-sdkgenerator)
  - [@sap-cloud-sdk/test-util](#sap-cloud-sdktest-util)
- [How to switch to the Open Source version of the SAP Cloud SDK](#how-to-switch-to-the-open-source-version-of-the-sap-cloud-sdk)
- [Related Projects](#related-projects)
  - [SAP Cloud SDK CLI](#sap-cloud-sdk-cli)
  - [Sample Projects](#sap-cloud-sdk-starter-projects)
  - [Virtual Data Model (VDM)](#virtual-data-model-vdm)
  - [Project "Piper"](#project-piper)
- [Feedback](#feedback)
- [Contribute](#contribute)
- [Links](#links)
- [License](#license)

## Packages

This project publishes multiple packages and is managed using [lerna](https://github.com/lerna/lerna).

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
$ npm install @sap-cloud-sdk/conectivity
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

### SAP Cloud SDK CLI

The [SAP Cloud SDK command line interface (CLI)](https://github.com/sap/cloud-sdk-cli) is deprecated. We have provided sample projects with example applications to show how you can integrate the SAP Cloud SDK into your projects.

### SAP Cloud SDK Sample Projects

We have created multiple [sample projects](https://github.com/SAP-samples/cloud-sdk-js) which showcase the use of the SAP Cloud SDK for TypeScript/JavaScript in different scenarios.
Each project outlines the configurations needed to execute it locally and to deploy the project to SAP Business Technology Platform.

### Virtual Data Model (VDM)

In addition to the Open Source parts of this project, we also publish the SAP Cloud SDK Virtual Data Model (VDM) - JavaScript / TypeScript clients for the latest versions of the published OData services of SAP S/4HANA Cloud under the SAP Developer license. Those are not included in this project, but rely on modules from this project.

To install an OData client for an SAP S/4HANA service run:

```bash
$ npm install @sap/cloud-sdk-vdm-<service name>-service
```

In the example above, `service name` is the name of the service you want to use, e. g. for the business partner service, run: `npm install @sap/cloud-sdk-vdm-business-partner-service`.

### Project "Piper"

Continuous delivery is a method to develop software with short feedback cycles.
It is applicable to projects both for SAP Business Technology Platform and SAP on-premise platforms.
SAP implements tooling for continuous delivery in the open-source [project "Piper"](https://sap.github.io/jenkins-library/).
The goal of project "Piper" is to substantially ease setting up continuous delivery in your project using SAP technologies.

## Feedback

Feel free to leave your feedback in form of [GitHub issues](https://github.com/SAP/cloud-sdk-js/issues) for bugs and feature requests. If you have broader questions, we are active on [StackOverflow](https://stackoverflow.com/questions/tagged/sap-cloud-sdk+javascript) too.

## Contribute

Want to contribute? Check out our [contribution](./CONTRIBUTING.md) guide and follow our [code of conduct](./CODE_OF_CONDUCT).

## Links

- [Documentation portal](https://sap.github.io/cloud-sdk/)
- [SAP Help Page on SAP Cloud SDK](https://help.sap.com/viewer/product/SAP_CLOUD_SDK/1.0/en-US)
- [Product page of the SAP Cloud SDK](https://developers.sap.com/topics/cloud-sdk.html)
- [SAP Cloud SDK Continuous Delivery Toolkit](https://github.com/SAP/cloud-s4-sdk-pipeline)
- [SAP Cloud SDK community page](https://community.sap.com/topics/cloud-sdk)
- [Community Call for SAP Cloud SDK](https://blogs.sap.com/2019/06/26/sap-cloud-sdk-new-format-of-the-update-call-for-sap-community/)

## License

This project is licensed under the terms of the Apache 2.0 license as noted in the [license file](./LICENSES/Apache-2.0.txt).

This project depends on libraries licensed under the [SAP Developer license agreement](https://tools.eu1.hana.ondemand.com/developer-license-3_1.txt).
This limits the use of those dependencies to development purposes only.
