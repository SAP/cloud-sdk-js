/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { promises } from 'fs';
import { resolve } from 'path';
import { createLogger } from '@sap-cloud-sdk/util';
import execa from 'execa';
import { GeneratorOptions } from './commands/generate-rest-client';
import { cleanDirectory, createDirectory, createFile } from './util';
import { apiFile } from './api-file';
import { indexFile } from './index-file';
import { parseOpenApiDocument } from './openapi-parser';
import { OpenApiDocument } from './openapi-types';
const { readdir, readFile, writeFile } = promises;
const logger = createLogger('rest-generator');

/**
 * @experimental This API is experimental and might change in newer versions. Use with caution.
 * Main entry point for REST client generation.
 * Generates files using the OpenApi Generator CLI and wraps the resulting API in an SDK compatible API.
 * @param options Options to configure generation.
 */
export async function generateClients(
  options: GeneratorOptions
): Promise<void> {
  if (options.clearOutputDir) {
    cleanDirectory(options.outputDir);
  }

  // TODO: should be recursive
  const inputFilePaths = (await readdir(options.inputDir)).map(fileName =>
    resolve(options.inputDir, fileName)
  );

  inputFilePaths.forEach(async filePath => {
    // TODO: get kebapcase unique directory name
    const openApiDocument = await parseOpenApiDocument(filePath);
    const serviceDir = resolve(
      options.outputDir,
      openApiDocument.serviceDirName
    );
    const adjustedInputFilePath = resolve(serviceDir, 'open-api.json');
    const fileContent = await readFile(filePath, 'utf8');

    await createDirectory(serviceDir);
    await createSpecWithGlobalTag(fileContent, adjustedInputFilePath);

    await generateOpenApiService(adjustedInputFilePath, serviceDir);

    generateSDKSources(serviceDir, openApiDocument, options);
  });
}

/**
 * Generate sources for the wrapped SAP Cloud SDK Api.
 * @param serviceDir Directory to generate the service to.
 * @param openApiDocument Parsed service.
 * @param options Generation options
 */
function generateSDKSources(
  serviceDir: string,
  openApiDocument: OpenApiDocument,
  options: GeneratorOptions
) {
  logger.info(`Generating request builder in ${serviceDir}.`);
  // TODO: what about overwrite?
  createFile(serviceDir, 'api.ts', apiFile(openApiDocument), true);
  createFile(serviceDir, 'index.ts', indexFile(), true);
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

  logger.debug(`OpenAPI generator arguments: ${generationArguments}`);

  const response = await execa.sync('npx', generationArguments);
  // The exitCode of the response is sometimes 0 even if errors appeared. Hence we check if something is in stderr.
  if (response === undefined) {
    throw new Error(
      'An error appeared in the generation using the openppi CLI.'
    );
  }
  if (response.stderr) {
    throw new Error(response.stderr);
  }
  logger.info(`Generated the client ${response.stdout}`);
}

/**
 * Workaround for OpenApi generation to build one and only one API for all tags.
 * Write a new spec with only one 'default' tag.
 * @param fileContent File content of the original spec.
 * @param ouputFilePath Path to write the altered spec to.
 */
async function createSpecWithGlobalTag(
  fileContent: string,
  ouputFilePath: string
): Promise<void> {
  const openApiDocument = JSON.parse(fileContent);
  const tag = 'default';
  openApiDocument.tags = [{ name: tag }];

  Object.values(openApiDocument.paths).forEach(
    (pathDefinition: Record<string, any>) => {
      Object.values(pathDefinition).forEach(methodDefinition => {
        methodDefinition.tags = [tag];
      });
    }
  );

  return writeFile(ouputFilePath, JSON.stringify(openApiDocument, null, 2));
}
