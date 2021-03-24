import { codeBlock, kebabCase } from '@sap-cloud-sdk/util';
import { OpenApiDocument } from '../openapi-types';

export function exportAllFiles(fileNames: string[]): string {
  return codeBlock`${fileNames
    .map(fileName => exportAll(`${kebabCase(fileName)}`))
    .join('\n')}`;
}

export function apiIndexFile(openApiDocument: OpenApiDocument): string {
  const files = [
    ...openApiDocument.apis.map(api => api.name),
    ...(openApiDocument.schemas.length ? ['model'] : [])
  ];
  return codeBlock`
    ${exportAllFiles(files)}
  `;
}

export function modelIndexFile(openApiDocument: OpenApiDocument): string {
  return codeBlock`
    ${exportAllFiles(openApiDocument.schemas.map(schema => schema.name))}
  `;
}

function exportAll(file: string) {
  return `export * from './${file}';`;
}
