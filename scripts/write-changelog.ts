/* eslint-disable jsdoc/require-jsdoc */

import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';
import getReleasePlan from '@changesets/get-release-plan';
import { getPackageVersion } from './get-package-version';
import { inc, ReleaseType } from 'semver';
import { exit } from 'process';

// TODO: do this in the workflow
async function writeChangelog(): Promise<void> {
  if (!process.env.CHANGELOG) {
    throw new Error('CHANGELOG environment variable not set.');
  }
  const unifiedChangelog = await readFile('CHANGELOG.md', { encoding: 'utf8' });
  await writeFile(
    'CHANGELOG.md',
    unifiedChangelog.split('\n').slice(0, 30).join('\n') +
      process.env.CHANGELOG +
      unifiedChangelog.split('\n').slice(30).join('\n'),
    { encoding: 'utf8' }
  );
}

writeChangelog().catch(err => {
  console.error(err);
  exit(1);
});
