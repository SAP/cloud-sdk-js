/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import moment from 'moment';
import { edmToTsV4, tsToEdmV4 } from '../src/';

describe('edmToTsV4()', () => {
  it('should parse Edm.Date to moment', () => {
    const date = '2020-05-13';
    const actual = edmToTsV4(date, 'Edm.Date') as moment.Moment;
    expect(actual.format('YYYY-MM-DD')).toBe(date);
  });

  it('should throw on wrong formatted Edm.Date', () => {
    expect(() => edmToTsV4('2020-1-123', 'Edm.Date')).toThrow(
      /does not follow the Edm.Date pattern/
    );
  });

  it('should parse Edm.DateTimeOffset to string', () => {
    // split for formats with names:
    const dateTimePrefix = '2020-05-13T16:14';
    const datePrefixUnix = 1589386440;
    let actual = edmToTsV4(
      `${dateTimePrefix}Z`,
      'Edm.DateTimeOffset'
    ) as moment.Moment;
    expect(actual.unix()).toBe(datePrefixUnix);

    actual = edmToTsV4(
      `${dateTimePrefix}:24Z`,
      'Edm.DateTimeOffset'
    ) as moment.Moment;
    expect(actual.unix()).toBe(datePrefixUnix + 24);

    actual = edmToTsV4(
      `${dateTimePrefix}+05:00`,
      'Edm.DateTimeOffset'
    ) as moment.Moment;
    expect(actual.unix()).toBe(datePrefixUnix - 3600 * 5);

    actual = edmToTsV4(
      `${dateTimePrefix}:17.987+03:00`,
      'Edm.DateTimeOffset'
    ) as moment.Moment;
    expect(actual.unix()).toBe(datePrefixUnix - 3600 * 3 + 17);
    expect(actual.millisecond()).toBe(987);
  });

  it('should throw on wrong formatted Edm.DateTimeOffset', () => {
    expect(() => edmToTsV4('2020-05-13T16:14', 'Edm.DateTimeOffset')).toThrow(
      / does not follow the Edm.DateTimeOffset pattern/
    );

    expect(() =>
      edmToTsV4('2020-05-13T16:14:23.1Z', 'Edm.DateTimeOffset')
    ).toThrow(/ does not follow the Edm.DateTimeOffset pattern/);

    expect(() =>
      edmToTsV4('2020-05-13T16:14:23:57.97+5:00', 'Edm.DateTimeOffset')
    ).toThrow(/ does not follow the Edm.DateTimeOffset pattern/);

    expect(() =>
      edmToTsV4('2020-05-13T16:14:23+5:00', 'Edm.DateTimeOffset')
    ).toThrow(/ does not follow the Edm.DateTimeOffset pattern/);
  });

  it('should parse Edm.Duration to moment.duration', () => {
    const durationAll = '-P3DT6H32M49.987S';
    let expected =
      -1 * ((3 * 24 * 60 * 60 + 6 * 60 * 60 + 32 * 60 + 49) * 1000 + 987);
    let actual = edmToTsV4(durationAll, 'Edm.Duration') as moment.Duration;
    expect(actual.asMilliseconds()).toBe(expected);

    const durationSomeDefaults = 'PT6H49S';
    expected = (6 * 60 * 60 + 49) * 1000;
    actual = edmToTsV4(durationSomeDefaults, 'Edm.Duration') as moment.Duration;
    expect(actual.asMilliseconds()).toBe(expected);

    const durationOnlyDays = 'P1D';
    expected = 24 * 60 * 60 * 1000;
    actual = edmToTsV4(durationOnlyDays, 'Edm.Duration') as moment.Duration;
    expect(actual.asMilliseconds()).toBe(expected);
  });

  it('should throw on a wrongly formatted Edm.Duration', () => {
    expect(() => edmToTsV4('+P4DT23H13m50S', 'Edm.Duration')).toThrow(
      / does not follow the Edm.Duration pattern/
    );

    expect(() => edmToTsV4('PT501S', 'Edm.Duration')).toThrow(
      / does not follow the Edm.Duration pattern/
    );

    expect(() => edmToTsV4('P23H', 'Edm.Duration')).toThrow(
      / does not follow the Edm.Duration pattern/
    );

    expect(() => edmToTsV4('P1D23H46M23S', 'Edm.Duration')).toThrow(
      / does not follow the Edm.Duration pattern/
    );
  });

  it('should parse Edm.TimeOfDay to Time', () => {
    let timeOfDay = '06:46:32';
    let expected = {
      hours: 6,
      minutes: 46,
      seconds: 32
    };
    let actual = edmToTsV4(timeOfDay, 'Edm.TimeOfDay');
    expect(actual).toEqual(expected);

    timeOfDay = '06:46:32.065123';
    expected = {
      hours: 6,
      minutes: 46,
      seconds: 32.065123
    };
    actual = edmToTsV4(timeOfDay, 'Edm.TimeOfDay');
    expect(actual).toEqual(expected);

    // This is the trailing zero corner case
    timeOfDay = '06:46:32.00';
    expected = { hours: 6, minutes: 46, seconds: 32 };
    actual = edmToTsV4(timeOfDay, 'Edm.TimeOfDay');
    expect(actual).toEqual(expected);
  });

  it('should throw on wrong formatter Edm.TimeOfDay', () => {
    expect(() => edmToTsV4('05:1:45', 'Edm.TimeOfDay')).toThrow(
      / does not follow the Edm.TimeOfDay pattern/
    );
    expect(() => edmToTsV4('05:1:45.2', 'Edm.TimeOfDay')).toThrow(
      / does not follow the Edm.TimeOfDay pattern/
    );
  });
});

describe('tsToEdmV4()', () => {
  it('should convert moment to Edm.Date', () => {
    expect(tsToEdmV4(moment(0), 'Edm.Date')).toBe('1970-01-01');
  });

  it('should convert moment to Edm.DateTimeOffset', () => {
    expect(tsToEdmV4(moment(0), 'Edm.DateTimeOffset')).toBe(
      '1970-01-01T00:00:00.000Z'
    );
  });

  it('should convert moment.duration to Edm.Duration', () => {
    expect(tsToEdmV4(moment.duration({ d: 1, m: 20 }), 'Edm.Duration')).toBe(
      'P1DT20M'
    );
  });

  it('should convert time to Edm.TimeOfDay', () => {
    expect(
      tsToEdmV4({ hours: 18, minutes: 15, seconds: 57.0987 }, 'Edm.TimeOfDay')
    ).toBe('18:15:57.0987');
  });
});

describe('edm to ts to edm does not lead to information loss', () => {
  it('should not loose information for Edm.Date', () => {
    const expected = '2020-05-13';
    expect(tsToEdmV4(edmToTsV4(expected, 'Edm.Date'), 'Edm.Date')).toBe(
      expected
    );
  });

  it('should not loose information for Edm.DateTimeOffset', () => {
    const expected = '2020-05-13T16:14:23.000Z';
    expect(
      tsToEdmV4(edmToTsV4(expected, 'Edm.DateTimeOffset'), 'Edm.DateTimeOffset')
    ).toBe(expected);
  });

  it('should not loose information for Edm.Duration', () => {
    const expected = '-P3DT6H49.987S';
    expect(tsToEdmV4(edmToTsV4(expected, 'Edm.Duration'), 'Edm.Duration')).toBe(
      expected
    );
  });

  it('should not loose information for Edm.TimeOfDay', () => {
    let expected = '18:27:32.12345678';
    expect(
      tsToEdmV4(edmToTsV4(expected, 'Edm.TimeOfDay'), 'Edm.TimeOfDay')
    ).toBe(expected);

    expected = '18:27:32';
    expect(
      tsToEdmV4(edmToTsV4(expected, 'Edm.TimeOfDay'), 'Edm.TimeOfDay')
    ).toBe(expected);

    // This one actually looses information. This is expected behavior as long as this does not cause other issues.
    const input = '18:27:32.0';
    expected = '18:27:32';
    expect(tsToEdmV4(edmToTsV4(input, 'Edm.TimeOfDay'), 'Edm.TimeOfDay')).toBe(
      expected
    );

    expected = '18:27:32.0001';
    expect(
      tsToEdmV4(edmToTsV4(expected, 'Edm.TimeOfDay'), 'Edm.TimeOfDay')
    ).toBe(expected);
  });
});
