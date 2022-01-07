/* eslint-disable valid-jsdoc */
import { Temporal } from '@js-temporal/polyfill';
import {
  DeSerializer,
  durationRegexV4
} from '@sap-cloud-sdk/odata-common/internal';

/**
 * Temporal (de-)serializers for Odata-v4.
 */
export const temporalDeSerializersV4 = {
  'Edm.Date': {
    deserialize: deserializeDateToTemporal,
    serialize: serializePlainDateToDate,
    serializeToUri: (value, serialize) => serialize(value)
  } as DeSerializer<Temporal.PlainDate>,
  'Edm.DateTimeOffset': {
    deserialize: deserializeDateTimeOffsetToTemporal,
    serialize: serializeZonedDateTimeToDateTimeOffset,
    serializeToUri: (value, serialize) => serialize(value)
  } as DeSerializer<Temporal.ZonedDateTime>,
  'Edm.Duration': {
    deserialize: deserializeDurationToTemporal,
    serialize: serializeDurationToDuration,
    serializeToUri: (value, serialize) => `duration'${serialize(value)}'`
  } as DeSerializer<Temporal.Duration>,
  'Edm.TimeOfDay': {
    deserialize: deserializeTimeToTemporal,
    serialize: serializePlainTimeToTime,
    serializeToUri: (value, serialize) => serialize(value)
  } as DeSerializer<Temporal.PlainTime>
};

/**
 * @internal
 */
export function serializePlainTimeToTime(value: Temporal.PlainTime): string {
  return value.toString();
}

/**
 * @internal
 */
export function deserializeDateToTemporal(date: string): Temporal.PlainDate {
  try {
    return Temporal.PlainDate.from(date);
  } catch (e) {
    throw new Error(
      `Provided date value ${date} does not follow the Edm.Date pattern: YYYY-MM-DD`
    );
  }
}

/**
 * @internal
 */
export function serializePlainDateToDate(value: Temporal.PlainDate): string {
  return value.toString();
}

/**
 * @internal
 */
export function deserializeDateTimeOffsetToTemporal(
  dateTime: string
): Temporal.ZonedDateTime {
  try {
    return Temporal.Instant.from(dateTime).toZonedDateTimeISO('UTC');
  } catch (err) {
    throw new Error(
      `Provided date-time value ${dateTime} does not follow the Edm.DateTimeOffset pattern: YYYY-MM-DDTHH:mm(:ss(.SSS))Z`
    );
  }
}

/**
 * @internal
 */
export function serializeZonedDateTimeToDateTimeOffset(
  value: Temporal.ZonedDateTime
): string {
  return (
    value.toString({
      fractionalSecondDigits: 3,
      timeZoneName: 'never',
      offset: 'never'
    }) + 'Z'
  );
}

/**
 * @internal
 */
export function deserializeDurationToTemporal(
  value: string
): Temporal.Duration {
  try {
    const match = value.match(durationRegexV4);
    if (match && match[0] !== value) {
      throw new Error();
    }
    return Temporal.Duration.from(value);
  } catch (e) {
    throw new Error(
      `Provided duration value ${value} does not follow the Edm.Duration pattern: +/- P0DT0H0M0S`
    );
  }
}

/**
 * @internal
 */
export function serializeDurationToDuration(value: Temporal.Duration): string {
  return value.toString();
}

/**
 * @internal
 */
export function deserializeTimeToTemporal(time: string): Temporal.PlainTime {
  try {
    const parsed = Temporal.PlainTime.from(time, { overflow: 'reject' });
    return parsed;
  } catch (err) {
    throw new Error(
      `Provided time value ${time} does not follow the Edm.TimeOfDay pattern: HH:MM:SS(.S)`
    );
  }
}
