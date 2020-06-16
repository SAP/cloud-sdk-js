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

The generator allows you to generate custom OData clients libraries for OData services. You can then easily access these services via the client libraries.

The SAP Cloud SDK generator can both be used as a command line interface (CLI) and programmatically.

For any of them you need to have an `EDMX` file holding the service metadata.

## Installation

Run this command in your project's terminal to install the generator globally.
```sh
npm install -g @sap-cloud-sdk/generator
```

:::note
The generator is included in the SAP Cloud SDK CLI, if you have it installed you don't need to install the generator separately.
:::

## Usage

### From the Command Line

The generator is primarily meant to be used on the command line:

```sh
generate-odata-client --inputDir path/to/your/service-specification(s) --outputDir path/where/the/modules/are/stored
```

## Options


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
import { generateProject } from '@sap-cloud-sdk/generator';

//Create your options, adapt the input & output directory as well as the package name according to your setup.
const options: GeneratorOptions = initializeOptions();

//Create your project datastructure with all sourcefiles based on your options
const project = generateProject(options);

//Modify your project if you need to, then save the files at the specified location.
project.save();

//Alternatively you can generate and save the project in one step with: generate(options)
```
