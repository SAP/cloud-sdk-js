import {
  getSdkMetadataClient,
  Client,
  getSdkVersion
} from '@sap-cloud-sdk/generator-common/internal';
import { VdmServiceMetadata } from '../vdm-types';
import { getApiSpecificUsage } from './generation-and-usage';

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
