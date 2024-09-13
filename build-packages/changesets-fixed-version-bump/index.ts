import { resolve } from 'node:path';
import { formatJson } from '@sap-cloud-sdk/util';
import { getInput, info, setFailed, setOutput } from '@actions/core';
import { command } from 'execa';
import { transformFile } from '../../scripts/util';
import { getNextVersion } from './util';

async function bump() {
  const { version, bumpType } = await getNextVersion();
  if (bumpType === 'major' && version !== getInput('majorVersion')) {
    setFailed(
      'Cannot apply major version bump. If you want to bump a major version, you must set the "majorVersion" input.'
    );
  }
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
