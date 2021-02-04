<a href="https://sap.com/s4sdk"><img src="https://help.sap.com/doc/2324e9c3b28748a4ae2ad08166d77675/1.0/en-US/logo-with-js.svg" alt="SAP Cloud SDK for JavaScript Logo" height="122.92" width="226.773"/></a>

# @sap-cloud-sdk/openapi-generator (Beta)

This packages contains the generator to create your own service module using a OpenAPI specification.
This generator is based on the [OpenAPI Tools generator](https://openapi-generator.tech/) for OpenAPI and adds some additional code for convenience to better integrate with the SAP Cloud SDK.

## Installation

The official OpenAPI generator is Java based, therefore you need to have a Java runtime installed to use the SAP Cloud SDK OpenAPI generator.

```bash
$ npm install @sap-cloud-sdk/openapi-generator
```
## Usage (CLI)
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

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.1/src/commands/help.ts)_
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

For more detailed overview visit our [generator documentation](https://sap.github.io/cloud-sdk/docs/js/features/openapi/generate-openapi-client).

XXX I copy the generic part from the core readme here after review
