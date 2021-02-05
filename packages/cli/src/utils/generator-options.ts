/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { PathLike } from 'fs';
import { resolve } from 'path';
import { Options } from 'yargs';

export interface GeneratorOptionsSDK {
  inputDir: PathLike;
  outputDir: PathLike;
  serviceMapping?: PathLike;
  useSwagger: boolean;
  writeReadme: boolean;
  additionalFiles?: string;
  forceOverwrite: boolean;
  clearOutputDir: boolean;
  aggregatorNpmPackageName?: string;
  aggregatorDirectoryName?: string;
  generateTypedocJson: boolean;
  generatePackageJson: boolean;
  versionInPackageJson?: string;
  generateJs: boolean;
  processesJsGeneration?: number;
  sdkAfterVersionScript: boolean;
  s4hanaCloud: boolean;
  generateCSN: boolean;
}

type KeysToOptions = {
  [optionName in keyof GeneratorOptionsSDK]-?: Options;
};

export const generatorOptionsSDK: KeysToOptions = {
  inputDir: {
    alias: 'i',
    describe:
      'This directory will be recursively searched for .edmx/.xml files.',
    normalize: true,
    coerce: resolve,
    type: 'string',
    demandOption: true,
    requiresArg: true
  },
  outputDir: {
    alias: 'o',
    describe: 'Directory to save the generated code in.',
    normalize: true,
    coerce: resolve,
    type: 'string',
    demandOption: true,
    requiresArg: true
  },
  serviceMapping: {
    alias: 's',
    describe:
      'Configuration file to ensure consistent names between multiple generation runs with updated / changed metadata files. Will be generated if not existent. By default it will be saved to/read from the input directory as "service-mapping.json".',
    type: 'string',
    coerce: resolve,
    normalize: true
  },
  useSwagger: {
    describe:
      'Augment parsed information with information from swagger definition files. Files are expected to have the same name as the edmx file, but with .json as suffix.',
    type: 'boolean',
    default: false,
    hidden: true
  },
  writeReadme: {
    describe:
      'When set to true, the generator will write a README.md file into the root folder of every package. This option does not make that much sense without also set useSwagger to "true".',
    type: 'boolean',
    default: false,
    hidden: true
  },
  additionalFiles: {
    describe:
      'Glob describing additional files to be added to the each generated service directory.',
    type: 'string',
    normalize: false,
    hidden: false
  },
  forceOverwrite: {
    describe:
      'By default, the generator will exit when encountering a file that already exists. When set to true, it will be overwritten instead. Please note that compared to the --clearOutputDir option, this will not delete outdated files.',
    type: 'boolean',
    default: false
  },
  clearOutputDir: {
    describe:
      'When set to true, the generator will delete EVERYTHING in the specified output directory before generating code.',
    type: 'boolean',
    default: false
  },
  aggregatorNpmPackageName: {
    describe:
      'When provided, the generator will generate an additional package with the provided name that has dependencies to all other generated packages.',
    type: 'string',
    hidden: true
  },
  aggregatorDirectoryName: {
    describe: 'Hack for cloud-sdk-vdm package',
    type: 'string',
    hidden: true
  },
  generateTypedocJson: {
    describe:
      'By default, the generator will generate a typedoc.json file for each package, used for the corresponding "doc" npm script. When set to false, the generator will skip the generation of the typedoc.json.',
    type: 'boolean',
    default: true
  },
  generatePackageJson: {
    describe:
      'By default, the generator will generate a package.json file, specifying dependencies and scripts for compiling and generating documentation. When set to false, the generator will skip the generation of the package.json.',
    type: 'boolean',
    default: true
  },
  versionInPackageJson: {
    describe:
      'By default, when generating package.json file, the generator will set a version by using the generator version. It can also be set to a specific version.',
    type: 'string'
  },
  generateJs: {
    describe:
      'By default, the generator will also generate transpiled .js, .js.map, .d.ts and .d.ts.map files. When set to false, the generator will only generate .ts files.',
    type: 'boolean',
    default: true
  },
  processesJsGeneration: {
    describe: 'Number of processes used for generation of javascript files.',
    alias: 'np',
    type: 'number',
    default: 16
  },
  sdkAfterVersionScript: {
    describe:
      'When set to true, the package.json of generated services will have the after-version script to internally keep the versions in sync.',
    type: 'boolean',
    default: false,
    hidden: true
  },
  s4hanaCloud: {
    describe:
      'When set to true, the description of the generated packages will be specific to S/4HANA Cloud.',
    type: 'boolean',
    default: false,
    hidden: true
  },
  generateCSN: {
    describe:
      'When set to true a CSN file will be generated for each service definition in the output directory.',
    type: 'boolean',
    default: false
  }
};
