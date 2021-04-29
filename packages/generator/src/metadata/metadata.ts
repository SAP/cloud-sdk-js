import type { Client } from '@sap-cloud-sdk/generator-common';
import {
  getMetadataClient,
  getPregeneratedLibrary
} from '@sap-cloud-sdk/generator-common';
import { VdmServiceMetadata } from '../vdm-types';
import { GeneratorOptions } from '../generator-options';
import { getGenerationAndUsage } from './generation-and-usage';
import { getServiceDescription } from './pregenerated-lib';

export async function metadata(
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

  return getMetadataClient(generationAndUsage, pregeneratedLibrary);
}
