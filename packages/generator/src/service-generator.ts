import { parse } from 'path';
import { existsSync } from 'fs';
import { ParsedGeneratorOptions } from './options';
import { npmCompliantName } from './generator-utils';
import { GlobalNameFormatter } from './global-name-formatter';
import {
  getBasePath,
  readOptionsPerService,
  VdmMapping
} from './options-per-service';
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
  private optionsPerService: VdmMapping;

  constructor(readonly options: ParsedGeneratorOptions) {
    this.optionsPerService = readOptionsPerService(options);
    this.globalNameFormatter = new GlobalNameFormatter(this.optionsPerService);
  }

  public withOptionsPerService(optionsPerService: VdmMapping) {
    this.optionsPerService = optionsPerService;
    return this;
  }

  public withGlobalNameFormatter(globalNameFormatter: GlobalNameFormatter) {
    this.globalNameFormatter = globalNameFormatter;
    return this;
  }

  public generateAllServices(): VdmServiceMetadata[] {
    return this.options.input.map(serviceSpecPath =>
      this.generateService(serviceSpecPath)
    );
  }

  public generateService(edmxServiceSpecPath: string): VdmServiceMetadata {
    const serviceMetadata = this.readEdmxAndSwaggerFile(edmxServiceSpecPath);

    const vdmServicePackageMetaData = this.getServicePackageMetaData(
      serviceMetadata,
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
      ...vdmServiceEntities
    };
  }

  private getServicePackageMetaData(
    serviceMetadata: ServiceMetadata,
    edmxServiceSpecPath: string
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
    const speakingModuleName =
      ServiceNameFormatter.directoryToSpeakingModuleName(directoryName);
    const className = `${speakingModuleName.replace(/ /g, '')}`;

    return {
      oDataVersion: serviceMetadata.edmx.oDataVersion,
      namespaces: serviceMetadata.edmx.namespaces,
      originalFileName: serviceMetadata.edmx.fileName,
      directoryName,
      npmPackageName,
      speakingModuleName,
      basePath: getBasePath(
        serviceMetadata,
        this.options.skipValidation,
        this.optionsPerService[serviceMetadata.edmx.fileName]
      ),
      edmxPath: edmxServiceSpecPath,
      apiBusinessHubMetadata: apiBusinessHubMetadata(serviceMetadata.swagger),
      className
    };
  }

  private readEdmxAndSwaggerFile(edmxServiceSpecPath: string): ServiceMetadata {
    const serviceMetadata: ServiceMetadata = {
      edmx: readEdmxFile(edmxServiceSpecPath)
    };
    const extension = parse(edmxServiceSpecPath).ext;
    ['.JSON'].forEach(swaggerExtension => {
      const swaggerPath = edmxServiceSpecPath.replace(
        extension,
        swaggerExtension
      );
      if (existsSync(swaggerPath)) {
        serviceMetadata.swagger = readSwaggerFile(swaggerPath);
      }
    });

    return serviceMetadata;
  }
}

/**
 * @param options - Generator options
 * @returns the parsed services
 * @internal
 */
export function parseAllServices(
  options: ParsedGeneratorOptions
): VdmServiceMetadata[] {
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
export function parseService(
  edmxServiceSpecPath: string,
  options: ParsedGeneratorOptions,
  mappings: VdmMapping,
  globalNameFormatter: GlobalNameFormatter
): VdmServiceMetadata {
  return new ServiceGenerator(options)
    .withOptionsPerService(mappings)
    .withGlobalNameFormatter(globalNameFormatter)
    .generateService(edmxServiceSpecPath);
}

/**
 * @internal
 */
export function getServiceName(service: VdmServiceMetadata): string {
  return service.namespaces.length === 1
    ? service.namespaces[0]
    : service.originalFileName;
}
