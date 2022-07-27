import { durationRegexV4 } from '@sap-cloud-sdk/odata-common/internal';
import { Time } from '@sap-cloud-sdk/odata-common';
import moment from 'moment';
/**
 * @internal
 */
export function deserializeDateToMoment(date: string): moment.Moment {
  const parsed = moment.utc(date, 'Y-MM-DD', true);
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
  const prefix = 'Y-MM-DDTHH:mm';
  // In moment the ZZ is either Offset from UTC as +-HH:mm, +-HHmm, or Z
  const validFormats = [`${prefix}ZZ`, `${prefix}:ssZZ`, `${prefix}:ss.SSSSZZ`];
  const parsed = moment(dateTime, validFormats, true);
  if (!parsed.isValid()) {
    throw new Error(
      `Provided date-time value ${dateTime} does not follow the Edm.DateTimeOffset pattern: YYYY-MM-DDTHH:mm(:ss(.SSSS))ZZ`
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
  const captured = durationRegexV4.exec(value);
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
  // Matches a time with HH:mm:ss.SSSS like 15:05:06
  // See more: https://regex101.com/r/A5DHee/2
  const timeComponents =
    /^([01]\d|2[0-3]):([0-5][0-9]):([0-5][0-9](\.[0-9]+)?)$|^(24):(00):(00(\.0+)?)$/.exec(
      value
    );
  if (!timeComponents) {
    throw new Error(
      `Provided time value ${value} does not follow the Edm.TimeOfDay pattern: HH:MM:SS(.S)`
    );
  }
  return {
    hours: parseInt(timeComponents[1] || timeComponents[5]),
    minutes: parseInt(timeComponents[2] || timeComponents[6]),
    seconds: parseFloat(timeComponents[3] || timeComponents[7])
  };
}

/**
 * @internal
 */
export function serializeToTime(value: Time): string {
  if (!validateTime(value)) {
    throw new Error(
      `Provided time value ${value} can not be serialized to a valid Edm.TimeOfDay`
    );
  }
  return [value.hours, value.minutes, value.seconds]
    .map(timeComponent => padTimeComponent(timeComponent))
    .join(':');
}

function validateTime({ hours, minutes, seconds }: Time): boolean {
  if (hours === 24 && minutes === 0 && seconds === 0) {
    return true;
  }
  if (hours < 0 || minutes < 0 || seconds < 0) {
    return false;
  }
  if (hours > 23 || minutes > 59 || seconds > 59) {
    return false;
  }
  return true;
}

function padTimeComponent(timeComponent: number): string {
  const [wholeNumber, fractionalNumber] = timeComponent.toString().split('.');
  return fractionalNumber
    ? [wholeNumber.padStart(2, '0'), fractionalNumber].join('.')
    : wholeNumber.padStart(2, '0');
}
