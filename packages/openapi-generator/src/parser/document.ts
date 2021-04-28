import { parse } from '@apidevtools/swagger-parser';
import { OpenAPIV3 } from 'openapi-types';
import { pascalCase } from '@sap-cloud-sdk/util';
import { OpenApiDocument, OpenApiPersistedSchema } from '../openapi-types';
import { ServiceConfig } from '../options/per-service-config';
import { parseSchema } from './schema';
import { parseApis } from './api';
import { createRefs, OpenApiDocumentRefs } from './refs';
import { ParserOptions } from './options';

/**
 * Parse an OpenAPI document.
 * @param fileContent Original OpenAPI document object.
 * @param serviceName Original service name.
 * @param serviceConfig Service configuration as defined in the per service configuration.
 * @param options Parser options.
 * @returns The parsed OpenAPI document representation
 */
export async function parseOpenApiDocument(
  fileContent: OpenAPIV3.Document,
  serviceName: string,
  serviceConfig: ServiceConfig,
  options: ParserOptions
): Promise<OpenApiDocument> {
  const clonedContent = JSON.parse(JSON.stringify(fileContent));
  const document = (await parse(clonedContent)) as OpenAPIV3.Document;
  const refs = await createRefs(document, options);

  return {
    apis: parseApis(document, refs, options),
    serviceName: pascalCase(serviceName),
    ...serviceConfig,
    schemas: parseSchemas(document, refs)
  };
}

export function parseSchemas(
  document: OpenAPIV3.Document,
  refs: OpenApiDocumentRefs
): OpenApiPersistedSchema[] {
  return Object.entries(document.components?.schemas || {}).map(
    ([name, schema]) => ({
      ...refs.getSchemaNaming(`#/components/schemas/${name}`),
      schema: parseSchema(schema, refs),
      description: refs.resolveObject(schema).description
    })
  );
}
