#!/usr/bin/env node

import yargs from 'yargs';
import {
  cliOptions,
  GeneratorOptions,
  getOptionsWithoutDefaults
} from './options';

/**
 * @internal
 */
export function parseCmdArgs(
  argv: string[]
): GeneratorOptions & { config?: string } {
  const command = yargs(argv)
    .command(
      '$0',
      'OData Client Code Generator for OData v2 and v4. Generates typed clients from EDMX and XML files for usage with the SAP Cloud SDK for JavaScript.'
    )
    .options(getOptionsWithoutDefaults(cliOptions))
    .config()
    .alias('config', 'c')
    .alias('version', 'v')
    .alias('help', 'h')
    .strict(true)
    .parserConfiguration({
      'strip-aliased': true,
      'strip-dashed': true
    })
    .recommendCommands();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _, $0, ...userOptions } = command.parseSync();

  return userOptions;
}
