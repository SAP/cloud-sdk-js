/**
 * License check using `pnpm licenses list`.
 */
const { execFileSync } = require('child_process');

// SPDX identifiers considered acceptable
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

// Package scopes where any license is accepted
const IGNORED_SCOPES = ['@sap/', '@cap-js/'];

// Packages whose license field is missing/undetectable but are known-good.
// They will still be flagged if they appear under a *disallowed* license.
const ALLOWED_UNKNOWN = [
  'spawndamnit', // MIT
  'callsite' // MIT
];

function isScopeIgnored(name) {
  return IGNORED_SCOPES.some(scope => name.startsWith(scope));
}

const json = execFileSync('pnpm', ['licenses', 'list', '--prod', '--json'], {
  encoding: 'utf8',
  maxBuffer: 10 * 1024 * 1024
});
const licenseMap = JSON.parse(json);

let failed = false;

for (const [license, packages] of Object.entries(licenseMap)) {
  if (license === 'Unknown') {
    for (const pkg of packages) {
      if (!isScopeIgnored(pkg.name) && !ALLOWED_UNKNOWN.includes(pkg.name)) {
        console.error(`Unknown license for ${pkg.name}@${pkg.version}`);
        failed = true;
      }
    }
    continue;
  }

  if (ALLOWED_LICENSES.has(license)) {
    continue;
  }

  // Disallowed license — only scope-ignored packages get a pass
  const flagged = packages.filter(pkg => !isScopeIgnored(pkg.name));
  if (flagged.length > 0) {
    console.error(
      `Disallowed license "${license}" used by: ${flagged.map(p => `${p.name}@${p.version}`).join(', ')}`
    );
    failed = true;
  }
}

if (failed) {
  process.exit(1);
} else {
  console.log('All production dependency licenses are acceptable.');
}
