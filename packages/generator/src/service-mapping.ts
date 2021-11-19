import { unixEOL, createLogger, readJSON } from '@sap-cloud-sdk/util';
import { GeneratorOptions } from './generator-options';
import { VdmServiceMetadata } from './vdm-types';
import { servicePathFromSwagger } from './swagger-parser/swagger-util';
import { ServiceMetadata } from './edmx-parser/edmx-file-reader';
const logger = createLogger({
  package: 'generator',
  messageContext: 'service-mapping'
});
/* eslint-disable valid-jsdoc */

/**
 * @internal
 */
export const VALUE_IS_UNDEFINED = 'VALUE_IS_UNDEFINED';
/**
 * @internal
 */
export interface VdmMapping {
  [fileName: string]: ServiceMapping;
}
/**
 * @internal
 */
export interface ServiceMapping {
  directoryName: string;
  servicePath: string;
  npmPackageName: string;
}
/**
 * @internal
 */
export function readServiceMapping(options: GeneratorOptions): VdmMapping {
  return (
    (options.serviceMapping &&
      (readJSON(options.serviceMapping) as VdmMapping)) ||
    {}
  );
}
/**
 * @internal
 */
export function serviceMapping(services: VdmServiceMetadata[]): VdmMapping {
  return services.reduce((vdmMapping, service) => {
    vdmMapping[service.originalFileName] = {
      directoryName: service.directoryName,
      servicePath: service.servicePath,
      npmPackageName: service.npmPackageName
    };

    return vdmMapping;
  }, {});
}
/**
 * @internal
 */
export function serviceMappingFile(services: VdmServiceMetadata[]): string {
  return JSON.stringify(serviceMapping(services), null, 2) + unixEOL;
}
/**
 * @internal
 */
export function getServicePath(
  metadata: ServiceMetadata,
  serviceMappingIn?: ServiceMapping
): string {
  let servicePath =
    serviceMappingIn?.servicePath ||
    servicePathFromSelfLink(metadata.edmx.selfLink) ||
    servicePathFromSwagger(metadata.swagger);
  if (!servicePath || servicePath === VALUE_IS_UNDEFINED) {
    logger.warn(
      'No service path could be determined from available metadata! ' +
        'To avoid this in the future, you can provide the correct value in "service-mapping.json". ' +
        'By default, the "service-mapping.json" file will be saved to and read from the input directory. ' +
        'You can supply a custom path using the -s/--serviceMapping flag. '
    );
    servicePath = VALUE_IS_UNDEFINED;
  }
  return servicePath;
}

function servicePathFromSelfLink(
  selfLink: string | undefined
): string | undefined {
  if (selfLink) {
    return selfLink
      .replace(/^https?:\/\//, '')
      .replace(/\/\$metadata$/, '')
      .replace(/^[^/]+/, '');
  }
}
