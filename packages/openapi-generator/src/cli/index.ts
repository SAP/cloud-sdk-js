/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { Command } from '@oclif/command';
import { cli } from 'cli-ux';
import { createLogger } from '@sap-cloud-sdk/util';
import {
  parseOptionsFromConfig,
  removeDefaultValues
} from '../generator-utils';
import { generate, generateWithParsedOptions } from '../generator';
import { generatorFlags } from '../options';

const logger = createLogger('openapi-generator');
class OpenApiGenerator extends Command {
  static description =
    'Generate OpenAPI client(s), that use the connectivity features of the SAP Cloud SDK for JavaScript/TypeScript.';

  static usage = '--input <input> --outputDir <outputDirectory>';
  static examples = [
    `
// generate TypeScript clients from OpenAPI definitions in a directory
$ openapi-generator --input ./my-specs --outputDir ./clients`,
    `
// generate a JavaScript client from a OpenAPI definition file
$ openapi-generator --input ./my-spec.yaml --outputDir ./client --transpile`
  ];

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  static version = require('../../package.json').version;

  static flags = generatorFlags;

  async run(): Promise<void> {
    try {
      const parsed = this.parse(OpenApiGenerator);
      if (parsed.flags.config) {
        await generate({
          ...(await parseOptionsFromConfig(parsed.flags.config)),
          ...removeDefaultValues(parsed.flags)
        });
      } else {
        await generateWithParsedOptions(parsed.flags);
      }
    } catch (err) {
      logger.error(err);
      cli.exit(1);
    }
  }
}

export = OpenApiGenerator;
