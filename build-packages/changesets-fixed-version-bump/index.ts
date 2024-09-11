/* eslint-disable jsdoc/require-jsdoc */
import { resolve } from 'path';
import { formatJson } from '@sap-cloud-sdk/util';
import { getInput, error, info } from '@actions/core';
import { command } from 'execa';
import { add, commit, tag } from '@changesets/git';
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

  await commitAndTag(version).catch(err => {
    error(err);
    process.exit(1);
  });
}

async function updateRootPackageJson(version: string) {
  await transformFile(resolve('package.json'), packageJson =>
    formatJson({
      ...JSON.parse(packageJson),
      version: `${version}`
    })
  );
}

async function commitAndTag(version: string) {
  const cwd = process.cwd();

  info(`git add`);
  await add('-A', cwd);
  info(`git commit`);
  await commit(`v${version}`, cwd);
  info(`git tag`);
  await tag(`v${version}`, cwd);
  info(`git push`);
  await command('git push'); // --follow-tags');
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
