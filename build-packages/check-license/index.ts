import { execFileSync } from 'node:child_process';
import { info, setFailed } from '@actions/core';
// eslint-disable-next-line import/no-internal-modules
import bloakList from '@blueoak/list/index.json' with { type: 'json' };

// Permissive FLOSS licenses are ok, see https://blueoakcouncil.org/list for details.
const ALLOWED_STATUSES = new Set(['Model', 'Gold', 'Silver', 'Bronze']);
// Some packages have multiple licenses, and as long as one of them is acceptable, we allow it.
const ADDITIONAL_ALLOWED = new Set(['(BSD-3-Clause OR GPL-2.0)', 'CC-BY-3.0', 'CC-BY-4.0']);
const ALLOWED_LICENSES = new Set(
  bloakList
    .filter(({ name }) => ALLOWED_STATUSES.has(name))
    .flatMap(({ licenses }) => licenses)
    .map(({ id }) => id)
).union(ADDITIONAL_ALLOWED);

// Packages whose license field is missing/undetectable but are known-good.
// They will still be flagged if they appear under a *disallowed* license.
const ALLOWED_UNKNOWN = [
  'spawndamnit', // MIT
  'callsite' // MIT
];

interface PackageInfo {
  name: string;
  versions: string[];
}

function packageInfoToString(pkg: PackageInfo): string {
  const suffix =
    pkg.versions.length > 1
      ? `{${pkg.versions.join(', ')}}`
      : pkg.versions[0] || '<unknown>';
  return `${pkg.name}@${suffix}`;
}

interface DisallowedPackage {
  license: string;
  pkg: PackageInfo;
}

function isSapDependency(dependency: string): boolean {
  const [scope] = dependency.split('/');
  return (
    scope === '@sap' || scope === '@sap-cloud-sdk' || scope === '@sap-ai-sdk'
  );
}

function isAllowedPackage(license: string, pkg: PackageInfo): boolean {
  return (
    isSapDependency(pkg.name) ||
    (license === 'Unknown' && ALLOWED_UNKNOWN.includes(pkg.name)) ||
    ALLOWED_LICENSES.has(license)
  );
}

function getDisallowedPackages(
  licenseMap: Record<string, PackageInfo[]>
): DisallowedPackage[] {
  return Object.entries(licenseMap).flatMap(([license, packages]) =>
    packages
      .filter(pkg => !isAllowedPackage(license, pkg))
      .map(pkg => ({ license, pkg }))
  );
}

function buildErrorMessage(disallowedPackages: DisallowedPackage[]): string {
  const disallowedLicenseMessages = disallowedPackages.map(
    ({ license, pkg }) =>
      `Disallowed license "${license}" used by: ${packageInfoToString(pkg)}`
  );

  return `Found ${disallowedPackages.length} disallowed licenses:\n${disallowedLicenseMessages.join('\n')}`;
}

function checkLicenses(): void {
  const json = execFileSync('pnpm', ['licenses', 'list', '--prod', '--json'], {
    encoding: 'utf8',
    maxBuffer: 10 * 1024 * 1024
  });
  const licenseMap: Record<string, PackageInfo[]> = JSON.parse(json);

  const disallowedPackages = getDisallowedPackages(licenseMap);
  if (disallowedPackages.length) {
    setFailed(buildErrorMessage(disallowedPackages));
    return;
  }

  info('All production dependency licenses are acceptable.');
}

checkLicenses();
