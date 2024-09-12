/* eslint-disable jsdoc/require-jsdoc */

import { readFile, writeFile } from 'node:fs/promises';
import { PathLike, readFileSync } from 'node:fs';
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

// TODO: this is currently duplicate (scripts/util.ts)
export async function transformFile(
  filePath: string,
  transformFn: CallableFunction
): Promise<void> {
  const file = await readFile(filePath, { encoding: 'utf8' });
  const transformedFile = await transformFn(file);
  await writeFile(filePath, transformedFile, { encoding: 'utf8' });
}

const bumpTypeOrder = ['major', 'minor', 'patch', 'none'] as const;

export async function getNextVersion(): Promise<{
  version: string;
  bumpType: (typeof bumpTypeOrder)[number];
}> {
  const currentVersion = getPackageVersion();
  const releasePlan = await getReleasePlan(process.cwd());

  const versionIncreases = releasePlan.releases
    .map(({ type }) => bumpTypeOrder.indexOf(type))
    .sort((a, b) => b - a);
  const bumpType = bumpTypeOrder[Math.min(...versionIncreases)];

  if (bumpType === 'none' || !bumpType) {
    throw new Error(`No changesets to release`);
  }
  const version = inc(currentVersion, bumpType);

  if (!version) {
    throw new Error(
      `Invalid new version -- current version: ${currentVersion}, bump type: ${bumpType}`
    );
  }
  return { version, bumpType };
}
