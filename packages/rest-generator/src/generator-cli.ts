/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { resolve } from 'path';
import { createLogger } from '@sap-cloud-sdk/util';
import execa from 'execa';
import * as yargs from 'yargs';
import { generateRest } from './generator';

const logger = createLogger({
  level: 'info',
  messageContext: 'rest-generator-cli'
});

export interface GeneratorOptions {
  inputDir: string;
  outputDir: string;
  clearOutputDir: boolean;
}

/*
The openapi generator requires a java runtime. In order to get a proper message to the user, we check this here.
 */
async function checkJavaPresent() {
  try {
    const response = await execa('java', ['-version']);
    if (response.exitCode !== 0 || !response.stderr.includes('version')) {
      logger.error(
        `Java -version did not return a Java version. Check Java version response: ${response.stderr}`
      );
      return Promise.reject();
    }
    return Promise.resolve();
  } catch (err) {
    logger.error(
      `Error in checking the jave version. Is Java installed? Thisn is mandatory for the rest client generation. ${err.message}`
    );
    return Promise.reject();
  }
}

checkJavaPresent().then(() => generateRest(parseCmdArgs()));

function parseCmdArgs(): GeneratorOptions {
  const args = yargs
    .command('$0', '')
    .options('inputDir', {
      type: 'string',
      coerce: resolve,
      requiresArg: true,
      demandOption: true,
      alias: 'i'
    })
    .options('outputDir', {
      type: 'string',
      coerce: resolve,
      requiresArg: true,
      demandOption: true,
      alias: 'o'
    })
    .options('clearOutputDir', {
      type: 'string',
      default: false
    })
    .strict(true)
    .recommendCommands().argv;

  logger.info(JSON.stringify(args));
  return args;
}
