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
import { GeneratorOptions } from './generator-cli';
import {
  ClassDeclarationStructure,
  MethodDeclarationStructure,
  Project,
  SourceFileStructure, StructureKind
} from 'ts-morph';
import { projectOptions, sourceFile } from './utils';
import { toOpenApiModel } from './parse-open-api-json';
import { OpenApiPath, OpenApiServiceMetadata } from './open-api-types';
import { requestBuilderSourceFile } from './request-builder/file';

const logger = createLogger({
  level: 'info',
  messageContext: 'rest-generator'
});

export async function generateRest(options: GeneratorOptions): Promise<void> {
  cleanDirectory(options.outputDir);

  const files = readdirSync(options.inputDir);
  const pathToTemplates = resolve(__dirname, '../templates');
  const pathToMustacheValues = join(__dirname, '../mustache-values.json');

  const project = new Project(projectOptions());

  const openApiServiceMetadata = await Promise.all(
    files.map(async file => generateOneApi(file, options, pathToTemplates, pathToMustacheValues))
  );
  openApiServiceMetadata.map(metadata => generateSourcesForService(metadata, project, options));
  await project.save();
}

async function generateOneApi(file: string, options: GeneratorOptions, pathToTemplates: string, pathToMustacheValues: string) {
  const folderForService = getFolderForService(options.outputDir, file);
  mkdirSync(folderForService);

  const serviceName = getServiceNameCamelCase(file);
  const adjustedOpenApiContent = getAdjustedOpenApiFile(
    join(options.inputDir, file),
    serviceName
  );
  const pathToAdjustedOpenApiDefFile = join(
    folderForService,
    'open-api.json'
  );
  writeJsonSync(pathToAdjustedOpenApiDefFile, adjustedOpenApiContent);
  // todo
  await generateFilesUsingOpenAPI(folderForService, pathToAdjustedOpenApiDefFile, pathToTemplates, pathToMustacheValues);

  const openApiModel = toOpenApiModel(pathToAdjustedOpenApiDefFile, serviceName, folderForService);
  return openApiModel;
}

function generateSourcesForService(  serviceMetadata: OpenApiServiceMetadata,
                                     project: Project,
                                     options: GeneratorOptions){
  const serviceDir = project.createDirectory(resolve(options.outputDir.toString(), serviceMetadata.serviceDir));
  console.log(`Generating request builder in ${serviceDir}.`);
  sourceFile(
    serviceDir,
    'request-builder',
    requestBuilderSourceFile(serviceMetadata),
    true
  );
}

async function generateFilesUsingOpenAPI(folderForService: string, pathToAdjustedOpenApiDefFile: string, pathToTemplates: string, pathToMustacheValues: string) {
  const generationArguments = [
    'openapi-generator',
    'generate',
    '-i',
    pathToAdjustedOpenApiDefFile,
    '-g',
    'typescript-axios',
    '-o',
    folderForService,
    '-t',
    pathToTemplates,
    '--api-package',
    'api',
    '--model-package',
    'model',
    '--config',
    pathToMustacheValues,
    '--skip-validate-spec'
  ];

  logger.info(`Argument for openapi generator ${generationArguments}`);

  try {
    const response = await execa('npx', generationArguments).catch(err => {
      logger.error('In exception block 2');
      logger.error(err);
    });
    if (response !== undefined) {
      logger.info(`Generated the client ${response.stdout}`);
    }
  } catch (err) {
    logger.error('In exception block');
    logger.error(err);
  }
}

function getServiceNameCamelCase(openApiFileName: string) {
  const result = getServiceNameWithoutExtentions(openApiFileName);
  return toPascalCase(result);
}

function getServiceNameWithoutExtentions(openApiFileName: string): string {
  let fileNameWithoutExtension = openApiFileName.replace('.json', '');
  fileNameWithoutExtension = fileNameWithoutExtension.replace('-openapi', '');
  return fileNameWithoutExtension;
}

function getFolderForService(folderDestination: PathLike, fileName: string) {
  const withoutExtension = getServiceNameWithoutExtentions(fileName);
  return join(folderDestination as string, withoutExtension);
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
