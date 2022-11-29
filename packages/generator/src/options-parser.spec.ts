import { createLogger } from '@sap-cloud-sdk/util';
import { OptionsParser } from './options-parser';
const logger = createLogger('generator-options');

describe('DeprecatedOptionsSanitizer', () => {
  const options = {
    deprecatedOption: {
      alias: 'd',
      deprecated: 'Since v2.8.0.',
      replacedBy: 'newOption'
    },
    deprecatedOptionWithMultipleAlias: {
      alias: ['x', 'y'],
      deprecated: 'Since v2.6.0.'
    },
    newOption: {}
  } as const;
  let warnSpy: jest.SpyInstance;

  beforeEach(() => {
    warnSpy = jest.spyOn(logger, 'warn');
  });

  afterEach(() => {
    warnSpy.mockRestore();
  });

  describe('warns for deprecated options', () => {
    it('shows a warning if a deprecated option name was used in the CLI', () => {
      new OptionsParser(options, [
        'command',
        '--otherOption',
        '--deprecatedOption'
      ]).parseOptions({});

      expect(warnSpy).toHaveBeenCalled();
    });

    it('shows a warning if a deprecated option name and `=` was used in the CLI', () => {
      new OptionsParser(options, [
        'command',
        '--otherOption',
        '--deprecatedOption=value'
      ]).parseOptions({});

      expect(warnSpy).toHaveBeenCalled();
    });

    it('shows a warning if a deprecated option alias was used in the CLI', () => {
      new OptionsParser(options, [
        'command',
        '-d',
        '--otherOption'
      ]).parseOptions({});
      expect(warnSpy).toHaveBeenCalled();
    });

    it('shows a warning if a deprecated option with multiple alias was used in the CLI', () => {
      new OptionsParser(options, [
        'command',
        '-x',
        '--otherOption'
      ]).parseOptions({});

      expect(warnSpy).toHaveBeenCalled();
    });

    it('does not show a warning if no deprecated option was used in the CLI', () => {
      new OptionsParser(options, ['command', '--otherOption']).parseOptions({});

      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('shows a warning if a deprecated option name was used programmatically', () => {
      new OptionsParser(options, {
        otherOption: 3,
        deprecatedOption: 'Since vX.'
      }).parseOptions({});

      expect(warnSpy).toHaveBeenCalled();
    });

    it('does not show a warning if no deprecated option was used programmatically', () => {
      new OptionsParser(options, {
        otherOption: 3
      }).parseOptions({});

      expect(warnSpy).not.toHaveBeenCalled();
    });
  });

  describe('throws for duplicate options', () => {
    it('throws an error if old and new name of an option are used', () => {
      expect(() =>
        new OptionsParser(options, [
          'command',
          '--newOption',
          '--deprecatedOption'
        ]).parseOptions({})
      ).toThrowErrorMatchingInlineSnapshot(`
        "Duplicate options used:
        	--deprecatedOption(-d) was replaced by --newOption."
      `);
    });
  });
});
