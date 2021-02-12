## SAP Cloud SDK OpenAPI Client Generator (Beta)

Generate custom JavaScript/TypeScript clients for services with OpenAPI specifications.
This generator is based on the [OpenAPI Tools generator](https://openapi-generator.tech/) for OpenAPI and adds some additional code for convenience to better integrate with the SAP Cloud SDK.

## Prerequisites

The official OpenAPI generator is Java based, therefore you need to have a Java runtime installed to use the SAP Cloud SDK OpenAPI generator.

# Installation
```bash
$ npm install @sap-cloud-sdk/openapi-generator
```
# Usage (CLI)
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

### Documentation
[Getting started guide](https://sap.github.io/cloud-sdk/docs/js/getting-started)
[API documentation](https://sap.github.io/cloud-sdk/docs/js/api-reference-js-ts)

### Helpful Links

- [SAP Cloud SDK Documentation portal](https://sap.github.io/cloud-sdk/)
- [Tutorials on developers.sap.com](https://developers.sap.com/tutorial-navigator.html?tag=products:technology-platform/sap-cloud-sdk/sap-cloud-sdk&tag=topic:javascript)
- [SAP Cloud SDK on StackOverflow](https://stackoverflow.com/questions/tagged/sap-cloud-sdk?tab=Newest)
- [SAP Cloud SDK on answers.sap.com](https://answers.sap.com/tags/73555000100800000895)
- [Release notes on help.sap.com](https://help.sap.com/doc/2324e9c3b28748a4ae2ad08166d77675/1.0/en-US/js-index.html)
- [Release notes on Github](https://github.com/SAP/cloud-sdk-js/releases)
- [All versions of this documentation](https://help.sap.com/viewer/product/SAP_CLOUD_SDK/1.0/en-US)
- [Product page of the SAP Cloud SDK](https://developers.sap.com/topics/cloud-sdk.html)
- [SAP Cloud SDK Continuous Delivery Toolkit](https://github.com/SAP/cloud-s4-sdk-pipeline)
