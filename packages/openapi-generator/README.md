<!-- sap-cloud-sdk-logo -->
<!-- This block is inserted by scripts/replace-common-readme.ts and not oclif like the commands block. Do not adjust it manually. -->

<a href="https://sap.com/s4sdk"><img src="https://help.sap.com/doc/2324e9c3b28748a4ae2ad08166d77675/1.0/en-US/logo-with-js.svg" alt="SAP Cloud SDK for JavaScript Logo" height="122.92" width="226.773"/></a>

<!-- sap-cloud-sdk-logo-stop -->

# @sap-cloud-sdk/openapi-generator (Beta)

This packages contains the generator to create your own service module using a OpenAPI specification.
This generator is based on the [OpenAPI Tools generator](https://openapi-generator.tech/) for OpenAPI and adds some additional code for convenience to better integrate with the SAP Cloud SDK.

## Installation

The official OpenAPI generator is Java based, therefore you need to have a Java runtime installed to use the SAP Cloud SDK OpenAPI generator.

```bash
$ npm install @sap-cloud-sdk/openapi-generator
```

## Usage (CLI)

<!-- prettier-ignore-start -->
<!-- commands -->
* [`generate-openapi-client autocomplete [SHELL]`](#generate-openapi-client-autocomplete-shell)
* [`generate-openapi-client help [COMMAND]`](#generate-openapi-client-help-command)

## `generate-openapi-client autocomplete [SHELL]`

display autocomplete installation instructions

```
USAGE
  $ generate-openapi-client autocomplete [SHELL]

ARGUMENTS
  SHELL  shell type

OPTIONS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

EXAMPLES
  $ generate-openapi-client autocomplete
  $ generate-openapi-client autocomplete bash
  $ generate-openapi-client autocomplete zsh
  $ generate-openapi-client autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v0.3.0/src/commands/autocomplete/index.ts)_

## `generate-openapi-client help [COMMAND]`

display help for generate-openapi-client

```
USAGE
  $ generate-openapi-client help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_
<!-- commandsstop -->
<!-- prettier-ignore-end -->

# Usage (programatically)

```ts
import { generate } from '@sap-cloud-sdk/openapi-generator';

// initialize generator options based on what you want to do
// note that inputDir and outputDir are mandatory
const options: GeneratorOptions = {
  inputDir: 'path/to/inputDir',
  outputDir: 'path/to/outputDir'
};

// generates the files and writes them to the outputDir
await generate(options);
```

For more detailed overview visit our [generator documentation](https://sap.github.io/cloud-sdk/docs/js/features/openapi/generate-openapi-client).

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
