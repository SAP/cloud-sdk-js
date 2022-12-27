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
export function parseCmdArgs(): GeneratorOptions {
  const command = yargs
    .command(
      '$0',
      'OData Client Code Generator for OData v2 and v4. Generates TypeScript code from EDMX and XML files for usage with the SAP Cloud SDK for JavaScript.'
    )
    .options(getOptionsWithoutDefaults(cliOptions))
    .config
    // 'config',
    // 'Instead of specifying the options on the command line, you can also provide a path to a JSON file holding these options. The file must be a valid JSON file, where the keys correspond to the command line flags without dashes. Paths will be interpreted relative to the config file.',
    // configPath => createOptionsFromConfig(configPath)
    ()
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
