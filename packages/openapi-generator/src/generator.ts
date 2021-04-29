/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { promises as promisesFs } from 'fs';
import { resolve, parse, basename, dirname, join, relative } from 'path';
import {
  createLogger,
  UniqueNameGenerator,
  kebabCase,
  finishAll,
  setLogLevel
} from '@sap-cloud-sdk/util';
import { GlobSync } from 'glob';
import {
  getSdkMetadataFileNames,
  getSdkVersion,
  sdkMetadataHeader
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
import { transpileDirectory } from './generator-utils';
import { createFile, copyFile } from './file-writer';
import {
  parseGeneratorOptions,
  ParsedGeneratorOptions,
  tsconfigJson,
  getServiceOptions,
  getOriginalOptionsPerService,
  ServiceOptions,
  OptionsPerService
} from './options';
import { sdkMetadata } from './sdk-metadata';
import { GeneratorOptions } from '.';

const { readdir, rmdir, mkdir, lstat } = promisesFs;
const logger = createLogger('openapi-generator');

/**
 * @experimental This API is experimental and might change in newer versions. Use with caution.
 * Main entry point for the OpenAPI client generation.
 * Generates models and API files.
 * @param options Options to configure generation.
 */
export async function generate(options: GeneratorOptions): Promise<void> {
  return generateWithParsedOptions(parseGeneratorOptions(options));
}

/**
 * @experimental This API is experimental and might change in newer versions. Use with caution.
 * Main entry point for the OpenAPI client generation.
 * Generates models and API files.
 * @param options Options to configure generation.
 */
export async function generateWithParsedOptions(
  options: ParsedGeneratorOptions
): Promise<void> {
  if (options.verbose) {
    setLogLevel('verbose', logger);
  }

  if (options.clearOutputDir) {
    await rmdir(options.outputDir, { recursive: true });
  }

  const uniqueNameGenerator = new UniqueNameGenerator('-');
  const inputFilePaths = await getInputFilePaths(options.input);
  const originalOptionsPerService = await getOriginalOptionsPerService(
    options.optionsPerService
  );
  const optionsPerService = {};
  const tsConfig = await tsconfigJson(options);

  const promises = inputFilePaths.map(inputFilePath => {
    const uniqueServiceName = uniqueNameGenerator.generateAndSaveUniqueName(
      parseServiceName(inputFilePath)
    );

    const relativeFilePath = relative(process.cwd(), inputFilePath);

    optionsPerService[relativeFilePath] = getServiceOptions(
      originalOptionsPerService,
      relativeFilePath,
      uniqueServiceName
    );

    return generateService(
      inputFilePath,
      options,
      optionsPerService[relativeFilePath],
      tsConfig,
      uniqueServiceName
    );
  });

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

  await generateMandatorySources(serviceDir, openApiDocument);

  if (options.metadata) {
    generateMetadata(openApiDocument, inputFilePath, options);
  }

  if (options.packageJson) {
    await generatePackageJson(
      serviceDir,
      openApiDocument.serviceOptions,
      options
    );
  }

  if (tsConfig) {
    await createFile(serviceDir, 'tsconfig.json', tsConfig, true, false);
    await transpileDirectory(serviceDir);
  }

  if (options.include) {
    await copyAdditionalFiles(options.include, serviceDir);
  }

  if (options.readme) {
    await generateReadme(serviceDir, openApiDocument);
  }
}

async function generateMandatorySources(
  serviceDir: string,
  openApiDocument: OpenApiDocument
) {
  if (openApiDocument.schemas.length) {
    const schemaDir = resolve(serviceDir, 'schema');
    await createSchemaFiles(schemaDir, openApiDocument);
    await createFile(
      schemaDir,
      'index.ts',
      schemaIndexFile(openApiDocument),
      true
    );
  }

  await createApis(serviceDir, openApiDocument);
  await createFile(serviceDir, 'index.ts', apiIndexFile(openApiDocument), true);
}

async function createApis(
  serviceDir: string,
  openApiDocument: OpenApiDocument
): Promise<void> {
  await Promise.all(
    openApiDocument.apis.map(api =>
      createFile(
        serviceDir,
        `${kebabCase(api.name)}.ts`,
        apiFile(api, openApiDocument.serviceName),
        true
      )
    )
  );
}

async function createSchemaFiles(
  dir: string,
  openApiDocument: OpenApiDocument
): Promise<void> {
  await mkdir(dir, { recursive: true });
  await Promise.all(
    openApiDocument.schemas.map(schema =>
      createFile(dir, `${schema.fileName}.ts`, schemaFile(schema), true)
    )
  );
}

/**
 * Parse the name of the service based on the file path.
 * @param filePath Path of the service specification.
 * @returns The parsed name.
 */
function parseServiceName(filePath: string): string {
  return parse(filePath).name.replace(/-openapi$/, '');
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
  tsConfig: string | undefined,
  serviceName: string
): Promise<void> {
  const openApiDocument = await convertOpenApiSpec(inputFilePath);
  const parsedOpenApiDocument = await parseOpenApiDocument(
    openApiDocument,
    serviceName,
    serviceOptions,
    { strictNaming: options.strictNaming }
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
    Promise.resolve([])
  );
}

// TODO 1728 move to a new package to reduce code duplication.
async function copyAdditionalFiles(
  additionalFiles: string,
  serviceDir: string
): Promise<void[]> {
  logger.verbose(
    `Copying additional files matching ${additionalFiles} into ${serviceDir}.`
  );

  return Promise.all(
    new GlobSync(additionalFiles!).found.map(filePath =>
      copyFile(resolve(filePath), join(serviceDir, basename(filePath)), true)
    )
  );
}

function generateReadme(
  serviceDir: string,
  openApiDocument: OpenApiDocument
): Promise<void> {
  logger.verbose(`Generating readme in ${serviceDir}.`);

  return createFile(
    serviceDir,
    'README.md',
    readme(openApiDocument),
    true,
    false
  );
}

async function generateMetadata(
  openApiDocument: OpenApiDocument,
  inputFilePath: string,
  options: ParsedGeneratorOptions
) {
  const { name: inputFileName, dir: inputDirPath } = parse(inputFilePath);
  const { clientFileName, headerFileName } = getSdkMetadataFileNames(
    inputFileName
  );

  logger.verbose(`Generating header metadata ${headerFileName}.`);
  const metadataDir = resolve(inputDirPath, 'sdk-metadata');
  await mkdir(metadataDir, { recursive: true });
  await createFile(
    metadataDir,
    headerFileName,
    JSON.stringify(
      await sdkMetadataHeader('rest', inputFileName, options.packageVersion),
      null,
      2
    ),
    true,
    false
  );

  logger.verbose(`Generating client metadata ${clientFileName}...`);
  await createFile(
    metadataDir,
    clientFileName,
    JSON.stringify(await sdkMetadata(openApiDocument, options), null, 2),
    true,
    false
  );
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
    true,
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
    JSON.stringify(optionsPerService, null, 2),
    true,
    false
  );
}
