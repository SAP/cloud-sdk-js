import { removeFileExtension } from '@sap-cloud-sdk/util';
import { VdmServiceMetadata } from '../vdm-types';
import { GeneratorOptions } from '../generator-options';
import type {
  Client,
  SdkMetadataHeader,
  ServiceStatus
} from './sdk-metadata-types';
import {
  getVersionForClient,
  getPregeneratedLibrary
} from './pregenerated-lib';
import { getGenerationAndUsage, getGenericUsage } from './generation-and-usage';
import { installDependencies } from '@sap-cloud-sdk/cli/dist/utils';
import { getLinks } from './links';

export async function sdkMetaDataJS(
  service: VdmServiceMetadata,
  options: GeneratorOptions
): Promise<Client> {
  const [pregeneratedLibrary, generationAndUsage] = await Promise.all([
    getPregeneratedLibrary(service, options),
    getGenerationAndUsage(service)
  ]);

  const status = pregeneratedLibrary
    ? ServiceStatusValues.certified
    : ServiceStatusValues.verified;
  return {
    language: 'javascript',
    emergencyObject: undefined,
    serviceStatus: status,
    pregeneratedLibrary,
    generationAndUsage
  };
}

export async function sdkMetaDataJSFallback(generatorVersion: string): Promise<Client> {
  return {
    pregeneratedLibrary: undefined,
    language: 'javascript',
    serviceStatus:ServiceStatusValues.unknown,
    generationAndUsage: await getGenerationAndUsage(generatorVersion)
  };
}

export function getSdkMetadataFileNames(
  service: VdmServiceMetadata
): { clientFileName: string; headerFileName: string } {
  const name = service.originalFileName;
  return {
    clientFileName: `${name}_CLIENT_JS.json`,
    headerFileName: `${name}_HEADER.json`
  };
}

export function sdkMetaDataHeader(
  service: VdmServiceMetadata,
  options: GeneratorOptions
)
export function sdkMetaDataHeader(
  serviceName: string,
  version: string
)
export function sdkMetaDataHeader(
  serviceOrName: VdmServiceMetadata|string,
  optionsOrVersion: GeneratorOptions|string
)
  : SdkMetadataHeader {
  // For the file name we use the artifact.name from API which should be the unique identifier
  const name = typeof serviceOrName === 'string' ? serviceOrName : removeFileExtension((serviceOrName.originalFileName))
  const version = typeof optionsOrVersion === 'string' ? optionsOrVersion : getVersionForClient(optionsOrVersion as GeneratorOptions)

  return {
    type: 'odata',
  name,
    version,
    introText:
      'The SAP Cloud SDK is a versatile set of libraries and tools for developers to build applications in a cloud-native way and host them on the SAP Business Technology Platform or other runtimes.'
  };
}

export const ServiceStatusValues: Record<ServiceStatus['status'], ServiceStatus> = {
  certified: {
    status: 'certified',
    statusText: 'A pre-generated API client exists.',
    gettingStartedText:
      'For this API you have two options to get a typed client. Either you download the pregenerated client from the repository or you generate the client on your own.'
  },
  verified: {
    status: 'verified',
    statusText: 'The generation process for this API works.',
    gettingStartedText:
      'For this API no pregenerated published client exists. Follow the generation steps to create a client on your own.'
  },
  unknown: {
    status: 'unknown',
    statusText: 'No information for this service present.',
    gettingStartedText: ''
  }
};
