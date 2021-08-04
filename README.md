<a href="https://sap.com/s4sdk"><img src="https://help.sap.com/doc/2324e9c3b28748a4ae2ad08166d77675/1.0/en-US/logo-with-js.svg" alt="SAP Cloud SDK for JavaScript Logo" height="122.92" width="226.773"/></a>

![build](https://github.com/SAP/cloud-sdk-js/workflows/build/badge.svg)
[![REUSE status](https://api.reuse.software/badge/github.com/SAP/cloud-sdk-js)](https://api.reuse.software/info/github.com/SAP/cloud-sdk-js)
[![Fosstars security rating](https://github.com/SAP/cloud-sdk-js/blob/fosstars-report/fosstars_badge.svg)](https://github.com/SAP/cloud-sdk-js/blob/fosstars-report/fosstars_report.md)

# SAP Cloud SDK

An SDK to reduce your development effort when building side-by-side extension applications on SAP Cloud Platform that integrate with SAP solutions and services such as SAP S/4HANA, SAP SuccessFactors, and many others.

## Looking for documentation?

Check our [API documentation](https://sap.github.io/cloud-sdk/docs/js/api) and [getting started](https://sap.github.io/cloud-sdk/docs/js/getting-started) guide on our [documentation portal](https://sap.github.io/cloud-sdk/).

### Table of Contents

- [Packages](#packages)
  - [@sap-cloud-sdk/core](#sap-cloud-sdkcore)
  - [@sap-cloud-sdk/generator](#sap-cloud-sdkgenerator)
  - [@sap-cloud-sdk/test-util](#sap-cloud-sdktest-util)
- [How to switch to the Open Source version of the SAP Cloud SDK](#how-to-switch-to-the-open-source-version-of-the-sap-cloud-sdk)
- [Related Projects](#related-projects)
  - [SAP Cloud SDK CLI](#sap-cloud-sdk-cli)
  - [Virtual Data Model (VDM)](#virtual-data-model-vdm)
  - [Project "Piper"](#project-piper)
- [Feedback](#feedback)
- [Contribute](#contribute)
- [Links](#links)
- [License](#license)

## Packages

This project publishes multiple packages and is managed using [lerna](https://github.com/lerna/lerna).
To use the SDK in your project, we recommend using our [commandline interface](#sap-cloud-sdk-cli).

### @sap-cloud-sdk/core

The core is the heart of the SAP Cloud SDK and contains the functionality that is essential to every project powered by the SDK. Any OData client built by the SAP Cloud SDK, be it the VDM or clients built by the generator are using the core. We recommend to install this in addition to your clients.

To install the SAP Cloud SDK core in your project, run:

```bash
$ npm install @sap-cloud-sdk/core
```

### @sap-cloud-sdk/generator

The SAP Cloud SDK generator is a command line interface (CLI) that allows you to create clients for your own OData services or other SAP systems besides SAP S/4HANA based on their service specifications.

To install the SAP Cloud SDK generator in your project, run:

```bash
$ npm install @sap-cloud-sdk/generator
```

### @sap-cloud-sdk/test-util

The test-util package makes writing tests for your SAP Cloud Platform application more convenient.

To install the SAP Cloud SDK test-util as development dependencies in your project, run:

```bash
$ npm install -D @sap-cloud-sdk/test-util
```

## How to switch to the Open Source version of the SAP Cloud SDK

Please ignore this section, if you have never used the SAP Cloud SDK with a version `< 1.18.0`.
If you are using an old version of the SAP Cloud SDK, you might want to read [how to migrate to this Open Source version of the SAP Cloud SDK](https://sap.github.io/cloud-sdk/docs/js/guides/migrate-to-open-source-version-of-cloud-sdk-for-javascript-typescript).

## Related Projects

### SAP Cloud SDK CLI

To reduce the development effort even more, you can use the [SAP Cloud SDK command line interface (CLI)](https://github.com/sap/cloud-sdk-cli) to start a new [NestJS](https://github.com/nestjs/nest) project, including the SDK right from the get go and supporting you do deploy your project to SAP Cloud Platform.

### Virtual Data Model (VDM)

In addition to the Open Source parts of this project, we also publish the SAP Cloud SDK Virtual Data Model (VDM) - JavaScript / TypeScript clients for the latest versions of the published OData services of SAP S/4HANA Cloud under the SAP Developer license. Those are not included in this project, but rely on modules from this project.

To install an OData client for an SAP S/4HANA service run:

```bash
$ npm install @sap/cloud-sdk-vdm-<service name>-service
```

In the example above, `service name` is the name of the service you want to use, e. g. for the business partner service, run: `npm install @sap/cloud-sdk-vdm-business-partner-service`.

### Project "Piper"

Continuous delivery is a method to develop software with short feedback cycles.
It is applicable to projects both for SAP Cloud Platform and SAP on-premise platforms.
SAP implements tooling for continuous delivery in the open-source [project "Piper"](https://sap.github.io/jenkins-library/).
The goal of project "Piper" is to substantially ease setting up continuous delivery in your project using SAP technologies.

## Feedback

Feel free to leave your feedback in form of GitHub issues for bugs and feature requests. If you have broader questions, we are active on [StackOverflow](https://stackoverflow.com/questions/tagged/sap-cloud-sdk+javascript) too.

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

This project is licensed under Apache 2.0 except as noted otherwise in the [license file](./LICENSES/Apache-2.0.txt).
