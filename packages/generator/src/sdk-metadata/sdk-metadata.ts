import {
  getSdkMetadataClient,
  Client
} from '@sap-cloud-sdk/generator-common/internal';
import { VdmServiceMetadata } from '../vdm-types';
import { getApiSpecificUsage } from './generation-and-usage';

/**
 * @internal
 */
export async function sdkMetadata(
  service: VdmServiceMetadata
): Promise<Client> {
  const generationAndUsage = await getApiSpecificUsage(service);
  return getSdkMetadataClient(generationAndUsage, 'OData');
}
