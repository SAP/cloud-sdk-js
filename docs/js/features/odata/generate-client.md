---
id: generator-js-sdk
title: Generate an OData client for JavaScript
hide_title: false
hide_table_of_contents: false
sidebar_label: Generate an OData client for JavaScript
keywords:
- sap
- cloud
- sdk
- odata
- JavaScript 
- TypeScript
- generate
author: Charles Dubois
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Generate a typed OData client with the SAP Cloud SDK generator

The generator allows you to generate custom OData client libraries for OData services. You can then easily access these services via the client libraries.

The SAP Cloud SDK generator can both be used as a command line interface (CLI) and programmatically.

All you need to use it is a service metadata specification in the `EDMX` format (file ending can be `.edmx` or `.xml`).

## Installation

Run this command in your project's terminal to install the generator globally.
```sh
npm install -g @sap-cloud-sdk/generator
```

:::note
The generator is included in the SAP Cloud SDK CLI. If you installed the CLI, you don't need to install the generator separately.
:::

## Using the OData Generator

### Using the Command Line Interface

The SAP Cloud SDK generator is primarily intended to be used on the command line.

Run
```shell
generate-odata-client --inputDir path/to/your/service-specifications --outputDir path/to/store/generated/modules
```

Adapt the `path/to/your/service-specifications` to the directory containing your service specifications in `EDMX` format, for example `service-specifications/`. Also adapt `path/to/store/generated/modules` to your OData client directory for example `odata-client`.

This will generate OData clients for all your service specifications and create a `serviceMapping.json` in your input directory. This file is used for generation and contains a mapping from the original file name to the following information:
* `directoryName` - the name of the subdirectory the client code will be generated to.
* `servicePath` - the url path to be prepended before every request. This is read from the EDMX file if available, otherwise the value here will be `VALUE_IS_UNDEFINED`. In that case it should be adjusted manually.
* `npmPackageName` - the name of the npm package, if a package json is generated. This information is optional.

These information can be adjusted manually and ensure that every run of the generator produces the same names for the generation.

Example:
```json
{
  "MyService": {
    "directoryName": "my-service",
    "servicePath": "/odata/v2",
    "npmPackageName": "my-service"
  }
}
```

By default, the generated module contains the following sources:
- TypeScript code `.ts`
- Transpiled JavaScript code `.js`
- Type definition files `.d.ts`
- Source map files `.js.map` and `.d.ts.map`
- `.npmrc`
- `package.json`
- `typedoc.json`
- `tsconfig.json`

Depending on which of those files you need, you can skip the generation of most of those - see the options below.

#### Options


Run `generate-odata-client --help` for further options.


|   Parameter       | Alias | Default |   Description |
|:------------------|:-----:|:----  -:|:--------------|
|`inputDir`| `-i` | - | This directory will be recursively searched for .edmx/.xml files. |
|`outputDir`| `-o` | - | Directory to save the generated code in. |
|`serviceMapping`| `-s` | `<inputDir>/service-mapping.json` | Configuration file to ensure consistent names between multiple generation runs with updated / changed metadata files. Will be generated if not existent. |
|`forceOverwrite`| - | `false` | Exit when encountering a file that already exists. When set to true, it will be overwritten instead. Please note that compared to the --clearOutputDir option, this will not delete outdated files. |
|`clearOutputDir`| - | `false` | Deletes EVERYTHING in the specified output directory before generating code. |
|`generateNpmrc`| - | `true` | Generate a .npmrc file specifying a registry for @sap scoped dependencies. |
|`generateTypedocJson`| - | `true` | Generates a typedoc.json file for each package, used for the corresponding "doc" npm script. |
|`generatePackageJson`| - | `true` | Generate a package.json file, specifying dependencies and scripts for compiling and generating documentation. |
|`versionInPackageJson`| - | `true?` | By default, when generating package.json file, the generator will set a version by using the generator version. It can also be set to a specific version. |
|`generateJs`| - | `true` | Generates transpiled .js, .js.map, .d.ts and .d.ts.map files. When set to false, the generator will only generate .ts files. |
|`generateCSN`| - | `false` | A CSN file will be generated for each service definition in the output directory. |


### Invoke the generator programmatically

You can also use the generator programmatically. You will have to provide the options.

```ts
import { generate } from '@sap-cloud-sdk/generator';
import path from 'path';

//Create your options, adapt the input & output directory
//as well as the package name according to your setup.
const inputDir = 'service-specifications';
const outputDir = 'odata-client';

//Create your project datastructure with all sourcefiles based on your options
const generatorConfig = {
  forceOverwrite: true,
  generateJs: false,
  useSwagger: false,
  writeReadme: false,
  clearOutputDir: true,
  generateNpmrc: false,
  generateTypedocJson: false,
  generatePackageJson: false,
  generateCSN: false,
  sdkAfterVersionScript: false,
  s4hanaCloud: false
  /*optional:
  serviceMapping: 'test/directory',
  changelogFile: 'test/directory',
  aggregatorNpmPackageName: 'test',
  aggregatorDirectoryName: 'test',
  versionInPackageJson: 'version'
  */
};

//generate your project, you can also redefine options
generate({
  ...generatorConfig,
  inputDir,
  outputDir
});
```
