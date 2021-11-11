import { unixEOL } from '@sap-cloud-sdk/util';
import { OpenApiDocument } from '../openapi-types';
import { getApiSpecificUsage } from '../sdk-metadata/generation-and-usage';
/**
 * Generate the readme for an openapi client.
 * @param openApiDocument - Parsed service.
 * @returns The readme contents.
 * @internal
 */
export function readme(openApiDocument: OpenApiDocument): string {
  return `# ${openApiDocument.serviceOptions.packageName}

This package contains the OpenAPI client for the ${openApiDocument.serviceName}.
${openApiDocument.serviceDescription ?? ''}

${addUsageExample(openApiDocument).join(unixEOL)}
${helpfulLinksSection().join(unixEOL)}
    
`;
}

// TODO 1728 move to a new package for reduce code duplication.
/**
 * Build the helpful links section of the readme file.
 * @returns The content of the section.
 * @internal
 */
export function helpfulLinksSection(): string[] {
  return [
    '## Helpful Links',
    '',
    '- [SAP Cloud SDK](https://github.com/SAP/cloud-sdk-js)',
    '- [SAP Cloud SDK Documentation portal - Getting started guide](https://sap.github.io/cloud-sdk/docs/js/getting-started)',
    '- [SAP Cloud SDK Documentation portal - API documentation](https://sap.github.io/cloud-sdk/docs/js/api)',
    '- [developers.sap.com - Product Overview](https://developers.sap.com/topics/cloud-sdk.html)',
    '- [developers.sap.com - Tutorials](https://developers.sap.com/tutorial-navigator.html?tag=software-product:technology-platform/sap-cloud-sdk&tag=tutorial:type/tutorial&tag=programming-tool:javascript)',
    '- [Release notes](https://help.sap.com/doc/2324e9c3b28748a4ae2ad08166d77675/1.0/en-US/js-index.html)',
    '- [SAP API Business Hub](https://api.sap.com/)'
  ];
}

function addUsageExample(openApiDocument: OpenApiDocument): string[] {
  const usageText = getApiSpecificUsage(openApiDocument);
  if (usageText.instructions) {
    return [
      `## ${usageText.header}`,
      '```',
      `${usageText.instructions}`,
      '```',
      ''
    ];
  }
  return [];
}
