/* eslint-disable valid-jsdoc */

import BigNumber from 'bignumber.js';
import moment from 'moment';
import {
  Time,
  EdmTypeShared,
  deserializersCommon,
  serializersCommon
} from '@sap-cloud-sdk/odata-common';
import { EdmType } from './edm-types';

/**
 * @internal
 */
export function edmToTs<T extends EdmType>(
  value: any,
  edmType: EdmTypeShared<'v2'>
): EdmToPrimitive<T> {
  if (value === null || typeof value === 'undefined') {
    return value;
  }
  if (deserializers[edmType]) {
    return deserializers[edmType](value);
  }
  return value;
}

/**
 * @internal
 */
export function tsToEdm(value: any, edmType: EdmTypeShared<'v2'>): any {
  if (value === null) {
    return 'null';
  }
  if (serializers[edmType]) {
    return serializers[edmType](value);
  }
  return value;
}

type EdmTypeMapping = { [key in EdmType]: (value: any) => any };

const toTime = (value: string): Time => {
  const regexResult =
    /PT(?<hours>\d{1,2}H)?(?<minutes>\d{1,2}M)?(?<seconds>\d{1,2}S)?/.exec(
      value
    );
  if (!regexResult) {
    throw new Error(`Failed to parse the value: ${value} to time.`);
  }
  const { hours, minutes, seconds } = regexResult?.groups || {};

  return {
    hours: hours ? parseInt(hours.replace('H', ''), 10) : 0,
    minutes: minutes ? parseInt(minutes.replace('M', ''), 10) : 0,
    seconds: seconds ? parseInt(seconds.replace('S', ''), 10) : 0
  };
};

/**
 * @internal
 * This function can be used for both Edm.DateTime and and Edm.DateTimeOffset.
 */
export function edmDateTimeToMoment(edmDateTime: string): moment.Moment {
  const dateTimeOffsetComponents =
    /^\/Date\((?<ticks>\d+)((?<sign>[+-])(?<offset>\d{4}))?\)\/$/.exec(
      edmDateTime
    )?.groups;
  if (!dateTimeOffsetComponents) {
    throw new Error(`Failed to parse edmDateTime: ${edmDateTime} to moment.`);
  }

  const timestamp = moment(parseInt(dateTimeOffsetComponents.ticks));

  if (dateTimeOffsetComponents.sign && dateTimeOffsetComponents.offset) {
    const offsetMultiplier = dateTimeOffsetComponents.sign === '+' ? 1 : -1;
    const offsetInMinutes = parseInt(dateTimeOffsetComponents.offset);
    return timestamp.utc().utcOffset(offsetMultiplier * offsetInMinutes);
  }

  return timestamp;
}

/**
 * @internal
 * This function can be used for both Edm.DateTime and and Edm.DateTimeOffset.
 */
export function momentToEdmDateTime(momentInstance: moment.Moment): string {
  const timestamp = momentInstance.unix() * 1000;

  // For some reason isUtc() returns wrong values here, so we use the internal flag directly
  if (momentInstance['_isUTC']) {
    const offset = Math.abs(momentInstance.utcOffset());
    const operator = momentInstance.utcOffset() >= 0 ? '+' : '-';
    return `/Date(${timestamp}${operator}${leftpad(offset, 4)})/`;
  }

  return `/Date(${timestamp})/`;
}

const fromTime = (value: Time): string =>
  'PT' +
  leftpad(value.hours, 2) +
  'H' +
  leftpad(value.minutes, 2) +
  'M' +
  leftpad(value.seconds, 2) +
  'S';

function leftpad(value: any, targetLength: number): string {
  const str = value.toString();
  if (str.length >= targetLength) {
    return str;
  }
  return '0'.repeat(targetLength - str.length) + str;
}

/**
 * @internal
 */
export type EdmToPrimitive<T extends EdmType> = T extends
  | 'Edm.Int16'
  | 'Edm.Int32'
  | 'Edm.Single'
  | 'Edm.Double'
  | 'Edm.Float'
  | 'Edm.Byte'
  | 'Edm.SByte'
  ? number
  : T extends 'Edm.Decimal' | 'Edm.Int64'
  ? BigNumber
  : T extends 'Edm.DateTime' | 'Edm.DateTimeOffset'
  ? moment.Moment
  : T extends 'Edm.String' | 'Edm.Guid'
  ? string
  : T extends 'Edm.Boolean'
  ? boolean
  : T extends 'Edm.Time'
  ? Time
  : any;

const deserializers: EdmTypeMapping = {
  ...deserializersCommon,
  'Edm.DateTime': edmDateTimeToMoment,
  'Edm.DateTimeOffset': edmDateTimeToMoment,
  'Edm.Time': toTime
};

const serializers: EdmTypeMapping = {
  ...serializersCommon,
  'Edm.DateTime': momentToEdmDateTime,
  'Edm.DateTimeOffset': momentToEdmDateTime,
  'Edm.Time': fromTime
};
