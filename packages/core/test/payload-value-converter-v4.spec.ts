/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import moment, { Duration, Moment } from 'moment';
import { edmToTs, tsToEdm } from '../src/v4';

describe('edmToTs()', () => {
  it('should parse Edm.Date to moment', () => {
    const date = '2020-05-13';
    const actual = edmToTs(date, 'Edm.Date') as Moment;
    expect(actual.format('YYYY-MM-DD')).toBe(date);
  });

  it('should throw on wrong formatted Edm.Date', () => {
    expect(() => edmToTs('2020-1-123', 'Edm.Date')).toThrow(
      /does not follow the Edm.Date pattern/
    );
  });

  it('should parse Edm.DateTimeOffset to string', () => {
    // split for formats with names:
    const dateTimePrefix = '2020-05-13T16:14';
    const datePrefixUnix = 1589386440;
    let actual = edmToTs(`${dateTimePrefix}Z`, 'Edm.DateTimeOffset') as Moment;
    expect(actual.unix()).toBe(1589386440);

    actual = edmToTs(`${dateTimePrefix}:24Z`, 'Edm.DateTimeOffset') as Moment;
    expect(actual.unix()).toBe(1589386440 + 24);

    actual = edmToTs(`${dateTimePrefix}+05:00`, 'Edm.DateTimeOffset') as Moment;
    expect(actual.unix()).toBe(1589386440 - 3600 * 5);

    actual = edmToTs(
      `${dateTimePrefix}:17.987+03:00`,
      'Edm.DateTimeOffset'
    ) as Moment;
    expect(actual.unix()).toBe(1589386440 - 3600 * 3 + 17);
    expect(actual.millisecond()).toBe(987);
  });

  it('should throw on wrong formatted Edm.DateTimeOffset', () => {
    expect(() => edmToTs('2020-05-13T16:14', 'Edm.DateTimeOffset')).toThrow(
      / does not follow the Edm.DateTimeOffset pattern/
    );

    expect(() =>
      edmToTs('2020-05-13T16:14:23.1Z', 'Edm.DateTimeOffset')
    ).toThrow(/ does not follow the Edm.DateTimeOffset pattern/);

    expect(() =>
      edmToTs('2020-05-13T16:14:23:57.97+5:00', 'Edm.DateTimeOffset')
    ).toThrow(/ does not follow the Edm.DateTimeOffset pattern/);

    expect(() =>
      edmToTs('2020-05-13T16:14:23+5:00', 'Edm.DateTimeOffset')
    ).toThrow(/ does not follow the Edm.DateTimeOffset pattern/);
  });

  it('should parse Edm.Duration to moment.duration', () => {
    const durationAll = '-P3DT6H32M49.987S';
    let expected =
      -1 * ((3 * 24 * 60 * 60 + 6 * 60 * 60 + 32 * 60 + 49) * 1000 + 987);
    let actual = edmToTs(durationAll, 'Edm.Duration') as Duration;
    expect(actual.asMilliseconds()).toBe(expected);

    const durationSomeDefaults = 'PT6H49S';
    expected = (6 * 60 * 60 + 49) * 1000;
    actual = edmToTs(durationSomeDefaults, 'Edm.Duration') as Duration;
    expect(actual.asMilliseconds()).toBe(expected);
  });

  it('should throw on a wrongly formatted Edm.Duration', () => {
    expect(() => edmToTs('+P4DT23H13m50S', 'Edm.Duration')).toThrow(
      / does not follow the Edm.Duration pattern/
    );

    expect(() => edmToTs('PT501S', 'Edm.Duration')).toThrow(
      / does not follow the Edm.Duration pattern/
    );

    expect(() => edmToTs('P23H', 'Edm.Duration')).toThrow(
      / does not follow the Edm.Duration pattern/
    );

    expect(() => edmToTs('P1D23H46M23S', 'Edm.Duration')).toThrow(
      / does not follow the Edm.Duration pattern/
    );
  });

  it('should parse Edm.TimeOfDay to moment.utc since there is proper time object', () => {
    let timeOfDay = '06:46:32';
    const expected = 6 * 60 * 60 + 46 * 60 + 32;
    let actual = edmToTs(timeOfDay, 'Edm.TimeOfDay') as Moment;
    expect(actual.unix()).toBe(expected);

    timeOfDay = '06:46:32.965';
    actual = edmToTs(timeOfDay, 'Edm.TimeOfDay') as Moment;
    expect(actual.unix()).toBe(expected);
    expect(actual.milliseconds()).toBe(965);
  });

  it('should throw on wrong formatter Edm.TimeOfDay', () => {
    expect(() => edmToTs('05:1:45', 'Edm.TimeOfDay')).toThrow(
      / does not follow the Edm.TimeOfDay pattern/
    );
    expect(() => edmToTs('05:1:45.2', 'Edm.TimeOfDay')).toThrow(
      / does not follow the Edm.TimeOfDay pattern/
    );
  });
});

describe('tsToEdm()', () => {
  it('should convert moment to Edm.Date', () => {
    expect(tsToEdm(moment(0), 'Edm.Date')).toBe('1970-01-01');
  });

  it('should convert moment to Edm.DateTimeOffset', () => {
    expect(tsToEdm(moment(0), 'Edm.DateTimeOffset')).toBe(
      '1970-01-01T00:00:00.000Z'
    );
  });

  it('should convert moment.duration to Edm.Duration', () => {
    expect(tsToEdm(moment.duration({ d: 1, m: 20 }), 'Edm.Duration')).toBe(
      'P1DT20M'
    );
  });

  it('should convert moment to Edm.TimeOfDay', () => {
    expect(
      tsToEdm(moment((17 * 3600 + 900 + 57) * 1000 + 987), 'Edm.TimeOfDay')
    ).toBe('18:15:57.987');
  });
});

describe('edm to ts to edm does not lead to information loss', () => {
  it('should not lose information for Edm.Date', () => {
    const expected = '2020-05-13';
    expect(tsToEdm(edmToTs(expected, 'Edm.Date'), 'Edm.Date')).toBe(expected);
  });

  it('should not lose information for Edm.DateTimeOffset', () => {
    const expected = '2020-05-13T16:14:23.000Z';
    expect(
      tsToEdm(edmToTs(expected, 'Edm.DateTimeOffset'), 'Edm.DateTimeOffset')
    ).toBe(expected);
  });

  it('should not lose information for Edm.Duration', () => {
    const expected = '-P3DT6H49.987S';
    expect(tsToEdm(edmToTs(expected, 'Edm.Duration'), 'Edm.Duration')).toBe(
      expected
    );
  });

  it('should not lose information for Edm.TimeOfDay', () => {
    const expected = '18:27:32';
    expect(tsToEdm(edmToTs(expected, 'Edm.TimeOfDay'), 'Edm.TimeOfDay')).toBe(
      expected + '.000'
    );
  });
});
