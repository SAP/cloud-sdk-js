/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

export type EdmTypeCommon =
  | 'Edm.String'
  | 'Edm.Boolean'
  | 'Edm.Guid'
  | 'Edm.Decimal'
  | 'Edm.Double'
  | 'Edm.Single'
  | 'Edm.Float' // For ABAP CDS compatibility
  | 'Edm.Int16'
  | 'Edm.Int32'
  | 'Edm.Int64'
  | 'Edm.SByte'
  | 'Edm.DateTimeOffset'
  | 'Edm.Time'
  | 'Edm.Binary'
  | 'Edm.Byte';

// Exclusive types for ODataVersions
export type EdmTypeV2 = 'Edm.DateTime';
export type EdmTypeV4 = 'Edm.Date';

// The generic parameter is currently unused. We still have to revise whether we can use it in a later version of typescript.
export type EdmTypeShared<VersionT extends 'v2' | 'v4' | 'any'> =
  | EdmTypeCommon
  | EdmTypeV2
  | EdmTypeV4;
