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
import { readSwaggerFile } from './swagger-parser/swagger-parser';
import { apiBusinessHubMetadata } from './swagger-parser/swagger-util';
import { VdmServiceMetadata, VdmServicePackageMetaData } from './vdm-types';
import { isV2Metadata } from './edmx-to-vdm/edmx-to-vdm-util';
import { getServiceEntitiesV2 } from './edmx-to-vdm/v2';
import { getServiceEntitiesV4 } from './edmx-to-vdm/v4';

class ServiceGenerator {
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

  public generateService(
    serviceDefinitionPaths: ServiceDefinitionPaths
  ): VdmServiceMetadata {
    const serviceMetadata = this.readEdmxAndSwaggerFile(serviceDefinitionPaths);

    const vdmServicePackageMetaData = this.getServicePackageMetaData(
      serviceMetadata,
      serviceDefinitionPaths
    );
    const vdmServiceEntities = isV2Metadata(serviceMetadata.edmx)
      ? getServiceEntitiesV2(serviceMetadata)
      : getServiceEntitiesV4(serviceMetadata);

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
        serviceMetadata.edmx.namespaces.length === 1
          ? serviceMetadata.edmx.namespaces[0]
          : serviceMetadata.edmx.fileName
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
      namespaces: serviceMetadata.edmx.namespaces,
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

  private readEdmxAndSwaggerFile(
    serviceDefinitionPaths: ServiceDefinitionPaths
  ): ServiceMetadata {
    const serviceMetadata: ServiceMetadata = {
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
 * @param options Generator options
 * @returns the parsed services
 */
export function parseAllServices(
  options: GeneratorOptions
): VdmServiceMetadata[] {
  return new ServiceGenerator(options).generateAllServices();
}

/**
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

export function getServiceName(service: VdmServiceMetadata): string {
  return service.namespaces.length === 1
    ? service.namespaces[0]
    : service.originalFileName;
}
