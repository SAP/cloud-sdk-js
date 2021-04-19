import { Links } from './sdk-metadata-types';

export function getLinks(): Links {
  return {
    sdkDocumentation: {
      url: 'https://sap.github.io/cloud-sdk/',
      name: 'SDK Documentation'
    },
    featureDocumentation: {
      name: 'Feature Documentation',
      url:
        'https://sap.github.io/cloud-sdk/docs/js/features/odata/use-odata-v2-type-safe-client-for-javascript-typescript'
    },
    support: {
      name: 'Support',
      url: 'https://github.com/SAP/cloud-sdk-js/issues/new/choose'
    },
    apiHubTutorial: {
      name: 'API Hub Tutorial',
      url:
        'https://sap.github.io/cloud-sdk/docs/js/features/odata/execute-odata-request'
    },
    generationManual: {
      name: 'Generation Manual',
      url:
        'https://sap.github.io/cloud-sdk/docs/js/features/odata/generate-odata-client'
    }
  };
}
