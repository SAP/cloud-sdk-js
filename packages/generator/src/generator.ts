import { PathLike } from 'fs';
import { resolve, dirname } from 'path';
import {
  createLogger,
  ErrorWithCause,
  splitInChunks
} from '@sap-cloud-sdk/util';
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
  transpileDirectory,
  readCompilerOptions,
  copyFiles
} from '@sap-cloud-sdk/generator-common/internal';
import { batchSourceFile } from './batch/file';
import { complexTypeSourceFile } from './complex-type/file';
import { entitySourceFile } from './entity/file';
import { otherFile, sourceFile } from './file-generator';
import {
  defaultValueProcessesJsGeneration,
  GeneratorOptions
} from './generator-options';
import { hasEntities } from './generator-utils';
import { parseAllServices } from './service-generator';
import { requestBuilderSourceFile } from './request-builder/file';
import { serviceMappingFile } from './service-mapping';
import { csn } from './service/csn';
import { indexFile } from './service/index-file';
import { npmrc } from './service/npmrc';
import { packageJson } from './service/package-json';
import { readme } from './service/readme';
import { tsConfig } from './service/ts-config';
import { VdmServiceMetadata } from './vdm-types';
import {
  actionImportSourceFile,
  functionImportSourceFile
} from './action-function-import/file';
import { enumTypeSourceFile } from './enum-type/file';
import { sdkMetadata, getServiceDescription } from './sdk-metadata';
import { createFile } from './generator-common/create-file';
import { entityApiFile } from './generator-without-ts-morph';
import { serviceFile } from './generator-without-ts-morph/service/file';

const logger = createLogger({
  package: 'generator',
  messageContext: 'generator'
});

export async function generate(options: GeneratorOptions): Promise<void> {
  const projectAndServices = await generateProject(options);
  if (!projectAndServices) {
    throw Error('The project is undefined.');
  }
  const project = projectAndServices.project;
  const services = projectAndServices.services;

  await project.save();

  await generateFilesWithoutTsMorph(services, options);

  if (options.generateJs) {
    const directories = project
      .getDirectories()
      .filter(dir => !!dir.getSourceFile('tsconfig.json'));
    const chunks = splitInChunks(
      directories,
      options.processesJsGeneration || defaultValueProcessesJsGeneration
    );
    try {
      await chunks.reduce(
        (all, chunk) => all.then(() => transpileDirectories(chunk)),
        Promise.resolve()
      );
    } catch (err) {
      if (err.message?.includes('error TS2307')) {
        throw new ErrorWithCause(
          getInstallODataErrorMessage(projectAndServices),
          err
        );
      }
      throw err;
    }
  }
}

/**
 * @internal
 * @param projectAndServices - Generated project with services.
 * @returns An error message with a recommendation to install specific SDK packages.
 */
export function getInstallODataErrorMessage(
  projectAndServices: ProjectAndServices
): string {
  const hasV2 = projectAndServices.services.some(
    service => service.oDataVersion === 'v2'
  );
  const hasV4 = projectAndServices.services.some(
    service => service.oDataVersion === 'v4'
  );

  if (hasV2 && hasV4) {
    return 'Did you forget to install "@sap-cloud-sdk/odata-v2" and "@sap-cloud-sdk/odata-v4"?';
  }
  return `Did you forget to install "@sap-cloud-sdk/odata-v${
    hasV2 ? '2' : '4'
  }"?`;
}

/* eslint-disable valid-jsdoc */

/**
 * @internal
 */
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
/**
 * @internal
 */
export async function generateProject(
  options: GeneratorOptions
): Promise<ProjectAndServices | undefined> {
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

  return { project, services };
}

/**
 * @internal
 */
export interface ProjectAndServices {
  project: Project;
  services: VdmServiceMetadata[];
}

async function generateFilesWithoutTsMorph(
  services: VdmServiceMetadata[],
  options: GeneratorOptions
): Promise<void> {
  const promises = services.flatMap(service => [
    generateEntityApis(service, options),
    generateServiceFile(service, options),
    generateAdditionalFiles(service, options)
  ]);
  await Promise.all(promises);
}

async function generateAdditionalFiles(
  service: VdmServiceMetadata,
  options: GeneratorOptions
): Promise<void> {
  if (options.additionalFiles) {
    const additionalFilesDir = resolve(
      options.inputDir.toString(),
      options.additionalFiles
    );
    const serviceDir = resolvePath(service.directoryName, options);
    const files = new GlobSync(additionalFilesDir).found;
    await copyFiles(files, serviceDir, options.forceOverwrite);
  }
}

async function generateServiceFile(
  service: VdmServiceMetadata,
  options: GeneratorOptions
): Promise<void> {
  const serviceDir = resolvePath(service.directoryName, options);
  await createFile(
    serviceDir,
    'service.ts',
    serviceFile(service),
    options.forceOverwrite
  );
}

async function generateEntityApis(
  service: VdmServiceMetadata,
  options: GeneratorOptions
): Promise<void> {
  const serviceDir = resolvePath(service.directoryName, options);
  await Promise.all(
    service.entities.map(entity =>
      createFile(
        serviceDir,
        `${entity.className}Api.ts`,
        entityApiFile(entity, service),
        options.forceOverwrite
      )
    )
  );
}

/**
 * @internal
 */
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
        service,
          options
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

  if (service.actionImports && service.actionImports.length) {
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

  if (options.generateNpmrc) {
    logger.info(`[${service.originalFileName}] Generating .npmrc for ...`);
    otherFile(serviceDir, '.npmrc', npmrc(), options.forceOverwrite);
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
      target: ScriptTarget.ES2019,
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
  return options;
}

function resolvePath(path: PathLike, options: GeneratorOptions): string {
  return resolve(options.outputDir.toString(), path.toString());
}
