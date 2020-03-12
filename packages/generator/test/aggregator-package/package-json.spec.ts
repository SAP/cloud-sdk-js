/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { packageJson } from '../../src/aggregator-package';

describe('package-json', () => {
  it('creates package.json contents from module name and dependencies', () => {
    const actual = packageJson(
      '@sap/cloud-sdk-vdm',
      ['@sap/cloud-sdk-vdm-business-area-service', '@sap/cloud-sdk-vdm-business-partner-service'],
      '2.0.0',
      '1.17.4-alpha.8'
    );
    const expected =
      '{\n' +
      '  "name": "@sap/cloud-sdk-vdm",\n' +
      '  "version": "2.0.0",\n' +
      '  "description": "SAP Cloud SDK for JavaScript: Complete Virtual Data Model (VDM)",\n' +
      '  "homepage": "https://www.sap.com/cloud-sdk",\n' +
      '  "repository": {\n' +
      '    "type": "git",\n' +
      '    "url": ""\n' +
      '  },\n' +
      '  "scripts": {\n' +
      '    "version": "node ../../../after-version-update.js"\n' +
      '  },\n' +
      '  "dependencies": {\n' +
      '    "@sap/cloud-sdk-vdm-business-area-service": "^1.17.4-alpha.8",\n' +
      '    "@sap/cloud-sdk-vdm-business-partner-service": "^1.17.4-alpha.8"\n' +
      '  },\n' +
      '  "peerDependencies": {\n' +
      '    "@sap-cloud-sdk/core": "^1.17.4-alpha.8"\n' +
      '  }\n' +
      '}\n';
    expect(actual).toEqual(expected);
  });
});
