export interface GeneratorOptions {
  input: string;
  outputDir: string;
  clearOutputDir?: boolean;
  versionInPackageJson?: string;
  generatePackageJson?: boolean;
  generateJs?: boolean;
  serviceMapping?: string;
  tsConfig?: string;
}
