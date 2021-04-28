import {
  getPregeneratedLibrary,
  getSdkMetadataClient
} from '@sap-cloud-sdk/generator-common';
import type { Client } from '@sap-cloud-sdk/generator-common';
import { OpenApiDocument } from '../openapi-types';
import { GeneratorOptions } from '../options';
import { packageDescription } from './package-description';
import { getGenerationAndUsage } from './generation-and-usage';

export async function sdkMetaDataJS(
  openApiDocument: OpenApiDocument,
  options: GeneratorOptions
): Promise<Client> {
  const [pregeneratedLibrary, generationAndUsage] = await Promise.all([
    getPregeneratedLibrary(
      packageDescription(openApiDocument.npmPackageName),
      openApiDocument.npmPackageName,
      options.packageVersion
    ),
    getGenerationAndUsage(openApiDocument)
  ]);

  return getSdkMetadataClient(generationAndUsage, pregeneratedLibrary);
}
