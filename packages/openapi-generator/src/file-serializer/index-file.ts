import { codeBlock, kebabCase } from '@sap-cloud-sdk/util';
import type { CreateFileOptions } from '@sap-cloud-sdk/generator-common/internal';
import type { OpenApiDocument } from '../openapi-types';

/**
 * Serialize an index file for the root directory of the generated service.
 * @param openApiDocument - The parsed document to serialize into an index file.
 * @returns The serialized index file contents.
 * @internal
 */
export function apiIndexFile(
  openApiDocument: OpenApiDocument,
  options?: CreateFileOptions
): string {
  const files = [
    ...openApiDocument.apis.map(api => api.name),
    ...(openApiDocument.schemas.length ? ['schema'] : [])
  ];
  return codeBlock`
    ${exportAllFiles(
      files.map(fileName => kebabCase(fileName)),
      options
    )}
  `;
}

/**
 * Serialize an index file for the schema directory of the generated service.
 * @param openApiDocument - The parsed document to serialize into an index file for the schema directory.
 * @returns The serialized index file contents.
 * @internal
 */
export function schemaIndexFile(
  openApiDocument: OpenApiDocument,
  options?: CreateFileOptions
): string {
  return exportAllFiles(
    openApiDocument.schemas.map(schema => schema.fileName),
    options
  );
}

function exportAllFiles(
  fileNames: string[],
  options?: CreateFileOptions
): string {
  return codeBlock`${fileNames
    .map(fileName => exportAll(fileName, options))
    .join('\n')}`;
}

function exportAll(file: string, options?: CreateFileOptions) {
  return options?.generateESM
    ? file === 'schema'
      ? "export * from './schema/index.js';"
      : `export * from './${file}.js';`
    : `export * from './${file}';`;
}
