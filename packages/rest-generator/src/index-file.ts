import { codeBlock } from '@sap-cloud-sdk/util';

export function indexFile(): string {
  return codeBlock`
export * from './open-api/model';
export * from './request-builder';
`;
}
