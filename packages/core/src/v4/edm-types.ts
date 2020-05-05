/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

export type EdmType =
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
  | 'Edm.DateTime'
  | 'Edm.DateTimeOffset'
  | 'Edm.Time'
  | 'Edm.Binary'
  | 'Edm.Byte';
