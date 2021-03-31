import { EOL } from 'os';
import { codeBlock } from '@sap-cloud-sdk/util';
import {
  OpenApiSchema,
  OpenApiObjectSchema,
  OpenApiObjectSchemaProperty
} from '../openapi-types';
import { getType } from '../parser/type-mapping';
import {
  isReferenceObject,
  parseTypeNameFromRef,
  isArraySchema,
  isObjectSchema,
  isEnumSchema,
  isOneOfSchema,
  isAllOfSchema,
  isAnyOfSchema,
  isNotSchema
} from '../schema-util';
import { schemaPropertyDocumentation } from './docs';

/**
 * Serialize a schema.
 * @param schema Parsed schema to be serialized.
 * @returns The serialized schema
 */
export function serializeSchema(schema: OpenApiSchema): string {
  if (isReferenceObject(schema)) {
    return parseTypeNameFromRef(schema);
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
    return codeBlock`Except<any, ${serializeSchema(schema.not)}>`;
  }

  return getType(schema.type);
}

function serializeObjectSchema(schema: OpenApiObjectSchema): string {
  if (
    !schema.properties.length &&
    typeof schema.additionalProperties !== 'object'
  ) {
    return serializeRecordSchema();
  }

  const types: string[] = [];
  if (schema.properties.length) {
    types.push(serializeObjectSchemaForProperties(schema.properties));
  }

  if (schema.additionalProperties) {
    types.push(serializeRecordSchema(schema.additionalProperties));
  }

  return types.join(' | ');
}

function serializeObjectSchemaForProperties(
  properties: OpenApiObjectSchemaProperty[]
): string {
  return codeBlock`{
      ${properties
        .map(
          property =>
             schemaPropertyDocumentation(property)+
             `'${property.name}'${property.required ? '' : '?'}: ${serializeSchema(property.schema)};`
        )
        .join(EOL)}
    }`;
}

function serializeRecordSchema(
  additionalProperties: true | OpenApiSchema = true
): string {
  if (typeof additionalProperties === 'object') {
    return codeBlock`Record<string, ${serializeSchema(additionalProperties)}>`;
  }
  return codeBlock`Record<string, any>`;
}
