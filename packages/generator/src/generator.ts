/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { PathLike, readFileSync } from 'fs';
import { relative, resolve } from 'path';
import { createLogger } from '@sap-cloud-sdk/util';
import { emptyDirSync } from 'fs-extra';
import {
  Directory,
  EmitResult,
  IndentationText,
  ModuleResolutionKind,
  Project,
  ProjectOptions,
  QuoteKind,
  ScriptTarget
} from 'ts-morph';
import { ModuleKind } from 'typescript';
import { packageJson as aggregatorPackageJson } from './aggregator-package/package-json';
import { readme as aggregatorReadme } from './aggregator-package/readme';
import { batchSourceFile } from './batch/file';
import { complexTypeSourceFile } from './complex-type/file';
import { entitySourceFile } from './entity/file';
import { copyFile, otherFile, sourceFile } from './file-generator';
import { functionImportSourceFile } from './function-import/file';
import { GeneratorOptions } from './generator-options';
import { cloudSdkVdmHack, npmCompliantName } from './generator-utils';
import {
  genericDescription,
  s4hanaCloudDescription
} from './package-description';
import { parseAllServices } from './parser';
import { requestBuilderSourceFile } from './request-builder/file';
import { serviceMappingFile } from './service-mapping';
import { csn } from './service/csn';
import { indexFile } from './service/index-file';
import { npmrc } from './service/npmrc';
import { packageJson } from './service/package-json';
import { readme } from './service/readme';
import { tsConfig } from './service/ts-config';
import { typedocJson } from './service/typedoc-json';
import { VdmServiceMetadata } from './vdm-types';

const logger = createLogger({
  package: 'generator',
  messageContext: 'generator'
});

export async function generate(
  options: GeneratorOptions
): Promise<void | EmitResult[]> {
  const project = await generateProject(options);
  if (!project) {
    throw Error('The project is undefined.');
  }

  await project.save();

  if (options.generateJs) {
    return emit(project, options);
  }

  return;
}

function emit(
  project: Project,
  options: GeneratorOptions
): Promise<EmitResult[]> {
  logger.info(
    'Starting to save files for project to disk. This can take a while...'
  );
  // Filter for .ts files, due to a bug in ts-morph. Has been fixed in a newer version of ts-morph
  const nonTsFiles = project
    .getSourceFiles()
    .filter(s => !s.getFilePath().endsWith('.ts'));
  nonTsFiles.forEach(f => project.removeSourceFile(f));

  const flatSourceFileList = project
    .getDirectories()
    // Filter only for files that are within the service subfolders
    .filter(d => isDescendant(d.getPath(), options))
    .map(d => d.getSourceFiles())
    .reduce((d, collected) => [...collected, ...d], []);
  return Promise.all(
    flatSourceFileList.map(file => {
      logger.info(`Saving file: ${file.getBaseName()}...`);
      return file.emit();
    })
  );
}

function isDescendant(path: string, options: GeneratorOptions): boolean {
  return !relative(options.outputDir.toString(), path).startsWith('..');
}

export async function generateProject(
  options: GeneratorOptions
): Promise<Project | undefined> {
  options = sanitizeOptions(options);
  const services = readServices(options);

  if (!services.length) {
    logger.warn(
      `No service definition files found. Recursively traversing directory: ${options.inputDir.toString()}!`
    );
    return;
  }

  if (options.clearOutputDir) {
    emptyDirSync(options.outputDir.toString());
  }

  const project = new Project(projectOptions());

  const promises = services.map(service =>
    generateSourcesForService(service, project, options)
  );
  await Promise.all(promises);

  if (!options.serviceMapping) {
    throw Error('The service mapping is undefined.');
  }

  project.createSourceFile(
    resolve(options.serviceMapping.toString()),
    serviceMappingFile(services),
    { overwrite: true }
  );

  generateAggregatorPackage(services, options, project);

  return project;
}

function generateAggregatorPackage(
  services: VdmServiceMetadata[],
  options: GeneratorOptions,
  project: Project
): void {
  if (
    typeof options.aggregatorNpmPackageName !== 'undefined' &&
    typeof options.aggregatorDirectoryName !== 'undefined'
  ) {
    const aggregatorPackageDir = project.createDirectory(
      resolvePath(options.aggregatorDirectoryName, options)
    );
    logger.info(
      `Generating package.json for project: ${aggregatorPackageDir}...`
    );
    otherFile(
      aggregatorPackageDir,
      'package.json',
      aggregatorPackageJson(
        cloudSdkVdmHack(npmCompliantName(options.aggregatorNpmPackageName)),
        services.map(service => service.npmPackageName),
        options.versionInPackageJson,
        getGeneratorVersion()
      ),
      options.forceOverwrite
    );

    if (options.writeReadme) {
      logger.info(
        `Generating README.md for project: ${aggregatorPackageDir}...`
      );
      otherFile(
        aggregatorPackageDir,
        'README.md',
        aggregatorReadme(services, options.aggregatorNpmPackageName),
        options.forceOverwrite
      );
    }

    if (options.changelogFile) {
      logger.info(
        `Generating CHANGELOG.md for project: ${aggregatorPackageDir}...`
      );
      copyChangelog(aggregatorPackageDir, options);
    }

    if (options.developerLicenceFile) {
      logger.info(
        `Generating DEVELOPER_LICENCE.md for project: ${aggregatorPackageDir}...`
      );
      copyDeveloperLicence(aggregatorPackageDir, options);
    }
  }
}

export async function generateSourcesForService(
  service: VdmServiceMetadata,
  project: Project,
  options: GeneratorOptions
): Promise<void> {
  const serviceDir = project.createDirectory(
    resolvePath(service.directoryName, options)
  );

  logger.info(`Generating entities for service: ${service.namespace}...`);

  if (options.generatePackageJson) {
    otherFile(
      serviceDir,
      'package.json',
      packageJson(
        service.npmPackageName,
        options.versionInPackageJson,
        getGeneratorVersion(),
        serviceDescription(service, options),
        options.sdkAfterVersionScript
      ),
      options.forceOverwrite
    );
  }

  otherFile(serviceDir, 'tsconfig.json', tsConfig(), options.forceOverwrite);

  sourceFile(
    serviceDir,
    'BatchRequest',
    batchSourceFile(service),
    options.forceOverwrite
  );

  service.entities.forEach(entity => {
    logger.info(`Generating entity: ${entity.className}...`);
    sourceFile(
      serviceDir,
      entity.className,
      entitySourceFile(entity, service),
      options.forceOverwrite
    );
    sourceFile(
      serviceDir,
      `${entity.className}RequestBuilder`,
      requestBuilderSourceFile(entity, service.oDataVersion),
      options.forceOverwrite
    );
  });

  service.complexTypes.forEach(complexType => {
    logger.info(`Generating complex type: ${complexType.typeName}...`);
    sourceFile(
      serviceDir,
      complexType.typeName,
      complexTypeSourceFile(complexType, service.oDataVersion),
      options.forceOverwrite
    );
  });

  if (service.functionImports && service.functionImports.length) {
    logger.info(
      `Generating function imports for service: ${service.namespace}...`
    );
    sourceFile(
      serviceDir,
      'function-imports',
      functionImportSourceFile(service),
      options.forceOverwrite
    );
  }

  sourceFile(serviceDir, 'index', indexFile(service), options.forceOverwrite);

  if (options.writeReadme) {
    logger.info(`Generating readme for service: ${service.namespace}...`);
    otherFile(
      serviceDir,
      'README.md',
      readme(service, options.s4hanaCloud),
      options.forceOverwrite
    );
  }

  if (options.developerLicenceFile) {
    logger.info(
      `Generating developer licence file for service: ${service.namespace}...`
    );
    copyDeveloperLicence(serviceDir, options);
  }

  if (options.changelogFile) {
    logger.info(
      `Generating change log file for service: ${service.namespace}...`
    );
    copyChangelog(serviceDir, options);
  }

  if (options.generateNpmrc) {
    logger.info(`Generating .npmrc for service: ${service.namespace}...`);
    otherFile(serviceDir, '.npmrc', npmrc(), options.forceOverwrite);
  }

  if (options.generateTypedocJson) {
    logger.info(`Generating typedoc.json for service: ${service.namespace}...`);
    otherFile(
      serviceDir,
      'typedoc.json',
      typedocJson(),
      options.forceOverwrite
    );
  }

  if (options.generateCSN) {
    try {
      logger.info(
        `Generating ${service.directoryName}-csn.json for service: ${service.namespace}...`
      );
      otherFile(
        serviceDir,
        `${service.directoryName}-csn.json`,
        await csn(service),
        options.forceOverwrite
      );
    } catch (e) {
      logger.error(
        `CSN creation for service ${service.originalFileName} failed. Original error: ${e.message}`
      );
    }
  }
}

function projectOptions(): ProjectOptions {
  return {
    addFilesFromTsConfig: false,
    manipulationSettings: {
      indentationText: IndentationText.TwoSpaces,
      insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces: true,
      quoteKind: QuoteKind.Single
    },
    compilerOptions: {
      target: ScriptTarget.ES5,
      module: ModuleKind.CommonJS,
      declaration: true,
      declarationMap: true,
      sourceMap: true,
      diagnostics: true,
      moduleResolution: ModuleResolutionKind.NodeJs,
      esModuleInterop: true,
      inlineSources: false,
      noImplicitAny: true
    }
  };
}

function readServices(options: GeneratorOptions): VdmServiceMetadata[] {
  const services = parseAllServices(options);
  if (!services.length) {
    logger.warn(
      `No service definition files found. Recursively traversing directory: ${options.inputDir.toString()}!`
    );
    return [];
  }
  return services;
}

function sanitizeOptions(options: GeneratorOptions): GeneratorOptions {
  options.serviceMapping =
    options.serviceMapping ||
    resolve(options.inputDir.toString(), 'service-mapping.json');
  options.aggregatorDirectoryName =
    options.aggregatorDirectoryName || options.aggregatorNpmPackageName;
  return options;
}

function getGeneratorVersion(): string {
  return JSON.parse(readFileSync(resolve(__dirname, '../package.json'), 'utf8'))
    .version;
}

function copyChangelog(
  toDirectory: Directory,
  options: GeneratorOptions
): void {
  if (options.changelogFile) {
    copyFile(
      options.changelogFile.toString(),
      'CHANGELOG.md',
      toDirectory,
      options.forceOverwrite
    );
  }
}

function copyDeveloperLicence(
  toDirectory: Directory,
  options: GeneratorOptions
): void {
  if (options.developerLicenceFile) {
    copyFile(
      options.developerLicenceFile.toString(),
      'DEVELOPER_LICENCE.md',
      toDirectory,
      options.forceOverwrite
    );
  }
}

function serviceDescription(
  service: VdmServiceMetadata,
  options: GeneratorOptions
): string {
  return options.s4hanaCloud
    ? s4hanaCloudDescription(service.directoryName)
    : genericDescription(service.directoryName);
}

function resolvePath(path: PathLike, options: GeneratorOptions): string {
  return resolve(options.outputDir.toString(), path.toString());
}
