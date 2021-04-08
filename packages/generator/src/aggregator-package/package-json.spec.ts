import { unixEOL } from '@sap-cloud-sdk/util';
import { packageJson } from './package-json';

describe('package-json', () => {
  it('creates package.json contents from module name and dependencies', () => {
    const actual = packageJson(
      '@sap/cloud-sdk-vdm',
      [
        '@sap/cloud-sdk-vdm-business-area-service',
        '@sap/cloud-sdk-vdm-business-partner-service'
      ],
      '2.0.0',
      '1.17.4-alpha.8'
    );
    const expected =
      '{' +
      unixEOL +
      '  "name": "@sap/cloud-sdk-vdm",' +
      unixEOL +
      '  "version": "2.0.0",' +
      unixEOL +
      '  "description": "SAP Cloud SDK for JavaScript: Complete Virtual Data Model (VDM)",' +
      unixEOL +
      '  "homepage": "https://sap.github.io/cloud-sdk/docs/js/getting-started",' +
      unixEOL +
      '  "repository": {' +
      unixEOL +
      '    "type": "git",' +
      unixEOL +
      '    "url": ""' +
      unixEOL +
      '  },' +
      unixEOL +
      '  "dependencies": {' +
      unixEOL +
      '    "@sap/cloud-sdk-vdm-business-area-service": "^2.0.0",' +
      unixEOL +
      '    "@sap/cloud-sdk-vdm-business-partner-service": "^2.0.0"' +
      unixEOL +
      '  },' +
      unixEOL +
      '  "peerDependencies": {' +
      unixEOL +
      '    "@sap-cloud-sdk/core": "^1.17.4-alpha.8"' +
      unixEOL +
      '  }' +
      unixEOL +
      '}' +
      unixEOL;
    expect(actual).toEqual(expected);
  });
});
