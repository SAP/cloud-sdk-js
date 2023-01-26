import {
  GeneratorOptions,
  cliOptions,
  ParsedGeneratorOptions
} from '../../src/options';
import { parseOptions } from '../../../generator-common/src/options-parser';

export function createOptions(
  options?: Partial<GeneratorOptions>
): ParsedGeneratorOptions {
  return parseOptions(cliOptions, {
    inputDir: '',
    outputDir: '',
    skipValidation: true,
    optionsPerService: 'options-per-service.json',
    packageJson: false,
    ...options
  });
}
