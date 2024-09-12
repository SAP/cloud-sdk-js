/* eslint-disable jsdoc/require-jsdoc */
import { resolve } from 'path';
import { formatJson } from '@sap-cloud-sdk/util';
import { getInput, info } from '@actions/core';
import { command } from 'execa';
import { transformFile, getNextVersion } from './util';

async function bump() {
  // before bump
  const version = await getNextVersion();
  info(`bumping to version ${version}`);
  process.env.NEXT_PACKAGE_VERSION = version;
  info('executing before bump scripts');
  await executeCustomScript(getInput('before-bump'));

  info('updating root package.json');
  await updateRootPackageJson(version);
  info('setting version');
  // abstract from different package managers
  await command('node_modules/@changesets/cli/bin.js version');

  // after bump
  info('executing after bump scripts');
  await executeCustomScript(getInput('after-bump'));
}

async function updateRootPackageJson(version: string) {
  await transformFile(resolve('package.json'), packageJson =>
    formatJson({
      ...JSON.parse(packageJson),
      version: `${version}`
    })
  );
}

async function executeCustomScript(script: string) {
  if (script) {
    const commands = script.split('\n');
    for (const cmd of commands) {
      info(`executing custom script: ${cmd}`);
      await command(cmd);
    }
  }
}

bump();
