/* eslint-disable jsdoc/require-jsdoc */

import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import getReleasePlan from '@changesets/get-release-plan';
import { getPackageVersion } from "./get-package-version";
import { inc, ReleaseType } from "semver";

export const apiDocsDir = resolve('docs', 'api');

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
  if(release === 'major'){
    throw new Error(`The turbo repo/changeset release processes are not planned to be applied to the major version release.`);
  }

  const newVersion = inc(currentVersion, release as ReleaseType);
  if(!newVersion){
    throw new Error(`Invalid new version -- the current version: ${currentVersion} and the release type: ${release}.`);
  }
  return newVersion;
}
