import {
  isAllOfSchema,
  isOneOfSchema,
  isReferenceObject
} from '../schema-util';
import {
  parseObjectSchema,
  parseSchema,
  parseSchemaProperties
} from './schema';
import { parseApis } from './api';
import { createRefs } from './refs';
import { parseBound } from './swagger-parser-workaround';
import type { OpenAPIV3 } from 'openapi-types';
import type { ServiceOptions } from '@sap-cloud-sdk/generator-common/internal';
import type {
  OpenApiDocument,
  OpenApiPersistedSchema,
  OpenApiOneOfSchema
} from '../openapi-types';
import type { OpenApiDocumentRefs } from './refs';
import type { ParserOptions } from './options';

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
  const schemas = parseSchemas(document, refs, options);
  sanitizeDiscriminatedSchemas(schemas, refs, options);

  return {
    apis: parseApis(document, refs, options),
    serviceDescription: document.info.description,
    serviceOptions,
    serviceName: serviceOptions.directoryName,
    schemas
  };
}

async function sanitizeDiscriminatedSchemas(
  schemas: OpenApiPersistedSchema[],
  refs: OpenApiDocumentRefs,
  options: ParserOptions
) {
  const discriminatorSchemas = schemas
    .filter(({ schema }) => isOneOfSchema(schema) && schema.discriminator)
    .map(schema => ({
      children: Object.values(
        (schema.schema as OpenApiOneOfSchema).discriminator!.mapping
      ),
      schemaName: schema.schemaName
    }));

  discriminatorSchemas.forEach(discriminatorSchema => {
    discriminatorSchema.children.forEach(child => {
      const childSchema = schemas.find(
        schema => schema.schemaName === child.schemaName
      );
      if (isAllOfSchema(childSchema?.schema)) {
        childSchema.schema.allOf = childSchema.schema.allOf.map(
          childChildSchema => {
            if (
              isReferenceObject(childChildSchema) &&
              childChildSchema.schemaName === discriminatorSchema.schemaName
            ) {
              // childChildSchema is the parent
              const { properties, required } =
                refs.resolveObject<OpenAPIV3.NonArraySchemaObject>(
                  childChildSchema
                );

              return parseObjectSchema(
                { properties, required, additionalProperties: false },
                refs,
                options
              );
            }
            return childChildSchema;
          }
        );
      }
    });
  });
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
      schemaProperties: parseSchemaProperties(schema),
      nullable: 'nullable' in schema && schema.nullable ? true : false
    })
  );
}
