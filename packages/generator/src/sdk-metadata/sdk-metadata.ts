import {
  getSdkMetadataClient,
  getPregeneratedLibrary,
  Client
} from '@sap-cloud-sdk/generator-common/internal';
import { VdmServiceMetadata } from '../vdm-types';
import { GeneratorOptions } from '../generator-options';
import { getGenerationAndUsage } from './generation-and-usage';
import { getServiceDescription } from './pregenerated-lib';

export async function sdkMetadata(
  service: VdmServiceMetadata,
  options: GeneratorOptions
): Promise<Client> {
  const [pregeneratedLibrary, generationAndUsage] = await Promise.all([
    getPregeneratedLibrary(
      getServiceDescription(service, options),
      service.npmPackageName
    ),
    getGenerationAndUsage(service)
  ]);

  return getSdkMetadataClient(generationAndUsage, pregeneratedLibrary);
}
