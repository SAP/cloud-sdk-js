import { removeFileExtension } from '@sap-cloud-sdk/util';
import { VdmServiceMetadata } from '../vdm-types';
import { GeneratorOptions } from '../generator-options';
import type { Client, SdkMetadataHeader } from './sdk-metadata-types';
import {
  getVersionForClient,
  getPregeneratedLibrary
} from './pregenerated-lib';
import { getGenerationAndUsage } from './generation-and-usage';

export const textWithLib =
  'For this API you have two options to get a typed client. Either you download the pregenerated client from the repository or you generate the client on your own.';
export const textNoLib =
  'For this API no pregenerated published client exists. Follow the generation steps to create a client on your own.';
export async function sdkMetaDataJS(
  service: VdmServiceMetadata,
  options: GeneratorOptions
): Promise<Client> {
  const [pregeneratedLibrary, generationAndUsage] = await Promise.all([
    getPregeneratedLibrary(service, options),
    getGenerationAndUsage(service)
  ]);
  return {
    language: 'javascript',
    emergencyObject: undefined,
    gettingStartedText: pregeneratedLibrary ? textWithLib : textNoLib,
    serviceStatus: {
      status: pregeneratedLibrary ? 'certified' : 'verified',
      statusText: pregeneratedLibrary
        ? 'The SDK team has generated a API client and published it under npm.'
        : 'The SDK team has tested the generation process for this API.'
    },
    pregeneratedLibrary,
    generationAndUsage
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

export const introText =
  'The SAP Cloud SDK is a versatile set of libraries and tools for developers to build applications in a cloud-native way and host them on the SAP Business Technology Platform or other runtimes.';
export function sdkMetaDataHeader(
  service: VdmServiceMetadata,
  options: GeneratorOptions
): SdkMetadataHeader {
  return {
    type: 'odata',
    // For the file name with use the artifact.name from API which should be the unique identifier
    name: removeFileExtension(service.originalFileName),
    version: getVersionForClient(options),
    introText
  };
}
