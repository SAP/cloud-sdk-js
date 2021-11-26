/* eslint-disable valid-jsdoc */

import { EdmTypeShared } from '../edm-types';
import { DeSerializers } from './de-serializers';

/**
 * @internal
 */
export function isInfOrNan(value: string | number): boolean {
  if (typeof value === 'number') {
    return false;
  }
  return ['inf', '-inf', 'nan'].includes(value.toLowerCase());
}

/**
 * @internal
 */
export function convertToUriForEdmString(value: any): string {
  return `'${value.replace(/'/g, "''")}'`;
}

/**
 * @internal
 */
export interface UriConverter {
  convertToUriFormat: (value: any, edmType: EdmTypeShared<'any'>) => string;
}

/**
 * @internal
 */
export function createUriConverter(deSerializers: DeSerializers): UriConverter {
  return {
    convertToUriFormat: (value: any, edmType: EdmTypeShared<'any'>): string => {
      const { serializeToUri, serialize } = deSerializers[edmType];
      return serializeToUri
        ? serializeToUri(value, serialize)
        : serialize(value);
    }
  };
}
