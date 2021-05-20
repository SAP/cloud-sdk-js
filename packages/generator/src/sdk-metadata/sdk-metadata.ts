import {
  getSdkMetadataClient,
  getPregeneratedLibrary
} from '@sap-cloud-sdk/generator-common';
import { VdmServiceMetadata } from '../vdm-types';
import { GeneratorOptions } from '../generator-options';
import { getGenerationAndUsage } from './generation-and-usage';
import { getServiceDescription } from './pregenerated-lib';
import type { Client } from '@sap-cloud-sdk/generator-common';

export async function sdkMetadata(
  service: VdmServiceMetadata,
  options: GeneratorOptions
): Promise<Client> {
  const [pregeneratedLibrary, generationAndUsage] = await Promise.all([
    getPregeneratedLibrary(
      getServiceDescription(service, options),
      service.npmPackageName,
      options.versionInPackageJson
    ),
    getGenerationAndUsage(service)
  ]);

  return getSdkMetadataClient(generationAndUsage, pregeneratedLibrary);
}
