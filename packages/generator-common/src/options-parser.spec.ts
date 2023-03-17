import { join, resolve } from 'path';
import { createLogger } from '@sap-cloud-sdk/util';
import mock from 'mock-fs';
import {
  getOptionsWithoutDefaults,
  parseOptions,
  resolveGlob
} from './options-parser';
const logger = createLogger('generator-options');

describe('options parser', () => {
  const deprecatedOption = {
    describe: 'deprecated option',
    type: 'string',
    deprecated: 'Since vX.',
    replacedBy: 'newOption'
  } as const;
  const otherOption = {
    describe: 'other option',
    type: 'string'
  } as const;
  const newOption = {
    describe: 'new option',
    type: 'boolean',
    default: false
  } as const;
  const coercedOption = {
    describe: 'coerced option',
    type: 'string',
    coerce: (val, opt) => (val ? 'test' : opt.otherOption)
  } as const;
  const coercedWithDefaultOption = {
    describe: 'coerced option',
    type: 'string',
    default: 'default value',
    coerce: val => `coerced: ${val}`
  } as const;
  const include = {
    describe: 'include files with glob',
    type: 'string' as const,
    coerce: resolveGlob
  };
  const options = { deprecatedOption, otherOption, newOption } as const;

  const absoluteJsonPaths = ['package.json', 'tsconfig.json'].map(s =>
    resolve(s)
  );

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

    it('coerces value', () => {
      expect(
        parseOptions({ otherOption, coercedOption } as const, {
          coercedOption: 'will disappear'
        })
      ).toEqual({
        coercedOption: 'test'
      });
    });

    it('includes using glob using cwd', () => {
      expect(
        parseOptions({ include }, { include: '*.json' }).include.sort()
      ).toEqual(absoluteJsonPaths);
    });

    it('includes using glob using root', () => {
      const rootGlob = join(resolve(), '*.json');
      expect(
        parseOptions({ include }, { include: rootGlob }).include.sort()
      ).toEqual(absoluteJsonPaths);
    });

    it('does not fail on include option not set', () => {
      expect(parseOptions({ include }, {}).include.sort()).toEqual([]);
    });

    it('includes using config path', () => {
      const config = {
        describe: 'config files',
        type: 'string' as const
      };

      mock({
        '/dummy/root': {
          'file-1.json': '',
          'sub-1': {
            'file-2.json': ''
          }
        }
      });
      expect(
        parseOptions(
          { include, config },
          { include: '**/*.json', config: '/dummy/root/config.json' }
        ).include
      ).toEqual(
        ['file-1.json', 'sub-1/file-2.json'].map(s => resolve('/dummy/root', s))
      );
      mock.restore();
    });

    it('coerces value even if unset, using other options', () => {
      expect(
        parseOptions({ otherOption, coercedOption } as const, {
          otherOption: 'other option value'
        })
      ).toEqual({
        otherOption: 'other option value',
        coercedOption: 'other option value'
      });
    });

    it('coerces value for properties with a default value, when set', () => {
      expect(
        parseOptions({ coercedWithDefaultOption } as const, {
          coercedWithDefaultOption: 'custom value'
        })
      ).toEqual({
        coercedWithDefaultOption: 'coerced: custom value'
      });
    });

    it('coerces value for properties with a default value, when unset', () => {
      expect(parseOptions({ coercedWithDefaultOption } as const, {})).toEqual({
        coercedWithDefaultOption: 'coerced: default value'
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
