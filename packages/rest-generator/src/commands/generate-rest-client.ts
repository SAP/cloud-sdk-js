/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { resolve } from 'path';
import { readFileSync } from 'fs';
import { createLogger } from '@sap-cloud-sdk/util';
import execa = require('execa');
import Command from '@oclif/command';
import { flags } from '@oclif/parser';
import cli from 'cli-ux';
import { generate } from '../generator';

const logger = createLogger('rest-generator');

export interface GeneratorOptions {
  inputDir: string;
  outputDir: string;
  clearOutputDir?: boolean;
}

export class GenerateRestClient extends Command {
  static description =
    'Generates a Rest client from an openApi service file definition. For SAP solutions, you can find these definitions at https://api.sap.com/.';

  // TODO: These examples are wrong, but this should be a single command api anyways
  static examples = [
    '$ generate-rest-client generate-rest-client -i directoryWithOpenApiFiles -o outputDirectory',
    '$ generate-rest-client generate-rest-client --help'
  ];

  static version = JSON.parse(
    readFileSync(resolve(__dirname, '../../package.json'), { encoding: 'utf8' })
  ).version;

  static flags = {
    inputDir: flags.string({
      name: 'inputDir',
      char: 'i',
      description: 'Input directory for the openApi service definitions.',
      parse: input => resolve(input),
      required: true
    }),
    outputDir: flags.string({
      name: 'outputDir',
      char: 'o',
      description: 'Output directory for the generated rest client.',
      parse: input => resolve(input),
      required: true
    }),
    clearOutputDir: flags.boolean({
      name: 'clearOutputDir',
      char: 'c',
      description: 'Output directory for the generated rest client.',
      default: false,
      required: false
    })
  };

  async run() {
    try {
      const parsed = this.parse(GenerateRestClient);
      await checkJavaPresent();
      await generate(parsed.flags);
    } catch (e) {
      logger.error(e.message);
      return cli.exit(1);
    }
  }
}

/*
The openapi generator requires a java runtime. In order to get a proper message to the user, we check this here.
 */
async function checkJavaPresent(): Promise<void> {
  // TODO: Improve the return values here.
  try {
    const response = await execa('java', ['-version']);
    if (response.exitCode !== 0 || !response.stderr.includes('version')) {
      logger.error(
        `Java -version did not return a Java version. Check Java version response: ${response.stderr}`
      );
      return Promise.reject();
    }
    return Promise.resolve();
  } catch (err) {
    logger.error(
      `Error in checking the java version. Is Java installed? This is mandatory for the rest client generation. ${err.message}`
    );
    return Promise.reject();
  }
}
