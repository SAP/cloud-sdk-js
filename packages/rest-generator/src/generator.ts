/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { PathLike } from 'fs';
import { join, resolve } from 'path';
import { toPascalCase } from '@sap-cloud-sdk/core';
import { createLogger } from '@sap-cloud-sdk/util';
import execa from 'execa';
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readJsonSync,
  removeSync,
  writeJsonSync
} from 'fs-extra';
import { Project } from 'ts-morph';
import { GeneratorOptions } from './commands/generate-rest-client';
import { projectOptions, sourceFile } from './utils';
import { toOpenApiServiceMetaData } from './parse-open-api-json';
import { OpenApiServiceMetadata } from './open-api-types';
import { requestBuilderSourceFile } from './request-builder/file';
import { indexFile } from './index-file';

const logger = createLogger({
  level: 'info',
  package: 'generator',
  messageContext: 'rest-generator'
});

export async function generateRest(options: GeneratorOptions): Promise<void> {
  const project = await generateProject(options);
  return project.save();
}

export async function generateProject(options: GeneratorOptions) {
  if (options.clearOutputDir) {
    cleanDirectory(options.outputDir);
  }

  const files = readdirSync(options.inputDir);
  const pathToTemplates = resolve(__dirname, './templates');

  const project = new Project(projectOptions());

  const openApiServiceMetadata = await Promise.all(
    files.map(async file => generateOneApi(file, options, pathToTemplates))
  );
  openApiServiceMetadata.map(metadata =>
    generateSourcesForService(metadata, project, options)
  );
  return project;
}

async function generateOneApi(
  inputFileName: string,
  options: GeneratorOptions,
  pathToTemplates: string
) {
  const dirForService = getDirForService(options.outputDir, inputFileName);
  if (!existsSync(dirForService)) {
    mkdirSync(dirForService, { recursive: true });
  }

  const serviceName = getServiceNamePascalCase(inputFileName);
  const adjustedOpenApiContent = getAdjustedOpenApiFile(
    join(options.inputDir, inputFileName),
    serviceName
  );
  const pathToAdjustedOpenApiDefFile = join(dirForService, 'open-api.json');
  writeJsonSync(pathToAdjustedOpenApiDefFile, adjustedOpenApiContent);

  await generateFilesUsingOpenAPI(
    dirForService,
    pathToAdjustedOpenApiDefFile,
    pathToTemplates
  );

  return toOpenApiServiceMetaData(
    pathToAdjustedOpenApiDefFile,
    serviceName,
    dirForService
  );
}

function generateSourcesForService(
  serviceMetadata: OpenApiServiceMetadata,
  project: Project,
  options: GeneratorOptions
) {
  const serviceDir = project.createDirectory(
    resolve(options.outputDir.toString(), serviceMetadata.serviceDir)
  );
  logger.info(`Generating request builder in ${serviceDir.getBaseName()}.`);
  sourceFile(
    serviceDir,
    'request-builder',
    requestBuilderSourceFile(serviceMetadata),
    true
  );

  sourceFile(serviceDir, 'index', indexFile(), true);
}

async function generateFilesUsingOpenAPI(
  dirForService: string,
  pathToAdjustedOpenApiDefFile: string,
  pathToTemplates: string
) {
  const generationArguments = [
    'openapi-generator-cli',
    'generate',
    '-i',
    pathToAdjustedOpenApiDefFile,
    '-g',
    'typescript-axios',
    '-o',
    resolve(dirForService, 'open-api'),
    '-t',
    pathToTemplates,
    '--api-package',
    'api',
    '--model-package',
    'model',
    '--additional-properties',
    'withSeparateModelsAndApi=true',
    '--skip-validate-spec'
  ];

  logger.info(`Argument for openapi generator ${generationArguments}`);

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

function getServiceNamePascalCase(openApiFileName: string) {
  const result = getServiceNameWithoutExtensions(openApiFileName);
  return toPascalCase(result);
}

function getServiceNameWithoutExtensions(openApiFileName: string): string {
  let fileNameWithoutExtension = openApiFileName.replace('.json', '');
  fileNameWithoutExtension = fileNameWithoutExtension.replace('-openapi', '');
  return fileNameWithoutExtension;
}

function getDirForService(outputDir: PathLike, inputFileName: string) {
  const withoutExtension = getServiceNameWithoutExtensions(inputFileName);
  return join(outputDir as string, withoutExtension);
}

function getAdjustedOpenApiFile(filePath: string, tag: string): JSON {
  const contentInitial = readJsonSync(filePath);
  const contentAdjusted = addTagToService(tag, contentInitial);
  return contentAdjusted;
}

function cleanDirectory(path: PathLike) {
  if (existsSync(path)) {
    removeSync(path.toString());
  }
  mkdirSync(path);
}

function addTagToService(tag: string, fileContent: JSON): JSON {
  const copy = { ...fileContent };
  copy['tags'] = [{ name: tag }];
  const paths = copy['paths'];
  Object.keys(paths).forEach(path => {
    Object.keys(paths[path]).forEach(method => {
      paths[path][method]['tags'] = [
        ...(paths[path][method]['tags'] || []),
        tag
      ];
    });
  });
  return copy;
}
