import { codeBlock, createLogger } from '@sap-cloud-sdk/util';
import {
  collectRefs,
  hasNotType,
  parseTypeName,
  parseFileName,
  isReferenceObject,
  isArraySchema,
  isObjectSchema,
  isEnumSchema,
  isOneOfSchema,
  isAllOfSchema,
  isAnyOfSchema,
  isNotSchema
} from '../model';
import {
  OpenApiNamedSchema,
  OpenApiObjectSchema,
  OpenApiObjectSchemaProperty,
  OpenApiSchema
} from '../openapi-types';
import { getType } from '../parser/type-mapping';
const logger = createLogger('openapi-generator');

export function interfaceFile({ name, schema }: OpenApiNamedSchema): string {
  const refs = collectRefs(schema);
  const coreImports = hasNotType(schema)
    ? "import { Except } from '@sap-cloud-sdk/core';"
    : '';

  const imports = codeBlock`${[...getImportsFromRefs(refs), coreImports].join(
    '\n'
  )}`;

  return codeBlock`
      ${imports}
      export type ${name} = ${getTypeFromSchema(schema)};
    `;
}

function getImportsFromRefs(refs: string[]): string[] {
  return refs.map(
    ref =>
      codeBlock`import { ${parseTypeName({
        $ref: ref
      })} } from './${parseFileName({ $ref: ref })}';`
  );
}

export function getTypeFromSchema(schema: OpenApiSchema): string {
  if (isReferenceObject(schema)) {
    return parseTypeName(schema);
  }
  if (isArraySchema(schema)) {
    const type = getTypeFromSchema(schema.items);
    return schema.uniqueItems ? `Set<${type}>` : `${type}[]`;
  }
  if (isObjectSchema(schema)) {
    return getObjectSchema(schema);
  }

  if (isEnumSchema(schema)) {
    return schema.enum.join(' | ');
  }

  if (isOneOfSchema(schema)) {
    return schema.oneOf.map(type => getTypeFromSchema(type)).join(' | ');
  }

  if (isAllOfSchema(schema)) {
    return schema.allOf.map(type => getTypeFromSchema(type)).join(' & ');
  }

  if (isAnyOfSchema(schema)) {
    return schema.anyOf.map(type => getTypeFromSchema(type)).join(' | ');
  }

  if (isNotSchema(schema)) {
    return codeBlock`Except<any, ${getTypeFromSchema(schema.not)}>`;
  }

  return getType(schema.type);
}

function getObjectSchema(schema: OpenApiObjectSchema): string {
  const propertiesSchema = getObjectSchemaForProperties(schema.properties);

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

function getObjectSchemaForProperties(
  properties: OpenApiObjectSchemaProperty[]
): string {
  if (properties.length) {
    return codeBlock`{
      ${properties
        .map(
          property =>
            [
              `${property.name}${property.required ? '' : '?'}`,
              getTypeFromSchema(property.schema)
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
    return codeBlock`Record<string, ${getTypeFromSchema(
      additionalProperties
    )}>`;
  }
  return codeBlock`Record<string, any>`;
}
