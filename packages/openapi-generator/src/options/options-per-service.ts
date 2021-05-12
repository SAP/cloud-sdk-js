import { existsSync, promises } from 'fs';
import { parse } from 'path';
import { EOL } from 'os';
import { UniqueNameGenerator } from '@sap-cloud-sdk/util';
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
   * Name of the service
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
 * Get the options per service for the list of services.
 * If optionsPerServicePath is not given default values are used for the services.
 * If optionsPerServicePath is given existing values for the services are.
 * @param inputPaths Paths for the service spec files
 * @param options Options of the generator
 * @returns The parsed configuration for all services in relativeServicePaths.
 */
export async function getOptionsPerService(
  inputPaths: string[],
  options: ParsedGeneratorOptions
): Promise<OptionsPerService> {
  const originalOptionsPerService = await getOriginalOptionsPerService(
    options.optionsPerService
  );

  const uniqueNameGenerator = new UniqueNameGenerator('-');
  const duplicateServicePaths: string[] = [];

  const optionsPerService: OptionsPerService = inputPaths.reduce(
    (previousOptions, path) => {
      const relativePath = getRelativePath(path);

      const originalServiceName =
        originalOptionsPerService[relativePath]?.serviceName ||
        parseServiceName(relativePath);
      const uniqueServiceName = uniqueNameGenerator.generateAndSaveUniqueName(
        originalServiceName
      );
      if (originalServiceName !== uniqueServiceName) {
        duplicateServicePaths.push(relativePath);
      }

      previousOptions[relativePath] = getServiceOptions(
        originalOptionsPerService,
        relativePath,
        uniqueServiceName
      );
      return previousOptions;
    },
    {}
  );

  if (duplicateServicePaths.length > 0 && !options.skipValidation) {
    throw new Error(
      `The following service specs lead to non unique service names:${EOL}${duplicateServicePaths.join(
        EOL
      )}.${EOL}You can either ${
        options.optionsPerService ? 'adjust your' : 'introduce a'
      } optionsPerSerivice file or enable the skipValidation flag.`
    );
  }

  return optionsPerService;
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
 * Get the options for one service based on the options per service and the input file path.
 * If the file path does not exist in the options a default config is created.
 * If the service options for a file path are given only partially, default values are added for the missing values.
 * @param optionsPerService The original options per service to get the service options from.
 * @param relativeInputFilePath The input file path for which to find service options.
 * @param serviceName The default name of the according service.
 * @returns Service options.
 */
export function getServiceOptions(
  optionsPerService: PartialOptionsPerService,
  relativeInputFilePath: string,
  serviceName: string
): ServiceOptions {
  const defaultConfig = {
    packageName: serviceName,
    directoryName: serviceName,
    serviceName
  };

  const configFromOptionsPerService = optionsPerService[relativeInputFilePath];
  return {
    ...defaultConfig,
    ...configFromOptionsPerService
  };
}
