import { codeBlock, first } from '@sap-cloud-sdk/util';

/**
 * @experimental This API is experimental and might change in newer versions. Use with caution.
 * Generate the index file to expose the SAP Cloud SDK API and models.
 * @param apis The generated api files.
 * @returns The index file contents.
 */
export function indexFile(apis: string[]): string {
  return codeBlock`
export * from './openapi/model';
${apis
  .filter(api => api.endsWith('.ts'))
  .map(api => exportAll(first(api.split('.ts'))!))
  .join('\n')}
`;
}

function exportAll(file: string) {
  return `export * from './${file}';`;
}
