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
 * As per OData URL Syntax rules, single quotes within string literals must be represented as two consecutive single quotes.
 * encodeURIComponent does not encode single quotes on the high level get-filter and get-resource-path.
 * @internal
 */
export function convertToUriForEdmString(value: any): string {
  return `'${value.replace(/'/g, "''")}'`;
}

/**
 * @internal
 */
export type UriConverter = (
  value: any,
  edmType: EdmTypeShared<'any'>
) => string;

/**
 * @internal
 */
export function createUriConverter(deSerializers: DeSerializers): UriConverter {
  return (value: any, edmType: EdmTypeShared<'any'>): string => {
    const { serializeToUri, serialize } = deSerializers[edmType];
    return serializeToUri ? serializeToUri(value, serialize) : serialize(value);
  };
}
