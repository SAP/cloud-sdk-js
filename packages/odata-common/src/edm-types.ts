import { ODataVersion } from '@sap-cloud-sdk/util';
/**
 * @internal
 */
export type EdmTypeCommon = EdmTypeSameConverters | EdmTypeDifferentConverters;
/**
 * @internal
 */
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
  | 'Edm.Any'; // Represents currently unsupported EDM types like Edm.Geography.

/**
 * @internal
 */
export type EdmTypeDifferentConverters = 'Edm.DateTimeOffset';

// Exclusive types for ODataVersions
/**
 * @internal
 */
export type ExclusiveEdmTypeV2 = 'Edm.DateTime' | 'Edm.Time';

/**
 * @internal
 */
export type ExclusiveEdmTypeV4 =
  | 'Edm.Date'
  | 'Edm.Duration'
  | 'Edm.TimeOfDay'
  | 'Edm.Enum'; // There is no `Edm.Enum` in terms of OData spec. We use it so the serialization/de-serialization of the `Edm.String` can be reused.

// The generic parameter is currently unused. We still have to revise whether we can use it in a later version of TypeScript.
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
/**
 * @internal
 */
export type EdmTypeShared<VersionT extends ODataVersion | 'any'> =
  // Pretend to use parameter to avoid TS bug in versions > 4.2 (https://github.com/microsoft/TypeScript/issues/44727)
  VersionT extends any
    ? EdmTypeCommon | ExclusiveEdmTypeV2 | ExclusiveEdmTypeV4
    : EdmTypeCommon | ExclusiveEdmTypeV2 | ExclusiveEdmTypeV4;
/**
 * @internal
 */
export type EdmTypeSameConvertersUri = Exclude<
  EdmTypeSameConverters,
  'Edm.Guid' | 'Edm.Decimal'
>;

/**
 * Check whether a value is an EdmType. This will yield positive results for every string starting with `Edm.`.
 * @param val - Value to test.
 * @returns Whether the given value is of type [[EdmTypeShared]]
 * @internal
 */
export function isEdmType(val: any): val is EdmTypeShared<'any'> {
  return typeof val === 'string' && val.startsWith('Edm.');
}

/**
 * EDM types that can be compared with `greaterThan`, `greaterOrEqual`, `lessThan` and `lessOrEqual`.
 * @internal
 */
export type OrderableEdmType =
  | 'Edm.Decimal'
  | 'Edm.Double'
  | 'Edm.Single'
  | 'Edm.Float'
  | 'Edm.Int16'
  | 'Edm.Int32'
  | 'Edm.Int64'
  | 'Edm.SByte'
  | 'Edm.Byte'
  | 'Edm.DateTime'
  | 'Edm.DateTimeOffset'
  | 'Edm.Time'
  | 'Edm.Date'
  | 'Edm.Duration'
  | 'Edm.TimeOfDay';

/**
 * Convenience function to check whether a given EDM type is of type [[OrderableEdmType]].
 * @param edmType - Literal EDM type string to check.
 * @returns Whether the given `edmType` is of type [[OrderableEdmType]].
 */
export function isOrderableEdmType(edmType: EdmTypeShared<'any'>): boolean {
  return [
    'Edm.Decimal',
    'Edm.Double',
    'Edm.Single',
    'Edm.Float',
    'Edm.Int16',
    'Edm.Int32',
    'Edm.Int64',
    'Edm.SByte',
    'Edm.Byte',
    'Edm.DateTime',
    'Edm.DateTimeOffset',
    'Edm.Time',
    'Edm.Date',
    'Edm.Duration',
    'Edm.TimeOfDay'
  ].includes(edmType);
}
