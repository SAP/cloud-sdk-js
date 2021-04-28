import Parser from '@oclif/parser';
import GenerateOpenApiClient from '../cli';

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
  generateSdkMetadata?: boolean;
}

export type ParsedGeneratorOptions = typeof GenerateOpenApiClient extends Parser.Input<
  infer F
>
  ? F
  : never;

export function parseGeneratorOptions(
  options: GeneratorOptions
): ParsedGeneratorOptions {
  return Object.entries(GenerateOpenApiClient.flags).reduce(
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
