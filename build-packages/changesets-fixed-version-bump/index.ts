import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { getInput, info, setOutput } from '@actions/core';
import { command } from 'execa';
import { formatJson, getNextVersion } from './util.js';

async function transformFile(
  filePath: string,
  transformFn: (content: string) => string | Promise<string>
): Promise<void> {
  const file = await readFile(filePath, { encoding: 'utf8' });
  await writeFile(filePath, await transformFn(file), { encoding: 'utf8' });
}

async function bump() {
  const { version, bumpType } = await getNextVersion();
  if (bumpType === 'major' && version !== getInput('majorVersion')) {
    throw new Error(
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
