import { Command } from '@oclif/command';
import { cli } from 'cli-ux';
import { createLogger } from '@sap-cloud-sdk/util';
// eslint-disable-next-line import/no-internal-modules
import { FlagToken } from '@oclif/parser/lib/parse';
import yargs from 'yargs';
// eslint-disable-next-line import/no-internal-modules
import { hideBin } from 'yargs/helpers';
import {
  parseOptionsFromConfig,
  getSpecifiedFlags,
  generatorFlags,
  generatorOptions
} from '../options';
import { generate, generateWithParsedOptions } from '../generator';

const logger = createLogger('openapi-generator');

export async function parseCmdArgs(): Promise<void> {
  const argv = await yargs(hideBin(process.argv))
    .usage('--input <input> --outputDir <outputDirectory>')
    .options(generatorOptions)
    .strict().argv;

  if (argv.config) {
    await generate({
      ...(await parseOptionsFromConfig(argv.config)),
      ...getSpecifiedFlags(
        argv,
        Object.keys(await yargs(hideBin(process.argv)).argv)
      )
    });
  } else {
    await generateWithParsedOptions(argv);
  }
  return;
}

export class OpenApiGenerator extends Command {
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
          ...getSpecifiedFlags(
            parsed.flags,
            (parsed.raw as FlagToken[]).map(({ flag }) => flag)
          )
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
