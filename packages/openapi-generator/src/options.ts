export interface GeneratorOptions {
  input: string;
  outputDir: string;
  clearOutputDir?: boolean;
  versionInPackageJson?: string;
  generatePackageJson?: boolean;
  generateJs?: boolean;
  serviceMapping?: string;
  tsConfig?: string;
  additionalFiles?: string;
  writeReadme?: boolean;
  strictNaming?: boolean;
}
