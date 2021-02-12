import { codeBlock } from '@sap-cloud-sdk/util';
import voca from 'voca';
import { OpenApiDocument } from '../openapi-types';

/**
 * @experimental This API is experimental and might change in newer versions. Use with caution.
 * Generate the index file to expose the SAP Cloud SDK API and models.
 * @param openApiDocument Parsed service.
 * @returns The index file contents.
 */
export function indexFile(openApiDocument: OpenApiDocument): string {
  return codeBlock`
export * from './openapi/model';
${getApiFilesForIndex(openApiDocument)
  .map(api => exportAll(api))
  .join('\n')}
`;
}

function exportAll(file: string) {
  return `export * from './${file}';`;
}

function getApiFilesForIndex(openApiDocument: OpenApiDocument): string[] {
  return openApiDocument.tags.map(tag => buildApiFileNameUsedByIndexFile(tag));
}

function buildApiFileNameUsedByIndexFile(apiName: string) {
  return `${voca.kebabCase(apiName + 'Api')}`;
}
