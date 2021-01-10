import { readJSON } from '@sap-cloud-sdk/util';
import { GeneratorOptions } from './options';
export interface VdmMapping {
  [fileName: string]: ServiceMapping;
}

export interface ServiceMapping {
  directoryName: string;
  npmPackageName: string;
}

/**
 * Read the service mapping from a given path provided in the options.
 * @param options The options provided from the cli command.
 * @returns The parsed service mapping object.
 */
export function readServiceMapping(options: GeneratorOptions): VdmMapping {
  return (
    (options.serviceMapping &&
      (readJSON(options.serviceMapping) as VdmMapping)) ||
    {}
  );
}
