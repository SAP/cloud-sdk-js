import type { Links } from './sdk-metadata-types';

export function getLinks(
  executeRequestUrl: string,
  generationManualUrl: string,
  apiType: 'OData' | 'OpenApi'
): Links {
  return {
    gettingStarted: {
      name: 'Getting Started with SDK for JavaScript',
      url: 'https://sap.github.io/cloud-sdk/docs/js/getting-started'
    },
    sdkDocumentation: {
      url: 'https://sap.github.io/cloud-sdk/',
      name: 'The SAP Cloud SDK documentation'
    },
    overviewDocumentation: {
      name: `${apiType} consumption manual`,
      url: executeRequestUrl
    },
    generationManual: {
      name: `${apiType} client generation manual`,
      url: generationManualUrl
    },
    support: {
      name: 'Get support or give feedback',
      url: 'https://sap.github.io/cloud-sdk/docs/overview/get-support'
    }
  };
}
