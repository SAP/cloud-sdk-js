<!-- sap-cloud-sdk-logo -->
<!-- This block is inserted by scripts/replace-common-readme.ts. Do not adjust it manually. -->
<a href="https://sap.github.io/cloud-sdk/docs/js/overview"><img src="https://help.sap.com/doc/2324e9c3b28748a4ae2ad08166d77675/1.0/en-US/logo-with-js.svg" alt="SAP Cloud SDK for JavaScript Logo" height="122.92" width="226.773"/></a>
<!-- sap-cloud-sdk-logo-stop -->

# @sap-cloud-sdk/temporal-de-serializers

This package contains the [Temporal](https://tc39.es/proposal-temporal/docs/) based middleware for date/time (de-)serialization in the SAP Cloud SDK.

## Installation

```
$ npm install @sap-cloud-sdk/temporal-de-serializers
```

## Usage
```
import { temporalDeSerializersV4 } from '@sap-cloud-sdk/temporal-de-serializers';

const { businessPartnerApi } = businessPartnerService(temporalDeSerializersV4);
businessPartnerApi
  .entityBuilder()
  .organizationFoundationDate(
    Temporal.PlainDateTime.from('1995-12-07T03:24:30')
  )
  .build();
```
For more detailed overview visit the [Temporal middleware documentation](https://sap.github.io/cloud-sdk/docs/js/features/odata/v4-client#using-de-serializers-for-temporal).

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
- SAP Cloud SDK for AI (JavaScript)
  - [GitHub](https://github.com/SAP/ai-sdk-js)
  - [Documentation](https://sap.github.io/ai-sdk)

## License

The SAP Cloud SDK is released under the [Apache License Version 2.0.](http://www.apache.org/licenses/)
<!-- sap-cloud-sdk-common-readme-stop -->
