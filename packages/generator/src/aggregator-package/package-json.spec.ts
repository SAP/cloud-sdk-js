import { EOL } from 'os';
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
      '{' + EOL +
      '  "name": "@sap/cloud-sdk-vdm",' + EOL +
      '  "version": "2.0.0",' + EOL+
      '  "description": "SAP Cloud SDK for JavaScript: Complete Virtual Data Model (VDM)",' + EOL +
      '  "homepage": "https://sap.github.io/cloud-sdk/docs/js/getting-started",' +EOL+
      '  "repository": {' +EOL+
      '    "type": "git",' +EOL+
      '    "url": ""' +EOL+
      '  },' +EOL+
      '  "dependencies": {' +EOL+
      '    "@sap/cloud-sdk-vdm-business-area-service": "^2.0.0",' +EOL+
      '    "@sap/cloud-sdk-vdm-business-partner-service": "^2.0.0"' +EOL+
      '  },' +EOL+
      '  "peerDependencies": {' +EOL+
      '    "@sap-cloud-sdk/core": "^1.17.4-alpha.8"' +EOL+
      '  }' +EOL+
      '}'+EOL;
    expect(actual).toEqual(expected);
  });
});
