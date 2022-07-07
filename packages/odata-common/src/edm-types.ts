import { ODataVersion } from '@sap-cloud-sdk/util';
/**
 * Includes all EDM types which are shared between OData version 2 and 4.
 */
export type EdmTypeCommon = EdmTypeSameConverters | EdmTypeDifferentConverters;

/**
 * PLEASER REVIEW.
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
 * Includes all EDM types that have different converters for OData version 2 and 4.
 */
export type EdmTypeDifferentConverters = 'Edm.DateTimeOffset';

/**
 * Exclusive EDM types for OData v2.
 */
export type ExclusiveEdmTypeV2 = 'Edm.DateTime' | 'Edm.Time';

/**
 * Exclusive EDM types for OData v4.
 */
export type ExclusiveEdmTypeV4 =
  | 'Edm.Date'
  | 'Edm.Duration'
  | 'Edm.TimeOfDay'
  | 'Edm.Enum'; // There is no `Edm.Enum` in terms of OData spec. We use it so the serialization/de-serialization of the `Edm.String` can be reused.

// The generic parameter is currently unused. We still have to revise whether we can use it in a later version of TypeScript.
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
/**
 * Represents all valid EDM types for one OData version (either v2 or v4).
 * Currently, due to an issue in TypeScript, this includes all valid types for OData v2 **and** v4.
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
 * @returns Whether the given value is of type {@link EdmTypeShared}
 * @internal
 */
export function isEdmType(val: any): val is EdmTypeShared<'any'> {
  return typeof val === 'string' && val.startsWith('Edm.');
}

/**
 * EDM types that can be compared with `greaterThan`, `greaterOrEqual`, `lessThan` and `lessOrEqual`.
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
  | 'Edm.TimeOfDay'
  | 'Edm.String'
  | 'Edm.Boolean'
  | 'Edm.Guid';

/**
 * Convenience function to check whether a given EDM type is of type {@link OrderableEdmType}.
 * @param edmType - Literal EDM type string to check.
 * @returns Whether the given `edmType` is of type {@link OrderableEdmType}.
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
    'Edm.TimeOfDay',
    'Edm.String',
    'Edm.Boolean',
    'Edm.Guid'
  ].includes(edmType);
}
