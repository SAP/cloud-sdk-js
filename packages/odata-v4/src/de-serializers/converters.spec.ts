import moment from 'moment';
import {
  deserializeDateTimeOffsetToMoment,
  deserializeDateToMoment,
  deserializeDurationToMoment,
  deserializeToTime,
  serializeToDate,
  serializeToDateTimeOffset,
  serializeToDuration,
  serializeToTime
} from './converters';

describe('EDM to moment and back', () => {
  describe('Deserialize Date', () => {
    it('deserializes a date correctly', () => {
      const aMoment = deserializeDateToMoment('2000-01-02');
      expect(aMoment.date()).toBe(2);
      expect(aMoment.month()).toBe(0); // Note: Months are zero indexed, so Jan equals 0
      expect(aMoment.year()).toBe(2000);
    });

    it('deserializes a pre-1970 date correctly', () => {
      const aMoment = deserializeDateToMoment('0023-01-02');
      expect(aMoment.date()).toBe(2);
      expect(aMoment.month()).toBe(0); // Note: Months are zero indexed, so Jan equals 0
      expect(aMoment.year()).toBe(23);
    });

    it('deserializes a BC dates correctly', () => {
      const aMoment = deserializeDateToMoment('-0023-01-02');
      expect(aMoment.date()).toBe(2);
      expect(aMoment.month()).toBe(0); // Note: Months are zero indexed, so Jan equals 0
      expect(aMoment.year()).toBe(-23);
    });

    it('deserializes a >4 digit year correctly', () => {
      const aMoment = deserializeDateToMoment('10000-01-02');
      expect(aMoment.date()).toBe(2);
      expect(aMoment.month()).toBe(0); // Note: Months are zero indexed, so Jan equals 0
      expect(aMoment.year()).toBe(10000);
    });

    it('handles impossible dates', () => {
      expect(() => deserializeDateToMoment('2000-02-31')).toThrow();
      expect(() => deserializeDateToMoment('1970-01-00')).toThrow();
      expect(() => deserializeDateToMoment('1970-00-01')).toThrow();
    });
  });

  describe('Serialize Date', () => {
    it('serializes a date correctly', () => {
      const edm = serializeToDate(moment().date(1).month(1).year(2000));
      expect(edm).toBe('2000-02-01');
    });

    it('serializes a pre-1970 date correctly', () => {
      const edm = serializeToDate(moment().date(1).month(1).year(125));
      expect(edm).toBe('0125-02-01');
    });

    it('serializes a BC dates correctly', () => {
      const edm = serializeToDate(moment().date(1).month(1).year(-500));
      expect(edm).toBe('-0500-02-01');
    });

    it('serializes a >4 digit year correctly', () => {
      const edm = serializeToDate(moment().date(1).month(1).year(20000));
      expect(edm).toBe('20000-02-01');
    });
  });

  describe('Deserialize DateTimeOffset', () => {
    it('handles dates without offset', () => {
      const aMoment = deserializeDateTimeOffsetToMoment(
        '2000-01-01T16:00:00.000Z'
      );
      expect(aMoment.utc().format('YYYY-MM-DD HH:mm')).toBe('2000-01-01 16:00');
    });

    it('handles dates without offset zero', () => {
      const aMoment = deserializeDateTimeOffsetToMoment(
        '2000-01-01T16:00:00.000+00:00'
      );
      expect(aMoment.utc().format('YYYY-MM-DD HH:mm')).toBe('2000-01-01 16:00');
    });

    it('handles dates without milliseconds', () => {
      const aMoment = deserializeDateTimeOffsetToMoment(
        '2000-01-01T16:00:00+00:00'
      );
      expect(aMoment.utc().format('YYYY-MM-DD HH:mm:ss.SSS')).toBe(
        '2000-01-01 16:00:00.000'
      );
    });

    it('handles dates with <3 milliseconds', () => {
      const aMoment = deserializeDateTimeOffsetToMoment(
        '2000-01-01T16:00:00.5+00:00'
      );
      expect(aMoment.utc().format('YYYY-MM-DD HH:mm:ss.SSS')).toBe(
        '2000-01-01 16:00:00.500'
      );
    });

    it('handles dates >3 milliseconds', () => {
      const aMoment = deserializeDateTimeOffsetToMoment(
        '2000-01-01T16:00:00.00005+00:00'
      );

      // Moment truncates any after 3 digits of fractional seconds
      expect(aMoment.utc().format('YYYY-MM-DD HH:mm:ss.SSS')).toBe(
        '2000-01-01 16:00:00.000'
      );
    });

    it('handles dates >>3 milliseconds', () => {
      const aMoment = deserializeDateTimeOffsetToMoment(
        '2000-01-01T16:00:00.0010000000000000005Z'
      );

      expect(aMoment.utc().format('YYYY-MM-DD HH:mm:ss.SSS')).toBe(
        '2000-01-01 16:00:00.001'
      );
    });

    it('handles negative offset', () => {
      const aMoment = deserializeDateTimeOffsetToMoment(
        '2000-01-01T16:00:00.000-09:00'
      );
      expect(aMoment.utc().format('YYYY-MM-DD HH:mm')).toBe('2000-01-02 01:00');
    });

    it('handles positive offset', () => {
      const aMoment = deserializeDateTimeOffsetToMoment(
        '2000-01-01T16:00:00.000+06:30'
      );
      expect(aMoment.utc().format('YYYY-MM-DD HH:mm')).toBe('2000-01-01 09:30');
    });

    it('handles >4 digit years', () => {
      const aMoment = deserializeDateTimeOffsetToMoment(
        '20000-01-01T20:00:00.000+14:00'
      );
      expect(aMoment.utc().format('YYYY-MM-DD HH:mm')).toBe(
        '20000-01-01 06:00'
      );
    });

    it('handles <4 digit years', () => {
      // This test date could be ambiguous and not spec-compliant. It should start with 0090-...
      const aMoment = deserializeDateTimeOffsetToMoment(
        '90-01-01T20:00:00.000+14:00'
      );
      expect(aMoment.utc().format('YYYY-MM-DD HH:mm')).toBe('0090-01-01 06:00');
    });

    it('handles unusually old dates', () => {
      const aMoment = deserializeDateTimeOffsetToMoment(
        '-6500-01-01T20:00:00.000Z'
      );
      expect(aMoment.utc().format('YYYY-MM-DD HH:mm')).toBe(
        '-6500-01-01 20:00'
      );
    });
  });

  describe('Serialize DateTimeOffset', () => {
    it('serializes a date correctly', () => {
      const dtoString = '2000-02-01T12:12:12.012Z';
      const dtoDeserialized = deserializeDateTimeOffsetToMoment(dtoString);
      expect(serializeToDateTimeOffset(dtoDeserialized)).toBe(dtoString);
    });

    it('serializes a date with timezone correctly', () => {
      const dtoString = '2000-02-01T12:12:12.012+01:00';
      const dtoDeserialized = deserializeDateTimeOffsetToMoment(dtoString);

      // TODO: Timezone info is dropped by the SDK
      // expect(serializeToDateTimeOffset(dtoDeserialized)).toBe(dtoString);

      expect(serializeToDateTimeOffset(dtoDeserialized)).toBe(
        '2000-02-01T11:12:12.012Z'
      );
    });
  });

  describe('Deserialize Duration', () => {
    it('handles duration with hours, minutes, and seconds', () => {
      const aMoment = deserializeDurationToMoment('+PT05H30M59S');
      // 5*60*60 + 30*60 + 59 = 19859
      expect(aMoment.asSeconds()).toBe(19859);
    });

    it('handles negative duration with hours, minutes, and seconds', () => {
      const aMoment = deserializeDurationToMoment('-PT05H30M59S');
      // 5*60*60 + 30*60 + 59 = 19859
      expect(aMoment.asSeconds()).toBe(-19859);
    });

    it('handles  duration without sign with hours, minutes, and seconds', () => {
      const aMoment = deserializeDurationToMoment('PT05H30M59S');
      // 5*60*60 + 30*60 + 59 = 19859
      expect(aMoment.asSeconds()).toBe(19859);
    });

    it('handles duration with many, many seconds', () => {
      const aMoment = deserializeDurationToMoment('+PT421337S');
      expect(aMoment.asSeconds()).toBe(421337);
    });

    it('handles duration with days', () => {
      const aMoment = deserializeDurationToMoment('+P1D');
      // 24*60*60 = 86400
      expect(aMoment.asSeconds()).toBe(86400);
    });

    it('handles duration with days and seconds', () => {
      const aMoment = deserializeDurationToMoment('+P1DT50S');
      // 24*60*60 = 86450
      expect(aMoment.asSeconds()).toBe(86450);
    });

    it('handles duration with high precision', () => {
      const aMoment = deserializeDurationToMoment('+PT59.987654321012345S');
      // Durations are truncated after 14 digits
      // expect(aMoment.asSeconds()).toBe(59.987654321012345);
      expect(aMoment.asSeconds()).toBe(59.98765432101234);
    });
  });

  describe('Serialize Duration', () => {
    it('handles duration with hours, minutes, and seconds', () => {
      const isoDuration = 'PT5H30M59S';
      const aDuration = deserializeDurationToMoment(isoDuration);
      expect(serializeToDuration(aDuration)).toBe(isoDuration);
    });

    it('handles negative durations', () => {
      const isoDuration = '-PT5H30M59S';
      const aDuration = deserializeDurationToMoment(isoDuration);
      expect(serializeToDuration(aDuration)).toBe(isoDuration);
    });

    it('handles duration with many seconds', () => {
      const isoDuration = 'PT19859S';
      const aDuration = deserializeDurationToMoment(isoDuration);
      expect(serializeToDuration(aDuration)).toBe('PT5H30M59S');
    });

    it('handles duration with days and seconds', () => {
      const isoDuration = 'P365DT23H59M59.999S';
      const aDuration = deserializeDurationToMoment('+' + isoDuration);
      expect(serializeToDuration(aDuration)).toBe(isoDuration);
    });

    it('handles duration with high precision', () => {
      const isoDuration = 'PT59.98765432101234S';
      const aDuration = deserializeDurationToMoment(isoDuration);
      // Fractional seconds in durations are rounded to 3 digits
      // expect(serializeToDuration(aDuration)).toBe(isoDuration);
      expect(serializeToDuration(aDuration)).toBe('PT59.988S');
    });
  });

  describe('Deserialize Time', () => {
    it('handles times without fractional seconds', () => {
      expect(deserializeToTime('12:34:00')).toEqual({
        hours: 12,
        minutes: 34,
        seconds: 0
      });
    });

    it('handles times in 24 hour notation', () => {
      expect(deserializeToTime('23:45:01')).toEqual({
        hours: 23,
        minutes: 45,
        seconds: 1
      });
    });

    it('handles midnight', () => {
      // The spec says this is allowed
      // https://www.w3.org/TR/xmlschema11-2/#time
      expect(deserializeToTime('24:00:00')).toEqual({
        hours: 24, // or should it be 0?
        minutes: 0,
        seconds: 0
      });
      expect(deserializeToTime('00:00:00')).toEqual({
        hours: 0,
        minutes: 0,
        seconds: 0
      });
    });

    xit('handles time with timezones', () => {
      // TODO The spec says this is allowed
      // https://www.w3.org/TR/xmlschema11-2/#time

      expect(deserializeToTime('24:00:00Z')).toEqual({
        hours: 0,
        minutes: 0,
        seconds: 0,
        offset: 0
      });

      expect(deserializeToTime('06:00:00Z')).toEqual({
        hours: 6,
        minutes: 0,
        seconds: 0,
        offset: 0
      });

      expect(deserializeToTime('06:00:00+01:00')).toEqual({
        hours: 6,
        minutes: 0,
        seconds: 0,
        offset: 60
      });

      expect(deserializeToTime('06:00:00-14:00')).toEqual({
        hours: 6,
        minutes: 0,
        seconds: 0,
        offset: -840
      });

      expect(deserializeToTime('06:00:00-03:45')).toEqual({
        hours: 6,
        minutes: 0,
        seconds: 0,
        offset: -225
      });
    });

    it('handles times with fractional seconds', () => {
      expect(deserializeToTime('12:34:56.789')).toEqual({
        hours: 12,
        minutes: 34,
        seconds: 56.789
      });
    });

    it('handles times with high-precision fractional seconds', () => {
      expect(deserializeToTime('12:34:56.7890123456789012345')).toEqual({
        hours: 12,
        minutes: 34,
        // parseFloat truncates after a certain number of digits
        // seconds: 56.7890123456789012345
        seconds: 56.7890123456789
      });
    });

    it('throws on invalid times', () => {
      expect(() => deserializeToTime('25:00:00')).toThrow();
      expect(() => deserializeToTime('01:62:00')).toThrow();
      expect(() => deserializeToTime('23;00;00')).toThrow();
      expect(() => deserializeToTime('6:00:89')).toThrow();
    });
  });

  describe('Serialize Time', () => {
    it('handles times without fractional seconds', () => {
      expect(
        serializeToTime({
          hours: 12,
          minutes: 34,
          seconds: 56
        })
      ).toBe('12:34:56');
      expect(
        serializeToTime({
          hours: 23,
          minutes: 34,
          seconds: 56
        })
      ).toBe('23:34:56');
      expect(
        serializeToTime({
          hours: 2,
          minutes: 34,
          seconds: 56
        })
      ).toBe('02:34:56');
    });

    it('handles times with fractional seconds', () => {
      expect(
        serializeToTime({
          hours: 12,
          minutes: 34,
          seconds: 56.789
        })
      ).toBe('12:34:56.789');
    });

    xit('handles times with timezones', () => {
      // Currently not supported by us
    });

    xit('handles times with high-precision fractional seconds', () => {
      // Currently not supported by us
    });

    it('should throw on invalid times', () => {
      expect(() =>
        serializeToTime({
          hours: 25,
          minutes: 0,
          seconds: 0
        })
      ).toThrow();
      expect(() =>
        serializeToTime({
          hours: 24,
          minutes: 0,
          seconds: 1
        })
      ).toThrow();
      expect(() =>
        serializeToTime({
          hours: 12,
          minutes: 61,
          seconds: 0
        })
      ).toThrow();
      expect(() =>
        serializeToTime({
          hours: 12,
          minutes: 34,
          seconds: -5
        })
      ).toThrow();
      expect(() =>
        serializeToTime({
          hours: 12,
          minutes: 34,
          seconds: 90
        })
      ).toThrow();
    });
  });
});
