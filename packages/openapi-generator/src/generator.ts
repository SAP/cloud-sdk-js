/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { promises as promisesFs } from 'fs';
import { resolve, parse, basename, join } from 'path';
import {
  createLogger,
  ErrorWithCause,
  UniqueNameGenerator
} from '@sap-cloud-sdk/util';
import execa = require('execa');
import voca from 'voca';
import { GlobSync } from 'glob';
import { GeneratorOptions } from './options';
import {
  apiFile,
  indexFile,
  packageJson,
  genericDescription,
  readme
} from './wrapper-files';
import { OpenApiDocument, OpenApiOperation } from './openapi-types';
import { parseOpenApiDocument } from './parser';
import { convertOpenApiSpec } from './document-converter';
import { readServiceMapping, VdmMapping } from './service-mapping';
import { tsconfigJson } from './wrapper-files/tsconfig-json';
import { transpileDirectory } from './generator-utils';
import { createFile } from './wrapper-files/create-file';
import { copyFile } from './wrapper-files/copy-file';

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
  await createApis(serviceDir, openApiDocument);
  await createFile(serviceDir, 'index.ts', indexFile(openApiDocument), true);
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
    openApiDocument.tags.map(tag =>
      createFile(
        serviceDir,
        buildApiFileName(tag),
        apiFile(
          openApiDocument.serviceName,
          tag,
          findOperationsWithTag(openApiDocument, tag)
        ),
        true
      )
    )
  );
}

function findOperationsWithTag(
  openApiDocument: OpenApiDocument,
  tag: string
): OpenApiOperation[] {
  return openApiDocument.operations.filter(operation =>
    operation.tags.includes(tag)
  );
}

function buildApiFileName(apiName: string) {
  return `${voca.kebabCase(apiName + 'Api')}.ts`;
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
    // The generator execution creates strange error objects, hence we add the method here:
    const errorMessage = `Could not generate the OpenApi client using the OpenApi generator CLI: ${
      err.message || err.stderr || err.shortMessage
    }`;
    throw new ErrorWithCause(errorMessage, err);
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

  if (!parsedOpenApiDocument.operations.length) {
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
