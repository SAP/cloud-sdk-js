/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

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
  | 'Edm.Byte';

export type EdmTypeDifferentConverters = 'Edm.DateTimeOffset';

// Exclusive types for ODataVersions
export type EdmTypeV2 = 'Edm.DateTime' | 'Edm.Time';
export type EdmTypeV4 = 'Edm.Date' | 'Edm.Duration' | 'Edm.TimeOfDay';

// The generic parameter is currently unused. We still have to revise whether we can use it in a later version of typescript.
export type EdmTypeShared<VersionT extends 'v2' | 'v4' | 'any'> =
  | EdmTypeCommon
  | EdmTypeV2
  | EdmTypeV4;

/**
 * for literal unions
 * @example Sub<'Y' | 'X', 'X'> // === 'Y'
 */
export type Sub<O extends string, D extends string> = {
  [K in O]: (Record<D, never> & Record<string, K>)[K];
}[O];

export type EdmTypeSameConvertersUri = Sub<EdmTypeSameConverters, 'Edm.Guid'>;
