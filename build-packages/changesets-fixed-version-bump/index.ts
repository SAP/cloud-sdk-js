/* eslint-disable jsdoc/require-jsdoc */
import { resolve } from 'path';
import { formatJson } from '@sap-cloud-sdk/util';
import { info, setOutput } from '@actions/core';
import { command } from 'execa';
import { transformFile, getNextVersion } from './util';

async function bump() {
  const version = await getNextVersion();
  info(`bumping to version ${version}`);
  setOutput('version', version);

  info('updating root package.json');
  await updateRootPackageJson(version);
  info('setting version');
  // abstract from different package managers
  await command('node_modules/@changesets/cli/bin.js version');
}

async function updateRootPackageJson(version: string) {
  await transformFile(resolve('package.json'), packageJson =>
    formatJson({
      ...JSON.parse(packageJson),
      version: `${version}`
    })
  );
}

bump();
