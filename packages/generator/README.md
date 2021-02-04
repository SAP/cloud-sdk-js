<a href="https://sap.com/s4sdk"><img src="https://help.sap.com/doc/2324e9c3b28748a4ae2ad08166d77675/1.0/en-US/logo-with-js.svg" alt="SAP Cloud SDK for JavaScript Logo" height="122.92" width="226.773"/></a>

# @sap-cloud-sdk/generator

This packages contains the generator to create your own service module using a service specification (.edmx file).

## Installation

```sh
$ npm install @sap-cloud-sdk/generator
```

## Usage (CLI)

The generator is primarily meant to be used on the command line:

```sh
generate-odata-client --inputDir path/to/your/service-specification(s) --outputDir path/where/the/modules/are/stored
```

Run `generate-odata-client --help` for further options.

## Usage (programatically)
You can also use the generator programmatically. You will have to provide the options anyways.

```ts
import { generate } from '@sap-cloud-sdk/generator';

// initialize generator options based on what you want to do
const options: GeneratorOptions = initializeOptions();

// generate the client using the provided options
generate(options)
```

For more detailed overview visit our [generator documentation](https://sap.github.io/cloud-sdk/docs/js/features/odata/generate-odata-client).

XXX I copy the generic part from the core readme here after review

