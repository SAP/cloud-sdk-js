/* eslint-disable valid-jsdoc */

import BigNumber from 'bignumber.js';
import moment from 'moment';
import { identity } from '@sap-cloud-sdk/util';
import {
  Time,
  deserializersCommon,
  serializersCommon,
  createEdmToTs
} from '@sap-cloud-sdk/odata-common';
import { EdmType } from './edm-types';

type EdmTypeMapping = {
  [key in EdmType]: (value: any) => any;
};

function edmDateToMoment(date: string): moment.Moment {
  const parsed = moment.utc(date, 'YYYY-MM-DD', true);
  if (!parsed.isValid()) {
    throw new Error(
      `Provided date value ${date} does not follow the Edm.Date pattern: YYYY-MM-DD`
    );
  }
  return parsed;
}

function edmDateTimeOffsetToMoment(dateTime: string): moment.Moment {
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

function edmDurationToMoment(value: string): moment.Duration {
  const durationPattern =
    /([+-]{1,1})?P(\d{1,2}D)?(T(\d{1,2}H)?(\d{1,2}M)?(\d{1,2}S)?(\d{2,2}\.\d+S)?)?/;
  const captured = durationPattern.exec(value);
  if (!captured || captured[0] !== value) {
    throw new Error(
      `Provided duration value ${value} does not follow the Edm.Duration pattern: +/- P0DT0H0M0S`
    );
  }
  return moment.duration(value);
}

function edmTimeOfDayToTime(value: string): Time {
  const timeComponents = /(\d{2,2}):(\d{2,2}):(\d{2,2}(\.\d{1,12}){0,1})?/.exec(
    value
  );
  if (!timeComponents) {
    throw new Error(
      `Provided time value ${value} does not follow the Edm.TimeOfDay pattern: HH:MM:SS(.S)`
    );
  }
  return {
    hours: parseInt(timeComponents[1]),
    minutes: parseInt(timeComponents[2]),
    seconds: parseFloat(timeComponents[3])
  };
}

function momentToEdmDate(value: moment.Moment): string {
  return value.format('YYYY-MM-DD');
}

function momentToEdmDateTimeOffsetToMoment(value: moment.Moment): string {
  return value.utc().format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z';
}

function durationToEdmDuration(value: moment.Duration): string {
  return value.toISOString();
}

function timeToEdmTimeOfDay(value: Time): string {
  return [value.hours, value.minutes, value.seconds]
    .map(timeComponent => padTimeComponent(timeComponent))
    .join(':');
}

function padTimeComponent(timeComponent: number): string {
  const [wholeNumber, fractionalNumber] = timeComponent.toString().split('.');
  return fractionalNumber
    ? [wholeNumber.padStart(2, '0'), fractionalNumber].join('.')
    : wholeNumber.padStart(2, '0');
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
  'Edm.Date': edmDateToMoment,
  'Edm.DateTimeOffset': edmDateTimeOffsetToMoment,
  'Edm.Duration': edmDurationToMoment,
  'Edm.TimeOfDay': edmTimeOfDayToTime,
  'Edm.Enum': identity
};

export const edmToTs = createEdmToTs(deserializers);

export const serializers: EdmTypeMapping = {
  ...serializersCommon,
  'Edm.Date': momentToEdmDate,
  'Edm.DateTimeOffset': momentToEdmDateTimeOffsetToMoment,
  'Edm.Duration': durationToEdmDuration,
  'Edm.TimeOfDay': timeToEdmTimeOfDay,
  'Edm.Enum': identity
};

export const tsToEdm = createEdmToTs(serializers);
