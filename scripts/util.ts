/* eslint-disable jsdoc/require-jsdoc */

import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import getReleasePlan from '@changesets/get-release-plan';
import { currentSdkVersion } from './current-sdk-version';

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
  const currentVersion = currentSdkVersion
    .split('.')
    .map(num => parseInt(num, 10));
  const releasePlan = await getReleasePlan(process.cwd());
  const versionIncrease = releasePlan.releases
    .map(({ type }) => versionOrder.indexOf(type))
    .sort((a, b) => b - a);
  currentVersion[Math.min(...versionIncrease)] += 1;
  return currentVersion.join('.');
}
