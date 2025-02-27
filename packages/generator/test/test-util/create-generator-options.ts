import { parseOptions } from '@sap-cloud-sdk/generator-common/internal';
import { cliOptions } from '../../src/options';
import type {
  GeneratorOptions,
  ParsedGeneratorOptions
} from '../../src/options';

export function createOptions(
  options?: Partial<GeneratorOptions>
): GeneratorOptions {
  return {
    input: '',
    outputDir: '',
    skipValidation: true,
    optionsPerService: 'options-per-service.json',
    packageJson: false,
    ...options
  };
}

export function createParsedOptions(
  options?: Partial<GeneratorOptions>
): ParsedGeneratorOptions {
  return parseOptions(cliOptions, createOptions(options));
}
