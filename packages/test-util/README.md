<!-- sap-cloud-sdk-logo -->
<!-- This block is inserted by scripts/replace-common-readme.ts. Do not adjust it manually. -->
<a href="https://sap.github.io/cloud-sdk/docs/js/overview"><img src="https://help.sap.com/doc/2324e9c3b28748a4ae2ad08166d77675/1.0/en-US/logo-with-js.svg" alt="SAP Cloud SDK for JavaScript Logo" height="122.92" width="226.773"/></a>
<!-- sap-cloud-sdk-logo-stop -->

# @sap-cloud-sdk/test-util

This package contains utility functions for testing, like loading credentials or creating test destinations.

## Installation

```
$ npm install @sap-cloud-sdk/test-util
```

## Usage

The test-util package makes writing tests for your SAP Business Technology Platform application more convenient.

For example, you can create a mock destination for your tests by using the function `mockTestDestination`.

```
import { mockTestDestination } from '@sap-cloud-sdk/test-util';
mockTestDestination('mockDestinationName');
```

You need to save your system information in local file `systems.json`:

```json
{
  "systems": [
    {
      "alias": "mockDestinationName",
      "uri": "https://www.example.com"
    }
  ]
}
```

and `credentials.json`:

```json
{
  "credentials": [
    {
      "alias": "SYS_001",
      "username": "username",
      "password": "password"
    }
  ]
}
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
- [SAP Cloud SDK Documentation portal](https://sap.github.io/cloud-sdk)
  - [SAP Cloud SDK Documentation portal - Overview](https://sap.github.io/cloud-sdk/docs/js/overview)
  - [SAP Cloud SDK Documentation portal - Getting started guide](https://sap.github.io/cloud-sdk/docs/js/getting-started)
  - [SAP Cloud SDK Documentation portal - API documentation](https://sap.github.io/cloud-sdk/api/latest)
  - [SAP Cloud SDK Documentation portal - Release notes](https://sap.github.io/cloud-sdk/docs/js/release-notes)
- [Sample repository](https://github.com/SAP-samples/cloud-sdk-js)

## License

The SAP Cloud SDK is released under the [Apache License Version 2.0.](http://www.apache.org/licenses/)
<!-- sap-cloud-sdk-common-readme-stop -->
