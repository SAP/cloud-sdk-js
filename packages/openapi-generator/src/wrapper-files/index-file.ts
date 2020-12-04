import { codeBlock } from '@sap-cloud-sdk/util';

/**
 * @experimental This API is experimental and might change in newer versions. Use with caution.
 * Generate the index file to expose the SAP Cloud SDK API and models.
 * @returns The index file contents.
 */
export function indexFile(): string {
  return codeBlock`
export * from './openapi/model';
export * from './api';
`;
}
