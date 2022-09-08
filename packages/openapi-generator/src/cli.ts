#!/usr/bin/env node

import { createLogger } from '@sap-cloud-sdk/util';
import yargs from 'yargs';
// eslint-disable-next-line import/no-internal-modules
import { hideBin } from 'yargs/helpers';
import { parseOptionsFromConfig, getSpecifiedFlags, cli } from './options';
import { generateWithParsedOptions } from './generator';

const logger = createLogger('openapi-generator');

parseCmdArgs();
/**
 * @internal
 */
export default async function parseCmdArgs(): Promise<void> {
  try {
    const argv = await cli(process.argv).argv;

    if (argv.config) {
      await generateWithParsedOptions({
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
    yargs.exit(1, new Error());
  }
}
