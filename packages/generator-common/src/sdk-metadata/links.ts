import type { Links } from './sdk-metadata-types';

/**
 * @internal
 */
export function getLinks(
  executeRequestUrl: string,
  generationManualUrl: string,
  apiType: 'OData' | 'OpenAPI'
): Links {
  return {
    gettingStarted: {
      name: 'Getting Started with the SAP Cloud SDK for JavaScript',
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
