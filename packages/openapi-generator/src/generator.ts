/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { promises, statSync } from 'fs';
import { resolve, parse, basename, dirname } from 'path';
import { createLogger, ErrorWithCause } from '@sap-cloud-sdk/util';
import execa = require('execa');
import { GeneratorOptions } from './options';
import { apiFile, indexFile, createFile } from './wrapper-files';
import { OpenApiDocument } from './openapi-types';
import { parseOpenApiDocument } from './parser';
import { convertOpenApiSpec } from './document-converter';

const { readdir, writeFile, rmdir, mkdir } = promises;
const logger = createLogger('openapi-generator');

/**
 * @experimental This API is experimental and might change in newer versions. Use with caution.
 * Main entry point for OpenApi client generation.
 * Generates files using the OpenApi Generator CLI and wraps the resulting API in an SDK compatible API.
 * @param options Options to configure generation.
 */
export async function generate(options: GeneratorOptions): Promise<void> {
  if (options.clearOutputDir) {
    await rmdir(options.outputDir, { recursive: true });
  }

  // TODO: should be recursive
  if (statSync(options.input).isFile()) {
    const inputFilePath = options.input;
    generateFromFile(inputFilePath, options);
  } else {
    const inputFilePaths = (await readdir(options.input)).map(fileName =>
      resolve(options.input, fileName)
    );
    inputFilePaths.forEach(filePath => generateFromFile(filePath, options));
  }
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
      `Sucessfully generated a client using the OpenApi generator CLI ${response.stdout}`
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
 * Checks if a service already exists in the output directory.
 * @param serviceName The name of the service to be searched.
 * @param outputDir Path to the output directory.
 * @returns 'true' if a duplicate service is already in the output directory.
 */
async function duplicateServiceExists(
  serviceName: string,
  outputDir: string
): Promise<boolean> {
  const currentOutput: string[] = await readdir(outputDir);
  currentOutput.forEach(fileName => {
    if (serviceName === fileName) {
      return true;
    }
  });
  return false;
}

/**
 * Generates an OpenAPI Service from a file.
 * @param filePath The filepath where the service to generate is located.
 * @param options  Options to configure generation.
 */
async function generateFromFile(
  filePath: string,
  options: GeneratorOptions
): Promise<void> {
  const serviceName = parseServiceName(filePath);

  let serviceDir: string;
  if (await duplicateServiceExists(serviceName, options.outputDir)) {
    serviceDir = resolve(
      options.outputDir,
      basename(dirname(filePath)) + '-' + serviceName
    );
  } else {
    serviceDir = resolve(options.outputDir, serviceName);
  }

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
    serviceName
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
