export interface GeneratorOptions {
  inputDir: string;
  outputDir: string;
  clearOutputDir?: boolean;
  versionInPackageJson?: string;
  generatePackageJson?: boolean;
  serviceMapping?: string;
}
