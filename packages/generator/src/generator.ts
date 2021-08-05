import { PathLike } from 'fs';
import { resolve, basename, dirname } from 'path';
import { createLogger, splitInChunks } from '@sap-cloud-sdk/util';
import { emptyDirSync } from 'fs-extra';
import {
  Directory,
  IndentationText,
  ModuleResolutionKind,
  Project,
  ProjectOptions,
  QuoteKind,
  ScriptTarget
} from 'ts-morph';
import { ModuleKind } from 'typescript';
import { GlobSync } from 'glob';
import {
  getSdkMetadataFileNames,
  getVersionForClient,
  sdkMetadataHeader,
  getSdkVersion,
  transpileDirectory,
  readCompilerOptions
} from '@sap-cloud-sdk/generator-common';
import { packageJson as aggregatorPackageJson } from './aggregator-package/package-json';
import { readme as aggregatorReadme } from './aggregator-package/readme';
import { batchSourceFile } from './batch/file';
import { complexTypeSourceFile } from './complex-type/file';
import { entitySourceFile } from './entity/file';
import { copyFile, otherFile, sourceFile } from './file-generator';
import {
  defaultValueProcessesJsGeneration,
  GeneratorOptions
} from './generator-options';
import {
  cloudSdkVdmHack,
  hasEntities,
  npmCompliantName
} from './generator-utils';
import { parseAllServices } from './edmx-to-vdm';
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
import {
  actionImportSourceFile,
  functionImportSourceFile
} from './action-function-import';
import { enumTypeSourceFile } from './enum-type/file';
import { sdkMetadata, getServiceDescription } from './sdk-metadata';

const logger = createLogger({
  package: 'generator',
  messageContext: 'generator'
});

export async function generate(options: GeneratorOptions): Promise<void> {
  const project = await generateProject(options);
  if (!project) {
    throw Error('The project is undefined.');
  }

  await project.save();
  if (options.generateJs) {
    const directories = project
      .getDirectories()
      .filter(dir => !!dir.getSourceFile('tsconfig.json'));
    const chunks = splitInChunks(
      directories,
      options.processesJsGeneration || defaultValueProcessesJsGeneration
    );
    await chunks.reduce(
      (all, chunk) => all.then(() => transpileDirectories(chunk)),
      Promise.resolve()
    );
  }
}

export async function transpileDirectories(
  directories: Directory[]
): Promise<void[]> {
  return Promise.all(
    directories.map(async directory => {
      const compilerOptions = await readCompilerOptions(directory.getPath());
      return transpileDirectory(directory.getPath(), compilerOptions);
    })
  );
}

export async function generateProject(
  options: GeneratorOptions
): Promise<Project | undefined> {
  options = sanitizeOptions(options);
  const services = parseServices(options);

  if (!services.length) {
    logger.warn('No services parsed.');
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

  await generateAggregatorPackage(services, options, project);

  return project;
}

async function generateAggregatorPackage(
  services: VdmServiceMetadata[],
  options: GeneratorOptions,
  project: Project
): Promise<void> {
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
        await getSdkVersion()
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

    if (options.additionalFiles) {
      logger.info(
        `Copying additional files matching ${options.additionalFiles} for project: ${aggregatorPackageDir}...`
      );

      copyAdditionalFiles(aggregatorPackageDir, options);
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

  logger.info(`[${service.originalFileName}] Generating entities ...`);

  if (options.generatePackageJson) {
    otherFile(
      serviceDir,
      'package.json',
      await packageJson(
        service.npmPackageName,
        await getVersionForClient(options.versionInPackageJson),
        getServiceDescription(service, options),
        options.sdkAfterVersionScript
      ),
      options.forceOverwrite
    );
  }

  otherFile(serviceDir, 'tsconfig.json', tsConfig(), options.forceOverwrite);

  if (hasEntities(service)) {
    logger.info(
      `[${service.originalFileName}] Generating batch request builder ...`
    );
    sourceFile(
      serviceDir,
      'BatchRequest',
      batchSourceFile(service),
      options.forceOverwrite
    );
  }

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

  service.enumTypes.forEach(enumType => {
    logger.info(
      `[${service.originalFileName}] Generating enum type ${enumType.originalName} ...`
    );
    sourceFile(
      serviceDir,
      enumType.typeName,
      enumTypeSourceFile(enumType),
      options.forceOverwrite
    );
  });

  service.complexTypes.forEach(complexType => {
    logger.info(
      `[${service.originalFileName}] Generating complex type ${complexType.originalName} ...`
    );
    sourceFile(
      serviceDir,
      complexType.typeName,
      complexTypeSourceFile(complexType, service.oDataVersion),
      options.forceOverwrite
    );
  });

  if (service.functionImports && service.functionImports.length) {
    logger.info(
      `[${service.originalFileName}] Generating function imports ...`
    );
    sourceFile(
      serviceDir,
      'function-imports',
      functionImportSourceFile(service),
      options.forceOverwrite
    );
  }

  if (service.actionsImports && service.actionsImports.length) {
    logger.info(`[${service.originalFileName}] Generating action imports ...`);
    sourceFile(
      serviceDir,
      'action-imports',
      actionImportSourceFile(service),
      options.forceOverwrite
    );
  }

  sourceFile(serviceDir, 'index', indexFile(service), options.forceOverwrite);

  if (options.writeReadme) {
    logger.info(`[${service.originalFileName}] Generating readme ...`);
    otherFile(
      serviceDir,
      'README.md',
      readme(service, options.s4hanaCloud),
      options.forceOverwrite
    );
  }

  if (options.additionalFiles) {
    logger.info(
      `Copying additional files matching ${options.additionalFiles} for project: ${serviceDir}...`
    );
    copyAdditionalFiles(serviceDir, options);
  }

  if (options.generateNpmrc) {
    logger.info(`[${service.originalFileName}] Generating .npmrc for ...`);
    otherFile(serviceDir, '.npmrc', npmrc(), options.forceOverwrite);
  }

  if (options.generateTypedocJson) {
    logger.info(`[${service.originalFileName}] Generating typedoc.json ...`);
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
        `[${service.originalFileName}] Generating ${service.directoryName}-csn.json ...`
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

  if (options.generateSdkMetadata) {
    const { clientFileName, headerFileName } = getSdkMetadataFileNames(
      service.originalFileName
    );
    logger.info(`Generating sdk header metadata ${headerFileName}...`);
    const metadataDir = project.createDirectory(
      resolve(dirname(service.edmxPath.toString()), 'sdk-metadata')
    );

    otherFile(
      metadataDir,
      headerFileName,
      JSON.stringify(
        await sdkMetadataHeader(
          'odata',
          service.originalFileName,
          options.versionInPackageJson
        ),
        null,
        2
      ),
      options.forceOverwrite
    );

    logger.info(`Generating sdk client metadata ${clientFileName}...`);
    otherFile(
      metadataDir,
      clientFileName,
      JSON.stringify(await sdkMetadata(service, options), null, 2),
      options.forceOverwrite
    );
  }
}

function projectOptions(): ProjectOptions {
  return {
    skipAddingFilesFromTsConfig: true,
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

function parseServices(options: GeneratorOptions): VdmServiceMetadata[] {
  const services = parseAllServices(options);
  if (!services.length) {
    logger.warn('No service definition files found.');
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

// TODO 1728 move to a new package for reduce code duplication.
function copyAdditionalFiles(
  toDirectory: Directory,
  options: GeneratorOptions
) {
  if (options.additionalFiles) {
    new GlobSync(options.additionalFiles).found.forEach(filePath => {
      copyFile(
        filePath,
        basename(filePath),
        toDirectory,
        options.forceOverwrite
      );
    });
  }
}

function resolvePath(path: PathLike, options: GeneratorOptions): string {
  return resolve(options.outputDir.toString(), path.toString());
}
