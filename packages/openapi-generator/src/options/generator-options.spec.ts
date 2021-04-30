import mock from 'mock-fs';
import { parseGeneratorOptions } from './generator-options';

describe('parseGeneratorOptions', () => {
  beforeAll(() => {
    mock({
      'existent-directory': {
        'existent-file': 'file content'
      }
    });
  });

  afterAll(() => {
    mock.restore();
  });

  it('gets default options', () => {
    expect(
      parseGeneratorOptions({
        input: 'inputDir',
        outputDir: 'outputDir'
      })
    ).toEqual({
      input: `${process.cwd()}/inputDir`,
      outputDir: `${process.cwd()}/outputDir`,
      transpile: false,
      include: undefined,
      clearOutputDir: false,
      strictNaming: true,
      tsConfig: undefined,
      packageJson: false,
      optionsPerService: undefined,
      packageVersion: '1.0.0',
      readme: false,
      metadata: false,
      verbose: false,
      overwrite: false
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
});
