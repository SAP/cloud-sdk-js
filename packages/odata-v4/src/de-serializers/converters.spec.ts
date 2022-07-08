import moment from 'moment';
import { deserializeDateToMoment, serializeToDate } from './converters';

describe('EDM to moment and back', () => {
  describe('EDM to day', () => {
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

  describe('Day to EDM', () => {
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

    it('deserializes a >4 digit year correctly', () => {
      const edm = serializeToDate(moment().date(1).month(1).year(20000));
      expect(edm).toBe('20000-02-01');
    });
  });
});
