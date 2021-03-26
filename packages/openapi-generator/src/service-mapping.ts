import { resolve } from 'path';
import { readJSON } from '@sap-cloud-sdk/util';
import { GeneratorOptions } from './options';

/**
 * Represents the service mapping.
 */
export interface ServiceMapping {
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
  npmPackageName: string;
}

/**
 * Read the service mapping from a given path provided in the options.
 * @param options The options provided from the CLI command.
 * @returns The parsed service mapping object.
 */
export function readServiceMapping(options: GeneratorOptions): ServiceMapping {
  const serviceMappingPath =
    options.serviceMapping ||
    resolve(options.input.toString(), 'service-mapping.json');
  return readJSON(serviceMappingPath) as ServiceMapping;
}
