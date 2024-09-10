/* eslint-disable jsdoc/require-jsdoc */
import { resolve } from 'path';
import { formatJson } from '@sap-cloud-sdk/util';
import { getInput, error } from '@actions/core';
import { command } from 'execa';
import { add, commit, tag } from '@changesets/git';
import { transformFile, getNextVersion } from './util';

async function bump() {
  // before bump
  const version = await getNextVersion();
  process.env.NEXT_PACKAGE_VERSION = version;
  const beforeBumpScript = getInput('before-bump');
  if (beforeBumpScript) {
    command(beforeBumpScript);
  }

  await updateRootPackageJson(version);
  // TODO: what if I use pnpm? either pass the command or package manager?
  command('yarn changeset version');

  // after bump
  const afterBumpScript = getInput('after-bump');
  if (afterBumpScript) {
    command(afterBumpScript);
  }
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

  await add('-A', cwd);
  await commit(`v${version}`, cwd);
  await tag(`v${version}`, cwd);
}

bump();
