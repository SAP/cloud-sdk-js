/*!
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { EdmType } from './edm-types';
import { tsToEdm } from './payload-value-converter';

// tslint:disable: valid-jsdoc

/**
 * @hidden
 */
export function convertToUriFormat(value: any, edmType: EdmType): string {
  const converted = tsToEdm(value, edmType);
  switch (edmType) {
    case 'Edm.Binary':
      return `X'${converted}'`;
    case 'Edm.Boolean':
      return String(converted);
    case 'Edm.Byte':
      return String(converted);
    case 'Edm.Int16':
      return String(converted);
    case 'Edm.Int32':
      return String(converted);
    case 'Edm.SByte':
      return String(converted);
    case 'Edm.Int64':
      return `${converted}L`;
    case 'Edm.Decimal':
      return `${converted}M`;
    case 'Edm.Double':
      return isInfOrNan(converted) ? converted : `${converted}D`;
    case 'Edm.Single':
      return isInfOrNan(converted) ? converted : `${converted}F`;
    case 'Edm.Float': // ABAP CDS compatibility
      return isInfOrNan(converted) ? converted : `${converted}F`;
    case 'Edm.Guid':
      return `guid'${converted}'`;
    case 'Edm.String':
      return convertToUriForEdmString(converted);
    case 'Edm.DateTime':
      return `datetime'${value.toISOString().replace(/Z$/, '')}'`;
    case 'Edm.DateTimeOffset':
      return `datetimeoffset'${value.toISOString()}'`;
    case 'Edm.Time':
      return `time'${converted}'`;
    default:
      return converted;
  }
}

function isInfOrNan(value: string | number): boolean {
  if (typeof value === 'number') {
    return false;
  }
  return ['inf', '-inf', 'nan'].includes(value.toLowerCase());
}

export function convertToUriForEdmString(value: any): string {
  return `'${value.replace(/'/g, "''")}'`;
}
