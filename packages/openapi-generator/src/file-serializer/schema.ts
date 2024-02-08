import { codeBlock, documentationBlock, unixEOL } from '@sap-cloud-sdk/util';
import {
  OpenApiSchema,
  OpenApiObjectSchema,
  OpenApiObjectSchemaProperty
} from '../openapi-types';
import { getType } from '../parser/type-mapping';
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
    return schema.uniqueItems ? `Set<${type}>` : `${type}[]`;
  }
  if (isObjectSchema(schema)) {
    return serializeObjectSchema(schema);
  }

  if (isEnumSchema(schema)) {
    return schema.enum.join(' | ');
  }

  if (isOneOfSchema(schema)) {
    return schema.oneOf.map(type => serializeSchema(type)).join(' | ');
  }

  if (isAllOfSchema(schema)) {
    return schema.allOf.map(type => serializeSchema(type)).join(' & ');
  }

  if (isAnyOfSchema(schema)) {
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

  return types.join(' | ');
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

function serializeProperty(name: string, required: boolean, type: string) {
  return `'${name}'${required ? '' : '?'}: ${type};`;
}

function serializePropertyWithDocumentation(
  property: OpenApiObjectSchemaProperty
) {
  const documentation = schemaPropertyDocumentation(property);
  const serialized = serializeProperty(
    property.name,
    property.required,
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
