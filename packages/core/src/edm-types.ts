/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { ODataV2 } from './odata-v2';
import { ODataV4 } from './odata-v4';

export type EdmTypeV2 =
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

export type EdmTypeV4 = EdmTypeV2 | 'Edm.Collection';

export type EdmType<Version = ODataV2> = Version extends ODataV4
  ? EdmTypeV4
  : EdmTypeV2;
