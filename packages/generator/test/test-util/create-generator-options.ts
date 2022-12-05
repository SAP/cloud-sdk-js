import {
  GeneratorOptions,
  generatorOptionsCli,
  ParsedGeneratorOptions
} from '../../src/generator-options';
import { parseOptions } from '../../src/options-parser';

export function createOptions(
  options?: Partial<GeneratorOptions>
): ParsedGeneratorOptions {
  return parseOptions(generatorOptionsCli, {
    inputDir: '',
    outputDir: '',
    serviceMapping: 'service-mapping.json',
    generatePackageJson: false,
    generateJs: false,
    ...options
  });
}
