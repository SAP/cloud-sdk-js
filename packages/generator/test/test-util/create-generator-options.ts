import { GeneratorOptions } from '../../src/generator-options';

export function createOptions(
  options?: Partial<GeneratorOptions>
): GeneratorOptions {
  return {
    inputDir: '',
    outputDir: '',
    useSwagger: false,
    readme: false,
    writeReadme: false,
    serviceMapping: 'service-mapping.json',
    overwrite: false,
    forceOverwrite: false,
    clearOutputDir: false,
    s4hanaCloud: false,
    generateNpmrc: false,
    packageJson: false,
    generatePackageJson: false,
    generateJs: false,
    sdkAfterVersionScript: false,
    generateCSN: false,
    ...options
  };
}
