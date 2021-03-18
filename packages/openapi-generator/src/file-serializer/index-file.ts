import { codeBlock, kebabCase } from '@sap-cloud-sdk/util';
import { OpenApiDocument } from '../openapi-types';

/**
 * @experimental This API is experimental and might change in newer versions. Use with caution.
 * Generate the index file to expose the SAP Cloud SDK API and models.
 * @param openApiDocument Parsed service.
 * @returns The index file contents.
 */
export function exportAllFiles(fileNames: string[]): string {
  return codeBlock`${fileNames
    .map(fileName => exportAll(`${kebabCase(fileName)}`))
    .join('\n')}`;
}

export function apiIndexFile(openApiDocument: OpenApiDocument): string {
  const files = [
    ...openApiDocument.apis.map(api => api.name),
    ...(openApiDocument.components.schemas.length ? ['model'] : [])
  ];
  return codeBlock`
    ${exportAllFiles(files)}
  `;
}

export function modelIndexFile(openApiDocument: OpenApiDocument): string {
  return codeBlock`
    ${exportAllFiles(
      openApiDocument.components.schemas.map(schema => schema.name)
    )}
  `;
}

function exportAll(file: string) {
  return `export * from './${file}';`;
}
