#!/usr/bin/env node
/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { createLogger } from '@sap-cloud-sdk/util';
import yargs from 'yargs';
import { generate } from './generator';
import { GeneratorOptions, generatorOptionsCli } from './generator-options';

const logger = createLogger({
  package: 'generator',
  messageContext: 'generator-cli'
});

logger.info('Parsing args...');

generate(parseCmdArgs()).then(() =>
  logger.info('Generation of services successfully finished.')
);

export function parseCmdArgs(): GeneratorOptions {
  const command = yargs.command(
    '$0',
    'OData Client Code Generator for OData (v2). Generates TypeScript code from .edmx/.xml files for usage with the SAP Cloud SDK for JavaScript.'
  );
  for (const key in generatorOptionsCli) {
    command.option(key, generatorOptionsCli[key]);
  }

  return (command
    .config(
      'config',
      'Instead of specifying the options on the command line, you can also provide a path to single .json file holding these options. ' +
        'The file must be a valid .json file where the keys correspond to the command line flags without dashes. Paths will be interpreted relative to the config file.'
    )
    .alias('config', 'c')
    .alias('version', 'v')
    .alias('help', 'h')
    .strict(true)
    .recommendCommands().argv as unknown) as GeneratorOptions;
}
