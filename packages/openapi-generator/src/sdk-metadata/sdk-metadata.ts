import { OpenApiDocument } from '../openapi-types';
import { getSdkMetadataClient } from '../common/sdk-metadata';
import { getPregeneratedLibrary } from '../common/pregenerated-lib';
import { GeneratorOptions } from '../options';
import { Client } from '../common/sdk-metadata-types';
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
      options.versionInPackageJson
    ),
    getGenerationAndUsage(openApiDocument)
  ]);

  return getSdkMetadataClient(generationAndUsage, pregeneratedLibrary);
}
