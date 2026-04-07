<!-- sap-cloud-sdk-logo -->
<!-- This block is inserted by scripts/replace-common-readme.ts. Do not adjust it manually. -->
<a href="https://sap.github.io/cloud-sdk/docs/js/overview"><img src="https://help.sap.com/doc/2324e9c3b28748a4ae2ad08166d77675/1.0/en-US/logo-with-js.svg" alt="SAP Cloud SDK for JavaScript Logo" height="122.92" width="226.773"/></a>
<!-- sap-cloud-sdk-logo-stop -->

# @sap-cloud-sdk/util

This package contains general utility functions that we reuse multiple times in the SDK.
While primarily designed for internal usage, they might also be beneficial for consumers of the SDK.

### Installation

```
$ npm install @sap-cloud-sdk/util
```

### Usage

The util package collects useful tools that help build your SAP Business Technology Platform application.
For example, the following code snippet changes the log level of the destination accessor of the SDK.

```
import { setLogLevel } from '@sap-cloud-sdk/util';
setLogLevel('debug', 'destination-accessor');
```

<!-- sap-cloud-sdk-common-readme -->
<!-- This block is inserted by scripts/replace-common-readme.ts. Do not adjust it manually. -->
## Support

The recommended way to get in touch with us is to create an issue on [GitHub](https://github.com/SAP/cloud-sdk-js/issues).
Select the issue category **Bug**, **Feature**, or **Question** depending on the nature of your request.
We try to provide fixes, features and answers as soon as possible.

## Contribute

If you would like to contribute to the SAP Cloud SDK, please make yourself familiar with our [contributing guidelines](https://github.com/SAP/cloud-sdk-js/blob/main/CONTRIBUTING.md) and follow the given instructions.

## Links

- [Official support channel](https://github.com/SAP/cloud-sdk-js/issues/new/choose)
- [Github](https://github.com/SAP/cloud-sdk-js)
- [SAP Cloud SDK Documentation](https://sap.github.io/cloud-sdk)
  - [Overview](https://sap.github.io/cloud-sdk/docs/js/overview)
  - [Getting started guide](https://sap.github.io/cloud-sdk/docs/js/getting-started)
  - [API documentation](https://sap.github.io/cloud-sdk/api/latest)
  - [Release notes](https://sap.github.io/cloud-sdk/docs/js/release-notes)
- [Sample repository](https://github.com/SAP-samples/cloud-sdk-js)

## License

The SAP Cloud SDK is released under the [Apache License Version 2.0.](http://www.apache.org/licenses/)
<!-- sap-cloud-sdk-common-readme-stop -->
