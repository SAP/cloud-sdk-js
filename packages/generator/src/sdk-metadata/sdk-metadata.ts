import {
  getSdkMetadataClient,
  getPregeneratedLibrary,
  Client
} from '@sap-cloud-sdk/generator-common/internal';
import { VdmServiceMetadata } from '../vdm-types';
import { getGenerationAndUsage } from './generation-and-usage';
import { getServiceDescription } from './pregenerated-lib';

/**
 * @internal
 */
export async function sdkMetadata(
  service: VdmServiceMetadata
): Promise<Client> {
  const [pregeneratedLibrary, generationAndUsage] = await Promise.all([
    getPregeneratedLibrary(
      getServiceDescription(service),
      service.npmPackageName
    ),
    getGenerationAndUsage(service)
  ]);

  return getSdkMetadataClient(generationAndUsage, pregeneratedLibrary);
}
