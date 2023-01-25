import { parseOptions } from '@sap-cloud-sdk/generator-common/internal';
import {
  GeneratorOptions,
  ParsedGeneratorOptions,
  cliOptions
} from '../../src/options';

export function createOptions(
  options?: Partial<GeneratorOptions>
): GeneratorOptions {
  return {
    inputDir: '',
    outputDir: '',
    skipValidation: true,
    serviceMapping: 'service-mapping.json',
    packageJson: false,
    ...options
  };
}

export function createParsedOptions(
  options?: Partial<GeneratorOptions>
): ParsedGeneratorOptions {
  return parseOptions(cliOptions, createOptions(options));
}
