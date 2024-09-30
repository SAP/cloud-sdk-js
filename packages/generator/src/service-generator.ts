import {
  directoryToServiceName,
  directoryToSpeakingModuleName,
  getOptionsPerService,
  getRelPathWithPosixSeparator
} from '@sap-cloud-sdk/generator-common/internal';
import { readEdmxAndSwaggerFile } from './edmx-parser';
import { apiBusinessHubMetadata } from './swagger-parser';
import {
  isV2Metadata,
  getServiceEntitiesV2,
  getServiceEntitiesV4
} from './edmx-to-vdm';
import { getBasePath } from './service-base-path';
import type {
  VdmServiceMetadata,
  VdmServicePackageMetaData
} from './vdm-types';
import type { ServiceMetadata } from './edmx-parser';
import type { ParsedGeneratorOptions } from './options';

class ServiceGenerator {
  constructor(readonly options: ParsedGeneratorOptions) {}

  public async generateAllServices(): Promise<VdmServiceMetadata[]> {
    return Promise.all(
      this.options.input.map(serviceSpecPath =>
        this.generateService(serviceSpecPath)
      )
    );
  }

  public async generateService(
    edmxServiceSpecPath: string
  ): Promise<VdmServiceMetadata> {
    const optionsPerService = await getOptionsPerService(
      this.options.input,
      this.options
    );
    const serviceOptions =
      optionsPerService[getRelPathWithPosixSeparator(edmxServiceSpecPath)];

    if (!serviceOptions) {
      throw new Error(
        `Options per service not found for key ${getRelPathWithPosixSeparator(
          edmxServiceSpecPath
        )}. Service options are ${JSON.stringify(optionsPerService, null, 2)}`
      );
    }
    const serviceMetadata = readEdmxAndSwaggerFile(edmxServiceSpecPath);

    const vdmServicePackageMetaData = this.getServicePackageMetaData(
      serviceMetadata,
      serviceOptions.directoryName,
      edmxServiceSpecPath
    );

    const vdmServiceEntities = isV2Metadata(serviceMetadata.edmx)
      ? getServiceEntitiesV2(
          serviceMetadata,
          vdmServicePackageMetaData.className,
          this.options.skipValidation
        )
      : getServiceEntitiesV4(
          serviceMetadata,
          vdmServicePackageMetaData.className,
          this.options.skipValidation
        );

    return {
      ...vdmServicePackageMetaData,
      ...vdmServiceEntities,
      serviceOptions: {
        ...serviceOptions,
        basePath: getBasePath(serviceMetadata, serviceOptions)
      }
    };
  }

  private getServicePackageMetaData(
    serviceMetadata: ServiceMetadata,
    directoryName: string,
    edmxServiceSpecPath: string
  ): VdmServicePackageMetaData {
    return {
      oDataVersion: serviceMetadata.edmx.oDataVersion,
      namespaces: serviceMetadata.edmx.namespaces,
      originalFileName: serviceMetadata.edmx.fileName,
      speakingModuleName: directoryToSpeakingModuleName(directoryName),
      className: directoryToServiceName(directoryName),
      edmxPath: edmxServiceSpecPath,
      apiBusinessHubMetadata: apiBusinessHubMetadata(serviceMetadata.swagger)
    };
  }
}

/**
 * @param options - Generator options
 * @returns the parsed services
 * @internal
 */
export async function parseAllServices(
  options: ParsedGeneratorOptions
): Promise<VdmServiceMetadata[]> {
  return new ServiceGenerator(options).generateAllServices();
}

/**
 * @param serviceDefinitionPaths - Path to the service definition
 * @param options - Generator options
 * @param mappings - mappings for VDM service names to desired name
 * @param globalNameFormatter - Instance of global name formatter to be used for the parsing process
 * @returns the parsed service
 * @internal
 */
export async function parseService(
  edmxServiceSpecPath: string,
  options: ParsedGeneratorOptions
): Promise<VdmServiceMetadata> {
  return new ServiceGenerator(options).generateService(edmxServiceSpecPath);
}

/**
 * @internal
 */
export function getServiceName(service: VdmServiceMetadata): string {
  return service.namespaces.length === 1
    ? service.namespaces[0]
    : service.originalFileName;
}
