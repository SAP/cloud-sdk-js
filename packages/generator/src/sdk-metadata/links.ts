import { Links } from './sdk-metadata-types';

export function getLinks(): Links {
  return {
    sdkDocumentation: 'https://sap.github.io/cloud-sdk/',
    featureDocumentation:
      'https://sap.github.io/cloud-sdk/docs/js/features/odata/use-odata-v2-type-safe-client-for-javascript-typescript',
    support: 'https://github.com/SAP/cloud-sdk-js/issues/new/choose',
    apiHubTutorial:
      'https://sap.github.io/cloud-sdk/docs/js/features/odata/execute-odata-request',
    generationManual:
      'https://sap.github.io/cloud-sdk/docs/js/features/odata/generate-odata-client'
  };
}
