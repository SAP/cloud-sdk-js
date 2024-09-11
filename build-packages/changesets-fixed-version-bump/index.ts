/* eslint-disable jsdoc/require-jsdoc */
import { resolve } from 'path';
import { formatJson } from '@sap-cloud-sdk/util';
import { getInput, error, info } from '@actions/core';
import { command } from 'execa';
import { add, commit, tag } from '@changesets/git';
import { transformFile, getNextVersion } from './util';

async function bump() {
  // before bump
  info('Bumping version...');
  const version = await getNextVersion();
  info(`Bumping to version ${version}`);
  process.env.NEXT_PACKAGE_VERSION = version;
  await executeCustomScript(getInput('before-bump'));

  info(`updating root package.json`);
  await updateRootPackageJson(version);
  // TODO: what if I use pnpm? either pass the command or package manager?
  info(`setting version`);
  await command('yarn changeset version');

  // after bump
  info(`executing after script`);
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

  info(`add`);
  await add('-A', cwd);
  info(`commit`);
  await commit(`v${version}`, cwd);
  info(`tag`);
  await tag(`v${version}`, cwd);
  info(`push`);
  await command('git push'); // --follow-tags');
}

async function executeCustomScript(script: string) {
  if (script) {
    const commands = script.split('\n');
    for (const cmd of commands) {
      await command(cmd);
    }
  }
}

bump();
