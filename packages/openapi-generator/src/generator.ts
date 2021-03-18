/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { promises as promisesFs } from 'fs';
import { resolve, parse, basename, join } from 'path';
import {
  createLogger,
  UniqueNameGenerator,
  kebabCase
} from '@sap-cloud-sdk/util';
import { GlobSync } from 'glob';
import { GeneratorOptions } from './options';
import {
  apiFile,
  packageJson,
  genericDescription,
  readme,
  apiIndexFile,
  modelIndexFile
} from './wrapper-files';
import { OpenApiDocument } from './openapi-types';
import { parseOpenApiDocument } from './parser';
import { convertOpenApiSpec } from './document-converter';
import { readServiceMapping, VdmMapping } from './service-mapping';
import { tsconfigJson } from './wrapper-files/tsconfig-json';
import { transpileDirectory } from './generator-utils';
import { createFile } from './wrapper-files/create-file';
import { copyFile } from './wrapper-files/copy-file';
import { interfaceFile } from './wrapper-files/interface-file';

const { readdir, writeFile, rmdir, mkdir, lstat, readFile } = promisesFs;
const logger = createLogger('openapi-generator');

/**
 * @experimental This API is experimental and might change in newer versions. Use with caution.
 * Main entry point for OpenApi client generation.
 * Generates files using the OpenApi Generator CLI and wraps the resulting API in an SDK compatible API.
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

    return generateFromFile(
      inputFilePath,
      options,
      vdmMapping,
      uniqueServiceName
    );
  });
  await Promise.all(promises);
}

/**
 * Generate sources for the wrapped SAP Cloud SDK Api.
 * @param serviceDir Directory to generate the service to.
 * @param openApiDocument Parsed service.
 * @param options Generation options
 */
async function generateSDKSources(
  serviceDir: string,
  openApiDocument: OpenApiDocument,
  options: GeneratorOptions
): Promise<void> {
  // TODO: This isn't really "request builder" anymore
  logger.info(`Generating request builder in ${serviceDir}.`);
  // TODO: what about overwrite?
  if (openApiDocument.components.schemas.length) {
    const modelDir = resolve(serviceDir, 'model');
    await createInterfaceFiles(modelDir, openApiDocument);
    await createFile(
      modelDir,
      'index.ts',
      modelIndexFile(openApiDocument),
      true
    );
  }

  await createApis(serviceDir, openApiDocument);
  await createFile(serviceDir, 'index.ts', apiIndexFile(openApiDocument), true);

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
      createFile(serviceDir, `${kebabCase(api.name)}.ts`, apiFile(api), true)
    )
  );
}

async function createInterfaceFiles(
  dir: string,
  openApiDocument: OpenApiDocument
): Promise<void> {
  await mkdir(dir, { recursive: true });
  await Promise.all(
    openApiDocument.components.schemas.map(schema =>
      createFile(
        dir,
        `${kebabCase(schema.name)}.ts`,
        interfaceFile(schema),
        true
      )
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
 * Generates an OpenAPI Service from a file.
 * @param filePath The filepath where the service to generate is located.
 * @param options  Options to configure generation.
 * @param vdmMapping The vdmMapping for the OpenAPI generation.
 * @param serviceName The unique service name to be used.
 */
async function generateFromFile(
  filePath: string,
  options: GeneratorOptions,
  vdmMapping: VdmMapping,
  serviceName: string
): Promise<void> {
  const serviceDir = resolve(options.outputDir, serviceName);

  let openApiDocument;
  try {
    openApiDocument = await convertOpenApiSpec(filePath);
  } catch (err) {
    logger.error(
      `Could not convert document at ${filePath} to the format needed for parsing and generation. Skipping service generation.`
    );
    return;
  }
  const convertedInputFilePath = resolve(serviceDir, 'open-api.json');
  const parsedOpenApiDocument = await parseOpenApiDocument(
    openApiDocument,
    serviceName,
    filePath,
    vdmMapping
  );

  if (!parsedOpenApiDocument.apis.length) {
    logger.warn(
      `The given OpenApi specification does not contain any operations. Skipping generation for input file: ${filePath}`
    );
    return;
  }

  await mkdir(serviceDir, { recursive: true });
  await writeFile(
    convertedInputFilePath,
    JSON.stringify(openApiDocument, null, 2)
  );
  // await generateOpenApiService(convertedInputFilePath, serviceDir);
  await generateSDKSources(serviceDir, parsedOpenApiDocument, options);
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

/**
 * Get the current SDK version from the package json.
 * @returns The SDK version.
 */
export async function getSdkVersion(): Promise<string> {
  return JSON.parse(
    await readFile(resolve(__dirname, '../package.json'), 'utf8')
  ).version;
}

// TODO 1728 move to a new package for reduce code duplication.
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
