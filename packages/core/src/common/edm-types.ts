/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

type EdmTypeCommon =
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

type EdmTypeV2 = 'Edm.DateTime';
type EdmTypeV4 = 'Edm.Date';
export type EdmType<VersionT extends 'v2' | 'v4'> =
  | EdmTypeCommon
  | (VersionT extends 'v2'
      ? EdmTypeV2
      : VersionT extends 'v4'
      ? EdmTypeV4
      : never);
