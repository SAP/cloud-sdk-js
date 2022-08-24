import {
  getSdkMetadataClient,
  getPregeneratedLibrary,
  Client,
  packageDescription
} from '@sap-cloud-sdk/generator-common/internal';
import { VdmServiceMetadata } from '../vdm-types';
import { getGenerationAndUsage } from './generation-and-usage';

/**
 * @internal
 */
export async function sdkMetadata(
  service: VdmServiceMetadata
): Promise<Client> {
  const [pregeneratedLibrary, generationAndUsage] = await Promise.all([
    getPregeneratedLibrary(packageDescription(service.speakingModuleName), service.npmPackageName),
    getGenerationAndUsage(service)
  ]);

  return getSdkMetadataClient(generationAndUsage, pregeneratedLibrary);
}
