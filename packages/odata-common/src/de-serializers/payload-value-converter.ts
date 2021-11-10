/* eslint-disable valid-jsdoc */

import BigNumber from 'bignumber.js';

/**
 * @deprecated I think this should be removed and replaced by the number functions below.
 */
export function convertToNumber(value: any): number {
  return Number(value);
}

/**
 * Check if string is guid format and throws exception if not.
 * @param value - string to be checked
 * @returns string
 * @internal
 */
export function validateGuid(value: string): string {
  const guids =
    /[A-Fa-f0-9]{8}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{12}/.exec(
      value
    );
  if (!guids || !guids.length) {
    throw new Error(`Failed to parse GUID from '${value}'.`);
  }

  return guids[0];
}

/**
 * @internal
 */
export function deserializeToBigNumber(value: any): BigNumber {
  return new BigNumber(value);
}

/**
 * @internal
 */
export function serializeFromBigNumber(value: BigNumber): string {
  return value.toString();
}

/**
 * @internal
 */
export function deserializeToNumber(value: string | number): number {
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
export function serializeFromNumber(value: number): number | string {
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
