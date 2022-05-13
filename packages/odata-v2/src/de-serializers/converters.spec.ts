import moment from 'moment';
import { deserializeToMoment, serializeFromMoment } from './converters';

describe('EDM to moment and back', () => {
  describe('EDM to moment', () => {
    it('returns a non utc date if there is no offset', () => {
      const aMoment = deserializeToMoment('/Date(1556630382000)/');
      expect(aMoment['_isUTC']).toBeFalsy();
    });

    it('returns a utc date if there is an offset', () => {
      const aMoment = deserializeToMoment('/Date(1556630382000+0000)/');
      expect(aMoment['_isUTC']).toBeTruthy();
      expect(aMoment.format('YYYY-MM-DD HH:mm')).toBe('2019-04-30 13:19');
    });

    it('handles two digit offsets', () => {
      const aMoment = deserializeToMoment('/Date(1556630382000+0030)/');
      expect(aMoment.utcOffset()).toBe(30);
    });
  });

  describe('moment to EDM', () => {
    it('returns no offset for non-utc dates', () => {
      const edmDateTime = serializeFromMoment(moment(1556630382000));
      expect(edmDateTime).toBe('/Date(1556630382000)/');
    });

    it('returns an offset for utc dates', () => {
      const edmDateTime = serializeFromMoment(
        moment(1556630382000).utc().utcOffset(120)
      );
      expect(edmDateTime).toBe('/Date(1556630382000+0120)/');
    });

    it('handles negative offsets', () => {
      const edmDateTime = serializeFromMoment(
        moment(1556630382000).utc().utcOffset(-120)
      );
      expect(edmDateTime).toBe('/Date(1556630382000-0120)/');
    });

    it('handles two digit offsets', () => {
      const edmDateTime = serializeFromMoment(
        moment(1556630382000).utc().utcOffset(30)
      );
      expect(edmDateTime).toBe('/Date(1556630382000+0030)/');
    });
  });

  it('EDM to moment to EDM has no information loss', () => {
    const valueWithoutOffset = '/Date(1556630382000)/';
    const valueWithOffset = '/Date(1556630382000+0120)/';

    expect(serializeFromMoment(deserializeToMoment(valueWithoutOffset))).toBe(
      valueWithoutOffset
    );
    expect(serializeFromMoment(deserializeToMoment(valueWithOffset))).toBe(
      valueWithOffset
    );
  });
});
