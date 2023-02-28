/* eslint-disable jsdoc/require-jsdoc */

import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import getReleasePlan from '@changesets/get-release-plan';
import { getPackageVersion } from './get-package-version';
import { inc, ReleaseType } from 'semver';

export const apiDocsDir = resolve('knowledge-base', 'api-reference');

export function transformFile(
  filePath: string,
  transformFn: CallableFunction
): void {
  const file = readFileSync(filePath, { encoding: 'utf8' });
  const transformedFile = transformFn(file);
  writeFileSync(filePath, transformedFile, { encoding: 'utf8' });
}

const versionOrder = ['major', 'minor', 'patch'];

export async function nextSdkVersion(): Promise<string> {
  const currentVersion = getPackageVersion();
  const releasePlan = await getReleasePlan(process.cwd());

  const versionIncreases = releasePlan.releases
    .map(({ type }) => versionOrder.indexOf(type))
    .sort((a, b) => b - a);
  const release = versionOrder[Math.min(...versionIncreases)];
  const newVersion = inc(currentVersion, release as ReleaseType);
  if (release === 'major' && newVersion !== process.env.INPUT_MAJOR_VERSION) {
    throw new Error(
      `Cannot apply major version bump. If you want to bump a major version, you must set the "majorVersion" input in the workflow.`
    );
  }

  if (!newVersion) {
    throw new Error(
      `Invalid new version -- the current version: ${currentVersion} and the release type: ${release}.`
    );
  }
  return newVersion;
}
