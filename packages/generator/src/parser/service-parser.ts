/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import {
  createLogger,
  propertyExists,
  VALUE_IS_UNDEFINED
} from '@sap-cloud-sdk/util';
import { GeneratorOptions } from '../generator-options';
import { npmCompliantName } from '../generator-utils';
import { GlobalNameFormatter } from '../global-name-formatter';
import { inputPaths, ServiceDefinitionPaths } from '../input-path-provider';
import {
  readServiceMapping,
  ServiceMapping,
  VdmMapping
} from '../service-mapping';
import { ServiceNameFormatter } from '../service-name-formatter';
import {
  ApiBusinessHubMetadata,
  VdmServiceMetadata,
  VdmServiceMetadataBody,
  VdmServiceMetadataHeader
} from '../vdm-types';
import { SwaggerMetadata } from './common';
import { parseSwaggerFromPath } from './swagger-parser';
import { ParsedServiceMetadata, parseEdmxFromPath } from './edmx-parser';
import { transformFunctionImportsWithoutReturnTypeV2 } from './v2/edmx-function-import-parser';
import { transformFunctionImportsWithoutReturnTypeV4 } from './v4/edmx-function-import-parser';
import { transformComplexTypesV2 } from './v2/edmx-complex-type-parser';
import { isV2Metadata } from './common/some-util-find-good-name';
import { parseReturnTypes } from './common/edmx-function-import-parser';
import { transformEntitiesV2 } from './v2/edmx-entity-parser';
import { transformEntitiesV4 } from './v4/edmx-entity-parser';
import { transformComplexTypesV4 } from './v4';

const logger = createLogger({
  package: 'generator',
  messageContext: 'service-parser'
});

export class ServiceParser {
  private globalNameFormatter: GlobalNameFormatter;
  private serviceMapping: VdmMapping;

  constructor(readonly options: GeneratorOptions) {
    this.serviceMapping = readServiceMapping(options);
    this.globalNameFormatter = new GlobalNameFormatter(this.serviceMapping);
  }

  public parseAllServices(): VdmServiceMetadata[] {
    return inputPaths(this.options.inputDir, this.options.useSwagger).map(p =>
      this.parseService(p)
    );
  }

  public withServiceMapping(serviceMapping: VdmMapping) {
    this.serviceMapping = serviceMapping;
    return this;
  }

  public withGlobalNameFormatter(globalNameFormatter: GlobalNameFormatter) {
    this.globalNameFormatter = globalNameFormatter;
    return this;
  }

  /**
   * Only public for compatibility to [[parseService]]
   * @hidden
   * @param serviceDefinitionPaths Path to the service definitions files.
   * @returns the parsed service
   */
  public parseService(
    serviceDefinitionPaths: ServiceDefinitionPaths
  ): VdmServiceMetadata {
    const serviceMetadata = parseServiceMetadata(serviceDefinitionPaths);

    const serviceHeader = this.buildServiceHeader(
      serviceMetadata,
      serviceDefinitionPaths
    );
    const serviceBody = this.buildServiceBody(
      serviceMetadata,
      serviceDefinitionPaths
    );

    return {
      ...serviceHeader,
      ...serviceBody
    };
  }

  private buildServiceHeader(
    serviceMetadata: ParsedServiceMetadata,
    serviceDefinitionPaths: ServiceDefinitionPaths
  ): VdmServiceMetadataHeader {
    const directoryName = this.globalNameFormatter.uniqueDirectoryName(
      packageName(serviceMetadata, this.options),
      serviceMetadata.edmx.fileName
    );
    const npmPackageName = this.globalNameFormatter.uniqueNpmPackageName(
      npmCompliantName(directoryName),
      serviceMetadata.edmx.fileName
    );
    const speakingModuleName = ServiceNameFormatter.directoryToSpeakingModuleName(
      directoryName
    );
    const className = `${speakingModuleName.replace(/ /g, '')}`;

    return {
      oDataVersion: serviceMetadata.edmx.oDataVersion,
      namespace: serviceMetadata.edmx.namespace,
      originalFileName: serviceMetadata.edmx.fileName,
      directoryName,
      npmPackageName,
      speakingModuleName,
      servicePath: getServicePath(
        serviceMetadata,
        this.serviceMapping[serviceMetadata.edmx.fileName]
      ),
      edmxPath: serviceDefinitionPaths.edmxPath,
      apiBusinessHubMetadata: apiBusinessHubMetadata(serviceMetadata.swagger),
      className
    };
  }

  private buildServiceBody(
    serviceMetadata: ParsedServiceMetadata,
    serviceDefinitionPaths: ServiceDefinitionPaths
  ): VdmServiceMetadataBody {
    const formatter = new ServiceNameFormatter();
    // getEntitySetNames(serviceMetadata.edmx),
    // getComplexTypeNames(serviceMetadata.edmx),
    // getFunctionImportNames1(serviceMetadata.edmx)

    // Do function imports before complex types so that function like createSomething get a nice name
    // The constructor function of a complex type is also called `createComplexType`.
    const functionImportsWithoutReturnType = isV2Metadata(serviceMetadata.edmx)
      ? transformFunctionImportsWithoutReturnTypeV2(serviceMetadata, formatter)
      : transformFunctionImportsWithoutReturnTypeV4(serviceMetadata, formatter);

    const complexTypes = isV2Metadata(serviceMetadata.edmx)
      ? transformComplexTypesV2(serviceMetadata, formatter)
      : transformComplexTypesV4(serviceMetadata, formatter);

    const entities = isV2Metadata(serviceMetadata.edmx)
      ? transformEntitiesV2(serviceMetadata, complexTypes, formatter)
      : transformEntitiesV4(serviceMetadata, complexTypes, formatter);

    const functionImports = parseReturnTypes(
      functionImportsWithoutReturnType,
      entities,
      complexTypes
    );

    return {
      complexTypes,
      entities,
      functionImports
    };
  }
}

/**
 * @deprecated Sinve version 1.25.0. Use the ServiceParser class instead
 * @param options Generator options *
 * @returns the parsed services
 */
export function parseAllServices(
  options: GeneratorOptions
): VdmServiceMetadata[] {
  return new ServiceParser(options).parseAllServices();
}

/**
 * @deprecated Sinve version 1.25.0. Use the ServiceParser class instead
 * @param serviceDefinitionPaths Path to the service definition
 * @param options Generator options
 * @param mappings mappings for VDM service names to desired name
 * @param globalNameFormatter Instance of global name formatter to be used for the parsing process
 * @returns the parsed service
 */
export function parseService(
  serviceDefinitionPaths: ServiceDefinitionPaths,
  options: GeneratorOptions,
  mappings: VdmMapping,
  globalNameFormatter: GlobalNameFormatter
): VdmServiceMetadata {
  return new ServiceParser(options)
    .withServiceMapping(mappings)
    .withGlobalNameFormatter(globalNameFormatter)
    .parseService(serviceDefinitionPaths);
}

// TODO split read and parse. Perhaps only read Parse later (for edmx clear also do for swagger)
function parseServiceMetadata(
  serviceDefinitionPaths: ServiceDefinitionPaths
): ParsedServiceMetadata {
  const serviceMetadata: ParsedServiceMetadata = {
    // TODO: pass parameter
    edmx: parseEdmxFromPath(serviceDefinitionPaths.edmxPath)
  };
  if (serviceDefinitionPaths.swaggerPath) {
    serviceMetadata.swagger = parseSwaggerFromPath(
      serviceDefinitionPaths.swaggerPath
    );
  }

  return serviceMetadata;
}

function apiBusinessHubMetadata(
  swagger?: SwaggerMetadata
): ApiBusinessHubMetadata | undefined {
  if (!swagger || !swagger?.basePath) {
    return undefined;
  }

  const metadata: ApiBusinessHubMetadata = {
    communicationScenario: communicationScenario(swagger),
    url: `https://api.sap.com/api/${apiHubServiceName(swagger)}`
  };

  if (swagger.externalDocs?.description === 'Business Documentation') {
    metadata.businessDocumentationUrl = swagger.externalDocs.url;
  }

  return metadata;
}

function apiHubServiceName(swagger: SwaggerMetadata): string {
  if (!swagger.basePath) {
    throw Error('The swagger base path is undefined.');
  }
  return swagger.basePath.split('/').slice(-1)[0];
}

function communicationScenario(swagger: SwaggerMetadata): string | null {
  if (!swagger['x-sap-ext-overview']) {
    return null;
  }

  return (
    swagger['x-sap-ext-overview']
      .find(x => x.name === 'Communication Scenario')
      .values.map(x => x.text)
      .join(', ') || null
  );
}

function packageName(
  metadata: ParsedServiceMetadata,
  options: GeneratorOptions
) {
  return ServiceNameFormatter.originalToServiceName(metadata.edmx.namespace);
}

function getServicePath(
  metadata: ParsedServiceMetadata,
  serviceMapping?: ServiceMapping
): string {
  let servicePath =
    servicePathFromMapping(serviceMapping) ||
    servicePathFromSelfLink(metadata) ||
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

function servicePathFromMapping(
  serviceMapping?: ServiceMapping
): string | undefined {
  return serviceMapping && propertyExists(serviceMapping, 'servicePath')
    ? serviceMapping.servicePath
    : undefined;
}

function servicePathFromSelfLink(
  metadata: ParsedServiceMetadata
): string | undefined {
  const selfLink = metadata.edmx.selfLink;
  if (selfLink) {
    return selfLink
      .replace(/^https?:\/\//, '')
      .replace(/\/\$metadata$/, '')
      .replace(/^[^\/]+/, '');
  }
}

function servicePathFromSwagger(swagger?: SwaggerMetadata): string | undefined {
  if (swagger && propertyExists(swagger, 'basePath')) {
    return swagger.basePath;
  }
}
