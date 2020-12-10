/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { promises } from 'fs';
import { resolve } from 'path';
import { createLogger, errorWithCause } from '@sap-cloud-sdk/util';
import execa = require('execa');
import { OpenAPIV3 } from 'openapi-types';
import { convert } from 'swagger2openapi';
import { GeneratorOptions } from './options';
import { apiFile, indexFile, createFile } from './wrapper-files';
import { OpenApiDocument } from './openapi-types';
import { parseOpenApiDocument } from './parser';

const { readdir, readFile, writeFile, rmdir, mkdir } = promises;
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
    const openApiDocument = await parseOpenApiDocument(filePath);
    if (!openApiDocument.operations.length) {
      logger.warn(
        `The given OpenApi specificaton does not contain any operations. Skipping generation for input file: ${filePath}`
      );
      return;
    }
    // TODO: get kebapcase unique directory name
    const serviceDir = resolve(
      options.outputDir,
      openApiDocument.serviceDirName
    );
    const adjustedInputFilePath = resolve(serviceDir, 'open-api.json');
    const fileContent = await readFile(filePath, 'utf8');

    await mkdir(serviceDir, { recursive: true });
    await generateSpecWithGlobalTag(fileContent, adjustedInputFilePath);
    await generateOpenApiService(adjustedInputFilePath, serviceDir);
    await generateSDKSources(serviceDir, openApiDocument, options);
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
 * Workaround for OpenApi generation to build one and only one API for all tags.
 * Write a new spec with only one 'default' tag.
 * @param fileContent File content of the original spec.
 * @param ouputFilePath Path to write the altered spec to.
 */
async function generateSpecWithGlobalTag(
  fileContent: string,
  ouputFilePath: string
): Promise<void> {
  const openApiDocument = JSON.parse(fileContent);
  const modifiedOpenApiDocument = createSpecWithGlobalTag(
    await convertDocToOpenApi3(openApiDocument)
  );
  return writeFile(
    ouputFilePath,
    JSON.stringify(modifiedOpenApiDocument, null, 2)
  );
}

/**
 * Workaround for OpenApi generation to build one and only one API for all tags.
 * Modify spec to contain only one 'default' tag.
 * @param openApiDocument OpenApi JSON document.
 * @returns The modified document.
 */
export function createSpecWithGlobalTag(
  openApiDocument: OpenAPIV3.Document
): OpenAPIV3.Document {
  const tag = 'default';
  openApiDocument.tags = [{ name: tag }];

  Object.values(openApiDocument.paths).forEach(
    (pathDefinition: Record<string, any>) => {
      Object.values(pathDefinition).forEach(methodDefinition => {
        methodDefinition.tags = [tag];
      });
    }
  );

  return openApiDocument;
}

export async function convertDocToOpenApi3(doc: any) {
  return (await convert(doc, {})).openapi;
}
