import { removeFileExtension } from '@sap-cloud-sdk/util';
import { VdmServiceMetadata } from '../vdm-types';
import { GeneratorOptions } from '../generator-options';
import { Client, SdkMetadataHeader } from './sdk-metadata-types';
import {
  getVersionForClient,
  getPregeneratedLibrary
} from './pregenerated-lib';
import { getGenerationAndUsage } from './generation-and-usage';

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
    serviceStatus: pregeneratedLibrary ? 'certified' : 'verified',
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

export function sdkMetaDataHeader(
  service: VdmServiceMetadata,
  options: GeneratorOptions
): SdkMetadataHeader {
  return {
    type: 'odata',
    // For the file name with use the artifact.name from API which should be the unique identifier
    name: removeFileExtension(service.originalFileName),
    version: getVersionForClient(options)
  };
}
