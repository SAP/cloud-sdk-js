import { info, setFailed } from '@actions/core';
import { init } from 'license-checker';
import type { ModuleInfos } from 'license-checker';

// Here all permissive FLOSS licenses are ok, see https://en.wikipedia.org/wiki/Permissive_software_license
// We just added the most common ones here. If one is in the wiki list and not here, add it.
const allowedLicenses = [
  'MIT',
  'Apache',
  'ISC',
  'BSD',
  'WTFPL',
  'CC-BY',
  'CC0',
  'Unlicense',
  'Public Domain'
];

async function getLicenses(): Promise<ModuleInfos> {
  return new Promise((resolvePromise, reject) => {
    init(
      {
        start: process.cwd(),
        direct: true,
        summary: true,
        json: true,
        production: true
      },
      function (err, packages: ModuleInfos) {
        if (err) {
          reject(`Error: ${err}`);
        }
        resolvePromise(packages);
      }
    );
  });
}

function isAllowedLicense(licenses) {
  return Array.isArray(licenses)
    ? isAllowedLicense(licenses.join(','))
    : allowedLicenses.some(allowedLicense => licenses.includes(allowedLicense));
}

function isSapDependency(dependency) {
  // Exclude root package from license check
  if (
    dependency.startsWith('sap-cloud-sdk') ||
    dependency.startsWith('sap-ai-sdk')
  ) {
    return true;
  }
  const [scope] = dependency.split('/');
  return (
    scope === '@sap' || scope === '@sap-cloud-sdk' || scope === '@sap-ai-sdk'
  );
}

async function checkLicenses() {
  try {
    const licenses = await getLicenses();
    const disallowedDependencies = Object.entries(licenses)
      .filter(([, licenseInfo]) => !isAllowedLicense(licenseInfo.licenses))
      .filter(([packageName]) => !isSapDependency(packageName));

    if (disallowedDependencies.length) {
      disallowedDependencies.forEach(disallowedDependency => {
        setFailed(
          `Disallowed license ${disallowedDependency[1].licenses} found for dependency: ${disallowedDependency[0]}.`
        );
      });
      setFailed(
        'Check if the faulty licenses are in the FLOSS list: https://en.wikipedia.org/wiki/Category:Free_and_open-source_software_licenses and update the check script accordingly.'
      );
      process.exit(1);
    }
    info('License check complete.');
  } catch (error) {
    setFailed(`Could not check licenses. ${error}`);
  }
}

checkLicenses();
