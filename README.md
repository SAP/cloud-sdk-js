<a href="https://sap.com/s4sdk"><img src="https://help.sap.com/doc/2324e9c3b28748a4ae2ad08166d77675/1.0/en-US/logo-with-js.svg" alt="SAP Cloud SDK for JavaScript Logo" height="122.92" width="226.773"/></a>

# SAP Cloud SDK
The SAP Cloud SDK reduces your development effort when building side-by-side extension applications on SAP Cloud Platform that integrate with SAP solutions and services such as SAP S/4HANA Cloud, SAP SuccessFactors, and many others.

### Table of Contents
- [Related Projects](#related-projects)
  - [SAP Cloud SDK CLI](#sap-cloud-sdk-cli)
  - [Virtual Data Model (VDM)](#virtual-data-model-vdm)
- [Packages](#packages)
  - [@sap-cloud-sdk/core](#sap-cloud-sdkcore)
  - [@sap-cloud-sdk/generator](#sap-cloud-sdkgenerator)
  - [@sap-cloud-sdk/test-util](#sap-cloud-sdktest-util)
- [Contributing](#contributing)
- [Links](#links)
- [License](#license)

## Related Projects

### SAP Cloud SDK CLI
To reduce the development effort even more, you can use the [SAP Cloud SDK command line interface (CLI)](https://github.com/sap/cloud-sdk-cli) to start a new [NestJS](https://github.com/nestjs/nest) project, including the SDK right from the get go and supporting you do deploy your project to SAP Cloud Platform.

### Virtual Data Model (VDM)
In addition to the Open Source parts of this project, we also publish the SAP Cloud SDK Virtual Data Model (VDM) - JavaScript / TypeScript clients for the whitelisted OData services of SAP S/4HANA Cloud under the SAP Developer licence. Those are not included in this project, but rely on modules from this project.

To install an OData client for an SAP S/4HANA service, make sure you have an `.npmrc` in the root of your project, that contains a reference to the the SAP npm registry: `@sap:registry=https://npm.sap.com`.
Then run:
```sh-session
$ npm install @sap-cloud-sdk/core
```

## Packages
This project publishes multiple packages and is managed using [lerna](https://github.com/lerna/lerna).

### @sap-cloud-sdk/core
The core is the heart of the SAP Cloud SDK and contains the functionality that is essential to every project. Any OData client built by the SAP Cloud SDK, be it the VDM or clients built by the generator are using the core. We recommend to install this in addition to your clients.

To install the SAP Cloud SDK core in your project, run:
```sh-session
$ npm install @sap-cloud-sdk/core
```

### @sap-cloud-sdk/generator
The SAP Cloud SDK generator is a command line interface (CLI) that allows you to create clients for your own OData services or other SAP systems besides SAP S/4HANA based on their service specifications.

To install the SAP Cloud SDK generator in your project, run:
```sh-session
$ npm install @sap-cloud-sdk/generator
```

### @sap-cloud-sdk/test-util
The test-util package makes writing tests for your SAP Cloud Platform application more convenient:

To install the SAP Cloud SDK test-util as development dependencies in your project, run:
```sh-session
$ npm install -D @sap-cloud-sdk/test-util
```

## Contribute
Want to contribute? Check out our [contributing](./CONTRIBUTING.md) guide.

## Links
- [SAP Help Page on SAP Cloud SDK](https://help.sap.com/viewer/product/SAP_CLOUD_SDK/1.0/en-US)
- [Product page of the SAP Cloud SDK](https://developers.sap.com/topics/cloud-sdk.html)
- [SAP Cloud SDK Continuous Delivery Toolkit](https://github.com/SAP/cloud-s4-sdk-pipeline)
- [Example Applications using the SAP Cloud SDK](https://github.com/SAP/cloud-s4-sdk-examples)
- [SAP Cloud SDK community page](https://community.sap.com/topics/cloud-sdk)
- [Community Call for SAP Cloud SDK](https://blogs.sap.com/2019/06/26/sap-cloud-sdk-new-format-of-the-update-call-for-sap-community/)

## License
Copyright (c) 2020 SAP SE or an SAP affiliate company.
All rights reserved.
This file is licensed under the Apache Software License, v. 2 except as noted otherwise in the [LICENSE file](LICENSE).

Note: This license does not apply to the SAP Cloud SDK for JavaScript Logo referenced in this README.
