/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { promises as promisesFs } from 'fs';
import { resolve, parse, basename, dirname, join, relative } from 'path';
import {
  createLogger,
  kebabCase,
  finishAll,
  setLogLevel,
  formatJson
} from '@sap-cloud-sdk/util';
import { GlobSync } from 'glob';
import {
  getSdkMetadataFileNames,
  getSdkVersion,
  readCompilerOptions,
  sdkMetadataHeader,
  transpileDirectory
} from '@sap-cloud-sdk/generator-common';
import {
  apiFile,
  packageJson,
  genericDescription,
  readme,
  apiIndexFile,
  schemaIndexFile,
  schemaFile
} from './file-serializer';
import { OpenApiDocument } from './openapi-types';
import { parseOpenApiDocument } from './parser';
import { convertOpenApiSpec } from './document-converter';
import { createFile, copyFile } from './file-writer';
import {
  parseGeneratorOptions,
  ParsedGeneratorOptions,
  tsconfigJson,
  ServiceOptions,
  OptionsPerService,
  getOptionsPerService
} from './options';
import { sdkMetadata } from './sdk-metadata';
import { GeneratorOptions } from '.';

const { readdir, rmdir, mkdir, lstat } = promisesFs;
const logger = createLogger('openapi-generator');

/**
 * Main entry point for the OpenAPI client generation.
 * Generates models and API files.
 * @param options Options to configure generation.
 */
export async function generate(options: GeneratorOptions): Promise<void> {
  return generateWithParsedOptions(parseGeneratorOptions(options));
}

/**
 * Main entry point for the OpenAPI client generation.
 * Generates models and API files.
 * @param options Options to configure generation.
 */
export async function generateWithParsedOptions(
  options: ParsedGeneratorOptions
): Promise<void> {
  if (options.input === '' || options.outputDir === '') {
    throw new Error('Either input or outputDir were not set.');
  }
  if (options.verbose) {
    setLogLevel('verbose', logger);
  }

  if (options.clearOutputDir) {
    await rmdir(options.outputDir, { recursive: true });
  }
  const inputFilePaths = await getInputFilePaths(options.input);

  const optionsPerService = await getOptionsPerService(inputFilePaths, options);
  const tsConfig = await tsconfigJson(options);

  const promises = inputFilePaths.map(inputFilePath =>
    generateService(
      inputFilePath,
      options,
      optionsPerService[getRelativePath(inputFilePath)],
      tsConfig
    )
  );

  try {
    const errorMessage =
      promises.length > 1
        ? 'Some clients could not be generated.'
        : 'Could not generate client.';
    await finishAll(promises, errorMessage);
  } finally {
    if (options.optionsPerService) {
      await generateOptionsPerService(
        options.optionsPerService,
        optionsPerService
      );
    }

    if (!options.packageJson) {
      logger.info(
        "Finished generation. Don't forget to add @sap-cloud-sdk/core to your dependencies."
      );
    }
  }
}

/**
 * Generate sources.
 * @param serviceDir Directory to generate the service to.
 * @param openApiDocument Parsed service.
 * @param inputFilePath Path to the input file.
 * @param tsConfig File content for the `tsconfig.json`.
 * @param options Generation options.
 */
async function generateSources(
  serviceDir: string,
  openApiDocument: OpenApiDocument,
  inputFilePath: string,
  tsConfig: string | undefined,
  options: ParsedGeneratorOptions
): Promise<void> {
  await mkdir(serviceDir, { recursive: true });

  await generateMandatorySources(serviceDir, openApiDocument, options);

  if (options.metadata) {
    await generateMetadata(openApiDocument, inputFilePath, options);
  }

  if (options.packageJson) {
    await generatePackageJson(
      serviceDir,
      openApiDocument.serviceOptions,
      options
    );
  }

  if (options.include) {
    await copyAdditionalFiles(serviceDir, options.include, options.overwrite);
  }

  if (tsConfig) {
    await createFile(
      serviceDir,
      'tsconfig.json',
      tsConfig,
      options.overwrite,
      false
    );
    await transpileDirectory(serviceDir, await readCompilerOptions(serviceDir));
  }

  if (options.readme) {
    await generateReadme(serviceDir, openApiDocument, options);
  }
}

async function generateMandatorySources(
  serviceDir: string,
  openApiDocument: OpenApiDocument,
  options: ParsedGeneratorOptions
) {
  if (openApiDocument.schemas.length) {
    const schemaDir = resolve(serviceDir, 'schema');
    await createSchemaFiles(schemaDir, openApiDocument, options);
    await createFile(
      schemaDir,
      'index.ts',
      schemaIndexFile(openApiDocument),
      options.overwrite
    );
  }

  await createApis(serviceDir, openApiDocument, options);
  await createFile(
    serviceDir,
    'index.ts',
    apiIndexFile(openApiDocument),
    options.overwrite
  );
}

async function createApis(
  serviceDir: string,
  openApiDocument: OpenApiDocument,
  options: ParsedGeneratorOptions
): Promise<void> {
  await Promise.all(
    openApiDocument.apis.map(api =>
      createFile(
        serviceDir,
        `${kebabCase(api.name)}.ts`,
        apiFile(api, openApiDocument.serviceName),
        options.overwrite
      )
    )
  );
}

async function createSchemaFiles(
  dir: string,
  openApiDocument: OpenApiDocument,
  options: ParsedGeneratorOptions
): Promise<void> {
  await mkdir(dir, { recursive: true });
  await Promise.all(
    openApiDocument.schemas.map(schema =>
      createFile(
        dir,
        `${schema.fileName}.ts`,
        schemaFile(schema),
        options.overwrite
      )
    )
  );
}

/**
 * Generates an OpenAPI service from a file.
 * @param inputFilePath The file path where the service to generate is located.
 * @param options Options to configure generation.
 * @param serviceOptions Service options as defined in the options per service.
 * @param tsConfig File content for the `tsconfig.json`.
 * @param serviceName The unique service name to be used.
 */
async function generateService(
  inputFilePath: string,
  options: ParsedGeneratorOptions,
  serviceOptions: ServiceOptions,
  tsConfig: string | undefined
): Promise<void> {
  const openApiDocument = await convertOpenApiSpec(inputFilePath);
  const parsedOpenApiDocument = await parseOpenApiDocument(
    openApiDocument,
    serviceOptions,
    { strictNaming: !options.skipValidation }
  );

  const serviceDir = resolve(options.outputDir, serviceOptions.directoryName);
  await generateSources(
    serviceDir,
    parsedOpenApiDocument,
    inputFilePath,
    tsConfig,
    options
  );
  logger.info(`Successfully generated client for '${inputFilePath}'`);
}

/**
 * Gives the relative path with respect tp pocess.cwd()/
 * @param absolutePath The absolute path
 * @returns The relative path
 * @hidden
 */
export function getRelativePath(absolutePath: string): string {
  return relative(process.cwd(), absolutePath);
}

/**
 * Recursively searches through a given input path and returns all file paths as a string array.
 * @param input the path to the input directory.
 * @returns all file paths as a string array.
 */
export async function getInputFilePaths(input: string): Promise<string[]> {
  if ((await lstat(input)).isFile()) {
    return [input];
  }

  const directoryContents = await readdir(input);

  return directoryContents.reduce(
    async (paths: Promise<string[]>, directoryContent) => [
      ...(await paths),
      ...(await getInputFilePaths(resolve(input, directoryContent)))
    ],
    Promise.resolve([] as string[])
  );
}

// TODO 1728 move to a new package to reduce code duplication.
async function copyAdditionalFiles(
  serviceDir: string,
  additionalFiles: string,
  overwrite: boolean
): Promise<void[]> {
  logger.verbose(
    `Copying additional files matching ${additionalFiles} into ${serviceDir}.`
  );

  return Promise.all(
    new GlobSync(additionalFiles!).found.map(filePath =>
      copyFile(
        resolve(filePath),
        join(serviceDir, basename(filePath)),
        overwrite
      )
    )
  );
}

function generateReadme(
  serviceDir: string,
  openApiDocument: OpenApiDocument,
  options: ParsedGeneratorOptions
): Promise<void> {
  logger.verbose(`Generating readme in ${serviceDir}.`);

  return createFile(
    serviceDir,
    'README.md',
    readme(openApiDocument),
    options.overwrite,
    false
  );
}

async function generateMetadata(
  openApiDocument: OpenApiDocument,
  inputFilePath: string,
  options: ParsedGeneratorOptions
) {
  const { name: inputFileName, dir: inputDirPath } = parse(inputFilePath);
  const { clientFileName, headerFileName } =
    getSdkMetadataFileNames(inputFileName);

  logger.verbose(`Generating header metadata ${headerFileName}.`);
  const metadataDir = resolve(inputDirPath, 'sdk-metadata');
  await mkdir(metadataDir, { recursive: true });
  const headerFile = createFile(
    metadataDir,
    headerFileName,
    JSON.stringify(
      await sdkMetadataHeader('rest', inputFileName, options.packageVersion),
      null,
      2
    ),
    options.overwrite,
    false
  );

  logger.verbose(`Generating client metadata ${clientFileName}...`);
  const clientFile = createFile(
    metadataDir,
    clientFileName,
    JSON.stringify(await sdkMetadata(openApiDocument), null, 2),
    options.overwrite,
    false
  );
  return Promise.all([headerFile, clientFile]);
}

async function generatePackageJson(
  serviceDir: string,
  { packageName, directoryName }: ServiceOptions,
  options: ParsedGeneratorOptions
) {
  logger.verbose(`Generating package.json in ${serviceDir}.`);

  await createFile(
    serviceDir,
    'package.json',
    packageJson(
      packageName,
      genericDescription(directoryName),
      await getSdkVersion(),
      options.packageVersion
    ),
    options.overwrite,
    false
  );
}

async function generateOptionsPerService(
  filePath: string,
  optionsPerService: OptionsPerService
) {
  logger.verbose('Generating options per service.');

  const dir = dirname(filePath);
  await mkdir(dir, { recursive: true });
  await createFile(
    dir,
    basename(filePath),
    formatJson(optionsPerService),
    true,
    false
  );
}
