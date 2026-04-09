import { execFileSync } from 'node:child_process';
import { info, setFailed } from '@actions/core';

// Permissive FLOSS licenses are ok, see https://en.wikipedia.org/wiki/Permissive_software_license
// We just added the most common ones here. If one is in the wiki list and not here, add it.
const ALLOWED_LICENSES = new Set([
  '0BSD',
  'Apache-2.0',
  'Artistic-2.0',
  'BlueOak-1.0.0',
  'BSD-2-Clause',
  'BSD-3-Clause',
  'CC-BY-3.0',
  'CC-BY-4.0',
  'CC0-1.0',
  'ISC',
  'MIT',
  'Python-2.0',
  'Unlicense',
  'Zlib',
  '(BSD-3-Clause OR GPL-2.0)'
]);

// Packages whose license field is missing/undetectable but are known-good.
// They will still be flagged if they appear under a *disallowed* license.
const ALLOWED_UNKNOWN = [
  'spawndamnit', // MIT
  'callsite' // MIT
];

function isSapDependency(dependency: string): boolean {
  const [scope] = dependency.split('/');
  return (
    scope === '@sap' || scope === '@sap-cloud-sdk' || scope === '@sap-ai-sdk'
  );
}

interface PackageInfo {
  name: string;
  version: string;
}

function checkLicenses(): void {
  const json = execFileSync('pnpm', ['licenses', 'list', '--prod', '--json'], {
    encoding: 'utf8',
    maxBuffer: 10 * 1024 * 1024
  });
  const licenseMap: Record<string, PackageInfo[]> = JSON.parse(json);

  let failed = false;

  for (const [license, packages] of Object.entries(licenseMap)) {
    if (license === 'Unknown') {
      for (const pkg of packages) {
        if (isSapDependency(pkg.name)) {
          continue;
        }

        if (!ALLOWED_UNKNOWN.includes(pkg.name)) {
          setFailed(`Unknown license for ${pkg.name}@${pkg.version}`);
          failed = true;
        }
      }
      continue;
    }

    if (ALLOWED_LICENSES.has(license)) {
      continue;
    }

    // Disallowed license — only flag non-SAP dependencies
    const flagged = packages.filter(pkg => !isSapDependency(pkg.name));
    if (flagged.length > 0) {
      setFailed(
        `Disallowed license "${license}" used by: ${flagged.map(p => `${p.name}@${p.version}`).join(', ')}`
      );
      failed = true;
    }
  }

  if (failed) {
    process.exit(1);
  }
  info('All production dependency licenses are acceptable.');
}

checkLicenses();
