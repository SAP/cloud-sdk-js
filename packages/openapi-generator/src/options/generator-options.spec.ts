import { join, resolve } from 'path';
import mock from 'mock-fs';
import { parseOptions } from '@sap-cloud-sdk/generator-common/internal';
import { parseCmdArgs } from '../cli-parser';
import { cliOptions } from './options';

describe('parseGeneratorOptions', () => {
  beforeEach(() => {
    mock({
      inputDir: {
        'spec.json': ''
      },
      'existent-directory': {
        'existent-file': 'file content'
      }
    });
  });

  afterEach(() => {
    mock.restore();
    jest.clearAllMocks();
  });

  const spyError = jest.spyOn(console, 'error');

  const optionsDefaultValues = {
    transpile: false,
    include: [],
    clearOutputDir: false,
    skipValidation: false,
    tsconfig: undefined,
    packageJson: false,
    optionsPerService: undefined,
    readme: false,
    metadata: false,
    prettierConfig: undefined,
    verbose: false,
    overwrite: false,
    config: undefined,
    generateESM: false,
    schemaPrefix: '',
    resolveExternal: true
  };

  it('gets default options', () => {
    expect(
      parseOptions(cliOptions, {
        input: 'inputDir',
        outputDir: 'outputDir'
      })
    ).toEqual({
      input: [join(process.cwd(), 'inputDir', 'spec.json')],
      outputDir: join(process.cwd(), 'outputDir'),
      ...optionsDefaultValues
    });
  });

  it('parses per service config file for a non-existent file path', () => {
    expect(
      parseOptions(cliOptions, {
        input: 'inputDir',
        outputDir: 'outputDir',
        optionsPerService: 'non-existent-directory/config.json'
      })
    ).toMatchObject({
      optionsPerService: join(
        process.cwd(),
        'non-existent-directory/config.json'
      )
    });
  });

  it('parses per service config file for existent file path', () => {
    expect(
      parseOptions(cliOptions, {
        input: 'inputDir',
        outputDir: 'outputDir',
        optionsPerService: 'existent-directory/existent-file'
      })
    ).toMatchObject({
      optionsPerService: join(process.cwd(), 'existent-directory/existent-file')
    });
  });

  it('parses per service config file for a non-existent directory path', () => {
    expect(
      parseOptions(cliOptions, {
        input: 'inputDir',
        outputDir: 'outputDir',
        optionsPerService: 'non-existent-directory'
      })
    ).toMatchObject({
      optionsPerService: join(
        process.cwd(),
        'non-existent-directory/options-per-service.json'
      )
    });
  });

  it('parses per service config file for existent directory path', () => {
    expect(
      parseOptions(cliOptions, {
        input: 'inputDir',
        outputDir: 'outputDir',
        optionsPerService: 'existent-directory'
      })
    ).toMatchObject({
      optionsPerService: join(
        process.cwd(),
        'existent-directory/options-per-service.json'
      )
    });
  });

  it('parses tsconfig.json path', () => {
    expect(
      parseOptions(cliOptions, {
        input: 'inputDir',
        outputDir: 'outputDir',
        tsconfig: 'someDir'
      })
    ).toMatchObject({
      tsconfig: join(process.cwd(), 'someDir')
    });
  });

  it('throws an error if input and outputDir are not set', () => {
    jest.spyOn(process, 'exit').mockImplementation(number => {
      throw new Error('process.exit: ' + number);
    });

    expect(() => parseCmdArgs([])).toThrow();
    expect(spyError).toHaveBeenCalledWith(
      'Missing required arguments: input, outputDir'
    );
  });

  it('throws an error if outputDir is not set', () => {
    jest.spyOn(process, 'exit').mockImplementation(number => {
      throw new Error('process.exit: ' + number);
    });

    expect(() => parseCmdArgs(['--input', 'someValue'])).toThrow();
    expect(spyError).toHaveBeenCalledWith(
      'Missing required argument: outputDir'
    );
  });

  it('throws an error if input is not set', () => {
    jest.spyOn(process, 'exit').mockImplementation(number => {
      throw new Error('process.exit: ' + number);
    });

    expect(() => parseCmdArgs(['--outputDir', 'someOutputValue'])).toThrow();
    expect(spyError).toHaveBeenCalledWith('Missing required argument: input');
  });

  it('throws no error if input and output are set', () => {
    expect(() =>
      parseCmdArgs([
        '--input',
        'someInputValue',
        '--outputDir',
        'someOutputValue'
      ])
    ).not.toThrow();
  });

  it('parses a given path to a config file and returns its content as parsed generator options', () => {
    mock.restore();
    const path = resolve(__dirname, '../../test/test-config.json');

    const parsed = parseOptions(cliOptions, parseCmdArgs(['--config', path]));
    expect(parsed.input).toMatchObject([]);
    expect(parsed.outputDir).toContain('some-output');
    // RegEx to match paths for both *nix and Windows
    expect(parsed.include).toMatchObject([path]);
  });

  it('fails if wrong configuration keys were used', async () => {
    jest.spyOn(process, 'exit').mockImplementation(number => {
      throw new Error('process.exit: ' + number);
    });
    mock.restore();
    const path = resolve(__dirname, '../../test/test-config-wrong-key.json');
    expect(() =>
      parseOptions(cliOptions, parseCmdArgs(['--config', path]))
    ).toThrow();
    expect(spyError).toHaveBeenCalledWith('Unknown argument: wrongKey');
  });
});
