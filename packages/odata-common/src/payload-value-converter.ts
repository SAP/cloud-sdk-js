/* eslint-disable valid-jsdoc */

import BigNumber from 'bignumber.js';
import { identity } from '@sap-cloud-sdk/util';
import { EdmTypeCommon, EdmTypeSameConverters } from './edm-types';

type EdmTypeMapping = { [key in EdmTypeSameConverters]: (value: any) => any };

const toNumber = (value: any): number => Number(value);
const toBigNumber = (value: any): BigNumber => new BigNumber(value);

/**
 * Check if string is guid format and throws exception if not.
 * @param value - string to be checked
 * @returns string
 * @internal
 */
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
 * @internal
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
 * @internal
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

/**
 * @internal
 */
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

/**
 * @internal
 */
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

/**
 * @hidden
 * @internal
 */
export function createEdmToTs<V extends EdmTypeCommon>(deserializers: {
  [key in V]: (value: any) => V;
}): (value, edmType: V) => V {
  return function (value: any, edmType: V): V {
    if (value === null || typeof value === 'undefined') {
      return value;
    }

    if (deserializers[edmType]) {
      return deserializers[edmType](value);
    }
    return value;
  };
}
// (value: any, edmType: EdmTypeShared<'v2'>): any
/**
 * @internal
 */
export function createTsToEdm<T extends EdmTypeCommon>(serializers: {
  [key in T]: (value: any) => any;
}): (value, edmType: T) => any {
  return function (value: any, edmType: T) {
    if (value === null) {
      return 'null';
    }
    if (serializers[edmType]) {
      return serializers[edmType](value);
    }
    return value;
  };
}
