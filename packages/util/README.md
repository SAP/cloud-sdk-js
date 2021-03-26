<!-- sap-cloud-sdk-logo -->
<!-- This block is inserted by scripts/replace-common-readme.ts and not oclif like the commands block. Do not adjust it manually. -->

<a href="https://sap.com/s4sdk"><img src="https://help.sap.com/doc/2324e9c3b28748a4ae2ad08166d77675/1.0/en-US/logo-with-js.svg" alt="SAP Cloud SDK for JavaScript Logo" height="122.92" width="226.773"/></a>

<!-- sap-cloud-sdk-logo-stop -->

# @sap-cloud-sdk/util

This package contains general utility functions that we reuse multiple times in the SDK.
While primarily designed for internal usage, they might also be beneficial for consumers of the SDK.

### Installation

```
$ npm install @sap-cloud-sdk/util
```

### Usage

The util package collects useful tools that help build your SAP Cloud Platform application.
For example, the following code snippet changes the log level of the destination accessor of the SDK.

```
import { setLogLevel } from '@sap-cloud-sdk/util';
setLogLevel('debug', 'destination-accessor');
```

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
