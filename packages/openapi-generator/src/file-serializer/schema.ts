import { codeBlock, documentationBlock, unixEOL } from '@sap-cloud-sdk/util';
import { getType } from '../parser';
import {
  isReferenceObject,
  isArraySchema,
  isObjectSchema,
  isEnumSchema,
  isOneOfSchema,
  isAllOfSchema,
  isAnyOfSchema,
  isNotSchema,
  getSchemaPropertiesDocumentation
} from '../schema-util';
import type {
  OpenApiSchema,
  OpenApiObjectSchema,
  OpenApiObjectSchemaProperty,
  OpenApiOneOfSchema,
  OpenApiAnyOfSchema
} from '../openapi-types';

/**
 * Serialize a schema.
 * @param schema - Parsed schema to be serialized.
 * @returns The serialized schema
 * @internal
 */
export function serializeSchema(schema: OpenApiSchema): string {
  if (isReferenceObject(schema)) {
    return schema.schemaName;
  }

  if (isArraySchema(schema)) {
    const type = serializeSchema(schema.items);
    return schema.uniqueItems
      ? `Set<${type}>`
      : ['properties', 'allOf', 'oneOf', 'anyOf'].some(
            prop => prop in schema.items
          )
        ? `(${type})[]`
        : `${type}[]`;
  }

  if (isObjectSchema(schema)) {
    return serializeObjectSchema(schema);
  }

  if (isEnumSchema(schema)) {
    return schema.enum.join(' | ');
  }

  if (isOneOfSchema(schema)) {
    if (schema.discriminator) {
      return serializeXOfSchemaWithDiscriminator(schema);
    }

    return schema.oneOf.map(type => serializeSchema(type)).join(' | ');
  }

  if (isAllOfSchema(schema)) {
    return schema.allOf.map(type => serializeSchema(type)).join(' & ');
  }

  if (isAnyOfSchema(schema)) {
    if (schema.discriminator) {
      return serializeXOfSchemaWithDiscriminator(schema);
    }
    return schema.anyOf.map(type => serializeSchema(type)).join(' | ');
  }

  if (isNotSchema(schema)) {
    return codeBlock`any`;
  }

  return getType(schema.type);
}

function serializeObjectSchema(schema: OpenApiObjectSchema): string {
  if (
    !schema.properties.length &&
    typeof schema.additionalProperties !== 'object'
  ) {
    return 'Record<string, any>';
  }

  const types: string[] = [];
  if (schema.properties.length) {
    types.push(serializeObjectSchemaForProperties(schema.properties));
  }

  if (schema.additionalProperties) {
    types.push(
      `Record<string, ${serializeSchema(schema.additionalProperties)}>`
    );
  }

  return types.join(' & ');
}

function serializeObjectSchemaForProperties(
  properties: OpenApiObjectSchemaProperty[]
): string {
  return codeBlock`{
      ${properties
        .map(property => serializePropertyWithDocumentation(property))
        .join(unixEOL)}
    }`;
}

function serializeProperty(
  name: string,
  required: boolean,
  nullable: boolean,
  type: string
) {
  return `'${name}'${required ? '' : '?'}: ${type}${nullable ? ' | null' : ''};`;
}

function serializePropertyWithDocumentation(
  property: OpenApiObjectSchemaProperty
) {
  const documentation = schemaPropertyDocumentation(property);
  const serialized = serializeProperty(
    property.name,
    property.required,
    property.nullable,
    serializeSchema(property.schema)
  );
  if (documentation) {
    return [documentation, serialized].join(unixEOL);
  }
  return serialized;
}

/**
 * @internal
 */
export function schemaPropertyDocumentation(
  schema: OpenApiObjectSchemaProperty
): string {
  const signature: string[] = [];
  if (schema.description) {
    signature.push(schema.description);
  }

  signature.push(...getSchemaPropertiesDocumentation(schema.schemaProperties));

  return documentationBlock`${signature.join(unixEOL)}`;
}

function serializeXOfSchemaWithDiscriminator(
  schema: OpenApiOneOfSchema | OpenApiAnyOfSchema
) {
  const { discriminator } = schema;

  if (!discriminator) {
    throw new Error(
      'Could not serialize discriminator schema without discriminator.'
    );
  }

  return Object.entries(discriminator.mapping)
    .map(
      ([propertyValue, mappedSchema]) =>
        `({ ${discriminator.propertyName}: '${propertyValue}' } & ${serializeSchema(mappedSchema)})`
    )
    .join(' | ');
}
