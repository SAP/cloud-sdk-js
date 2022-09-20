import { unixEOL } from '@sap-cloud-sdk/util';
import {
  helpfulLinksSection,
  usageHeaderText
} from '@sap-cloud-sdk/generator-common/internal';
import { OpenApiDocument } from '../openapi-types';
import { getApiSpecificUsage } from '../sdk-metadata';
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

function addUsageExample(openApiDocument: OpenApiDocument): string[] {
  const usageText = getApiSpecificUsage(openApiDocument);
  if (usageText) {
    return [`## ${usageHeaderText}`, '```', `${usageText}`, '```', ''];
  }
  return [];
}
