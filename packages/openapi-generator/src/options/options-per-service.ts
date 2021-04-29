import { existsSync, promises } from 'fs';

const { readFile } = promises;

/**
 * Represents the service options for all services, mapped from the input file path to the service configuration.
 */
export type OptionsPerService = Record<string, Partial<ServiceOptions>>;

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
}

/**
 * Get the options per service from the given path or an empty object if no path was given.
 * @param configPath Path to the given per service configuration or undefined if no path was given.
 * @returns The parsed configuration for all services.
 */
export async function getOriginalOptionsPerService(
  configPath: string | undefined
): Promise<OptionsPerService> {
  return configPath && existsSync(configPath)
    ? JSON.parse(await readFile(configPath, 'utf8'))
    : {};
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
  optionsPerService: OptionsPerService,
  relativeInputFilePath: string,
  serviceName: string
): ServiceOptions {
  const defaultConfig = {
    packageName: serviceName,
    directoryName: serviceName
  };

  const configFromOptionsPerService = optionsPerService[relativeInputFilePath];
  if (configFromOptionsPerService) {
    return {
      ...defaultConfig,
      ...configFromOptionsPerService
    };
  }

  return defaultConfig;
}
