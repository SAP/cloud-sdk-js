import { codeBlock, kebabCase } from '@sap-cloud-sdk/util';
import { OpenApiDocument } from '../openapi-types';

/**
 * Serialize an index file for the root directory of the generated service.
 * @param openApiDocument The parsed document to serialize into an index file.
 * @returns The serialized index file contents.
 */
export function apiIndexFile(openApiDocument: OpenApiDocument): string {
  const files = [
    ...openApiDocument.apis.map(api => api.name),
    ...(openApiDocument.schemas.length ? ['schema'] : [])
  ];
  return codeBlock`
    ${exportAllFiles(files)}
  `;
}

/**
 * Serialize an index file for the schema directory of the generated service.
 * @param openApiDocument The parsed document to serialize into an index file for the schema directory.
 * @returns The serialized index file contents.
 */
export function schemaIndexFile(openApiDocument: OpenApiDocument): string {
  return codeBlock`
    ${exportAllFiles(openApiDocument.schemas.map(schema => schema.name))}
  `;
}

function exportAllFiles(fileNames: string[]): string {
  return codeBlock`${fileNames
    .map(fileName => exportAll(`${kebabCase(fileName)}`))
    .join('\n')}`;
}

function exportAll(file: string) {
  return `export * from './${file}';`;
}
