import { OpenAPIV3 } from 'openapi-types';
import { OpenApiDocument, OpenApiPersistedSchema } from '../openapi-types';
import { ServiceOptions } from '../options/options-per-service';
import { parseSchema, parseSchemaProperties } from './schema';
import { parseApis } from './api';
import { createRefs, OpenApiDocumentRefs } from './refs';
import { ParserOptions } from './options';
import { parseBound } from './swagger-parser-workaround';

/**
 * Parse an OpenAPI document.
 * @param fileContent - Original OpenAPI document object.
 * @param serviceOptions - Service options as defined in the options per service.
 * @param options - Parser options.
 * @returns The parsed OpenAPI document representation
 * @internal
 */
export async function parseOpenApiDocument(
  fileContent: OpenAPIV3.Document,
  serviceOptions: ServiceOptions,
  options: ParserOptions
): Promise<OpenApiDocument> {
  const clonedContent = JSON.parse(JSON.stringify(fileContent));
  const document = (await parseBound(clonedContent)) as OpenAPIV3.Document;
  const refs = await createRefs(document, options);

  return {
    apis: parseApis(document, refs, options),
    serviceName: serviceOptions.serviceName,
    serviceDescription: document.info.description,
    serviceOptions,
    schemas: parseSchemas(document, refs, options)
  };
}

/**
 * @internal
 */
export function parseSchemas(
  document: OpenAPIV3.Document,
  refs: OpenApiDocumentRefs,
  options: ParserOptions
): OpenApiPersistedSchema[] {
  return Object.entries(document.components?.schemas || {}).map(
    ([name, schema]) => ({
      ...refs.getSchemaNaming(`#/components/schemas/${name}`),
      schema: parseSchema(schema, refs, options),
      description: refs.resolveObject(schema).description,
      schemaProperties: parseSchemaProperties(schema)
    })
  );
}
