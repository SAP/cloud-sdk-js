import { existsSync, promises } from 'fs';
import { parse } from 'path';
import { unique, UniqueNameGenerator } from '@sap-cloud-sdk/util';
import { getRelativePath } from '../generator';
import { ParsedGeneratorOptions } from './generator-options';

const { readFile } = promises;

/**
 * Represents the service options for all services, mapped from the input file path to the service configuration.
 */
export type OptionsPerService = Record<string, ServiceOptions>;

/**
 * Partial OptionsPerService
 */
type PartialOptionsPerService = Record<string, Partial<ServiceOptions>>;

/**
 * Represents the options for one service.
 * This is usually specified as part of the options per service.
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
   * Human readable name of the service. Used in API documentation and readme.
   */
  serviceName: string;
}

/**
 * Get the options per service from the given path or an empty object if no path was given.
 * @param configPath Path to the given per service configuration or undefined if no path was given.
 * @returns The parsed configuration for all services.
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
 * If optionsPerServicePath is not given default values are used for the services.
 * If optionsPerServicePath is given existing values for the services are.
 * @param inputPaths Service spec file paths.
 * @param options Generator options.
 * @returns The parsed options per service.
 */
export async function getOptionsPerService(
  inputPaths: string[],
  options: ParsedGeneratorOptions
): Promise<OptionsPerService> {
  const originalOptionsPerService = await getOriginalOptionsPerService(
    options.optionsPerService
  );

  const uniqueNameGenerator = new UniqueNameGenerator('-');

  const directoryNamesByPaths = getDirectoryNamesByPaths(
    inputPaths,
    originalOptionsPerService
  );
  if (!options.skipValidation) {
    validateDirectoryNames(directoryNamesByPaths);
  }

  const optionsPerService: OptionsPerService = inputPaths.reduce(
    (previousOptions, inputPath) => {
      const relativePath = getRelativePath(inputPath);

      const uniqueDirName = uniqueNameGenerator.generateAndSaveUniqueName(
        directoryNamesByPaths[inputPath]
      );

      previousOptions[relativePath] = getServiceOptions(
        uniqueDirName,
        originalOptionsPerService[relativePath]
      );
      return previousOptions;
    },
    {}
  );

  return optionsPerService;
}

function getDirectoryNamesByPaths(
  inputPaths: string[],
  originalOptionsPerService: PartialOptionsPerService
): Record<string, string> {
  return inputPaths.reduce((directoryNamesByPaths, inputPath) => {
    const relativePath = getRelativePath(inputPath);
    const directoryName =
      originalOptionsPerService[relativePath]?.directoryName ||
      parseDirectoryName(relativePath);

    directoryNamesByPaths[inputPath] = directoryName;
    return directoryNamesByPaths;
  }, {});
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

    const errorMessage = `Duplicate service directory names found. Customize directory names with \`optionsPerService\` or enable automatic name adjustment with \`skipValidation\`.\n\tDuplicates:\n${duplicatesList}`;
    throw new Error(errorMessage);
  }
}

/**
 * Parse the name of the service directory based on the file path.
 * @param filePath Path of the service specification.
 * @returns The parsed name.
 */
function parseDirectoryName(filePath: string): string {
  return parse(filePath).name.replace(/-openapi$/, '');
}

/**
 * Get the options for one service based on the options per service and the input file path.
 * If the file path does not exist in the options a default config is created.
 * If the service options for a file path are given only partially, default values are added for the missing values.
 * @param directoryName The directory name of the according service.
 * @param serviceOptions The original options for this service as specified in the per service options.
 * @returns Service options.
 */
export function getServiceOptions(
  directoryName: string,
  serviceOptions?: Partial<ServiceOptions>
): ServiceOptions {
  const defaultConfig = {
    packageName: directoryName,
    directoryName,
    serviceName: directoryName
  };

  return {
    ...defaultConfig,
    ...serviceOptions,
    directoryName
  };
}
