/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { resolve } from 'path';
import { readFileSync } from 'fs';
import { createLogger, ErrorWithCause } from '@sap-cloud-sdk/util';
import execa = require('execa');
import Command from '@oclif/command';
import { flags } from '@oclif/parser';
import cli from 'cli-ux';
import { generate } from './generator';

const logger = createLogger('openapi-generator');

export = class GenerateOpenApiClient extends Command {
  static description =
    'Generate an OpenApi client using the connectivity features of the SAP Cloud SDK for JavaScript.';

  static examples = [
    '$ generate-openapi-client -i directoryWithOpenApiFiles -o outputDirectory',
    '$ generate-openapi-client --help'
  ];

  static version = JSON.parse(
    readFileSync(resolve(__dirname, '../package.json'), { encoding: 'utf8' })
  ).version;

  static flags = {
    input: flags.string({
      name: 'input',
      char: 'i',
      description:
        'Input directory or file for the OpenApi service definitions.',
      parse: input => resolve(input),
      required: true
    }),
    outputDir: flags.string({
      name: 'outputDir',
      char: 'o',
      description: 'Output directory for the generated OpenApi client.',
      parse: input => resolve(input),
      required: true
    }),
    clearOutputDir: flags.boolean({
      name: 'clearOutputDir',
      description:
        'Remove all files in the output directory before generation.',
      default: false,
      required: false
    }),
    versionInPackageJson: flags.string({
      name: 'versionInPackageJson',
      description:
        'By default, when generating package.json file, the generator will set a version by using the generator version. It can also be set to a specific version.',
      required: false
    }),
    generatePackageJson: flags.boolean({
      name: 'generatePackageJson',
      description:
        'By default, the generator will generate a package.json file, specifying dependencies and scripts for compiling and generating documentation. When set to false, the generator will skip the generation of the package.json.',
      default: true,
      required: false
    }),
    generateJs: flags.boolean({
      name: 'generateJs',
      description:
        'By default, the generator will also generate transpiled .js, .js.map, .d.ts and .d.ts.map files. When setting to false, the generator will only generate .ts files.',
      default: true,
      required: false
    }),
    serviceMapping: flags.string({
      name: 'serviceMapping',
      description:
        'Configuration file to ensure consistent names between multiple generation runs with updated / changed metadata files. By default it will be read from the input directory as "service-mapping.json".',
      parse: input => resolve(input),
      required: false
    }),
    tsConfig: flags.string({
      name: 'tsConfig',
      description:
        'tsconfig.json file to overwrite the default "tsconfig.json".',
      parse: input => resolve(input),
      required: false
    })
  };

  async run() {
    try {
      const parsed = this.parse(GenerateOpenApiClient);
      await validateJavaRuntime();
      await generate(parsed.flags);
    } catch (e) {
      logger.error(e.message);
      return cli.exit(1);
    }
  }
};

/*
The OpenApi generator requires a Java runtime. In order to get a proper message to the user, we check this here.
 */
async function validateJavaRuntime(): Promise<void> {
  logger.info(
    'The OpenApi client generation requires a Java runtime. Checking which Java version is installed...'
  );

  let response;
  try {
    response = await execa('java', ['-version']);
  } catch (err) {
    throw new ErrorWithCause(
      'Could not invoke `java` command. Probably no Java runtime is installed.',
      err
    );
  }
  if (response.exitCode !== 0 || !response.stderr.includes('version')) {
    throw new Error(
      `Could not validate Java version. Probably the Java runtime is not installed or misconfigured. Version check failed with "${response.stderr}"`
    );
  }
}
