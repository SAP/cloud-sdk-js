/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
const path = require('path');
const checker = require('license-checker');

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

checker.init(
  {
    start: path.resolve(__dirname, '..'),
    direct: true,
    summary: true,
    json: true
  },
  function (err, packages) {
    if (err) {
      throw new Error(`Could not check licenses. Error: ${err}`);
    }
    const notAllowed = Object.entries(packages)
      .filter(
        ([package, packageInfo]) => !isAllowedLicense(packageInfo.licenses)
      )
      .filter(([package, packageInfo]) => !isSapDependency(package));

    if (notAllowed.length) {
      throw new Error(
        `Not allowed licenses found: ${JSON.stringify(notAllowed, '', 2)}`
      );
    }
  }
);

function isAllowedLicense(licenses) {
  return Array.isArray(licenses)
    ? isAllowedLicense(licenses.join(','))
    : allowedLicenses.some(allowedLicense => licenses.includes(allowedLicense));
}

function isSapDependency(dependency) {
  const [scope] = dependency.split('/');
  return scope === '@sap' || scope === '@sap-cloud-sdk';
}
