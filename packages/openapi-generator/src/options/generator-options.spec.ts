import mock from 'mock-fs';
import { createLogger } from '@sap-cloud-sdk/util';
import { generateWithParsedOptions } from '../generator';
import {
  parseGeneratorOptions,
  parseOptionsFromConfig
} from './generator-options';

describe('parseGeneratorOptions', () => {
  beforeEach(() => {
    mock({
      'existent-directory': {
        'existent-file': 'file content'
      }
    });
  });

  afterEach(() => {
    mock.restore();
  });

  const options = {
    transpile: false,
    include: undefined,
    clearOutputDir: false,
    skipValidation: false,
    tsConfig: undefined,
    packageJson: false,
    optionsPerService: undefined,
    packageVersion: '1.0.0',
    readme: false,
    metadata: false,
    verbose: false,
    overwrite: false,
    config: undefined
  };

  it('gets default options', () => {
    expect(
      parseGeneratorOptions({
        input: 'inputDir',
        outputDir: 'outputDir'
      })
    ).toEqual({
      input: `${process.cwd()}/inputDir`,
      outputDir: `${process.cwd()}/outputDir`,
      ...options
    });
  });

  it('parses per service config file for a non-existent file path', () => {
    expect(
      parseGeneratorOptions({
        input: 'inputDir',
        outputDir: 'outputDir',
        optionsPerService: 'non-existent-directory/config.json'
      })
    ).toMatchObject({
      optionsPerService: `${process.cwd()}/non-existent-directory/config.json`
    });
  });

  it('parses per service config file for existent file path', () => {
    expect(
      parseGeneratorOptions({
        input: 'inputDir',
        outputDir: 'outputDir',
        optionsPerService: 'existent-directory/existent-file'
      })
    ).toMatchObject({
      optionsPerService: `${process.cwd()}/existent-directory/existent-file`
    });
  });

  it('parses per service config file for a non-existent directory path', () => {
    expect(
      parseGeneratorOptions({
        input: 'inputDir',
        outputDir: 'outputDir',
        optionsPerService: 'non-existent-directory'
      })
    ).toMatchObject({
      optionsPerService: `${process.cwd()}/non-existent-directory/options-per-service.json`
    });
  });

  it('parses per service config file for existent directory path', () => {
    expect(
      parseGeneratorOptions({
        input: 'inputDir',
        outputDir: 'outputDir',
        optionsPerService: 'existent-directory'
      })
    ).toMatchObject({
      optionsPerService: `${process.cwd()}/existent-directory/options-per-service.json`
    });
  });

  it('parses tsconfig.json path', () => {
    expect(
      parseGeneratorOptions({
        input: 'inputDir',
        outputDir: 'outputDir',
        tsConfig: 'someDir'
      })
    ).toMatchObject({
      tsConfig: `${process.cwd()}/someDir`
    });
  });

  it('throws an error if input and outputDir are not set', () => {
    const config = {
      input: '',
      outputDir: '',
      ...options
    };
    return expect(
      generateWithParsedOptions(config)
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      '"Either input or outputDir were not set."'
    );
  });

  it('throws an error if outputDir is not set', () => {
    const config = {
      input: 'some-dir',
      outputDir: '',
      ...options
    };
    return expect(
      generateWithParsedOptions(config)
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      '"Either input or outputDir were not set."'
    );
  });

  it('throws an error if input is not set', () => {
    const config = {
      input: '',
      outputDir: 'some-dir',
      ...options
    };
    return expect(
      generateWithParsedOptions(config)
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      '"Either input or outputDir were not set."'
    );
  });

  it('parses a given path to a config file and returns its content as generator options', async () => {
    const config = {
      input: 'some-repository'
    };
    const parameters = {
      config: '/path/config.json'
    };
    mock({
      '/path/': {
        'config.json': JSON.stringify(config)
      }
    });
    await expect(parseOptionsFromConfig(parameters.config)).resolves.toEqual(
      config
    );
  });

  it('logs a warning if wrong configuration keys were used', async () => {
    const logger = createLogger('openapi-generator');
    spyOn(logger, 'warn');
    const config = {
      input: 'some-repository',
      wrong_key: 'random-value'
    };
    const parameters = {
      config: '/path/config.json'
    };
    mock({
      '/path/': {
        'config.json': JSON.stringify(config)
      }
    });
    await parseOptionsFromConfig(parameters.config);
    expect(logger.warn).toHaveBeenCalledWith(
      '"wrong_key" is not part of the configuration and will be ignored.'
    );
  });
});
