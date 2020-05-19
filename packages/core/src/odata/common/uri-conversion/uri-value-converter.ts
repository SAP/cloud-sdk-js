/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
/* eslint-disable valid-jsdoc */

import { EdmTypeSameConvertersUri } from '../../common';

type UriConverterMapping = {
  [key in EdmTypeSameConvertersUri]: (value: any) => string;
};
/**
 * @hidden
 */
export const uriConvertersCommon: UriConverterMapping = {
  'Edm.Binary': value => `X'${value}'`,
  'Edm.Boolean': value => String(value),
  'Edm.Byte': value => String(value),
  'Edm.Int16': value => String(value),
  'Edm.Int32': value => String(value),
  'Edm.SByte': value => String(value),
  'Edm.Int64': value => `${value}L`,
  'Edm.Decimal': value => `${value}M`,
  'Edm.Double': value => (isInfOrNan(value) ? value : `${value}D`),
  'Edm.Single': value => (isInfOrNan(value) ? value : `${value}F`),
  'Edm.Float': value => (isInfOrNan(value) ? value : `${value}F`),
  'Edm.String': value => convertToUriForEdmString(value)
};

//
// (
//   value
// }: any,
//   edmType: EdmTypeShared<'v4'>
//
// ): string|undefined {
//   const converted = tsToEdm(value, edmType);
//   switch (edmType) {
//     case 'Edm.Binary':
//       return `X'${converted}'`;
//     case 'Edm.Boolean':
//       return String(converted);
//     case 'Edm.Byte':
//       return String(converted);
//     case 'Edm.Int16':
//       return String(converted);
//     case 'Edm.Int32':
//       return String(converted);
//     case 'Edm.SByte':
//       return String(converted);
//     case 'Edm.Int64':
//       return `${converted}L`;
//     case 'Edm.Decimal':
//       return `${converted}M`;
//     case 'Edm.Double':
//       return isInfOrNan(converted) ? converted : `${converted}D`;
//     case 'Edm.Single':
//       return isInfOrNan(converted) ? converted : `${converted}F`;
//     case 'Edm.Float': // ABAP CDS compatibility
//       return isInfOrNan(converted) ? converted : `${converted}F`;
//     case 'Edm.String':
//       return convertToUriForEdmString(converted);
//     default:
//       return undefined;
//   }
// }

function isInfOrNan(value: string | number): boolean {
  if (typeof value === 'number') {
    return false;
  }
  return ['inf', '-inf', 'nan'].includes(value.toLowerCase());
}

/**
 * @hidden
 */
export function convertToUriForEdmString(value: any): string {
  return `'${value.replace(/'/g, "''")}'`;
}
