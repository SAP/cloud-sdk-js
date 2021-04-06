<!-- sap-cloud-sdk-logo -->
<!-- This block is inserted by scripts/replace-common-readme.ts and not oclif like the commands block. Do not adjust it manually. -->

<a href="https://sap.com/s4sdk"><img src="https://help.sap.com/doc/2324e9c3b28748a4ae2ad08166d77675/1.0/en-US/logo-with-js.svg" alt="SAP Cloud SDK for JavaScript Logo" height="122.92" width="226.773"/></a>

<!-- sap-cloud-sdk-logo-stop -->

# @sap-cloud-sdk/core

This package contains the core functionality of the SAP Cloud SDK as well as the Cloud Platform abstractions.

## Installation

```
$ npm install @sap-cloud-sdk/core
```

## Usage

The core is the heart of the SAP Cloud SDK and contains the functionality that is essential to every project powered by the SDK.
Any OData client built by the SAP Cloud SDK, be it the VDM or clients built by the generator are using the core.
We recommend to install this in addition to your clients.

Below is an example showing how you can build and execute your request with multiple filters by using an function called `and`.

```
import { and } from '@sap-cloud-sdk/core';
import { BusinessPartner } from '@sap/cloud-sdk-vdm-business-partner-service';

// Build your filters
const firstNameFilter = BusinessPartner.FIRST_NAME.equals('firstName');
const lastNameFilter = BusinessPartner.LAST_NAME.equals('lastName');

// Execute your request with two filters
BusinessPartner.requestBuilder()
 .getAll()
 .filter(and(firstNameFilter, lastNameFilter))
 .execute(yourDestination);
```

For more detailed overview visit our [OData client documentation](https://sap.github.io/cloud-sdk/docs/js/features/odata/use-odata-v2-type-safe-client-for-javascript-typescript).

<!-- sap-cloud-sdk-common-readme -->
<!-- This block is inserted by scripts/replace-common-readme.ts and not oclif like the commands block. Do not adjust it manually. -->

## Support

The recommended way to get in touch with us is to create an issue in our [github repository](https://github.com/SAP/cloud-sdk-js/issues).
Select the issue category `Bug`, `Feature` or `Question` depending on the nature of your request.
We try to provide fixes, features and answers as soon as possible.

We also monitor questions on [StackOverflow](https://stackoverflow.com/questions/tagged/sap-cloud-sdk?tab=Newest) and [ansers.sap.com](https://answers.sap.com/tags/73555000100800000895) but prefer issues on github.

## Contribute

If you would like to contribute to the SAP Cloud SDK, please make yourself familiar with our [contributing guidelines](https://github.com/SAP/cloud-sdk-js/blob/main/CONTRIBUTING.md) and follow the given instructions.

## Links

- [Github](https://github.com/SAP/cloud-sdk-js)
- [Github - Releases](https://github.com/SAP/cloud-sdk-js/releases)

<br>

- [SAP Cloud SDK Documentation portal](https://sap.github.io/cloud-sdk/)
- [SAP Cloud SDK Documentation portal - Getting started guide](https://sap.github.io/cloud-sdk/docs/js/getting-started)
- [SAP Cloud SDK Documentation portal - API documentation](https://sap.github.io/cloud-sdk/docs/js/api-reference-js-ts)

<br>

- [developers.sap.com - Product Overview](https://developers.sap.com/topics/cloud-sdk.html)
- [developers.sap.com - Tutorials](https://developers.sap.com/tutorial-navigator.html?tag=products:technology-platform/sap-cloud-sdk/sap-cloud-sdk&tag=topic:javascript)

## License

The SAP Cloud SDK is released under the [Apache License Version 2.0.](http://www.apache.org/licenses/)

<!-- sap-cloud-sdk-common-readme-stop -->
