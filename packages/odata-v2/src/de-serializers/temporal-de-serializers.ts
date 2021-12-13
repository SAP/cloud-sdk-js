/* eslint-disable valid-jsdoc */
import { Temporal } from '@js-temporal/polyfill';
import { DeSerializer } from '@sap-cloud-sdk/odata-common/internal';
import { durationRegex } from './converters';

/**
 * Temporal (de-)serializers for Odata-v2.
 * @internal
 */
export const temporalDeSerializers = {
  'Edm.DateTime': {
    deserialize: deserializeToPlainDateTime,
    serialize: serializeFromPlainDateTime,
    serializeToUri: (value, serialize) =>
      `datetime'${serialize(value).toString().replace(/Z$/, '')}'`
  } as DeSerializer<Temporal.PlainDateTime>,
  'Edm.DateTimeOffset': {
    deserialize: deserializeToZonedDateTime,
    serialize: serializeFromZonedDateTime,
    serializeToUri: (value, serialize) => `datetimeoffset'${serialize(value)}'`
  } as DeSerializer<Temporal.ZonedDateTime>,
  'Edm.Time': {
    deserialize: deserializeToPlainTime,
    serialize: serializeFromPlainTime,
    serializeToUri: (value, serialize) => `time'${serialize(value)}'`
  } as DeSerializer<Temporal.PlainTime>
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

interface DateTimeOffsetComponents {
  ticks: string;
  sign?: string;
  offset?: string;
}

function parseEdmDateTimeOffset(edmDateTime: string): DateTimeOffsetComponents {
  const dateTimeOffsetComponents =
    /^\/Date\((?<ticks>\d+)((?<sign>[+-])(?<offset>\d{4}))?\)\/$/.exec(
      edmDateTime
    )?.groups;
  if (
    dateTimeOffsetComponents === undefined ||
    !isDateTimeOffsetComponents(dateTimeOffsetComponents)
  ) {
    throw new Error(`Failed to parse edmDateTime: ${edmDateTime}.`);
  }
  return dateTimeOffsetComponents;
}

function isDateTimeOffsetComponents(
  parsed: { [p: string]: string } | DateTimeOffsetComponents
): parsed is DateTimeOffsetComponents {
  return !!parsed.ticks;
}

/**
 * @internal
 */
export function serializeFromPlainDateTime(
  value: Temporal.PlainDateTime
): string {
  const instant = new Temporal.TimeZone('UTC').getInstantFor(value);
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
  return `/Date(${value.epochMilliseconds}${operator}${offset})/`;
}

/**
 * @internal
 */
export function deserializeToPlainTime(value: string): Temporal.PlainTime {
  const regexResult = durationRegex.exec(value);
  if (!regexResult) {
    throw new Error(`Failed to parse the value: ${value} to time.`);
  }
  const hours = regexResult.groups?.hours || '0';
  const minutes = regexResult.groups?.minutes || '0';
  const seconds = regexResult.groups?.seconds || '0';

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
    String(value.hour).padStart(2, '0') +
    'H' +
    String(value.minute).padStart(2, '0') +
    'M' +
    String(value.second).padStart(2, '0') +
    'S'
  );
}
