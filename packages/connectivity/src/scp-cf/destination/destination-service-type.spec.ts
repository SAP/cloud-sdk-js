import {
  assertHttpDestination,
  isHttpDestination
} from './destination-service-types';

describe('destination service type', () => {
  describe('isHttpDestination', () => {
    it('checks destination with url', () => {
      expect(isHttpDestination({ url: 'abc' })).toBe(true);
    });

    it('checks destination without url', () => {
      expect(isHttpDestination({ name: 'abc' })).toBe(false);
    });

    it('checks destination with type HTTP', () => {
      expect(isHttpDestination({ url: 'abc', type: 'HTTP' })).toBe(true);
    });

    it('checks destination with wrong type', () => {
      expect(isHttpDestination({ url: 'abc', type: 'MAIL' })).toBe(false);
    });
  });

  describe('assertHttpDestination', () => {
    it('checks destination with url', () => {
      assertHttpDestination({ url: 'abc' });
    });

    it('checks destination without url', () => {
      expect(() =>
        assertHttpDestination({ name: 'abc' })
      ).toThrowErrorMatchingInlineSnapshot(
        "\"The 'url' property is not set for destination abc which is mandatory if you use it as an 'HTTP destination\""
      );
    });

    it('checks destination with type HTTP', () => {
      assertHttpDestination({ url: 'abc', type: 'HTTP' });
    });

    it('checks destination with wrong type', () => {
      expect(() =>
        assertHttpDestination({ url: 'abc', type: 'MAIL' })
      ).toThrowErrorMatchingInlineSnapshot(
        "\"The 'type' property is  MAIL instead of  HTTP for destination 'undefined' which is mandatory if you use it as an 'HTTP destination\""
      );
    });
  });
});
