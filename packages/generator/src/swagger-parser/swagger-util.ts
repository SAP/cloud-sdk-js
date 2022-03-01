import { ApiBusinessHubMetadata } from '../vdm-types';
import { SwaggerMetadata } from './swagger-types';

/**
 * @internal
 */
export function apiBusinessHubMetadata(
  swagger?: SwaggerMetadata
): ApiBusinessHubMetadata | undefined {
  if (!swagger || !swagger?.basePath) {
    return undefined;
  }

  const metadata: ApiBusinessHubMetadata = {
    communicationScenario: communicationScenario(swagger),
    url: `https://api.sap.com/api/${apiHubServiceName(swagger)}`
  };

  if (swagger.externalDocs?.description === 'Business Documentation') {
    metadata.businessDocumentationUrl = swagger.externalDocs.url;
  }

  return metadata;
}

function communicationScenario(swagger: SwaggerMetadata): string | null {
  if (!swagger['x-sap-ext-overview']) {
    return null;
  }

  return (
    swagger['x-sap-ext-overview']
      .find(x => x.name === 'Communication Scenario')
      .values.map(x => x.text)
      .join(', ') || null
  );
}

function apiHubServiceName(swagger: SwaggerMetadata): string {
  if (!swagger.basePath) {
    throw Error('The swagger-parser base path is undefined.');
  }
  return swagger.basePath.split('/').slice(-1)[0];
}
/**
 * @internal
 */
export function servicePathFromSwagger(
  swagger?: SwaggerMetadata
): string | undefined {
  return swagger?.basePath;
}
