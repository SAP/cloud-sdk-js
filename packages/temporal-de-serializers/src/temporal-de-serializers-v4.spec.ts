import { Temporal } from '@js-temporal/polyfill';
import {
  deserializeDateTimeOffsetToTemporal,
  deserializeDateToTemporal,
  deserializeDurationToTemporal,
  deserializeTimeToTemporal,
  serializePlainDateToDate,
  serializeZonedDateTimeToDateTimeOffset,
  serializeDurationToDuration,
  serializePlainTimeToTime
} from './temporal-de-serializers-v4';

describe('edmToTs()', () => {
  it('should parse Edm.Date to Temporal PlainDate', () => {
    const date = '2020-05-13';
    const actual = deserializeDateToTemporal(date);
    expect(actual.toString()).toBe(date);
  });

  it('should throw on wrong formatted Edm.Date', () => {
    expect(() => deserializeDateToTemporal('2020-1-123')).toThrow(
      /does not follow the Edm.Date pattern/
    );
  });

  it('should parse Temporal PlainDate to Edm.Date', () => {
    const date = '2020-05-13';
    const actual = serializePlainDateToDate(
      new Temporal.PlainDate(2020, 5, 13)
    );
    expect(actual.toString()).toBe(date);
  });

  it('should throw on wrong formatted Edm.DateTimeOffset', () => {
    expect(() =>
      deserializeDateTimeOffsetToTemporal('2020-05-13T16:14')
    ).toThrow(/ does not follow the Edm.DateTimeOffset pattern/);

    expect(() =>
      deserializeDateTimeOffsetToTemporal('2020-05-13T16:14:23:57.97+5:00')
    ).toThrow(/ does not follow the Edm.DateTimeOffset pattern/);

    expect(() =>
      deserializeDateTimeOffsetToTemporal('2020-05-13T16:14:23+5:00')
    ).toThrow(/ does not follow the Edm.DateTimeOffset pattern/);

    expect(() =>
      deserializeDateTimeOffsetToTemporal('2020-05-13T16:14:23.1 Z')
    ).toThrow(/ does not follow the Edm.DateTimeOffset pattern/);
  });

  it('should parse Edm.DateTimeOffset to string', () => {
    // split for formats with names:
    const dateTimePrefix = '2020-05-13T16:14';
    const datePrefixUnix = 1589386440;
    let actual = deserializeDateTimeOffsetToTemporal(`${dateTimePrefix}Z`);
    expect(actual.epochSeconds).toBe(datePrefixUnix);

    actual = deserializeDateTimeOffsetToTemporal(`${dateTimePrefix}:24Z`);
    expect(actual.epochSeconds).toBe(datePrefixUnix + 24);

    actual = deserializeDateTimeOffsetToTemporal(`${dateTimePrefix}+05:00`);
    expect(actual.epochSeconds).toBe(datePrefixUnix - 3600 * 5);

    actual = deserializeDateTimeOffsetToTemporal(
      `${dateTimePrefix}:17.987+03:00`
    );
    expect(actual.epochSeconds).toBe(datePrefixUnix - 3600 * 3 + 17);
    expect(actual.millisecond).toBe(987);
  });

  it('should parse Edm.Duration to Temporal.Duration', () => {
    const durationAll = '-P3DT6H32M49.987S';
    let expected =
      -1 * ((3 * 24 * 60 * 60 + 6 * 60 * 60 + 32 * 60 + 49) * 1000 + 987);
    let actual = deserializeDurationToTemporal(durationAll);
    expect(actual.total({ unit: 'millisecond' })).toBe(expected);

    const durationSomeDefaults = 'PT6H49S';
    expected = (6 * 60 * 60 + 49) * 1000;
    actual = deserializeDurationToTemporal(durationSomeDefaults);
    expect(actual.total({ unit: 'millisecond' })).toBe(expected);

    const durationOnlyDays = 'P1D';
    expected = 24 * 60 * 60 * 1000;
    actual = deserializeDurationToTemporal(durationOnlyDays);
    expect(actual.total({ unit: 'millisecond' })).toBe(expected);
  });

  it('should throw on a wrongly formatted Edm.Duration', () => {
    expect(() => deserializeDurationToTemporal('P23H')).toThrow(
      / does not follow the Edm.Duration pattern/
    );

    expect(() => deserializeDurationToTemporal('P1D23H46M23S')).toThrow(
      / does not follow the Edm.Duration pattern/
    );

    expect(() => deserializeDurationToTemporal('+P4DT23H13m23S')).toThrow(
      / does not follow the Edm.Duration pattern/
    );
  });

  it('should parse Edm.TimeOfDay to Time', () => {
    let timeOfDay = '06:46:32';
    let expected = new Temporal.PlainTime(6, 46, 32);
    expect(deserializeTimeToTemporal(timeOfDay)).toEqual(expected);

    timeOfDay = '06:46:32.065123';
    expected = new Temporal.PlainTime(6, 46, 32.065123);
    expect(deserializeTimeToTemporal(timeOfDay)).toEqual(expected);

    // This is the trailing zero corner case
    timeOfDay = '06:46:32.00';
    expected = new Temporal.PlainTime(6, 46, 32);
    expect(deserializeTimeToTemporal(timeOfDay)).toEqual(expected);
  });

  it('should throw on wrong formatter Edm.TimeOfDay', () => {
    expect(() => deserializeTimeToTemporal('05:1:45')).toThrow(
      / does not follow the Edm.TimeOfDay pattern/
    );
    expect(() => deserializeTimeToTemporal('05:1:45.2')).toThrow(
      / does not follow the Edm.TimeOfDay pattern/
    );
  });
});

describe('tsToEdm()', () => {
  it('should convert Temporal PlaintDate to Edm.Date', () => {
    expect(
      serializePlainDateToDate(Temporal.PlainDate.from('1970-01-01'))
    ).toBe('1970-01-01');
  });

  it('should convert Temporal ZonedDateTime to Edm.DateTimeOffset', () => {
    const zonedDateTime = new Temporal.ZonedDateTime(BigInt(0), 'UTC');
    expect(serializeZonedDateTimeToDateTimeOffset(zonedDateTime)).toBe(
      '1970-01-01T00:00:00.000Z'
    );
  });

  it('should convert Temporal Duration to Edm.Duration', () => {
    expect(
      serializeDurationToDuration(
        Temporal.Duration.from({ days: 1, minutes: 20 })
      )
    ).toBe('P1DT20M');
  });

  it('should convert time to Edm.TimeOfDay', () => {
    expect(
      serializePlainTimeToTime(new Temporal.PlainTime(18, 15, 57, 987))
    ).toBe('18:15:57.987');
  });
});

describe('EDM to TS to EDM does not lead to information loss', () => {
  it('should not loose information for Edm.Date', () => {
    const expected = '2020-05-13';
    expect(serializePlainDateToDate(deserializeDateToTemporal(expected))).toBe(
      expected
    );
  });

  it('should not loose information for Edm.DateTimeOffset', () => {
    const expected = '2020-05-13T16:14:23.000Z';
    expect(
      serializeZonedDateTimeToDateTimeOffset(
        deserializeDateTimeOffsetToTemporal(expected)
      )
    ).toBe(expected);
  });

  it('should not loose information for Edm.Duration', () => {
    const expected = '-P3DT6H49.987S';
    expect(
      serializeDurationToDuration(deserializeDurationToTemporal(expected))
    ).toBe(expected);
  });

  it('should not loose information for Edm.TimeOfDay', () => {
    let expected = '18:27:32.12345678';
    expect(serializePlainTimeToTime(deserializeTimeToTemporal(expected))).toBe(
      expected
    );

    expected = '18:27:32';
    expect(serializePlainTimeToTime(deserializeTimeToTemporal(expected))).toBe(
      expected
    );

    // This one actually looses information. This is expected behavior as long as this does not cause other issues.
    const input = '18:27:32.0';
    expected = '18:27:32';
    expect(serializePlainTimeToTime(deserializeTimeToTemporal(input))).toBe(
      expected
    );

    expected = '18:27:32.0001';
    expect(serializePlainTimeToTime(deserializeTimeToTemporal(expected))).toBe(
      expected
    );
  });
});
