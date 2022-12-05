import { createLogger } from '@sap-cloud-sdk/util';
import { getOptionsWithoutDefaults, parseOptions } from './options-parser';
const logger = createLogger('generator-options');

describe('options parser', () => {
  const options = {
    deprecatedOption: {
      describe: 'deprecated option',
      deprecated: 'Since vX.',
      replacedBy: 'newOption'
    },
    otherOption: {
      describe: 'other option'
    },
    newOption: {
      describe: 'new option',
      default: false
    }
  } as const;
  let warnSpy: jest.SpyInstance;

  beforeEach(() => {
    warnSpy = jest.spyOn(logger, 'warn');
  });

  afterEach(() => {
    warnSpy.mockRestore();
  });

  describe('getOptionsWithoutDefaults', () => {
    it('removes default values from options', () => {
      expect(getOptionsWithoutDefaults(options)).toMatchObject({
        ...options,
        newOption: { describe: 'new option\n[Default: false]' }
      });
    });
  });

  describe('parseOptions', () => {
    it('adds default values if not set', () => {
      expect(
        parseOptions(options, {
          otherOption: 'test'
        })
      ).toEqual({
        otherOption: 'test',
        newOption: false
      });
    });

    it('does not add default values if set', () => {
      expect(
        parseOptions(options, {
          newOption: true
        })
      ).toEqual({
        newOption: true
      });
    });

    it('moves replaced values to new options', () => {
      expect(
        parseOptions(options, {
          deprecatedOption: true
        })
      ).toEqual({
        newOption: true
      });
    });

    it('warns if deprecated options are used', () => {
      parseOptions(options, {
        deprecatedOption: true,
        otherOption: 'test'
      });

      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringMatching(
          /Deprecated options used.*\n\tdeprecatedOption: Since vX/
        )
      );
      expect(warnSpy).toHaveBeenCalledTimes(1);
    });

    it('does not warn if no deprecated option was used', () => {
      parseOptions(options, {
        otherOption: 'test'
      });

      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('warns if a replaced option and the replacing option are used', () => {
      parseOptions(options, {
        deprecatedOption: true,
        newOption: 'test'
      });

      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringMatching(
          /Deprecated options used.*\n\tdeprecatedOption: Since vX/
        )
      );
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringMatching(
          /Duplicate options used.*\n\tdeprecatedOption was replaced by newOption/
        )
      );

      expect(warnSpy).toHaveBeenCalledTimes(2);
    });

    it('does not warn if a replacing option, but not the replaced option, is used', () => {
      parseOptions(options, {
        otherOption: 'test',
        newOption: 'test'
      });

      expect(warnSpy).not.toHaveBeenCalled();
    });
  });
});
