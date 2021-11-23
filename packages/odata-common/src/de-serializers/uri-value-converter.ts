/* eslint-disable valid-jsdoc */

import { EdmTypeShared } from '../edm-types';
import { DeSerializationMiddlewareBASE } from './de-serialization-middleware';

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
export class UriConverter {
  constructor(private deSerializers: DeSerializationMiddlewareBASE) {}

  convertToUriFormat(value: any, edmType: EdmTypeShared<'any'>): string {
    const { serializeToUri, ...deSerializer } = this.deSerializers[edmType];
    if (serializeToUri) {
      return serializeToUri(value, deSerializer);
    }
    return this.deSerializers[edmType].serialize(value);
  }
}
