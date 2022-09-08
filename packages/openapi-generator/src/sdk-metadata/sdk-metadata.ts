import {
  getSdkMetadataClient,
  Client
} from '@sap-cloud-sdk/generator-common/internal';
import { OpenApiDocument } from '../openapi-types';
import { getApiSpecificUsage } from './generation-and-usage';

/**
 * @internal
 */
export async function sdkMetadata(
  openApiDocument: OpenApiDocument
): Promise<Client> {
  const generationAndUsage = getApiSpecificUsage(openApiDocument);
  return getSdkMetadataClient(generationAndUsage, 'OpenAPI');
}
