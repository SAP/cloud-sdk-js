#!/usr/bin/env node

import { createLogger, ErrorWithCause } from '@sap-cloud-sdk/util';
import yargs from 'yargs';
import { generate } from './generator';
import {
  GeneratorOptions,
  generatorOptionsCli,
  createOptionsFromConfig
} from './generator-options';
import { getOptionsWithoutDefaults } from './options-parser';

const logger = createLogger({
  package: 'generator',
  messageContext: 'generator-cli'
});

logger.info('Parsing args...');

generate(parseCmdArgs())
  .then(() => logger.info('Generation of services finished successfully.'))
  .catch(err => {
    logger.error(new ErrorWithCause('Generation of services failed.', err));
    process.exit(1);
  });

/**
 * @internal
 */
export function parseCmdArgs(): GeneratorOptions {
  const command = yargs.command(
    '$0',
    'OData Client Code Generator for OData v2 and v4. Generates TypeScript code from `.edmx`/`.xml` files for usage with the SAP Cloud SDK for JavaScript.'
  );

  const optionsWithoutDefaults = getOptionsWithoutDefaults(generatorOptionsCli);
  for (const key in optionsWithoutDefaults) {
    command.option(key, optionsWithoutDefaults[key]);
  }

  const parsedOptions = command
    .config(
      'config',
      'Instead of specifying the options on the command line, you can also provide a path to a .json file holding these options. ' +
        'The file must be a valid .json file, where the keys correspond to the command line flags without dashes. Paths will be interpreted relative to the config file.',
      configPath => createOptionsFromConfig(configPath)
    )
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
  const { _, $0, ...userOptions } = parsedOptions.argv as any;

  return userOptions;
}
