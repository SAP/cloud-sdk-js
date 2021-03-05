/* eslint-disable valid-jsdoc */

import BigNumber from 'bignumber.js';
import moment from 'moment';
import { Time, EdmTypeShared } from '../odata-common';
import {
  deserializersCommon,
  serializersCommom
} from '../odata-common/payload-value-converter';
import { EdmType } from './edm-types';

/**
 * @hidden
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
 * @hidden
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

/**
 * @hidden
 * This function can be used for both Edm.DateTime and and Edm.DateTimeOffset.
 */
export function edmDateTimeToMoment(edmDateTime: string): moment.Moment {
  const dateTimeOffsetComponents = /.*\((-?\d+)(?:([+-])(\d{4})\))?/.exec(
    edmDateTime
  );
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
  ...serializersCommom,
  'Edm.DateTime': momentToEdmDateTime,
  'Edm.DateTimeOffset': momentToEdmDateTime,
  'Edm.Time': fromTime
};

export {
  EdmToPrimitive as EdmToPrimitiveV2,
  edmToTs as edmToTsV2,
  tsToEdm as tsToEdmV2
};
