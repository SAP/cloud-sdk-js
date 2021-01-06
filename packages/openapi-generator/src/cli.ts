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
      description: 'Remove all files in the ouput directory before generation.',
      default: false,
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
