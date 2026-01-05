/* eslint-disable jsdoc/require-jsdoc */

import { info } from 'node:console';
import getReleasePlan from '@changesets/get-release-plan';
import { inc } from 'semver';
// eslint-disable-next-line import/no-internal-modules
import { getPackageVersion } from '../../scripts/get-package-version';

const bumpTypeOrder = ['major', 'minor', 'patch', 'none'] as const;

export async function getNextVersion(): Promise<{
  version: string;
  bumpType: (typeof bumpTypeOrder)[number];
}> {
  const currentVersion = await getPackageVersion();
  info(`Current version: ${currentVersion}`);

  const bumpType = await getBumpType();
  info(`Bump type: ${bumpType}`);

  if (bumpType === 'none' || !bumpType) {
    throw new Error('No changesets to release');
  }

  const version = inc(currentVersion, bumpType);

  if (!version) {
    throw new Error(
      `Invalid new version -- current version: ${currentVersion}, bump type: ${bumpType}`
    );
  }
  return { version, bumpType };
}

async function getBumpType() {
  const releasePlan = await getReleasePlan(process.cwd());
  info(`Release plan: ${JSON.stringify(releasePlan)}`);

  const versionIncreases = releasePlan.releases
    .map(({ type }) => bumpTypeOrder.indexOf(type))
    .sort((a, b) => b - a);
  return bumpTypeOrder[Math.min(...versionIncreases)];
}

export function formatJson(json: any): string {
  return JSON.stringify(json, null, 2) + '\n';
}
