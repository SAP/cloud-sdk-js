/* eslint-disable valid-jsdoc */

import { EdmTypeShared } from '../edm-types';
import { DeSerializers } from './de-serializers';

export function isInfOrNan(value: string | number): boolean {
  if (typeof value === 'number') {
    return false;
  }
  return ['inf', '-inf', 'nan'].includes(value.toLowerCase());
}

export function convertToUriForEdmString(value: any): string {
  return `'${value.replace(/'/g, "''")}'`;
}

export interface UriConverter {
  convertToUriFormat: (value: any, edmType: EdmTypeShared<'any'>) => string;
}

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
