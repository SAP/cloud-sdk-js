/* eslint-disable valid-jsdoc */

import BigNumber from 'bignumber.js';
import { identity } from '@sap-cloud-sdk/util';
import { EdmTypeSameConverters } from '../odata-common';

type EdmTypeMapping = { [key in EdmTypeSameConverters]: (value: any) => any };

const toNumber = (value: any): number => Number(value);
const toBigNumber = (value: any): BigNumber => new BigNumber(value);

export const toGuid = (value: string): string => {
  const guids =
    /[A-Fa-f0-9]{8}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{12}/.exec(
      value
    );
  if (!guids || !guids.length) {
    throw new Error(`Failed to parse guid from '${value}'.`);
  }

  return guids[0];
};

const fromBigNumber = (value: BigNumber): string =>
  (value as BigNumber).toString();

/**
 * @hidden
 */
export function fromEdmToNumber(value: string | number): number {
  if (typeof value === 'number') {
    return value;
  }

  if (value.toLowerCase() === 'inf') {
    return Number.POSITIVE_INFINITY;
  }
  if (value.toLowerCase() === '-inf') {
    return Number.NEGATIVE_INFINITY;
  }
  if (value.toLowerCase() === 'nan') {
    return Number.NaN;
  }

  const num = Number(value);

  if (Number.isNaN(num)) {
    throw new Error(`EDM->TS: Cannot create number from input "${value}"`);
  }

  return num;
}

/**
 * @hidden
 */
export function fromNumberToEdm(value: number): number | string {
  if (value === Number.POSITIVE_INFINITY) {
    return 'INF';
  }
  if (value === Number.NEGATIVE_INFINITY) {
    return '-INF';
  }
  if (Number.isNaN(value)) {
    return 'NaN';
  }

  if (typeof value === 'number') {
    return value;
  }

  throw new Error(`TS->EDM: Cannot create number from input "${value}"`);
}

export const deserializersCommon: EdmTypeMapping = {
  'Edm.Binary': identity,
  'Edm.Boolean': identity,
  'Edm.Byte': toNumber,
  'Edm.Decimal': toBigNumber,
  'Edm.Double': fromEdmToNumber,
  'Edm.Float': fromEdmToNumber,
  'Edm.Int16': toNumber,
  'Edm.Int32': toNumber,
  'Edm.Int64': toBigNumber,
  'Edm.Guid': toGuid,
  'Edm.SByte': toNumber,
  'Edm.Single': fromEdmToNumber,
  'Edm.String': identity,
  'Edm.Any': identity
};

export const serializersCommon: EdmTypeMapping = {
  'Edm.Binary': identity,
  'Edm.Boolean': identity,
  'Edm.Byte': toNumber,
  'Edm.Decimal': fromBigNumber,
  'Edm.Double': fromNumberToEdm,
  'Edm.Float': fromNumberToEdm,
  'Edm.Int16': toNumber,
  'Edm.Int32': toNumber,
  'Edm.Int64': fromBigNumber,
  'Edm.Guid': identity,
  'Edm.SByte': toNumber,
  'Edm.Single': fromNumberToEdm,
  'Edm.String': identity,
  'Edm.Any': identity
};

/** @deprecated Since v1.27.0. Use [[serializersCommon]] instead. */
export const serializersCommom = serializersCommon;
