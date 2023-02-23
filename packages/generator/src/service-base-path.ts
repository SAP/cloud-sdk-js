import { parse } from 'path';
import { createLogger } from '@sap-cloud-sdk/util';
import { ServiceOptions } from '@sap-cloud-sdk/generator-common/internal';
import { basePathFromSwagger } from './swagger-parser/swagger-util';
import { ServiceMetadata } from './edmx-parser/edmx-file-reader';

const logger = createLogger({
  package: 'generator',
  messageContext: 'options-per-service'
});

/**
 * @internal
 */
export function getBasePath(
  metadata: ServiceMetadata,
  skipValidation: boolean,
  optionsPerServiceIn: ServiceOptions
): string {
  let basePath =
    optionsPerServiceIn?.basePath ||
    basePathFromSelfLink(metadata.edmx.selfLink) ||
    basePathFromSwagger(metadata.swagger);
  if (!basePath) {
    if (skipValidation) {
      logger.warn(
        `[ ${
          parse(metadata.edmx.path.toString()).name
        } ] No base path could be determined from available metadata! Setting "basePath" to "/" as default value. Consider using 'optionsPerService' configuration to explicitly set a value.`
      );
      basePath = '/';
    } else {
      throw new Error(
        `[ ${
          parse(metadata.edmx.path.toString()).name
        } ] No base path could be determined from available metadata! Enable '--skipValidation' to use "/" as a default value. Alternatively use the 'optionsPerService' configuration to explicitly set a value.`
      );
    }
  }
  return basePath;
}

function basePathFromSelfLink(
  selfLink: string | undefined
): string | undefined {
  if (selfLink) {
    return selfLink
      .replace(/^https?:\/\//, '')
      .replace(/\/\$metadata$/, '')
      .replace(/^[^/]+/, '');
  }
}
