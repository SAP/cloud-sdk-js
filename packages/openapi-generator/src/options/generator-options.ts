import Parser from '@oclif/parser';
import OpenApiGenerator from '../cli';

/**
 * Options that can be used to configure the generation when using the generator programmatically.
 * The options match the CLI options.
 */
export interface GeneratorOptions {
  input: string;
  outputDir: string;
  transpile?: boolean;
  include?: string;
  clearOutputDir?: boolean;
  strictNaming?: boolean;
  tsConfig?: string;
  packageJson?: boolean;
  perServiceConfig?: string;
  packageVersion?: string;
  readme?: boolean;
  metadata?: boolean;
}

/**
 * Parsed options with default values.
 */
export type ParsedGeneratorOptions = typeof OpenApiGenerator extends Parser.Input<
  infer F
>
  ? F
  : never;

/**
 * Parse the given generator options for programmatic use.
 * @param options Options that match the CLI options.
 * @returns Parsed options with default values.
 */
export function parseGeneratorOptions(
  options: GeneratorOptions
): ParsedGeneratorOptions {
  return Object.entries(OpenApiGenerator.flags).reduce(
    (parsedOptions, [name, flag]) => {
      const value = options[name];
      if (typeof value !== 'undefined') {
        parsedOptions[name] = flag.parse(value as never, undefined);
      } else if (typeof flag.default !== undefined) {
        parsedOptions[name] = flag.default;
      }
      return parsedOptions;
    },
    {} as ParsedGeneratorOptions
  );
}
