export interface GeneratorOptions {
  input: string;
  outputDir: string;
  clearOutputDir?: boolean;
  packageVersion?: string;
  packageJson?: boolean;
  transpile?: boolean;
  serviceMapping?: string;
  tsConfig?: string;
  include?: string;
  readme?: boolean;
}
