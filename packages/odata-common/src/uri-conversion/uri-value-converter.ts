/* eslint-disable valid-jsdoc */

import {
  EdmTypeSameConverters,
  EdmTypeSameConvertersUri,
  EdmTypeShared
} from '../edm-types';
import { createTsToEdm } from '../payload-value-converter';

type UriConverterMapping = {
  [key in EdmTypeSameConvertersUri]: (value: any) => string;
};

export const uriConvertersCommon: UriConverterMapping = {
  'Edm.Binary': value => `X'${value}'`,
  'Edm.Boolean': value => String(value),
  'Edm.Byte': value => String(value),
  'Edm.Int16': value => String(value),
  'Edm.Int32': value => String(value),
  'Edm.SByte': value => String(value),
  'Edm.Int64': value => `${value}L`,
  'Edm.Double': value => (isInfOrNan(value) ? value : `${value}D`),
  'Edm.Single': value => (isInfOrNan(value) ? value : `${value}F`),
  'Edm.Float': value => (isInfOrNan(value) ? value : `${value}F`),
  'Edm.String': value => convertToUriForEdmString(value),
  'Edm.Any': value => String(value)
};

function isInfOrNan(value: string | number): boolean {
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

export function createUriConverter<V extends EdmTypeSameConverters>(
  serializers: { [keys in V]: (value: any) => any },
  uriConverters: { [key in V]: (value: any) => string }
): UriConverter {
  const tsToEdm = createTsToEdm(serializers);

  const convertToUriFormat = function (value: any, edmType: V): string {
    const converted = tsToEdm(value, edmType);
    const uriConverterFunc = uriConverters[edmType];
    if (uriConverterFunc) {
      return uriConverterFunc(converted);
    }
    return converted;
  };
  return {
    convertToUriFormat
  };
}
