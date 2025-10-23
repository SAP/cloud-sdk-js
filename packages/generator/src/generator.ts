import { existsSync, promises as fsPromises } from 'fs';
import { dirname, join, resolve } from 'path';
import {
  copyFiles,
  createFile,
  formatTsConfig,
  getSdkMetadataFileNames,
  getSdkVersion,
  packageDescription,
  readCompilerOptions,
  readCustomTsConfig,
  readPrettierConfig,
  transpileDirectory,
  parseOptions,
  getRelPathWithPosixSeparator,
  writeOptionsPerService,
  tsconfigJson
} from '@sap-cloud-sdk/generator-common/internal';
import {
  createLogger,
  ErrorWithCause,
  setLogLevel,
  splitInChunks
} from '@sap-cloud-sdk/util';
import { emptyDirSync } from 'fs-extra';
import {
  IndentationText,
  ModuleKind,
  ModuleResolutionKind,
  Project,
  QuoteKind,
  ScriptTarget
} from 'ts-morph';
import { batchSourceFile } from './batch';
import { complexTypeSourceFile } from './complex-type';
import { entitySourceFile } from './entity';
import { enumTypeSourceFile } from './enum-type';
import { sourceFile } from './file-generator';
import { cliOptions } from './options';
import { hasEntities } from './generator-utils';
import {
  entityApiFile,
  requestBuilderSourceFile,
  serviceFile
} from './generator-without-ts-morph';
import { operationsSourceFile } from './operations';
import { sdkMetadata } from './sdk-metadata';
import { parseAllServices } from './service-generator';
import { indexFile, packageJson, readme } from './service';
import type { GeneratorOptions, ParsedGeneratorOptions } from './options';
import type { ProjectOptions } from 'ts-morph';
import type {
  CreateFileOptions,
  OptionsPerService
} from '@sap-cloud-sdk/generator-common/internal';
import type { VdmServiceMetadata } from './vdm-types';

const { mkdir, readdir } = fsPromises;

const logger = createLogger({
  package: 'generator',
  messageContext: 'generator'
});

/**
 * Main entry point for the OData client generation.
 * Generates models and API files.
 * @param options - Options to configure generation.
 * @returns A promise to void.
 */
export async function generate(
  options: GeneratorOptions & { config?: string }
): Promise<void> {
  const parsedOptions = parseOptions(cliOptions, options);
  if (parsedOptions.verbose) {
    setLogLevel('verbose', logger);
  }

  logger.verbose(`Parsed Options: ${JSON.stringify(parsedOptions, null, 2)}`);

  return generateWithParsedOptions(parsedOptions);
}

/**
 * @internal
 * This is the main entry point for generation, after options were parsed - either from the CLI or from the programmatically passed configuration.
 */
async function generateWithParsedOptions(
  options: ParsedGeneratorOptions
): Promise<void> {
  const projectAndServices = await generateProject(options);
  if (!projectAndServices) {
    throw Error('The project is undefined.');
  }
  const { services } = projectAndServices;

  await generateFilesWithoutTsMorph(services, options);

  if (options.transpile) {
    const directories = services
      .filter(async service => {
        const files = await readdir(
          join(options.outputDir, service.serviceOptions.directoryName)
        );
        return files.includes('tsconfig.json');
      })
      .map(service =>
        join(options.outputDir, service.serviceOptions.directoryName)
      );

    const chunks = splitInChunks(directories, options.transpilationProcesses);
    try {
      await chunks.reduce(
        (all, chunk) => all.then(() => transpileDirectories(chunk, options)),
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
  const services = await parseServices(options);

  if (options.clearOutputDir) {
    emptyDirSync(options.outputDir.toString());
  }

  const project = new Project(projectOptions(options.generateESM ? 'esm' : 'commonjs'));

  const promises = services.map(service =>
    generateSourcesForService(service, project, options)
  );

  if (options.optionsPerService) {
    logger.verbose('Generating options per service ...');

    const optionsPerService = services.reduce((prev, curr) => {
      const relativePath = getRelPathWithPosixSeparator(
        curr.edmxPath.toString()
      );
      return { ...prev, [relativePath]: curr.serviceOptions };
    }, {} as OptionsPerService);
    await writeOptionsPerService(
      options.optionsPerService,
      optionsPerService,
      options
    );
  }

  await Promise.all(promises);

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
    overwrite: options.overwrite,
    generateESM: options.generateESM
  };
}

async function generateIncludes(
  service: VdmServiceMetadata,
  options: ParsedGeneratorOptions
): Promise<void> {
  if (options.include && options.include.length > 0) {
    const serviceDir = join(
      options.outputDir,
      service.serviceOptions.directoryName
    );
    await copyFiles(options.include, serviceDir, options.overwrite);
  }
}

async function generateServiceFile(
  service: VdmServiceMetadata,
  options: ParsedGeneratorOptions
): Promise<void> {
  const serviceDir = join(
    options.outputDir,
    service.serviceOptions.directoryName
  );
  const createFileOptions = await getFileCreationOptions(options);
  await createFile(
    serviceDir,
    'service.ts',
    serviceFile(service, createFileOptions),
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
        join(options.outputDir, service.serviceOptions.directoryName),
        `${entity.className}Api.ts`,
        entityApiFile(entity, service, createFileOptions),
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
  const serviceDirPath = join(
    options.outputDir,
    service.serviceOptions.directoryName
  );
  const serviceDir = project.createDirectory(serviceDirPath);
  const createFileOptions = await getFileCreationOptions(options);

  if (!existsSync(serviceDirPath)) {
    await mkdir(serviceDirPath, { recursive: true });
  }
  const filePromises: Promise<any>[] = [];
  logger.verbose(`[${service.originalFileName}] Generating entities ...`);

  if (options.packageJson) {
    filePromises.push(
      createFile(
        serviceDirPath,
        'package.json',
        await packageJson({
          npmPackageName: service.serviceOptions.packageName,
          sdkVersion: await getSdkVersion(),
          description: packageDescription(service.speakingModuleName),
          oDataVersion: service.oDataVersion
        }),
        createFileOptions
      )
    );
  }

  if (options.transpile || options.tsconfig) {
    const tsConfig = await tsconfigJson({
      transpile: options.transpile,
      tsconfig: options.tsconfig
    });
    if(tsConfig) {
      filePromises.push(
        createFile(
          serviceDirPath,
          'tsconfig.json',
          tsConfig,
          createFileOptions
        )
      );
    }
  }

  if (hasEntities(service)) {
    logger.verbose(
      `[${service.originalFileName}] Generating batch request builder ...`
    );
    filePromises.push(
      sourceFile(
        serviceDir,
        'BatchRequest',
        batchSourceFile(service, createFileOptions),
        createFileOptions
      )
    );
  }

  service.entities.forEach(entity => {
    logger.verbose(`Generating entity: ${entity.className}...`);
    filePromises.push(
      sourceFile(
        serviceDir,
        entity.className,
        entitySourceFile(entity, service, createFileOptions),
        createFileOptions
      )
    );
    filePromises.push(
      sourceFile(
        serviceDir,
        `${entity.className}RequestBuilder`,
        requestBuilderSourceFile(entity, service.oDataVersion, createFileOptions),
        createFileOptions
      )
    );
  });

  service.enumTypes.forEach(enumType => {
    logger.verbose(
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
    logger.verbose(
      `[${service.originalFileName}] Generating complex type ${complexType.originalName} ...`
    );
    filePromises.push(
      sourceFile(
        serviceDir,
        complexType.typeName,
        complexTypeSourceFile(complexType, service.oDataVersion, createFileOptions),
        createFileOptions
      )
    );
  });

  // Merge generated function-imports.ts and action-imports.ts into one operations.ts.
  if (service.operations.length) {
    logger.verbose(`[${service.originalFileName}] Generating operations ...`);
    filePromises.push(
      sourceFile(
        serviceDir,
        'operations',
        operationsSourceFile(service, createFileOptions),
        createFileOptions
      )
    );
  }

  filePromises.push(
    sourceFile(serviceDir, 'index', indexFile(service, createFileOptions), createFileOptions)
  );

  if (options.readme) {
    logger.verbose(`[${service.originalFileName}] Generating readme ...`);
    filePromises.push(
      createFile(
        serviceDirPath,
        'README.md',
        readme(service),
        createFileOptions
      )
    );
  }

  if (options.metadata) {
    const { clientFileName } = getSdkMetadataFileNames(
      service.originalFileName
    );
    logger.verbose(`Generating sdk client metadata ${clientFileName}...`);

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

function projectOptions(
  moduleType: 'commonjs' | 'esm' = 'commonjs'
): ProjectOptions {
  return {
    skipAddingFilesFromTsConfig: true,
    manipulationSettings: {
      indentationText: IndentationText.TwoSpaces,
      insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces: true,
      quoteKind: QuoteKind.Single
    },
    compilerOptions: {
      target: ScriptTarget.ES2021,
       module: moduleType === 'esm' ? ModuleKind.NodeNext : ModuleKind.CommonJS,
      declaration: true,
      declarationMap: true,
      sourceMap: true,
      diagnostics: true,
      moduleResolution:
        moduleType === 'esm'
          ? ModuleResolutionKind.NodeNext
          : ModuleResolutionKind.Node10,
      esModuleInterop: true,
      inlineSources: false,
      noImplicitAny: true
    }
  };
}

async function parseServices(
  options: ParsedGeneratorOptions
): Promise<VdmServiceMetadata[]> {
  const services = await parseAllServices(options);
  if (!services.length) {
    logger.warn('No service definition files found.');
    return [];
  }
  return services;
}
