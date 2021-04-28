/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { promises as promisesFs } from 'fs';
import { resolve, parse, basename, join, dirname } from 'path';
import {
  createLogger,
  UniqueNameGenerator,
  kebabCase
} from '@sap-cloud-sdk/util';
import { GlobSync } from 'glob';
import {
  getSdkMetadataFileNames,
  sdkMetaDataHeader,
  getSdkVersion
} from '@sap-cloud-sdk/generator-common';
import { GeneratorOptions } from './options';
import {
  apiFile,
  packageJson,
  genericDescription,
  readme,
  apiIndexFile,
  schemaIndexFile,
  tsconfigJson,
  schemaFile
} from './file-serializer';
import { OpenApiDocument } from './openapi-types';
import { parseOpenApiDocument } from './parser';
import { convertOpenApiSpec } from './document-converter';
import { readServiceMapping, ServiceMapping } from './service-mapping';
import { transpileDirectory } from './generator-utils';
import { createFile, copyFile } from './file-writer';
import { sdkMetaDataJS } from './sdk-metadata/sdk-metadata';

const { readdir, rmdir, mkdir, lstat, readFile } = promisesFs;
const logger = createLogger('openapi-generator');

/**
 * @experimental This API is experimental and might change in newer versions. Use with caution.
 * Main entry point for the OpenAPI client generation.
 * Generates models and API files.
 * @param options Options to configure generation.
 */
export async function generate(options: GeneratorOptions): Promise<void> {
  options.serviceMapping =
    options.serviceMapping ||
    resolve(options.input.toString(), 'service-mapping.json');

  if (options.clearOutputDir) {
    await rmdir(options.outputDir, { recursive: true });
  }

  const vdmMapping = readServiceMapping(options);
  const uniqueNameGenerator = new UniqueNameGenerator('-');
  const inputFilePaths = await getInputFilePaths(options.input);

  const promises = inputFilePaths.map(inputFilePath => {
    const uniqueServiceName = uniqueNameGenerator.generateAndSaveUniqueName(
      parseServiceName(inputFilePath)
    );

    return generateService(
      inputFilePath,
      options,
      vdmMapping,
      uniqueServiceName
    );
  });
  await Promise.all(promises);
}

/**
 * Generate sources.
 * @param serviceDir Directory to generate the service to.
 * @param openApiDocument Parsed service.
 * @param options Generation options.
 */
async function generateSources(
  serviceDir: string,
  openApiDocument: OpenApiDocument,
  options: GeneratorOptions
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
    const specFileDirname = dirname(openApiDocument.specPath);
    await mkdir(resolve(specFileDirname, 'sdk-metadata'), { recursive: true });
    await createFile(
      resolve(specFileDirname, 'sdk-metadata'),
      headerFileName,
      JSON.stringify(
        await sdkMetaDataHeader(
          'rest',
          openApiDocument.originalFileName,
          options.versionInPackageJson
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

  if (options.generatePackageJson) {
    logger.debug(`Generating package.json in ${serviceDir}.`);

    await createFile(
      serviceDir,
      'package.json',
      packageJson(
        openApiDocument.npmPackageName,
        genericDescription(openApiDocument.directoryName),
        await getSdkVersion(),
        options.versionInPackageJson
      ),
      true,
      false
    );
  }

  if (options.generateJs) {
    await createFile(
      serviceDir,
      'tsconfig.json',
      tsconfigJson(options),
      true,
      false
    );
    await transpileDirectory(serviceDir);
  }

  if (options.additionalFiles) {
    await copyAdditionalFiles(options.additionalFiles, serviceDir);
  }

  if (options.writeReadme) {
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
 * @param serviceMapping The serviceMapping for the OpenAPI generation.
 * @param serviceName The unique service name to be used.
 */
async function generateService(
  inputFilePath: string,
  options: GeneratorOptions,
  serviceMapping: ServiceMapping,
  serviceName: string
): Promise<void> {
  const serviceDir = resolve(options.outputDir, serviceName);

  let openApiDocument;
  try {
    openApiDocument = await convertOpenApiSpec(inputFilePath);
  } catch (err) {
    logger.error(
      `Could not convert document at ${inputFilePath} to the format needed for parsing and generation. Skipping service generation.`
    );
    return;
  }
  const parsedOpenApiDocument = await parseOpenApiDocument(
    openApiDocument,
    serviceName,
    inputFilePath,
    serviceMapping
  );

  if (!parsedOpenApiDocument.apis.length) {
    logger.warn(
      `The given OpenApi specification does not contain any operations. Skipping generation for input file: ${inputFilePath}`
    );
    return;
  }

  await generateSources(serviceDir, parsedOpenApiDocument, options);
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
