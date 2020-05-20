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
