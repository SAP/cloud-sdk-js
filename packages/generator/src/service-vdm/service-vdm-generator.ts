/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { createLogger } from '@sap-cloud-sdk/util';
import { GeneratorOptions } from '../generator-options';
import { npmCompliantName } from '../generator-utils';
import { GlobalNameFormatter } from '../global-name-formatter';
import { inputPaths, ServiceDefinitionPaths } from '../input-path-provider';
import {
  getServicePath,
  readServiceMapping,
  VdmMapping
} from '../service-mapping';
import { ServiceNameFormatter } from '../service-name-formatter';
import {
  VdmServiceEntities,
  VdmServiceMetadata,
  VdmServicePackageMetaData
} from './vdm-types';
import { getFunctionImportsV4 } from './v4/function-import-vdm';
import { getEntitiesV4 } from './v4/entity-vdm';
import { getComplexTypesV4 } from './v4/complex-type-vdm';
import { readEdmxFile } from '../parser/util/edmx-file-reader';
import { parseReturnTypes } from './common/function-import-vdm';
import { getFunctionImportsV2 } from './v2/function-import-vdm';
import { getEntitiesV2 } from './v2/entity-vdm';
import { readSwaggerFile } from '../parser/swagger/swagger-parser';
import { ServiceMetadata } from '../parser/util/edmx-types';
import { getComplexTypesV2 } from './v2/complex-type-vdm';
import { isV2Metadata } from '../parser/util/parser-util';
import { apiBusinessHubMetadata } from '../parser/swagger/swagger-util';

const logger = createLogger({
  package: 'generator',
  messageContext: 'service-parser'
});

export class ServiceVdmGenerator {
  private globalNameFormatter: GlobalNameFormatter;
  private serviceMapping: VdmMapping;

  constructor(readonly options: GeneratorOptions) {
    this.serviceMapping = readServiceMapping(options);
    this.globalNameFormatter = new GlobalNameFormatter(this.serviceMapping);
  }

  public withServiceMapping(serviceMapping: VdmMapping) {
    this.serviceMapping = serviceMapping;
    return this;
  }

  public withGlobalNameFormatter(globalNameFormatter: GlobalNameFormatter) {
    this.globalNameFormatter = globalNameFormatter;
    return this;
  }

  public getAllServices(): VdmServiceMetadata[] {
    return inputPaths(this.options.inputDir, this.options.useSwagger).map(p =>
      this.getService(p)
    );
  }

  /**
   * Only public for compatibility to [[parseService]].
   * @hidden
   * @param serviceDefinitionPaths Path to the service definitions files.
   * @returns the parsed service
   */
  public getService(
    serviceDefinitionPaths: ServiceDefinitionPaths
  ): VdmServiceMetadata {
    const serviceMetadata = this.readEdmxAndSwaggerFile(serviceDefinitionPaths);

    const serviceHeader = this.getServicePackageMetaData(
      serviceMetadata,
      serviceDefinitionPaths
    );
    const serviceBody = this.getServiceEntities(
      serviceMetadata,
      serviceDefinitionPaths
    );

    return {
      ...serviceHeader,
      ...serviceBody
    };
  }

  private getServicePackageMetaData(
    serviceMetadata: ServiceMetadata,
    serviceDefinitionPaths: ServiceDefinitionPaths
  ): VdmServicePackageMetaData {
    const directoryName = this.globalNameFormatter.uniqueDirectoryName(
      ServiceNameFormatter.originalToServiceName(
        serviceMetadata.edmx.namespace
      ),
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

  private getServiceEntities(
    serviceMetadata: ServiceMetadata,
    serviceDefinitionPaths: ServiceDefinitionPaths
  ): VdmServiceEntities {
    const formatter = new ServiceNameFormatter();

    /*
    Do function imports before complex types so that function with name "createSomething" get a nice name,
    because the constructor function of a complex type would also be called `create${ComplexTypeName}`.
    */
    const functionImportsWithoutReturnType = isV2Metadata(serviceMetadata.edmx)
      ? getFunctionImportsV2(serviceMetadata, formatter)
      : getFunctionImportsV4(serviceMetadata, formatter);

    const complexTypes = isV2Metadata(serviceMetadata.edmx)
      ? getComplexTypesV2(serviceMetadata, formatter)
      : getComplexTypesV4(serviceMetadata, formatter);

    const entities = isV2Metadata(serviceMetadata.edmx)
      ? getEntitiesV2(serviceMetadata, complexTypes, formatter)
      : getEntitiesV4(serviceMetadata, complexTypes, formatter);

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

  private readEdmxAndSwaggerFile(
    serviceDefinitionPaths: ServiceDefinitionPaths
  ): ServiceMetadata {
    const serviceMetadata: ServiceMetadata = {
      // TODO: pass parameter
      edmx: readEdmxFile(serviceDefinitionPaths.edmxPath)
    };
    if (serviceDefinitionPaths.swaggerPath) {
      serviceMetadata.swagger = readSwaggerFile(
        serviceDefinitionPaths.swaggerPath
      );
    }
    return serviceMetadata;
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
  return new ServiceVdmGenerator(options).getAllServices();
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
  return new ServiceVdmGenerator(options)
    .withServiceMapping(mappings)
    .withGlobalNameFormatter(globalNameFormatter)
    .getService(serviceDefinitionPaths);
}
