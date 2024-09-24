import type { Client } from '@sap-cloud-sdk/generator-common/internal';
import {
  getSdkMetadataClient,
  getSdkVersion
} from '@sap-cloud-sdk/generator-common/internal';
import type { OpenApiDocument } from '../openapi-types';
import { getApiSpecificUsage } from './generation-and-usage';

/**
 * @internal
 */
export async function sdkMetadata(
  openApiDocument: OpenApiDocument
): Promise<Client> {
  const generationAndUsage = getApiSpecificUsage(openApiDocument);
  const sdkVersion = await getSdkVersion();
  return getSdkMetadataClient(generationAndUsage, sdkVersion, 'OpenAPI');
}
