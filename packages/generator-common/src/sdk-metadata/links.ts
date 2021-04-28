import type { Links } from './sdk-metadata-types';

export function getLinks(
  apiHubTutorialUrl: string,
  generationManualUrl: string
): Links {
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
      url: apiHubTutorialUrl
    },
    generationManual: {
      name: 'Generation Manual',
      url: generationManualUrl
    }
  };
}
