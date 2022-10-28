<!-- sap-cloud-sdk-logo -->
<!-- This block is inserted by scripts/replace-common-readme.ts. Do not adjust it manually. -->
<a href="https://sap.com/s4sdk"><img src="https://help.sap.com/doc/2324e9c3b28748a4ae2ad08166d77675/1.0/en-US/logo-with-js.svg" alt="SAP Cloud SDK for JavaScript Logo" height="122.92" width="226.773"/></a>
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

Generate OpenAPI client(s), that use the connectivity features of the SAP Cloud SDK for JavaScript/TypeScript.

<!-- commands -->
<!-- This block is inserted by generate-readme.ts. Do not adjust it manually. -->
```
Usage: openapi-generator --input <input> --outputDir <outputDirectory>

Options:
      --help                  Show help                                [boolean]
      --version               Show version number                      [boolean]
  -i, --input                 Specify the path to the directory or file
                              containing the OpenAPI service definition(s) to
                              generate clients for. Accepts Swagger and OpenAPI
                              definitions as YAML and JSON files. Throws an
                              error if the path does not exist.
                                                             [string] [required]
  -o, --outputDir             Specify the path to the directory to generate the
                              client(s) in. Each client is generated into a
                              subdirectory within the given output directory.
                              Creates the directory if it does not exist.
                              Customize subdirectory naming through
                              `--optionsPerService`.         [string] [required]
  -t, --transpile             Transpile the generated TypeScript code. When
                              enabled a default `tsconfig.json` will be
                              generated and used. It emits `.js`, `.js.map`,
                              `.d.ts` and `.d.ts.map` files. To configure
                              transpilation set `--tsconfig`.
                                                      [boolean] [default: false]
      --include               Include files matching the given glob into the
                              root of each generated client directory.  [string]
      --overwrite             Allow to overwrite files, that already exist. This
                              is useful, when running the generation regularly.
                                                      [boolean] [default: false]
      --clearOutputDir        Remove all files in the output directory before
                              generation. Be cautious when using this option, as
                              it really removes EVERYTHING in the output
                              directory.              [boolean] [default: false]
      --skipValidation        By default, the generation fails, when there are
                              duplicate or invalid names for operations and/or
                              path parameters after transforming them to camel
                              case. Set this to true to enable unique and valid
                              name generation. The names will then be generated
                              by appending numbers and prepending prefixes.
                                                      [boolean] [default: false]
      --tsConfig              Replace the default `tsconfig.json` by passing a
                              path to a custom config. By default, a
                              `tsconfig.json` is only generated, when
                              transpilation is enabled (`--transpile`). If a
                              directory is passed, a `tsconfig.json` file is
                              read from this directory.                 [string]
      --packageJson           When enabled, a `package.json`, that specifies
                              dependencies and scripts for transpilation and
                              documentation generation is generated.
                                                      [boolean] [default: false]
      --licenseInPackageJson  License to be used on the generated package.json.
                              Only considered if 'packageJson' is enabled.
                                                                        [string]
  -v, --verbose               Turn on verbose logging.[boolean] [default: false]
      --optionsPerService     Set the path to a file containing the options per
                              service. The configuration allows to set a
                              `directoryName` and `packageName` for every
                              service, identified by the path to the original
                              file. It also makes sure that names do not change
                              between generator runs. If a directory is passed,
                              a `options-per-service.json` file is read/created
                              in this directory.                        [string]
  -c, --config                Set the path to a file containing the options for
                              generation instead of setting the options on the
                              command line. When combining the `config` option
                              with other options on the command line, the
                              command line options take precedence. If a
                              directory is passed, a `config.json` file is read
                              from this directory.                      [string]
```
<!-- commandsstop -->

## Usage (programmatically)

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
<!-- This block is inserted by scripts/replace-common-readme.ts. Do not adjust it manually. -->
## Support

The recommended way to get in touch with us is to create an issue on [GitHub](https://github.com/SAP/cloud-sdk-js/issues).
Select the issue category `Bug`, `Feature` or `Question` depending on the nature of your request.
We try to provide fixes, features and answers as soon as possible.

## Contribute

If you would like to contribute to the SAP Cloud SDK, please make yourself familiar with our [contributing guidelines](https://github.com/SAP/cloud-sdk-js/blob/main/CONTRIBUTING.md) and follow the given instructions.

## Links
- [Official support channel](https://github.com/SAP/cloud-sdk-js/issues/new/choose)

<br>

- [Github](https://github.com/SAP/cloud-sdk-js)

<br>

- [SAP Cloud SDK Documentation portal](https://sap.github.io/cloud-sdk)
- [SAP Cloud SDK Documentation portal - Getting started guide](https://sap.github.io/cloud-sdk/docs/js/getting-started)
- [SAP Cloud SDK Documentation portal - API documentation](https://sap.github.io/cloud-sdk/api/latest)
- [SAP Cloud SDK Documentation portal - Error handling](https://sap.github.io/cloud-sdk/docs/js/features/error-handling)
- [SAP Cloud SDK Documentation portal - Release notes](https://sap.github.io/cloud-sdk/docs/js/release-notes-sap-cloud-sdk-for-javascript-and-typescript)

<br>

- [Sample repository](https://github.com/SAP-samples/cloud-sdk-js)

## License

The SAP Cloud SDK is released under the [Apache License Version 2.0.](http://www.apache.org/licenses/)
<!-- sap-cloud-sdk-common-readme-stop -->
