import {
  getPregeneratedLibrary,
  getSdkMetadataClient,
  Client,
  packageDescription
} from '@sap-cloud-sdk/generator-common/internal';
import { OpenApiDocument } from '../openapi-types';
import { getGenerationAndUsage } from './generation-and-usage';

/**
 * @internal
 */
export async function sdkMetadata(
  openApiDocument: OpenApiDocument
): Promise<Client> {
  const [pregeneratedLibrary, generationAndUsage] = await Promise.all([
    getPregeneratedLibrary(
      packageDescription(openApiDocument.serviceName),
      openApiDocument.serviceOptions.packageName
    ),
    getGenerationAndUsage(openApiDocument)
  ]);

  return getSdkMetadataClient(generationAndUsage, pregeneratedLibrary);
}
