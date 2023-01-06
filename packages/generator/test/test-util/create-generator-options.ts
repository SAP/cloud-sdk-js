import {
  GeneratorOptions,
  cliOptions,
  ParsedGeneratorOptions
} from '../../src/options';
import { parseOptions } from '../../src/options/options-parser';

export function createOptions(
  options?: Partial<GeneratorOptions>
): ParsedGeneratorOptions {
  return parseOptions(cliOptions, {
    inputDir: '',
    outputDir: '',
    serviceMapping: 'service-mapping.json',
    packageJson: false,
    ...options
  });
}
