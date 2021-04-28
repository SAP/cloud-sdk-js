import { parseGeneratorOptions } from './generator-options';

describe('parseGeneratorOptions', () => {
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
      perServiceConfig: undefined,
      packageVersion: '1.0.0',
      readme: false
    });
  });

  it('parses per service config file for file path', () => {
    expect(
      parseGeneratorOptions({
        input: 'inputDir',
        outputDir: 'outputDir',
        perServiceConfig: 'someDir/config.json'
      })
    ).toMatchObject({
      perServiceConfig: `${process.cwd()}/someDir/config.json`
    });
  });

  it('parses per service config file for directory path', () => {
    expect(
      parseGeneratorOptions({
        input: 'inputDir',
        outputDir: 'outputDir',
        perServiceConfig: 'someDir'
      })
    ).toMatchObject({
      perServiceConfig: `${process.cwd()}/someDir/per-service-config.json`
    });
  });

  it.only('parses tsconfig.json path', () => {
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
