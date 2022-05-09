import { Temporal } from '@js-temporal/polyfill';
import {
  deserializeToPlainDateTime,
  deserializeToPlainTime,
  deserializeToZonedDateTime,
  serializeFromPlainDateTime,
  serializeFromPlainTime,
  serializeFromZonedDateTime
} from './temporal-de-serializers-v2';

describe('EDM to Temporal', () => {
  it('returns a non utc date if there is no offset', () => {
    const dateTimePlain = deserializeToPlainDateTime(
      '/Date(1556630382000)/'
    ) as Temporal.PlainDateTime;
    expect(dateTimePlain.toString()).toBe('2019-04-30T13:19:42');
    expect(() => Temporal.TimeZone.from(dateTimePlain.toString())).toThrowError(
      /Invalid time zone/
    );
  });

  it('returns a utc date if there is an offset', () => {
    const dateTimeZoned = deserializeToZonedDateTime(
      '/Date(1556630382000+0000)/'
    );
    const zonedString = dateTimeZoned.toString({
      fractionalSecondDigits: 0,
      timeZoneName: 'never'
    });
    expect(zonedString).toBe('2019-04-30T13:19:42+00:00');
    expect(Temporal.TimeZone.from(dateTimeZoned.toString()).id).toEqual(
      '+00:00'
    );
  });

  it('handles two digit offsets', () => {
    const dateTimeZoned = deserializeToZonedDateTime(
      '/Date(1556630382000+0030)/'
    ) as Temporal.ZonedDateTime;
    expect(dateTimeZoned.offset).toBe('+00:30');
  });

  it('handles three digit offsets', () => {
    const dateTimeZoned = deserializeToZonedDateTime(
      '/Date(1556630382000+0120)/'
    ) as Temporal.ZonedDateTime;
    expect(dateTimeZoned.offset).toBe('+01:20');
  });

  it('parsed Edm.Time to PlainTime', () => {
    const expectedPlainTime = new Temporal.PlainTime(13, 20, 0);
    expect(deserializeToPlainTime('PT13H20M00S')).toEqual(expectedPlainTime);
  });

  it('parsed Edm.Time to PlainTime when a value is skipped', () => {
    const expectedPlainTime = new Temporal.PlainTime(0, 20, 0);
    expect(deserializeToPlainTime('PT20M')).toEqual(expectedPlainTime);
  });

  it('parsed Edm.Time to PlainTime with no parts', () => {
    const expectedPlainTime = new Temporal.PlainTime(0, 0, 0);
    expect(deserializeToPlainTime('PT')).toEqual(expectedPlainTime);
  });
});

describe('Temporal to EDM', () => {
  it('returns no offset for non-utc dates', () => {
    const dateTimePlain = Temporal.PlainDateTime.from('2019-04-30T13:19:42');
    expect(serializeFromPlainDateTime(dateTimePlain)).toBe(
      '/Date(1556630382000)/'
    );
  });

  it('returns an offset for utc dates', () => {
    const dateTimeZoned = Temporal.ZonedDateTime.from(
      '2019-04-30T15:19:42+02:00[+02:00]'
    );
    expect(serializeFromZonedDateTime(dateTimeZoned)).toBe(
      '/Date(1556630382000+0200)/'
    );
  });

  it('handles negative offsets', () => {
    const dateTimeZoned = Temporal.ZonedDateTime.from(
      '2019-04-30T11:19:42-02:00[-02:00]'
    );
    expect(serializeFromZonedDateTime(dateTimeZoned)).toBe(
      '/Date(1556630382000-0200)/'
    );
  });

  it('handles two digit offsets', () => {
    const dateTimeZoned = Temporal.ZonedDateTime.from(
      '2019-04-30T13:49:42+0030[+0030]'
    );
    expect(serializeFromZonedDateTime(dateTimeZoned)).toBe(
      '/Date(1556630382000+0030)/'
    );
  });

  it('converts to Temporal Plain Time', () => {
    const plainTime = new Temporal.PlainTime(13, 20);
    expect(serializeFromPlainTime(plainTime)).toEqual('PT13H20M00S');
  });
});

describe('Conversion does not lead to information loss', () => {
  it('EDM to moment to EDM has no information loss', () => {
    const valueWithoutOffset = '/Date(1556630382000)/';
    const valueWithOffset = '/Date(1556630382000+0200)/';

    expect(
      serializeFromPlainDateTime(deserializeToPlainDateTime(valueWithoutOffset))
    ).toBe(valueWithoutOffset);

    expect(
      serializeFromZonedDateTime(deserializeToZonedDateTime(valueWithOffset))
    ).toBe(valueWithOffset);
  });
});
