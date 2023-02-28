#!/usr/bin/env node

import { createLogger, ErrorWithCause } from '@sap-cloud-sdk/util';
import { parseCmdArgs } from './cli-parser';
import { generate } from './generator';

const logger = createLogger({
  package: 'generator',
  messageContext: 'cli'
});

generate(parseCmdArgs(process.argv.slice(2)))
  .then(() => logger.info('Generation of services finished successfully.'))
  .catch(err => {
    logger.error(new ErrorWithCause('Generation of services failed.', err));
    process.exit(1);
  });
