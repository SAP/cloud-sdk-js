/* eslint-disable valid-jsdoc */
import { Temporal } from '@js-temporal/polyfill';

/**
 * Temporal (de-)serializers for Odata-v2.
 * @internal
 */
export const temporalDeSerializers: any = {
  'Edm.DateTime': {
    deserialize: deserializeToPlainDateTime,
    serialize: serializeFromPlainDateTime,
    serializeToUri: (value, serialize) =>
      `datetime'${serialize.replace(/Z$/, '')}'`
  },
  'Edm.DateTimeOffset': {
    deserialize: deserializeToZonedDateTime,
    serialize: serializeFromZonedDateTime,
    serializeToUri: (value, serialize) => `datetimeoffset'${serialize(value)}'`
  },
  'Edm.Time': {
    deserialize: deserializeToPlainTime,
    serialize: serializeFromPlainTime,
    serializeToUri: (value, serialize) => `time'${serialize(value)}'`
  }
};

/**
 * @internal
 */
export function deserializeToPlainDateTime(
  edmDateTime: string
): Temporal.PlainDateTime {
  const dateTimeOffsetComponents = parseEdmDateTimeOffset(edmDateTime);
  const dateTimeInstant = Temporal.Instant.fromEpochMilliseconds(
    parseInt(dateTimeOffsetComponents.ticks)
  );
  return Temporal.PlainDateTime.from(dateTimeInstant.toString());
}

/**
 * @internal
 */
export function deserializeToZonedDateTime(
  edmDateTime: string
): Temporal.ZonedDateTime {
  const dateTimeOffsetComponents = parseEdmDateTimeOffset(edmDateTime);
  const dateTimeInstant = Temporal.Instant.fromEpochMilliseconds(
    parseInt(dateTimeOffsetComponents.ticks)
  );
  if (dateTimeOffsetComponents.sign && dateTimeOffsetComponents.offset) {
    const timeZone = Temporal.TimeZone.from(
      dateTimeOffsetComponents.sign + dateTimeOffsetComponents.offset
    );
    return dateTimeInstant.toZonedDateTimeISO(timeZone);
  }
  return dateTimeInstant.toZonedDateTimeISO('UTC');
}

function parseEdmDateTimeOffset(edmDateTime: string): {
  [key: string]: string;
} {
  const dateTimeOffsetComponents =
    /^\/Date\((?<ticks>\d+)((?<sign>[+-])(?<offset>\d{4}))?\)\/$/.exec(
      edmDateTime
    )?.groups;
  if (!dateTimeOffsetComponents) {
    throw new Error(`Failed to parse edmDateTime: ${edmDateTime}.`);
  }
  return dateTimeOffsetComponents;
}

/**
 * @internal
 */
export function serializeFromPlainDateTime(
  value: Temporal.PlainDateTime
): string {
  const instant = Temporal.TimeZone.from('UTC').getInstantFor(value);
  return `/Date(${instant.epochMilliseconds})/`;
}

/**
 * @internal
 */
export function serializeFromZonedDateTime(
  value: Temporal.ZonedDateTime
): string {
  const operator = value.offset[0];
  const offset = value.offset.replace(/[-+:]/g, '');
  return `/Date(${value.epochMilliseconds}${operator}${leftpad(offset, 4)})/`;
}

/**
 * @internal
 */
export function deserializeToPlainTime(value: string): Temporal.PlainTime {
  const regexResult =
    /PT(?<hours>\d{1,2}H)?(?<minutes>\d{1,2}M)?(?<seconds>\d{1,2}S)?/.exec(
      value
    );
  if (!regexResult) {
    throw new Error(`Failed to parse the value: ${value} to time.`);
  }
  const { hours, minutes, seconds } = regexResult?.groups || {};

  return new Temporal.PlainTime(
    parseInt(hours),
    parseInt(minutes),
    parseInt(seconds)
  );
}

/**
 * @internal
 */
export function serializeFromPlainTime(value: Temporal.PlainTime): string {
  return (
    'PT' +
    leftpad(value.hour, 2) +
    'H' +
    leftpad(value.minute, 2) +
    'M' +
    leftpad(value.second, 2) +
    'S'
  );
}

function leftpad(value: any, targetLength: number): string {
  const str = value.toString();
  if (str.length >= targetLength) {
    return str;
  }
  return '0'.repeat(targetLength - str.length) + str;
}
