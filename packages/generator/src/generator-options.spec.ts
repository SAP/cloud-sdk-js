import { createLogger } from '@sap-cloud-sdk/util';
import { warnIfDeprecated } from './generator-options';
const logger = createLogger('generator-options');

describe('generator options', () => {
  let options;
  let warnSpy: jest.SpyInstance;
  beforeAll(() => {
    options = {
      deprecatedOption: {
        alias: 'd',
        deprecated: 'Since v2.8.0.'
      },
      deprecatedOptionWithMultipleAlias: {
        alias: ['x', 'y'],
        deprecated: 'Since v2.6.0.'
      }
    } as const;
  });

  beforeEach(() => {
    warnSpy = jest.spyOn(logger, 'warn');
  });

  afterEach(() => {
    warnSpy.mockRestore();
  });

  it('shows a warning if a deprecated option name was used in the CLI', () => {
    warnIfDeprecated(
      ['command', '--otherOption', '--deprecatedOption'],
      true,
      options
    );

    expect(warnSpy).toHaveBeenCalled();
  });

  it('shows a warning if a deprecated option alias was used in the CLI', () => {
    warnIfDeprecated(['command', '-d', '--otherOption'], true, options);

    expect(warnSpy).toHaveBeenCalled();
  });

  it('shows a warning if a deprecated option with multiple alias was used in the CLI', () => {
    warnIfDeprecated(['command', '-x', '--otherOption'], true, options);

    expect(warnSpy).toHaveBeenCalled();
  });

  it('does not show a warning if no deprecated option was used in the CLI', () => {
    warnIfDeprecated(['command', '--otherOption'], true, options);

    expect(warnSpy).not.toHaveBeenCalled();
  });

  it('shows a warning if a deprecated option name was used programmatically', () => {
    warnIfDeprecated(
      ['command', 'otherOption', 'deprecatedOption'],
      false,
      options
    );

    expect(warnSpy).toHaveBeenCalled();
  });

  it('does not show a warning if no deprecated option was used programmatically', () => {
    warnIfDeprecated(['command', 'otherOption'], false, options);

    expect(warnSpy).not.toHaveBeenCalled();
  });
});
