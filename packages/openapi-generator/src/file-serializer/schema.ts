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
} from '../model';

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
  const propertiesSchema = serializeObjectSchemaForProperties(
    schema.properties
  );

  const needsAdditionalSchema =
    (schema.properties.length && schema.additionalProperties) ||
    (!schema.properties.length && schema.additionalProperties !== true);

  if (needsAdditionalSchema) {
    const additionalProperties = schema.additionalProperties
      ? getRecordSchema(schema.additionalProperties)
      : undefined;

    return codeBlock`${propertiesSchema} | ${additionalProperties}`;
  }

  return propertiesSchema;
}

function serializeObjectSchemaForProperties(
  properties: OpenApiObjectSchemaProperty[]
): string {
  if (properties.length) {
    return codeBlock`{
      ${properties
        .map(
          property =>
            [
              `${property.name}${property.required ? '' : '?'}`,
              serializeSchema(property.schema)
            ].join(': ') + ';'
        )
        .join('\n')}
    }`;
  }
  return getRecordSchema();
}

function getRecordSchema(
  additionalProperties: true | OpenApiSchema = true
): string {
  if (typeof additionalProperties === 'object') {
    return codeBlock`Record<string, ${serializeSchema(additionalProperties)}>`;
  }
  return codeBlock`Record<string, any>`;
}
