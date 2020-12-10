/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { promises } from 'fs';
import { resolve, parse } from 'path';
import { createLogger, errorWithCause } from '@sap-cloud-sdk/util';
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
  const inputFilePaths = (await readdir(options.inputDir)).map(fileName =>
    resolve(options.inputDir, fileName)
  );

  inputFilePaths.forEach(async filePath => {
    const serviceName = parseServiceName(filePath);
    // TODO: get kebapcase unique directory name
    const serviceDir = resolve(options.outputDir, serviceName);
    const openApiDocument = await convertOpenApiSpec(filePath);
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
    const response = await execa('npx', generationArguments);
    if (response.stderr) {
      throw new Error(response.stderr);
    }
    logger.info(
      `Sucessfully generated a client using the OpenApi generator CLI ${response.stdout}`
    );
  } catch (err) {
    throw errorWithCause(
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
