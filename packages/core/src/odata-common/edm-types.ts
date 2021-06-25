import { ODataVersion } from '@sap-cloud-sdk/util';
export type EdmTypeCommon = EdmTypeSameConverters | EdmTypeDifferentConverters;

export type EdmTypeSameConverters =
  | 'Edm.String'
  | 'Edm.Boolean'
  | 'Edm.Decimal'
  | 'Edm.Double'
  | 'Edm.Single'
  | 'Edm.Float' // For ABAP CDS compatibility
  | 'Edm.Int16'
  | 'Edm.Int32'
  | 'Edm.Int64'
  | 'Edm.SByte'
  | 'Edm.Binary'
  | 'Edm.Guid'
  | 'Edm.Byte'
  | 'Edm.Any'; // Represents currently unsupported edm types like Edm.Geography.

export type EdmTypeDifferentConverters = 'Edm.DateTimeOffset';

// Exclusive types for ODataVersions
export type ExclusiveEdmTypeV2 = 'Edm.DateTime' | 'Edm.Time';
export type ExclusiveEdmTypeV4 =
  | 'Edm.Date'
  | 'Edm.Duration'
  | 'Edm.TimeOfDay'
  | 'Edm.Enum'; // FIXME: Represents all enum types. This is not correct, because enum types can have different integer related types. Fix latest by v2.0.

// The generic parameter is currently unused. We still have to revise whether we can use it in a later version of typescript.
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
export type EdmTypeShared<VersionT extends ODataVersion | 'any'> =
  // Pretend to use parameter to avoid TS bug in versions > 4.2 (https://github.com/microsoft/TypeScript/issues/44727)
  VersionT extends any
    ? EdmTypeCommon | ExclusiveEdmTypeV2 | ExclusiveEdmTypeV4
    : EdmTypeCommon | ExclusiveEdmTypeV2 | ExclusiveEdmTypeV4;

export type EdmTypeSameConvertersUri = Exclude<
  EdmTypeSameConverters,
  'Edm.Guid' | 'Edm.Decimal'
>;

/**
 * Check whether a value is an EdmType. This will yield positive results for every string starting with `Edm.`.
 * @param val Value to test.
 * @returns Whether the given value is of type [[EdmTypeShared]]
 */
export function isEdmType(val: any): val is EdmTypeShared<'any'> {
  return typeof val === 'string' && val.startsWith('Edm.');
}
