/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
/* eslint-disable valid-jsdoc */

import BigNumber from 'bignumber.js';
import { identity } from 'rambda';
import { EdmTypeSameConverters } from '../common';

type EdmTypeMapping = { [key in EdmTypeSameConverters]: (value: any) => any };

const toNumber = (value: any): number => Number(value);
const toBigNumber = (value: any): BigNumber => new BigNumber(value);

export const toGuid = (value: string): string => {
  const guids = /[A-Fa-f0-9]{8}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{12}/.exec(
    value
  );
  if (!guids || guids.length <= 0) {
    throw new Error(`Failed to parse the value: ${value} to guid.`);
  }

  return guids[0];
};

const fromBigNumber = (value: BigNumber): string =>
  (value as BigNumber).toString();

/**
 * @hidden
 */
export function toNumberFromEdm(value: string | number): number {
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
    throw new Error(`Edm->TS: Cannot create number from input "${value}"`);
  }

  return num;
}

/**
 * @hidden
 */
export function toNumberFromTs(value: Number): number|string {
  if (typeof value === 'number') {
    return value;
  }

  if (value === Number.POSITIVE_INFINITY) {
    return 'INF';
  }
  if (value === Number.NEGATIVE_INFINITY) {
    return '-INF';
  }
  if (value === Number.NaN) {
    return 'NaN'
  }

  const num = Number(value);

  throw new Error(`TS->edm: Cannot create number from input "${value}"`);
}


export const deserializersCommon: EdmTypeMapping = {
  'Edm.Binary': identity,
  'Edm.Boolean': identity,
  'Edm.Byte': toNumber,
  'Edm.Decimal': toBigNumber,
  'Edm.Double': toNumberFromEdm,
  'Edm.Float': toNumberFromEdm,
  'Edm.Int16': toNumber,
  'Edm.Int32': toNumber,
  'Edm.Int64': toBigNumber,
  'Edm.Guid': toGuid,
  'Edm.SByte': toNumber,
  'Edm.Single': toNumberFromEdm,
  'Edm.String': identity
};

export const serializersCommom: EdmTypeMapping = {
  'Edm.Binary': identity,
  'Edm.Boolean': identity,
  'Edm.Byte': toNumber,
  'Edm.Decimal': fromBigNumber,
  'Edm.Double': toNumberFromTs,
  'Edm.Float': toNumberFromTs,
  'Edm.Int16': toNumber,
  'Edm.Int32': toNumber,
  'Edm.Int64': fromBigNumber,
  'Edm.Guid': identity,
  'Edm.SByte': toNumber,
  'Edm.Single': toNumberFromTs,
  'Edm.String': identity
};
