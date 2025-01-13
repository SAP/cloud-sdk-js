import SwaggerParser from '@apidevtools/swagger-parser';
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
  const document = (await SwaggerParser.parse(clonedContent)) as OpenAPIV3.Document;
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

type OpenApiPersistedSchemaWithDiscriminator = OpenApiPersistedSchema & {
  schema: OpenApiOneOfSchema &
  Required<Pick<OpenApiOneOfSchema, 'discriminator'>>;
};

// Some specs include incorrect discriminator definitions based on the schema type `object`, that circularly reference their parent type.
async function sanitizeDiscriminatedSchemas(
  schemas: OpenApiPersistedSchema[],
  refs: OpenApiDocumentRefs,
  options: ParserOptions
) {
  const discriminatorSchemas = schemas
    .filter(({ schema }) => isOneOfSchema(schema) && schema.discriminator)
    // type is known because of the filter above
    .map(({ schema, schemaName }: OpenApiPersistedSchemaWithDiscriminator) => ({
      children: Object.values(schema.discriminator.mapping),
      schemaName,
      propertyName: schema.discriminator.propertyName
    }));

  discriminatorSchemas.forEach(discriminatorSchema => {
    discriminatorSchema.children.forEach(childRef => {
      const child = schemas.find(
        schema => schema.schemaName === childRef.schemaName
      );
      if (isAllOfSchema(child?.schema)) {
        child.schema.allOf = child.schema.allOf.map(grandChild => {
          // if grandChild is the parent, aka. circular reference
          if (
            isReferenceObject(grandChild) &&
            grandChild.schemaName === discriminatorSchema.schemaName
          ) {
            const { properties = {}, required } =
              refs.resolveObject<OpenAPIV3.NonArraySchemaObject>(grandChild);

            properties[discriminatorSchema.propertyName] = { type: 'string' };

            return parseObjectSchema(
              { properties, required, additionalProperties: false },
              refs,
              options
            );
          }
          return grandChild;
        });
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
