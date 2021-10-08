import { createLogger } from '@sap-cloud-sdk/util';
import yargs from 'yargs';
// eslint-disable-next-line import/no-internal-modules
import { hideBin } from 'yargs/helpers';
import {
  parseOptionsFromConfig,
  getSpecifiedFlags,
  generatorOptions
} from '../options';
import { generate, generateWithParsedOptions } from '../generator';

const logger = createLogger('openapi-generator');

parseCmdArgs();

export async function parseCmdArgs(): Promise<void> {
  try {
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
  } catch (err) {
    logger.error(err);
  }
}
