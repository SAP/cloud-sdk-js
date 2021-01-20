/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { promises } from 'fs';
import { resolve, parse } from 'path';
import {
  createLogger,
  ErrorWithCause,
  UniqueNameGenerator
} from '@sap-cloud-sdk/util';
import execa = require('execa');
import { GeneratorOptions } from './options';
import {
  apiFile,
  indexFile,
  createFile,
  packageJson,
  genericDescription
} from './wrapper-files';
import { OpenApiDocument } from './openapi-types';
import { parseOpenApiDocument } from './parser';
import { convertOpenApiSpec } from './document-converter';
import { readServiceMapping, VdmMapping } from './service-mapping';

const { readdir, writeFile, rmdir, mkdir, lstat, readFile } = promises;
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
  inputFilePaths.forEach(async inputFilePath => {
    const uniqueServiceName = uniqueNameGenerator.generateAndSaveUniqueName(
      parseServiceName(inputFilePath)
    );

    await generateFromFile(
      inputFilePath,
      options,
      vdmMapping,
      uniqueServiceName
    );
  });
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
  logger.info(`Generating request builder in ${serviceDir}.`);
  // TODO: what about overwrite?
  await createFile(serviceDir, 'api.ts', apiFile(openApiDocument), true);
  await createFile(serviceDir, 'index.ts', indexFile(), true);
  if (options.generatePackageJson) {
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
}

/**
 * Generate an OpenApiClient using the OpenApi Generator CLI.
 * @param inputFilePath Location of the spec file.
 * @param serviceDir Directory to generate the service to. The resulting client will be created in `serviceDir/openapi`
 */
async function generateOpenApiService(
  inputFilePath: string,
  serviceDir: string
) {
  // TODO: what about overwrite?
  const generationArguments = [
    'openapi-generator-cli',
    'generate',
    '--input-spec',
    inputFilePath,
    '--generator-name',
    'typescript-axios',
    '--output',
    resolve(serviceDir, 'openapi'),
    '--template-dir',
    resolve(__dirname, './templates'),
    '--api-package',
    'api',
    '--model-package',
    'model',
    '--additional-properties',
    'withSeparateModelsAndApi=true',
    '--skip-validate-spec'
  ];

  logger.debug(`OpenAPI generator CLI arguments: ${generationArguments}`);

  try {
    const response = await execa('npx', generationArguments, {
      cwd: resolve(__dirname, '..')
    });
    if (response.stderr) {
      throw new Error(response.stderr);
    }
    logger.info(
      `Successfully generated a client using the OpenApi generator CLI ${response.stdout}`
    );
  } catch (err) {
    throw new ErrorWithCause(
      'Could not generate the OpenApi client using the OpenApi generator CLI.',
      err
    );
  }
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
 * @param uniqueServiceName The uniqueServiceName to be used.
 */
async function generateFromFile(
  filePath: string,
  options: GeneratorOptions,
  vdmMapping: VdmMapping,
  uniqueServiceName: string
): Promise<void> {
  const serviceName = uniqueServiceName;
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

  if (!parsedOpenApiDocument.operations.length) {
    logger.warn(
      `The given OpenApi specificaton does not contain any operations. Skipping generation for input file: ${filePath}`
    );
    return;
  }

  await mkdir(serviceDir, { recursive: true });
  await writeFile(
    convertedInputFilePath,
    JSON.stringify(openApiDocument, null, 2)
  );

  await generateOpenApiService(convertedInputFilePath, serviceDir);
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
  const inputFilePaths = directoryContents.reduce(
    async (paths: Promise<string[]>, directoryContent) => [
      ...(await paths),
      ...(await getInputFilePaths(resolve(input, directoryContent)))
    ],
    Promise.resolve([])
  );
  return inputFilePaths;
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
