import { existsSync, promises } from 'fs';
import { basename, dirname, parse, posix, relative, sep } from 'path';
import {
  createLogger,
  formatJson,
  unique,
  UniqueNameGenerator
} from '@sap-cloud-sdk/util';
import { createFile, readPrettierConfig } from './file-writer';
import { npmCompliantName, validateNpmCompliance } from './util';

const logger = createLogger('options-per-service');

const { readFile, mkdir } = promises;

/**
 * Represents the service options for all services, mapped from the input file path to the service configuration.
 * @internal
 */
export type OptionsPerService = Record<string, ServiceOptions>;

/**
 * Partial OptionsPerService.
 */
type PartialOptionsPerService = Record<string, Partial<ServiceOptions>>;

/**
 * Represents the options for one service.
 * This is usually specified as part of the options per service.
 * @internal
 */
export interface ServiceOptions {
  /**
   * Name of the directory to store the service in.
   */
  directoryName: string;
  /**
   * Name of the package to reference in the package.json.
   */
  packageName: string;
  /**
   * Base path for the request.
   */
  basePath?: string;
}

/**
 * Get the options per service from the given path or an empty object if no path was given.
 * @param configPath - Path to the given per service configuration or `undefined`, if no path was given.
 * @returns The parsed configuration for all services.
 * @internal
 */
export async function getOriginalOptionsPerService(
  configPath: string | undefined
): Promise<PartialOptionsPerService> {
  return configPath && existsSync(configPath)
    ? JSON.parse(await readFile(configPath, 'utf8'))
    : {};
}

/**
 * Get the options per service for given service specifications.
 * If optionsPerBasePath is not given, default values are used for the services.
 * If optionsPerBasePath is given, existing values for the services are used.
 * @param inputPaths - Service spec file paths.
 * @param options - Generator options.
 * @returns The parsed options per service.
 * @internal
 */
export async function getOptionsPerService(
  inputPaths: string[],
  {
    optionsPerService,
    skipValidation
  }: { skipValidation: boolean; optionsPerService: string | undefined }
): Promise<OptionsPerService> {
  const originalOptionsPerService = await getOriginalOptionsPerService(
    optionsPerService
  );

  const uniqueNameGenerator = new UniqueNameGenerator('-');

  const directoryNamesByPaths = getDirectoryNamesByPaths(
    inputPaths,
    originalOptionsPerService
  );
  if (!skipValidation) {
    validateDirectoryNames(directoryNamesByPaths);
  }

  const optsPerService: OptionsPerService = inputPaths.reduce(
    (previousOptions, inputPath) => {
      const relativePath = getRelPathWithPosixSeparator(inputPath);

      const uniqueDirName = uniqueNameGenerator.generateAndSaveUniqueName(
        directoryNamesByPaths[inputPath]
      );

      previousOptions[relativePath] = getServiceOptions(
        uniqueDirName,
        skipValidation,
        originalOptionsPerService[relativePath]
      );
      return previousOptions;
    },
    {}
  );
  return optsPerService;
}

function getDirectoryNamesByPaths(
  inputPaths: string[],
  originalOptionsPerService: PartialOptionsPerService
): Record<string, string> {
  return inputPaths.reduce((directoryNamesByPaths, inputPath) => {
    const relativePath = getRelPathWithPosixSeparator(inputPath);
    const directoryName =
      originalOptionsPerService[relativePath]?.directoryName ||
      parseDirectoryName(relativePath);

    directoryNamesByPaths[inputPath] = directoryName;
    return directoryNamesByPaths;
  }, {});
}

/**
 * Gives the relative path with respect to process.cwd() using posix file separator '/'.
 * @param absolutePath - The absolute path
 * @returns The relative path
 * @internal
 */
export function getRelPathWithPosixSeparator(absolutePath: string): string {
  return relative(process.cwd(), absolutePath).split(sep).join(posix.sep);
}

function getPathsByDirName(
  dirNamesByPaths: Record<string, string>
): Record<string, string[]> {
  return Object.entries(dirNamesByPaths).reduce(
    (pathsByDirName, [inputPath, dirName]) => {
      if (!pathsByDirName[dirName]) {
        pathsByDirName[dirName] = [];
      }
      pathsByDirName[dirName].push(inputPath);
      return pathsByDirName;
    },
    {}
  );
}

function validateDirectoryNames(dirNamesByPaths: Record<string, string>): void {
  const originalDirNames = Object.values(dirNamesByPaths);
  const uniqueDirNames = unique(originalDirNames);
  const hasDuplicates = originalDirNames.length !== uniqueDirNames.length;

  if (hasDuplicates) {
    const pathsByDirName = getPathsByDirName(dirNamesByPaths);
    const duplicates = Object.entries(pathsByDirName).filter(
      ([, paths]) => paths.length > 1
    );

    const duplicatesList = duplicates
      .map(
        ([dirName, paths]) =>
          `\t\tDirectory name: '${dirName}', specifications: [\n${paths
            .map(path => `\t\t\t${path}`)
            .join(',\n')}\n\t\t]`
      )
      .join('\n');

    const errorMessage = `Duplicate service file names would result in duplicate directory names. Customize directory names with \`optionsPerService\` or enable automatic name adjustment with \`skipValidation\`.\n\tDuplicates:\n${duplicatesList}`;
    throw new Error(errorMessage);
  }
}

/**
 * Parse the name of the service directory based on the file path.
 * @param filePath - Path of the service specification.
 * @returns The parsed name.
 */
function parseDirectoryName(filePath: string): string {
  return parse(filePath).name.replace(/-openapi$/, '');
}

/**
 * Get the options for one service based on the options per service and the input file path.
 * If the file path does not exist in the options a default config is created.
 * If the service options for a file path are given only partially, default values are added for the missing values.
 * @param directoryName - The directory name of the according service.
 * @param serviceOptions - The original options for this service as specified in the per service options.
 * @returns Service options.
 * @internal
 */
export function getServiceOptions(
  directoryName: string,
  skipValidation: boolean,
  serviceOptions?: Partial<ServiceOptions>
): ServiceOptions {
  if (serviceOptions?.packageName) {
    const packageName = npmCompliantName(serviceOptions?.packageName);
    if (skipValidation) {
      validateNpmCompliance(serviceOptions?.packageName);
    } else if (packageName !== serviceOptions?.packageName) {
      throw new Error(
        `The intended package name ${serviceOptions.packageName} is not NPM compliant. Either change to a compliant value e.g. '${packageName}' in your options per service configuration or execute with '--skipValidation'.`
      );
    }
  }

  const defaultConfig = {
    packageName: npmCompliantName(directoryName),
    directoryName
  };

  return {
    ...defaultConfig,
    ...serviceOptions
  };
}

/**
 * @internal
 */
export async function writeOptionsPerService(
  filePath: string,
  optionsPerService: OptionsPerService,
  options: { prettierConfig: string | undefined }
): Promise<void> {
  logger.verbose('Generating options per service.');
  const dir = dirname(filePath);
  await mkdir(dir, { recursive: true });
  await createFile(
    dir,
    basename(filePath),
    formatJson({
      ...(await getOriginalOptionsPerService(filePath)),
      ...optionsPerService
    }),
    {
      overwrite: true,
      prettierOptions: await readPrettierConfig(options.prettierConfig)
    }
  );
}
