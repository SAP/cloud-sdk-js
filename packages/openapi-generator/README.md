<!-- sap-cloud-sdk-logo -->
<!-- This block is inserted by scripts/replace-common-readme.ts. Do not adjust it manually. -->
<a href="https://sap.github.io/cloud-sdk/docs/js/overview"><img src="https://help.sap.com/doc/2324e9c3b28748a4ae2ad08166d77675/1.0/en-US/logo-with-js.svg" alt="SAP Cloud SDK for JavaScript Logo" height="122.92" width="226.773"/></a>
<!-- sap-cloud-sdk-logo-stop -->

# @sap-cloud-sdk/openapi-generator

This package contains the generator to create your own service module using a OpenAPI specification.
This generator is based on the [OpenAPI Tools generator](https://openapi-generator.tech/) for OpenAPI and adds some additional code for convenience to better integrate with the SAP Cloud SDK.

## Installation

```bash
$ npm install @sap-cloud-sdk/openapi-generator
```

To run the CLI locally, compile and link the package.

```bash
$ yarn install

$ yarn compile

$ npm link

$ openapi-generator help
```

## Usage (CLI)

The generator is primarily meant to be used on the command line:

```sh
npx openapi-generator --input path/to/your/service-specification(s) --outputDir path/where/the/modules/are/stored
```

Run `openapi-generator --help` for further options.

## Usage (programatically)

You can also use the generator programmatically. You will have to provide the options anyways.

```ts
import { generate } from '@sap-cloud-sdk/openapi-generator';

// initialize generator options based on what you want to do
const options: GeneratorOptions = initializeOptions();

// generate the client using the provided options
generate(options);
```

For more detailed overview visit our [generator documentation](https://sap.github.io/cloud-sdk/docs/js/features/openapi/generate-client).


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