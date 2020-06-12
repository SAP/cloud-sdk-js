/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import {
  createLogger,
  propertyExists,
  VALUE_IS_UNDEFINED
} from '@sap-cloud-sdk/util';
import voca from 'voca';
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
import { ApiBusinessHubMetadata, VdmServiceMetadata } from '../vdm-types';
import {
  SwaggerMetadata,
  EdmxFunctionImportBase,
  EdmxMetadataBaseExtended
} from './parser-types-common';
import { parseSwaggerFromPath } from './swagger-parser';
import {
  isV2Metadata,
  EdmxMetadata as EdmxMetadataV2
} from './parser-types-v2';
import { transformEntitiesV4 } from './edmx-to-vdm-v4';
import { transformEntitiesV2 } from './edmx-to-vdm-v2';
import { EdmxMetadata as EdmxMetadataV4 } from './parser-types-v4';
import { parseEdmxFromPath } from './edmx-parser';
import {
  transformComplexTypes,
  transformFunctionImports
} from './edmx-to-vdm-common';

const logger = createLogger({
  package: 'generator',
  messageContext: 'service-parser'
});

// TODO: move somewhere else
export interface ParsedServiceMetadata<
  T extends 'v2' | 'v4' | unknown = unknown
> {
  edmx: T extends 'v2'
    ? EdmxMetadataV2
    : T extends 'v4'
    ? EdmxMetadataV4
    : EdmxMetadataBaseExtended;
  swagger?: SwaggerMetadata;
}

export function isV2ServiceMetadata(
  metadata: ParsedServiceMetadata<'v2' | 'v4'>
): metadata is ParsedServiceMetadata<'v2'> {
  return metadata.edmx.oDataVersion === 'v2';
}

export function parseAllServices(
  options: GeneratorOptions
): VdmServiceMetadata[] {
  const serviceMapping = readServiceMapping(options);
  const globalNameFormatter = new GlobalNameFormatter(serviceMapping);
  return inputPaths(options.inputDir, options.useSwagger).map(p =>
    parseService(p, options, serviceMapping, globalNameFormatter)
  );
}

export function parseService(
  serviceDefinitionPaths: ServiceDefinitionPaths,
  options: GeneratorOptions,
  mappings: VdmMapping,
  globalNameFormatter: GlobalNameFormatter
): VdmServiceMetadata {
  const serviceMetadata = parseServiceMetadata(serviceDefinitionPaths);
  const serviceMapping = mappings[serviceMetadata.edmx.fileName];
  return transformServiceMetadata(
    serviceMetadata,
    options,
    globalNameFormatter,
    serviceDefinitionPaths,
    serviceMapping
  );
}

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

function transformServiceMetadata(
  metadata: ParsedServiceMetadata,
  options: GeneratorOptions,
  globalNameFormatter: GlobalNameFormatter,
  serviceDefinitionPaths: ServiceDefinitionPaths,
  serviceMapping?: ServiceMapping
): VdmServiceMetadata {
  const formatter = new ServiceNameFormatter(
    metadata.edmx.entitySets.map(entitySet => entitySet.Name),
    metadata.edmx.complexTypes.map(complexType => complexType.Name),
    (metadata.edmx.functionImports as EdmxFunctionImportBase[]).map(
      functionImport => functionImport.Name
    )
  );

  const namespace = metadata.edmx.namespace;
  const directoryName = globalNameFormatter.uniqueDirectoryName(
    packageName(metadata, options, formatter),
    metadata.edmx.fileName
  );
  const npmPackageName = globalNameFormatter.uniqueNpmPackageName(
    npmCompliantName(directoryName),
    metadata.edmx.fileName
  );
  const speakingModuleName = formatter.directoryToSpeakingModuleName(
    directoryName
  );

  const reservedFunctionImportNames = getFunctionImportNames(metadata);
  const complexTypes = transformComplexTypes(
    metadata.edmx.complexTypes,
    formatter,
    reservedFunctionImportNames
  );
  const className = `${speakingModuleName.replace(/ /g, '')}`;

  const transformEntities = isV2Metadata(metadata.edmx)
    ? transformEntitiesV2
    : transformEntitiesV4;

  const vdmService = {
    oDataVersion: metadata.edmx.oDataVersion,
    namespace,
    originalFileName: metadata.edmx.fileName,
    directoryName,
    npmPackageName,
    speakingModuleName,
    servicePath: getServicePath(metadata, serviceMapping),
    entities: transformEntities(metadata, complexTypes, formatter),
    edmxPath: serviceDefinitionPaths.edmxPath
  };

  const functionImports = transformFunctionImports(
    metadata,
    vdmService.entities,
    complexTypes,
    formatter
  );

  const apiHubMetadata = apiBusinessHubMetadata(metadata.swagger);

  return {
    ...vdmService,
    complexTypes,
    functionImports,
    apiBusinessHubMetadata: apiHubMetadata,
    className
  };
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
  options: GeneratorOptions,
  formatter: ServiceNameFormatter
) {
  return formatter.originalToServiceName(metadata.edmx.namespace);
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

function getFunctionImportNames(metadata: ParsedServiceMetadata) {
  return new Set(
    metadata.edmx.functionImports.map(f => voca.camelCase(f.Name))
  );
}
