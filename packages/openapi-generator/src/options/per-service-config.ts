import { existsSync, promises } from 'fs';
import { relative } from 'path';

const { readFile } = promises;

export interface PerServiceConfig {
  [fileName: string]: ServiceConfig;
}

/**
 * Represents the service mapping configuration for one service.
 */
export interface ServiceConfig {
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
 * Get the per service configuration from the given path.
 * @param configPath Path to the given per service configuration or undefined if no path was given.
 * @returns The parsed configuration for all services.
 */
export async function getPerServiceConfig(
  configPath: string | undefined
): Promise<PerServiceConfig | undefined> {
  if (configPath) {
    return existsSync(configPath)
      ? JSON.parse(await readFile(configPath, 'utf8'))
      : {};
  }
}

export function getOrCreateServiceConfig(
  perServiceConfig: PerServiceConfig | undefined,
  inputFilePath: string,
  serviceName: string
): ServiceConfig {
  const relativeFilePath = relative(process.cwd(), inputFilePath);
  if (perServiceConfig?.[relativeFilePath]) {
    return perServiceConfig[relativeFilePath];
  }

  const config = {
    packageName: serviceName,
    directoryName: serviceName
  };

  if (perServiceConfig) {
    perServiceConfig[relativeFilePath] = config;
  }

  return config;
}
