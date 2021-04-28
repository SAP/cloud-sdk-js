/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { promises as promisesFs } from 'fs';
import { resolve, parse, basename, join, dirname } from 'path';
import {
  createLogger,
  UniqueNameGenerator,
  kebabCase,
  finishAll
} from '@sap-cloud-sdk/util';
import { GlobSync } from 'glob';
import {
  getSdkMetadataFileNames,
  sdkMetaDataHeader,
  getSdkVersion
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
  getOrCreateServiceConfig,
  getPerServiceConfig,
  ServiceConfig
} from './options';
import { GeneratorOptions } from '.';
import { sdkMetaDataJS } from './sdk-metadata/sdk-metadata';

const { readdir, rmdir, mkdir, lstat, readFile, writeFile } = promisesFs;
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
  if (options.clearOutputDir) {
    await rmdir(options.outputDir, { recursive: true });
  }

  const uniqueNameGenerator = new UniqueNameGenerator('-');
  const inputFilePaths = await getInputFilePaths(options.input);
  const perServiceConfig = await getPerServiceConfig(options.perServiceConfig);
  const tsConfig = await tsconfigJson(options);

  const promises = inputFilePaths.map(inputFilePath => {
    const uniqueServiceName = uniqueNameGenerator.generateAndSaveUniqueName(
      parseServiceName(inputFilePath)
    );

    return generateService(
      inputFilePath,
      options,
      getOrCreateServiceConfig(
        perServiceConfig,
        inputFilePath,
        uniqueServiceName
      ),
      tsConfig,
      uniqueServiceName
    );
  });

  const errorMessage =
    promises.length > 1
      ? 'Some clients could not be generated.'
      : 'Could not generate client.';
  await finishAll(promises, errorMessage);

  if (options.perServiceConfig) {
    writeFile(
      options.perServiceConfig,
      JSON.stringify(perServiceConfig, null, 2),
      'utf8'
    );
  }

  if (!options.packageJson) {
    logger.info(
      "Finished generation. Don't forget to add @sap-cloud-sdk/core to your dependencies."
    );
  }
}

/**
 * Generate sources.
 * @param serviceDir Directory to generate the service to.
 * @param openApiDocument Parsed service.
 * @param tsConfig File content for the `tsconfig.json`.
 * @param options Generation options.
 */
async function generateSources(
  serviceDir: string,
  openApiDocument: OpenApiDocument,
  tsConfig: string | undefined,
  options: ParsedGeneratorOptions
): Promise<void> {
  await mkdir(serviceDir, { recursive: true });

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

  if (options.generateSdkMetadata) {
    const { clientFileName, headerFileName } = getSdkMetadataFileNames(
      openApiDocument.originalFileName
    );

    logger.debug(`Generating sdk header metadata ${headerFileName}.`);
    const specFileDirname = dirname(openApiDocument.filePath);
    await mkdir(resolve(specFileDirname, 'sdk-metadata'), { recursive: true });
    await createFile(
      resolve(specFileDirname, 'sdk-metadata'),
      headerFileName,
      JSON.stringify(
        await sdkMetaDataHeader(
          'rest',
          openApiDocument.originalFileName,
          options.packageVersion
        ),
        null,
        2
      ),
      true,
      false
    );

    logger.debug(`Generating sdk client metadata ${clientFileName}...`);
    await createFile(
      resolve(specFileDirname, 'sdk-metadata'),
      clientFileName,
      JSON.stringify(await sdkMetaDataJS(openApiDocument, options), null, 2),
      true,
      false
    );
  }

  if (options.packageJson) {
    logger.debug(`Generating package.json in ${serviceDir}.`);

    await createFile(
      serviceDir,
      'package.json',
      packageJson(
        openApiDocument.packageName,
        genericDescription(openApiDocument.directoryName),
        await getSdkVersion(),
        options.packageVersion
      ),
      true,
      false
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
 * @param serviceConfig Service configuration as defined in the per service configuration.
 * @param tsConfig File content for the `tsconfig.json`.
 * @param serviceName The unique service name to be used.
 */
async function generateService(
  inputFilePath: string,
  options: ParsedGeneratorOptions,
  serviceConfig: ServiceConfig,
  tsConfig: string | undefined,
  serviceName: string
): Promise<void> {
  const serviceDir = resolve(options.outputDir, serviceConfig.directoryName);
  const openApiDocument = await convertOpenApiSpec(inputFilePath);
  const parsedOpenApiDocument = await parseOpenApiDocument(
    openApiDocument,
    serviceName,
    serviceConfig,
    { strictNaming: options.strictNaming }
  );

  await generateSources(serviceDir, parsedOpenApiDocument, tsConfig, options);
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
  logger.info(
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
  logger.info(`Generating readme in ${serviceDir}.`);

  return createFile(
    serviceDir,
    'README.md',
    readme(openApiDocument),
    true,
    false
  );
}
