import { codeBlock, helpfulLinksSection } from '@sap-cloud-sdk/util';
import { OpenApiDocument } from '../openapi-types';

/**
 * @experimental This API is experimental and might change in newer versions. Use with caution.
 * Generate the readme for an openapi client.
 * @param openApiDocument Parsed service.
 * @returns The readme contents.
 */
export function readme(openApiDocument: OpenApiDocument): string {
  return codeBlock`# ${openApiDocument.npmPackageName}

This package contains the OpenAPI VDM for the ${openApiDocument.apiName}.

${helpfulLinksSection().join('\n')}
    
`;
}
