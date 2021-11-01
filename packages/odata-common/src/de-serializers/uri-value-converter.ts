/* eslint-disable valid-jsdoc */

import { EdmTypeShared } from '../edm-types';

export function isInfOrNan(value: string | number): boolean {
  if (typeof value === 'number') {
    return false;
  }
  return ['inf', '-inf', 'nan'].includes(value.toLowerCase());
}

export function convertToUriForEdmString(value: any): string {
  return `'${value.replace(/'/g, "''")}'`;
}

/**
 * Interface defining the methods of the URI converter.
 * The concrete implementations are created in odata/v2/uri-conversion/uri-value-converter.ts and odata/v4/uri-conversion/uri-value-converter.ts
 */
export interface UriConverter {
  convertToUriFormat(
    value: any,
    edmType: EdmTypeShared<'v2'> | EdmTypeShared<'v4'>
  ): string;
}
