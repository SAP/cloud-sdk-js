import {
  getSdkMetadataClient,
  getSdkVersion
} from '@sap-cloud-sdk/generator-common/internal';
import { getApiSpecificUsage } from './generation-and-usage';
import type { Client } from '@sap-cloud-sdk/generator-common/internal';
import type { VdmServiceMetadata } from '../vdm-types';

/**
 * @internal
 */
export async function sdkMetadata(
  service: VdmServiceMetadata
): Promise<Client> {
  const generationAndUsage = getApiSpecificUsage(service);
  const sdkVersion = await getSdkVersion();
  return getSdkMetadataClient(generationAndUsage, sdkVersion, 'OData');
}
