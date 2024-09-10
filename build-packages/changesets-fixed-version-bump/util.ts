/* eslint-disable jsdoc/require-jsdoc */

import { readFile, writeFile } from 'fs/promises';
import { PathLike, readFileSync } from 'fs';
import getReleasePlan from '@changesets/get-release-plan';
import { inc } from 'semver';

export function getPackageVersion(
  pathToRootPackageJson?: number | PathLike
): string {
  const packageJson = readFileSync(
    pathToRootPackageJson || 'package.json',
    'utf8'
  );
  return JSON.parse(packageJson).version;
}

export async function transformFile(
  filePath: string,
  transformFn: CallableFunction
): Promise<void> {
  const file = await readFile(filePath, { encoding: 'utf8' });
  const transformedFile = await transformFn(file);
  await writeFile(filePath, transformedFile, { encoding: 'utf8' });
}

const versionTypeOrder = ['major', 'minor', 'patch', 'none'] as const;

export async function getNextVersion(): Promise<string> {
  const currentVersion = getPackageVersion();
  const releasePlan = await getReleasePlan(process.cwd());

  const versionIncreases = releasePlan.releases
    .map(({ type }) => versionTypeOrder.indexOf(type))
    .sort((a, b) => b - a);
  const versionType = versionTypeOrder[Math.min(...versionIncreases)];
  // TODO: handle this correctly
  if (versionType === 'none') {
    throw new Error(`No changesets to release`);
  }
  const newVersion = inc(currentVersion, versionType);
  // TODO: this does not belong here
  if (
    versionType === 'major' &&
    newVersion !== process.env.INPUT_MAJOR_VERSION
  ) {
    throw new Error(
      `Cannot apply major version bump. If you want to bump a major version, you must set the "majorVersion" input in the workflow.`
    );
  }

  if (!newVersion) {
    throw new Error(
      `Invalid new version -- current version: ${currentVersion}, version type: ${versionType}`
    );
  }
  return newVersion;
}
