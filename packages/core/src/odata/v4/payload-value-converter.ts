/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
/* eslint-disable valid-jsdoc */

import BigNumber from 'bignumber.js';
import moment, { Duration, Moment } from 'moment';
import { Time, EdmTypeShared, TimeFractionalSeconds } from '../common';
import {
  deserializersCommon,
  serializersCommom
} from '../common/payload-value-converter';
import { EdmType } from './edm-types';

/**
 * @hidden
 */
export function edmToTs<T extends EdmType>(
  value: any,
  edmType: EdmTypeShared<'v4'>
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
export function tsToEdm(value: any, edmType: EdmTypeShared<'v4'>): any {
  if (value === null) {
    return 'null';
  }
  if (serializers[edmType]) {
    return serializers[edmType](value);
  }
  return value;
}

type EdmTypeMapping = {
  [key in EdmType]: (value: any) => any;
};

function edmDateToMoment(date: string): Moment {
  const parsed = moment.utc(date, 'YYYY-MM-DD', true);
  if (!parsed.isValid()) {
    throw new Error(
      `Provided date value ${date} does not follow the Edm.Date pattern: YYYY-MM-DD`
    );
  }
  return parsed;
}

function edmDateTimeOffsetToMoment(dateTime: string): Moment {
  const prefix = 'YYYY-MM-DDTHH:mm';
  // In moment the Z is either Offset from UTC as +-HH:mm, +-HHmm, or Z
  const validFormats = [`${prefix}Z`, `${prefix}:ssZ`, `${prefix}:ss.SSSZ`];
  const parsed = moment(dateTime, validFormats, true);
  if (!parsed.isValid()) {
    throw new Error(
      `Provided date-time value ${dateTime} does not follow the Edm.DateTimeOffset pattern: YYYY-MM-DDTHH:mm(:ss(.SSS))Z`
    );
  }
  return parsed;
}

function edmDurationToMoment(value: string): Duration {
  const durationPattern = /([\+,\-]{1,1})?P(\d{1,2}D)?(T(\d{1,2}H)?(\d{1,2}M)?(\d{1,2}S)?(\d{2,2}\.\d+S)?)?/;
  const captured = durationPattern.exec(value);
  if (!captured || captured[0] !== value) {
    throw new Error(
      `Provided duration value ${value} does not follow the Edm.Duration pattern: +/- P0DT0H0M0S`
    );
  }
  return moment.duration(value);
}

function edmTimeOfDayToTime(value: string): TimeFractionalSeconds {
  const timeComponents = /(\d{2,2}):(\d{2,2}):(\d{2,2})\.{0,1}(\d{1,12})?/.exec(
    value
  );
  if (!timeComponents) {
    throw new Error(
      `Provided time value ${value} does not follow the Edm.TimeOfDay pattern: HH:MM:SS(.S)`
    );
  }
  return {
    hours: parseInt(timeComponents[1], 10),
    minutes: parseInt(timeComponents[2], 10),
    seconds: parseInt(timeComponents[3], 10),
    fractionalSeconds: timeComponents[4] || undefined
  };
}

function momentToEdmDate(value: Moment): string {
  return value.format('YYYY-MM-DD');
}

function momentToEdmDateTimeOffsetToMoment(value: Moment): string {
  return value.utc().format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z';
}

function durationToEdmDuration(value: Duration): string {
  return value.toISOString();
}

function timeToEdmTimeOfDay(value: TimeFractionalSeconds): string {
  if (value.fractionalSeconds) {
    return `${value.hours}:${value.minutes}:${value.seconds}.${value.fractionalSeconds}`;
  }
  return `${value.hours}:${value.minutes}:${value.seconds}`;
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
  ? Moment
  : T extends 'Edm.String' | 'Edm.Guid'
  ? string
  : T extends 'Edm.Boolean'
  ? boolean
  : T extends 'Edm.Time'
  ? Time
  : any;

const deserializers: EdmTypeMapping = {
  ...deserializersCommon,
  'Edm.Date': edmDateToMoment,
  'Edm.DateTimeOffset': edmDateTimeOffsetToMoment,
  'Edm.Duration': edmDurationToMoment,
  'Edm.TimeOfDay': edmTimeOfDayToTime
};

const serializers: EdmTypeMapping = {
  ...serializersCommom,
  'Edm.Date': momentToEdmDate,
  'Edm.DateTimeOffset': momentToEdmDateTimeOffsetToMoment,
  'Edm.Duration': durationToEdmDuration,
  'Edm.TimeOfDay': timeToEdmTimeOfDay
};
