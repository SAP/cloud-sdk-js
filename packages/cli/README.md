<!-- sap-cloud-sdk-logo -->
<!-- This block is inserted by scripts/replace-common-readme.ts and not oclif like the commands block. Do not adjust it manually. -->

<a href="https://sap.com/s4sdk"><img src="https://help.sap.com/doc/2324e9c3b28748a4ae2ad08166d77675/1.0/en-US/logo-with-js.svg" alt="SAP Cloud SDK for JavaScript Logo" height="122.92" width="226.773"/></a>

<!-- sap-cloud-sdk-logo-stop -->

# @sap-cloud-sdk/cli

This package contains the command-line interface (CLI) of the SAP Cloud SDK.
The CLI offers commands to scaffold new projects or create typed API clients.

## Installation

```bash
$ npm install @sap-cloud-sdk/cli
```

## Usage

<!-- commands -->

- [`sap-cloud-sdk add-approuter [PROJECTDIR]`](#sap-cloud-sdk-add-approuter-projectdir)
- [`sap-cloud-sdk add-cds [PROJECTDIR]`](#sap-cloud-sdk-add-cds-projectdir)
- [`sap-cloud-sdk add-cx-server [PROJECTDIR]`](#sap-cloud-sdk-add-cx-server-projectdir)
- [`sap-cloud-sdk autocomplete [SHELL]`](#sap-cloud-sdk-autocomplete-shell)
- [`sap-cloud-sdk generate-odata-client`](#sap-cloud-sdk-generate-odata-client)
- [`sap-cloud-sdk help [COMMAND]`](#sap-cloud-sdk-help-command)
- [`sap-cloud-sdk help-page`](#sap-cloud-sdk-help-page)
- [`sap-cloud-sdk init [PROJECTDIR]`](#sap-cloud-sdk-init-projectdir)
- [`sap-cloud-sdk package [PROJECTDIR]`](#sap-cloud-sdk-package-projectdir)

## `sap-cloud-sdk add-approuter [PROJECTDIR]`

Setup your Cloud Foundry app to authenticate through the app router

```
USAGE
  $ sap-cloud-sdk add-approuter [PROJECTDIR]

ARGUMENTS
  PROJECTDIR  Path to the project directory to which the approuter should be added.

OPTIONS
  -h, --help  Show help for the add-approuter command.
  --force     Do not fail if a file already exist and overwrite it.

ALIASES
  $ sap-cloud-sdk add-app-router

EXAMPLE
  $ sap-cloud-sdk add-approuter
```

_See code: [src/commands/add-approuter.ts](https://github.com/SAP/cloud-sdk-js/blob/v1.40.0/src/commands/add-approuter.ts)_

## `sap-cloud-sdk add-cds [PROJECTDIR]`

Setup your Cloud Foundry app to use a CDS service

```
USAGE
  $ sap-cloud-sdk add-cds [PROJECTDIR]

ARGUMENTS
  PROJECTDIR  Path to the project directory in which the cds sources should be added.

OPTIONS
  -h, --help     Show help for the add-cds command.
  -v, --verbose  Show more detailed output.
  --force        Do not fail if a file or npm script already exist and overwrite it.

EXAMPLE
  $ sap-cloud-sdk add-cds
```

_See code: [src/commands/add-cds.ts](https://github.com/SAP/cloud-sdk-js/blob/v1.40.0/src/commands/add-cds.ts)_

## `sap-cloud-sdk add-cx-server [PROJECTDIR]`

Add the scripts to set up a Jenkins server for CI/CD of your project

```
USAGE
  $ sap-cloud-sdk add-cx-server [PROJECTDIR]

ARGUMENTS
  PROJECTDIR  Path to the project directory to which the cx-server should be added.

OPTIONS
  -h, --help  Show help for the add-cx-server command.
  --force     Do not fail if a file already exist and overwrite it.

EXAMPLE
  $ sap-cloud-sdk add-cx-server
```

_See code: [src/commands/add-cx-server.ts](https://github.com/SAP/cloud-sdk-js/blob/v1.40.0/src/commands/add-cx-server.ts)_

## `sap-cloud-sdk autocomplete [SHELL]`

display autocomplete installation instructions

```
USAGE
  $ sap-cloud-sdk autocomplete [SHELL]

ARGUMENTS
  SHELL  shell type

OPTIONS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

EXAMPLES
  $ sap-cloud-sdk autocomplete
  $ sap-cloud-sdk autocomplete bash
  $ sap-cloud-sdk autocomplete zsh
  $ sap-cloud-sdk autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v0.3.0/src/commands/autocomplete/index.ts)_

## `sap-cloud-sdk generate-odata-client`

Generates a OData client from a edmx service file definition. For SAP solutions, you can find these definitions at https://api.sap.com/.

```
USAGE
  $ sap-cloud-sdk generate-odata-client

OPTIONS
  -i, --inputDir=inputDir                              (required) This directory will be recursively searched for
                                                       .edmx/.xml files.

  -n, --processesJsGeneration=processesJsGeneration    [default: 16] Number of processes used for generation of
                                                       javascript files.

  -o, --outputDir=outputDir                            (required) Directory to save the generated code in.

  -s, --serviceMapping=serviceMapping                  Configuration file to ensure consistent names between multiple
                                                       generation runs with updated / changed metadata files. Will be
                                                       generated if not existent. By default it will be saved to/read
                                                       from the input directory as "service-mapping.json".

  --additionalFiles=additionalFiles                    Glob describing additional files to be added to the each
                                                       generated service directory.

  --aggregatorDirectoryName=aggregatorDirectoryName    Hack for cloud-sdk-vdm package

  --aggregatorNpmPackageName=aggregatorNpmPackageName  When provided, the generator will generate an additional package
                                                       with the provided name that has dependencies to all other
                                                       generated packages.

  --clearOutputDir                                     When set to true, the generator will delete EVERYTHING in the
                                                       specified output directory before generating code. [default:
                                                       false].

  --forceOverwrite                                     By default, the generator will exit when encountering a file that
                                                       already exists. When set to true, it will be overwritten instead.
                                                       Please note that compared to the --clearOutputDir option, this
                                                       will not delete outdated files. [default: false].

  --generateCSN                                        When set to true a CSN file will be generated for each service
                                                       definition in the output directory. [default: false].

  --[no-]generateJs                                    By default, the generator will also generate transpiled .js,
                                                       .js.map, .d.ts and .d.ts.map files. When set to false, the
                                                       generator will only generate .ts files. [default: true].

  --[no-]generatePackageJson                           By default, the generator will generate a package.json file,
                                                       specifying dependencies and scripts for compiling and generating
                                                       documentation. When set to false, the generator will skip the
                                                       generation of the package.json. [default: true].

  --[no-]generateTypedocJson                           By default, the generator will generate a typedoc.json file for
                                                       each package, used for the corresponding "doc" npm script. When
                                                       set to false, the generator will skip the generation of the
                                                       typedoc.json. [default: true].

  --projectDir=projectDir                              [default: .] Path to the folder in which the VDM should be
                                                       created. The input and output dir are relative to this directory.

  --s4hanaCloud                                        When set to true, the description of the generated packages will
                                                       be specific to S/4HANA Cloud. [default: false].

  --sdkAfterVersionScript                              When set to true, the package.json of generated services will
                                                       have the after-version script to internally keep the versions in
                                                       sync. [default: false].

  --useSwagger                                         Augment parsed information with information from swagger
                                                       definition files. Files are expected to have the same name as the
                                                       edmx file, but with .json as suffix. [default: false].

  --versionInPackageJson=versionInPackageJson          By default, when generating package.json file, the generator will
                                                       set a version by using the generator version. It can also be set
                                                       to a specific version.

  --writeReadme                                        When set to true, the generator will write a README.md file into
                                                       the root folder of every package. This option does not make that
                                                       much sense without also set useSwagger to "true". [default:
                                                       false].

EXAMPLES
  $ sap-cloud-sdk generate-odata-client -i directoryWithEdmxFiles -o outputDirectory --forceOverwrite
  $ sap-cloud-sdk generate-odata-client --help
```

_See code: [src/commands/generate-odata-client.ts](https://github.com/SAP/cloud-sdk-js/blob/v1.40.0/src/commands/generate-odata-client.ts)_

## `sap-cloud-sdk help [COMMAND]`

display help for sap-cloud-sdk

```
USAGE
  $ sap-cloud-sdk help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

## `sap-cloud-sdk help-page`

Display the product page, which contains tutorials and links to all relevant resources

```
USAGE
  $ sap-cloud-sdk help-page
```

_See code: [src/commands/help-page.ts](https://github.com/SAP/cloud-sdk-js/blob/v1.40.0/src/commands/help-page.ts)_

## `sap-cloud-sdk init [PROJECTDIR]`

Initializes your project for the SAP Cloud SDK, SAP Cloud Platform Cloud Foundry and CI/CD using the SAP Cloud SDK toolkit

```
USAGE
  $ sap-cloud-sdk init [PROJECTDIR]

ARGUMENTS
  PROJECTDIR  Path to the directory in which the project should be created.

OPTIONS
  -h, --help               Show help for the init command.
  -v, --verbose            Show more detailed output.

  --addCds                 Add a cds configuration and example data to follow the SAP Cloud Application Programming
                           model.

  --force                  Do not fail if a file or npm script already exist and overwrite it.

  --frontendScripts        Add frontend-related npm scripts which are executed by our CI/CD toolkit.

  --projectDir=projectDir  Path to the directory in which the project should be created.

EXAMPLES
  $ sap-cloud-sdk init
  $ sap-cloud-sdk init --help
```

_See code: [src/commands/init.ts](https://github.com/SAP/cloud-sdk-js/blob/v1.40.0/src/commands/init.ts)_

## `sap-cloud-sdk package [PROJECTDIR]`

Copies the specified files to the deployment folder

```
USAGE
  $ sap-cloud-sdk package [PROJECTDIR]

ARGUMENTS
  PROJECTDIR  Path to the project directory that shall be packaged.

OPTIONS
  -e, --exclude=exclude  Comma separated list of files or globs to exclude
  -h, --help             Show help for the package command.

  -i, --include=include  [default: package.json,package-lock.json,index.js,dist/**/*] Comma seperated list of files or
                         globs to include

  -o, --output=output    [default: deployment] Output and deployment folder

  -v, --verbose          Show more detailed output.

  --ci                   Add node_modules in production environments to respect the `build once` principle.

EXAMPLES
  $ sap-cloud-sdk package
  $ sap-cloud-sdk package -i="index.html"
  $ sap-cloud-sdk package --include="package.json,package-lock.json,index.js,dist/**/*" --exclude="**/*.java"
```

_See code: [src/commands/package.ts](https://github.com/SAP/cloud-sdk-js/blob/v1.40.0/src/commands/package.ts)_

<!-- commandsstop -->

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
