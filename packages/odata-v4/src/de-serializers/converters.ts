import { Time } from '@sap-cloud-sdk/odata-common/internal';
import moment from 'moment';

/**
 * @internal
 */
export function deserializeDateToMoment(date: string): moment.Moment {
  const parsed = moment.utc(date, 'YYYY-MM-DD', true);
  if (!parsed.isValid()) {
    throw new Error(
      `Provided date value ${date} does not follow the Edm.Date pattern: YYYY-MM-DD`
    );
  }
  return parsed;
}

/**
 * @internal
 */
export function serializeToDate(value: moment.Moment): string {
  return value.format('YYYY-MM-DD');
}

/**
 * @internal
 */
export function deserializeDateTimeOffsetToMoment(
  dateTime: string
): moment.Moment {
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

/**
 * @internal
 */
export function serializeToDateTimeOffset(value: moment.Moment): string {
  return value.utc().format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z';
}

/**
 * @internal
 */
export function deserializeDurationToMoment(value: string): moment.Duration {
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

/**
 * @internal
 */
export function serializeToDuration(value: moment.Duration): string {
  return value.toISOString();
}

/**
 * @internal
 */
export function deserializeToTime(value: string): Time {
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

/**
 * @internal
 */
export function serializeToTime(value: Time): string {
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
