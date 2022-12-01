import { existsSync, PathLike, promises as fsPromises } from 'fs';
import { resolve, dirname, sep, posix } from 'path';
import {
  createLogger,
  ErrorWithCause,
  splitInChunks
} from '@sap-cloud-sdk/util';
import { emptyDirSync } from 'fs-extra';
import {
  IndentationText,
  ModuleResolutionKind,
  Project,
  ProjectOptions,
  ModuleKind,
  QuoteKind,
  ScriptTarget
} from 'ts-morph';
import { GlobSync } from 'glob';
import {
  getSdkMetadataFileNames,
  getVersionForClient,
  transpileDirectory,
  readCompilerOptions,
  copyFiles,
  getSdkVersion,
  packageDescription,
  createFile,
  readPrettierConfig,
  CreateFileOptions
} from '@sap-cloud-sdk/generator-common/internal';
import { batchSourceFile } from './batch/file';
import { complexTypeSourceFile } from './complex-type/file';
import { entitySourceFile } from './entity/file';
import { sourceFile } from './file-generator';
import {
  defaultValueProcessesJsGeneration,
  GeneratorOptions,
  generatorOptionsCli,
  ParsedGeneratorOptions
} from './generator-options';
import { hasEntities } from './generator-utils';
import { parseAllServices } from './service-generator';
import { requestBuilderSourceFile } from './request-builder/file';
import { serviceMappingFile } from './service-mapping';
import { csn } from './service/csn';
import { indexFile } from './service/index-file';
import { packageJson } from './service/package-json';
import { readme } from './service/readme';
import { tsConfig } from './service/ts-config';
import { VdmServiceMetadata } from './vdm-types';
import { operationsSourceFile } from './operations/file';
import { enumTypeSourceFile } from './enum-type/file';
import { sdkMetadata } from './sdk-metadata';
import { entityApiFile } from './generator-without-ts-morph';
import { serviceFile } from './generator-without-ts-morph/service/file';
import { parseOptions } from './options-parser';

const { mkdir, readdir } = fsPromises;

const logger = createLogger({
  package: 'generator',
  messageContext: 'generator'
});

/**
 * Main entry point for the OData client generation.
 * Generates models and API files.
 * @param options - Options to configure generation.
 */
export async function generate(options: GeneratorOptions): Promise<void> {
  const parsedOptions = parseOptions(generatorOptionsCli, options);
  return generateWithParsedOptions(parsedOptions);
}

/**
 * @internal
 * This is the main entry point for generation, after options were parsed - either from the CLI or from the programmatically passed configuration.
 */
export async function generateWithParsedOptions(
  options: ParsedGeneratorOptions
): Promise<void> {
  const projectAndServices = await generateProject(
    options as ParsedGeneratorOptions
  );
  if (!projectAndServices) {
    throw Error('The project is undefined.');
  }
  const services = projectAndServices.services;

  await generateFilesWithoutTsMorph(
    services,
    options as ParsedGeneratorOptions
  );

  if (options.generateJs) {
    const directories = services
      .filter(async service => {
        const files = await readdir(
          resolvePath(service.directoryName, options as ParsedGeneratorOptions)
        );
        return files.includes('tsconfig.json');
      })
      .map(service =>
        resolvePath(service.directoryName, options as ParsedGeneratorOptions)
      );

    const chunks = splitInChunks(
      directories,
      options.transpilationProcesses || defaultValueProcessesJsGeneration
    );
    try {
      await chunks.reduce(
        (all, chunk) =>
          all.then(() =>
            transpileDirectories(chunk, options as ParsedGeneratorOptions)
          ),
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

/**
 * @internal
 */
export async function transpileDirectories(
  directories: string[],
  options: ParsedGeneratorOptions
): Promise<void[]> {
  return Promise.all(
    directories.map(async directory => {
      const [compilerOptions, createFileOptions] = await Promise.all([
        readCompilerOptions(directory),
        getFileCreationOptions(options)
      ]);
      return transpileDirectory(directory, {
        compilerOptions,
        createFileOptions
      });
    })
  );
}

/**
 * @internal
 */
export async function generateProject(
  options: ParsedGeneratorOptions
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
  /**
   * @internal
   */
  project: Project;
  /**
   * @internal
   */
  services: VdmServiceMetadata[];
}

async function generateFilesWithoutTsMorph(
  services: VdmServiceMetadata[],
  options: ParsedGeneratorOptions
): Promise<void> {
  const promises = services.flatMap(service => [
    generateEntityApis(service, options),
    generateServiceFile(service, options),
    generateIncludes(service, options)
  ]);
  await Promise.all(promises);
}

async function getFileCreationOptions(
  options: ParsedGeneratorOptions
): Promise<CreateFileOptions> {
  return {
    prettierOptions: await readPrettierConfig(
      options.prettierConfig?.toString()
    ),
    overwrite: options.overwrite
  };
}

async function generateIncludes(
  service: VdmServiceMetadata,
  options: ParsedGeneratorOptions
): Promise<void> {
  if (options.include) {
    const includeDir = resolve(options.inputDir.toString(), options.include)
      .split(sep)
      .join(posix.sep);
    const serviceDir = resolvePath(service.directoryName, options);
    const files = new GlobSync(includeDir).found;
    await copyFiles(files, serviceDir, options.overwrite);
  }
}

async function generateServiceFile(
  service: VdmServiceMetadata,
  options: ParsedGeneratorOptions
): Promise<void> {
  const serviceDir = resolvePath(service.directoryName, options);
  const createFileOptions = await getFileCreationOptions(options);
  await createFile(
    serviceDir,
    'service.ts',
    serviceFile(service),
    createFileOptions
  );
}

async function generateEntityApis(
  service: VdmServiceMetadata,
  options: ParsedGeneratorOptions
): Promise<void> {
  const createFileOptions = await getFileCreationOptions(options);
  await Promise.all(
    service.entities.map(entity =>
      createFile(
        resolvePath(service.directoryName, options),
        `${entity.className}Api.ts`,
        entityApiFile(entity, service),
        createFileOptions
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
  options: ParsedGeneratorOptions
): Promise<void> {
  const serviceDirPath = resolvePath(service.directoryName, options);
  const serviceDir = project.createDirectory(serviceDirPath);
  const createFileOptions = await getFileCreationOptions(options);

  if (!existsSync(serviceDirPath)) {
    await mkdir(serviceDirPath, { recursive: true });
  }
  const filePromises: Promise<any>[] = [];
  logger.info(`[${service.originalFileName}] Generating entities ...`);

  if (options.packageJson) {
    filePromises.push(
      createFile(
        serviceDirPath,
        'package.json',
        await packageJson({
          npmPackageName: service.npmPackageName,
          version: await getVersionForClient(options.packageVersion),
          sdkVersion: await getSdkVersion(),
          description: packageDescription(service.speakingModuleName),
          sdkAfterVersionScript: options.sdkAfterVersionScript,
          oDataVersion: service.oDataVersion,
          license: options.licenseInPackageJson
        }),
        createFileOptions
      )
    );
  }

  filePromises.push(
    createFile(serviceDirPath, 'tsconfig.json', tsConfig(), createFileOptions)
  );

  if (hasEntities(service)) {
    logger.info(
      `[${service.originalFileName}] Generating batch request builder ...`
    );
    filePromises.push(
      sourceFile(
        serviceDir,
        'BatchRequest',
        batchSourceFile(service),
        createFileOptions
      )
    );
  }

  service.entities.forEach(entity => {
    logger.info(`Generating entity: ${entity.className}...`);
    filePromises.push(
      sourceFile(
        serviceDir,
        entity.className,
        entitySourceFile(entity, service),
        createFileOptions
      )
    );
    filePromises.push(
      sourceFile(
        serviceDir,
        `${entity.className}RequestBuilder`,
        requestBuilderSourceFile(entity, service.oDataVersion),
        createFileOptions
      )
    );
  });

  service.enumTypes.forEach(enumType => {
    logger.info(
      `[${service.originalFileName}] Generating enum type ${enumType.originalName} ...`
    );
    filePromises.push(
      sourceFile(
        serviceDir,
        enumType.typeName,
        enumTypeSourceFile(enumType),
        createFileOptions
      )
    );
  });

  service.complexTypes.forEach(complexType => {
    logger.info(
      `[${service.originalFileName}] Generating complex type ${complexType.originalName} ...`
    );
    filePromises.push(
      sourceFile(
        serviceDir,
        complexType.typeName,
        complexTypeSourceFile(complexType, service.oDataVersion),
        createFileOptions
      )
    );
  });

  if (service.functionImports?.length) {
    logger.info(
      `[${service.originalFileName}] Generating function imports ...`
    );
    filePromises.push(
      sourceFile(
        serviceDir,
        'function-imports',
        operationsSourceFile(service, 'function'),
        createFileOptions
      )
    );
  }

  if (service.actionImports?.length) {
    logger.info(`[${service.originalFileName}] Generating action imports ...`);
    filePromises.push(
      sourceFile(
        serviceDir,
        'action-imports',
        operationsSourceFile(service, 'action'),
        createFileOptions
      )
    );
  }

  filePromises.push(
    sourceFile(serviceDir, 'index', indexFile(service), createFileOptions)
  );

  if (options.readme) {
    logger.info(`[${service.originalFileName}] Generating readme ...`);
    filePromises.push(
      createFile(
        serviceDirPath,
        'README.md',
        readme(service, options.s4hanaCloud),
        createFileOptions
      )
    );
  }

  if (options.generateCSN) {
    try {
      logger.info(
        `[${service.originalFileName}] Generating ${service.directoryName}-csn.json ...`
      );
      filePromises.push(
        createFile(
          serviceDirPath,
          `${service.directoryName}-csn.json`,
          await csn(service),
          createFileOptions
        )
      );
    } catch (e) {
      logger.error(
        `CSN creation for service ${service.originalFileName} failed. Original error: ${e.message}`
      );
    }
  }

  if (options.generateSdkMetadata) {
    const { clientFileName } = getSdkMetadataFileNames(
      service.originalFileName
    );
    logger.info(`Generating sdk client metadata ${clientFileName}...`);

    const path = resolve(dirname(service.edmxPath.toString()), 'sdk-metadata');
    if (!existsSync(path)) {
      await mkdir(path);
    }

    filePromises.push(
      createFile(
        path,
        clientFileName,
        JSON.stringify(await sdkMetadata(service), null, 2),
        createFileOptions
      )
    );
  }
  await Promise.all(filePromises);
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

function parseServices(options: ParsedGeneratorOptions): VdmServiceMetadata[] {
  const services = parseAllServices(options);
  if (!services.length) {
    logger.warn('No service definition files found.');
    return [];
  }
  return services;
}

function sanitizeOptions(
  options: ParsedGeneratorOptions
): ParsedGeneratorOptions {
  options.serviceMapping =
    options.serviceMapping ||
    resolve(options.inputDir.toString(), 'service-mapping.json');
  return options;
}

function resolvePath(path: PathLike, options: ParsedGeneratorOptions): string {
  return resolve(options.outputDir.toString(), path.toString());
}
