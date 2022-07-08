import moment from 'moment';
import {
  deserializeDateTimeOffsetToMoment,
  deserializeDateToMoment,
  serializeToDate,
  serializeToDateTimeOffset
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
});
