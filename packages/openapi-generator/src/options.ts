export interface GeneratorOptions {
  input: string;
  outputDir: string;
  clearOutputDir?: boolean;
  versionInPackageJson?: string;
  generatePackageJson?: boolean;
  serviceMapping?: string;
  additionalFiles?: string;
  writeReadme?: boolean;
}
