#!/usr/bin/env node

import yargs from 'yargs';
import { getOptionsWithoutDefaults } from '@sap-cloud-sdk/generator-common/internal';
import { cliOptions, GeneratorOptions } from './options';

/**
 * @internal
 */
export function parseCmdArgs(
  argv: string[]
): GeneratorOptions & { config?: string } {
  const command = yargs(argv)
    .command(
      '$0',
      'OpenAPI Client Code Generator. Generates typed clients from OpenAPI files for usage with the SAP Cloud SDK for JavaScript.'
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
