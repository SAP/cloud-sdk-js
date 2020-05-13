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

export type EdmTypeV2 = 'Edm.DateTime';
export type EdmTypeV4 = 'Edm.Date';

type EdmTypeVersionBased<VersionT extends 'v2' | 'v4'> = VersionT extends 'v2'
  ? EdmTypeV2
  : VersionT extends 'v4'
  ? EdmTypeV4
  : never;

export type EdmTypeSharedC<T> = T extends 'v4' ? EdmTypeCommon : EdmTypeCommon;

// export type EdmTypeShared<VersionT extends 'v2' | 'v4' | EntityBase> =
//   | EdmTypeCommon
//   | (VersionT extends EntityBase
//       ? EdmTypeVersionBased<VersionT['_oDataVersion']>
//       : VersionT extends 'v2'
//       ? EdmTypeVersionBased<VersionT>
//       : VersionT extends 'v4'
//       ? EdmTypeVersionBased<VersionT>
//       : never);

export type EdmTypeShared<VersionT extends 'v2' | 'v4' | 'any'> =
  | EdmTypeCommon
  | EdmTypeV2
  | EdmTypeV4;

// export type EdmTypeShared<
//   VersionT extends 'v2' | 'v4' | EntityBase
// > = VersionT extends 'v2' ? EdmTypeCommon : EdmTypeCommon;

// function fnv2(d: EdmTypeShared<'v2'>) {}
// function fnv4(d: EdmTypeShared<'v4'>) {}
// fnv2('');
