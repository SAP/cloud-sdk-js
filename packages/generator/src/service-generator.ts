/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { GeneratorOptions } from './generator-options';
import { npmCompliantName } from './generator-utils';
import { GlobalNameFormatter } from './global-name-formatter';
import { inputPaths, ServiceDefinitionPaths } from './input-path-provider';
import {
  getServicePath,
  readServiceMapping,
  VdmMapping
} from './service-mapping';
import { ServiceNameFormatter } from './service-name-formatter';
import { readEdmxFile, ServiceMetadata } from './edmx-parser/edmx-file-reader';
import { readSwaggerFile } from './edmx-parser/swagger/swagger-parser';
import { apiBusinessHubMetadata } from './edmx-parser/swagger/swagger-util';
import {
  VdmServiceEntities,
  VdmServiceMetadata,
  VdmServicePackageMetaData
} from './vdm-types';
import { generateFunctionImportsV4 } from './edmx-to-vdm/v4/function-import';
import { generateEntitiesV4 } from './edmx-to-vdm/v4/entity';
import { generateComplexTypesV4 } from './edmx-to-vdm/v4/complex-type';
import { parseReturnTypes } from './edmx-to-vdm/common/function-import';
import { generateFunctionImportsV2 } from './edmx-to-vdm/v2/function-import';
import { generateEntitiesV2 } from './edmx-to-vdm/v2/entity';
import { generateComplexTypesV2 } from './edmx-to-vdm/v2/complex-type';
import { isV2Metadata } from './edmx-to-vdm/edmx-to-vdm-util';

export class ServiceGenerator {
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

  public generateAllServices(): VdmServiceMetadata[] {
    return inputPaths(this.options.inputDir, this.options.useSwagger).map(p =>
      this.generateService(p)
    );
  }

  /**
   * Only public for compatibility to [[parseService]].
   * @hidden
   * @param serviceDefinitionPaths Path to the service definitions files.
   * @returns the parsed service
   */
  public generateService(
    serviceDefinitionPaths: ServiceDefinitionPaths
  ): VdmServiceMetadata {
    const serviceMetadata = this.readEdmxAndSwaggerFile(serviceDefinitionPaths);

    const vdmServicePackageMetaData = this.getServicePackageMetaData(
      serviceMetadata,
      serviceDefinitionPaths
    );
    const vdmServiceEntities = this.getServiceEntities(
      serviceMetadata,
      serviceDefinitionPaths
    );

    return {
      ...vdmServicePackageMetaData,
      ...vdmServiceEntities
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
    Do function imports before complex types so that function with name "createSomething" gets a nicer name, because the builder function of a complex type would also be called `create${ComplexTypeName}`.
    */
    const functionImportsWithoutReturnType = isV2Metadata(serviceMetadata.edmx)
      ? generateFunctionImportsV2(serviceMetadata, formatter)
      : generateFunctionImportsV4(serviceMetadata, formatter);

    const complexTypes = isV2Metadata(serviceMetadata.edmx)
      ? generateComplexTypesV2(serviceMetadata, formatter)
      : generateComplexTypesV4(serviceMetadata, formatter);

    const entities = isV2Metadata(serviceMetadata.edmx)
      ? generateEntitiesV2(serviceMetadata, complexTypes, formatter)
      : generateEntitiesV4(serviceMetadata, complexTypes, formatter);

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
 * @deprecated Since version 1.25.0. Use the ServiceParser class instead
 * @param options Generator options *
 * @returns the parsed services
 */
export function parseAllServices(
  options: GeneratorOptions
): VdmServiceMetadata[] {
  return new ServiceGenerator(options).generateAllServices();
}

/**
 * @deprecated Since version 1.25.0. Use the ServiceParser class instead
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
  return new ServiceGenerator(options)
    .withServiceMapping(mappings)
    .withGlobalNameFormatter(globalNameFormatter)
    .generateService(serviceDefinitionPaths);
}
