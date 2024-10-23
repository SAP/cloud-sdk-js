import yargs from 'yargs';
import { setFailed } from '@actions/core';
import { checkApiOfPackage } from './check-public-api';

async function runPublicApiCheckScript() {
  try {
    const argv = yargs(process.argv.slice(2))
      .option('strict', {
        type: 'boolean',
        default: false,
        description: 'Enable strict mode'
      })
      .option('pathsToIgnore', {
        type: 'string',
        description: 'Comma-separated paths to ignore',
        default: ''
      }).argv;

    const { strict, pathsToIgnore } = await argv;
    const pathsToIgnoreOnCheck = pathsToIgnore ? pathsToIgnore.split(',') : [];

    checkApiOfPackage(process.cwd(), strict, pathsToIgnoreOnCheck);
  } catch (error) {
    setFailed(error);
  }
}

runPublicApiCheckScript();
