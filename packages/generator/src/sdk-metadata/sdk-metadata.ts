import { removeFileExtension } from '@sap-cloud-sdk/util';
import { VdmServiceMetadata } from '../vdm-types';
import { GeneratorOptions } from '../generator-options';
import {
  Client,
  SdkMetadataHeader
} from './sdk-metadata-types';
import{
  getVersion,
  getPregeneratedLibrary
} from './pregenerated-lib';
import { getGenerationAndUsage } from './generation-and-usage';

export async function sdkMetaDataJS(service: VdmServiceMetadata,options: GeneratorOptions): Promise<Client>{
  const pregeneratedLibrary = getPregeneratedLibrary(service,options);
  const generationAndUsage = getGenerationAndUsage(service);
  return {
    language: 'javascript',
    pregeneratedLibrary: await pregeneratedLibrary,
    generationAndUsage: await generationAndUsage
  };
}

export function getSdkMetadataFileNames(service: VdmServiceMetadata): {clientFileName: string;headerFileName: string}{
  const name = service.originalFileName;
  return{
    clientFileName:`${name}-client-js.json`,
    headerFileName:`${name}-header.json`
  };
}

export function sdkMetaDataHeader(service: VdmServiceMetadata,options: GeneratorOptions): SdkMetadataHeader{
return {
  type: 'odata',
  // For the file name with use the artifact.name from API which should be the unique identifier
  name: removeFileExtension(service.originalFileName),
  version: getVersion(options)
};
}

