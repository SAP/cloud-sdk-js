/*!
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

import BigNumber from 'bignumber.js';
import moment, { Moment } from 'moment';
import { identity } from 'rambda';
import { EdmType } from './edm-types';
import { Time } from './time';

// tslint:disable: valid-jsdoc

/**
 * @hidden
 */
export function edmToTs<T extends EdmType>(value: any, edmType: T): EdmToPrimitive<T> {
  if (value === null || typeof value === 'undefined') {
    return value;
  }
  if (deserializers[edmType]) {
    return deserializers[edmType](value);
  }
  return value;
}

/**
 * @hidden
 */
export function tsToEdm(value: any, edmType: EdmType): any {
  if (value === null) {
    return 'null';
  }
  if (serializers[edmType]) {
    return serializers[edmType](value);
  }
  return value;
}

type EdmTypeMapping = { [key in EdmType]: (value: any) => any };

const toNumber = (value: any): number => Number(value);
const toBigNumber = (value: any): BigNumber => new BigNumber(value);

const toGuid = (value: string): string => {
  const guids = /[A-Fa-f0-9]{8}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{4}-[A-Fa-f0-9]{12}/.exec(value);
  if (!guids || guids.length <= 0) {
    throw new Error(`Failed to parse the value: ${value} to guid.`);
  }

  return guids[0];
};

const toTime = (value: string): Time => {
  const timeComponents = /PT(\d{1,2})H(\d{1,2})M(\d{1,2})S/.exec(value);
  if (!timeComponents) {
    throw new Error(`Failed to parse the value: ${value} to time.`);
  }
  return {
    hours: parseInt(timeComponents[1], 10),
    minutes: parseInt(timeComponents[2], 10),
    seconds: parseInt(timeComponents[3], 10)
  };
};

const fromBigNumber = (value: BigNumber): string => (value as BigNumber).toString();
const fromTime = (value: Time): string => 'PT' + leftpad(value.hours, 2) + 'H' + leftpad(value.minutes, 2) + 'M' + leftpad(value.seconds, 2) + 'S';

/**
 * @hidden
 * This function can be used for both Edm.DateTime and and Edm.DateTimeOffset.
 */
export function edmDateTimeToMoment(edmDateTime: string): Moment {
  const dateTimeOffsetComponents = /.*\((-?\d+)(?:([\+-])(\d{4})\))?/.exec(edmDateTime);
  if (!dateTimeOffsetComponents) {
    throw new Error(`Failed to parse edmDateTime: ${edmDateTime} to moment.`);
  }

  const timestamp = moment(parseInt(dateTimeOffsetComponents[1]));

  if (dateTimeOffsetComponents[2] && dateTimeOffsetComponents[3]) {
    const offsetMultiplier = dateTimeOffsetComponents[2] === '+' ? 1 : -1;
    const offsetInMinutes = parseInt(dateTimeOffsetComponents[3]);

    return timestamp.utc().utcOffset(offsetMultiplier * offsetInMinutes);
  }

  return timestamp;
}

/**
 * @hidden
 * This function can be used for both Edm.DateTime and and Edm.DateTimeOffset.
 */
export function momentToEdmDateTime(momentInstance: Moment): string {
  const timestamp = momentInstance.unix() * 1000;

  // for some reason isUtc() returns wrong values here, so we use the internal flag directly
  if (momentInstance['_isUTC']) {
    const offset = Math.abs(momentInstance.utcOffset());
    const operator = momentInstance.utcOffset() >= 0 ? '+' : '-';
    return `/Date(${timestamp}${operator}${leftpad(offset, 4)})/`;
  }

  return `/Date(${timestamp})/`;
}

/**
 * @hidden
 */
export function parseNumber(value: string | number): number {
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
    throw new Error(`Cannot create number from input "${value}"`);
  }

  return num;
}

function leftpad(value: any, targetLength: number): string {
  const str = value.toString();
  if (str.length >= targetLength) {
    return str;
  } else {
    return '0'.repeat(targetLength - str.length) + str;
  }
}

// prettier-ignore
export type EdmToPrimitive<T extends EdmType> =
  T extends 'Edm.Int16' | 'Edm.Int32' | 'Edm.Single' | 'Edm.Double' | 'Edm.Float' | 'Edm.Byte' | 'Edm.SByte' ? number :
  T extends 'Edm.Decimal' | 'Edm.Int64' ? BigNumber :
  T extends 'Edm.DateTime' | 'Edm.DateTimeOffset' ? Moment :
  T extends 'Edm.String' | 'Edm.Guid' ? string :
  T extends 'Edm.Boolean' ? boolean :
  T extends 'Edm.Time' ? Time :
  any;

const deserializers: EdmTypeMapping = {
  'Edm.Binary': identity,
  'Edm.Boolean': identity,
  'Edm.Byte': toNumber,
  'Edm.DateTime': edmDateTimeToMoment,
  'Edm.DateTimeOffset': edmDateTimeToMoment,
  'Edm.Decimal': toBigNumber,
  'Edm.Double': parseNumber,
  'Edm.Float': parseNumber,
  'Edm.Guid': toGuid,
  'Edm.Int16': toNumber,
  'Edm.Int32': toNumber,
  'Edm.Int64': toBigNumber,
  'Edm.SByte': toNumber,
  'Edm.Single': parseNumber,
  'Edm.String': identity,
  'Edm.Time': toTime
};

const serializers: EdmTypeMapping = {
  'Edm.Binary': identity,
  'Edm.Boolean': identity,
  'Edm.Byte': toNumber,
  'Edm.DateTime': momentToEdmDateTime,
  'Edm.DateTimeOffset': momentToEdmDateTime,
  'Edm.Decimal': fromBigNumber,
  'Edm.Double': parseNumber,
  'Edm.Float': parseNumber,
  'Edm.Guid': identity,
  'Edm.Int16': toNumber,
  'Edm.Int32': toNumber,
  'Edm.Int64': toBigNumber,
  'Edm.SByte': toNumber,
  'Edm.Single': parseNumber,
  'Edm.String': identity,
  'Edm.Time': fromTime
};
