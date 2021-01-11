const path = require('path');
const licenseChecker = require('license-checker');

const allowedLicenses = [
  'MIT',
  'Apache',
  'ISC',
  'BSD',
  'WTFPL',
  'Artistic',
  'CC-BY',
  'CC0',
  'Unlicense',
  'Public Domain',
  'GPL-3.0'
];

async function getLicenses() {
  return new Promise((resolve, reject) => {
    licenseChecker.init(
      {
        start: path.resolve(__dirname, '..'),
        direct: false,
        summary: true,
        json: true
      },
      function (err, packages) {
        if (err) {
          reject(`Could not check licenses. Error: ${err}`);
        }
        resolve(packages);
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
  if(dependency.startsWith("sap-cloud-sdk")){
    return true
  }
  const [scope] = dependency.split('/');
  return scope === '@sap' || scope === '@sap-cloud-sdk';
}

async function checkLicenses() {
  const licenses = await getLicenses();
  const notAllowed = Object.entries(licenses)
    .filter(([package, licenseInfo]) => !isAllowedLicense(licenseInfo.licenses))
    .filter(([package, licenseInfo]) => !isSapDependency(package));

  if (notAllowed.length) {
    console.error(
      `Not allowed licenses found: ${JSON.stringify(notAllowed, '', 2)}`
    );
    process.exit(1)
  }
}

checkLicenses()//.catch(err=>Promise.reject(err));
