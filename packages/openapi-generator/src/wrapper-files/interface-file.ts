import { codeBlock, createLogger, unique } from '@sap-cloud-sdk/util';
import {
  OpenApiNamedSchema,
  OpenApiObjectSchema,
  OpenApiObjectSchemaProperty,
  OpenApiSchema
} from '../openapi-types';
import {
  isReferenceObject,
  parseFileName,
  parseTypeName
} from '../parser/refs';
import {
  isAllOfSchema,
  isAnyOfSchema,
  isArraySchema,
  isEnumSchema,
  isNotSchema,
  isObjectSchema,
  isOneOfSchema
} from '../parser/schema';
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

  // if (isReferenceObject(schema)) {
  //   return codeBlock`
  //     ${imports}
  //     export type ${name} = ${getTypeFromSchema(schema)};
  //   `;
  // }
  // if (isArraySchema(schema)) {
  //   return codeBlock`
  //     ${imports}
  //     export type ${name} = ${getTypeFromSchema(schema)};
  //   `;
  // }
  // if (isOneOfSchema(schema)) {
  //   return codeBlock`
  //     ${imports}
  //     export type ${name} = ${getTypeFromSchema(schema)};
  //   `;
  // }
  // if (isObjectSchema(schema)) {
  //   return codeBlock`
  //     ${imports}
  //     export interface ${name} ${getTypeFromSchema(schema)}`;
  // }

  // logger.warn(`Could not generate type for schema '${name}', using 'any'.`);

  // return codeBlock`
  // ${imports}
  // export type ${name} = any;
  // `;
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
  const additionalProperties = getAdditionalProperties(schema);

  const propertiesSchema = getObjectSchemaForProperties(schema.properties);

  return additionalProperties
    ? codeBlock`${propertiesSchema} | ${additionalProperties}`
    : propertiesSchema;
}

function getObjectSchemaForProperties(
  properties: OpenApiObjectSchemaProperty[]
): string {
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

function getAdditionalProperties(
  schema: OpenApiObjectSchema
): string | undefined {
  if (schema.additionalProperties) {
    const schemaDefinition =
      typeof schema.additionalProperties === 'object'
        ? schema.additionalProperties
        : { type: 'any' };
    return codeBlock`Record<string, ${getTypeFromSchema(schemaDefinition)}>`;
  }
}

function collectRefs(schema: OpenApiSchema): string[] {
  if (isReferenceObject(schema)) {
    return [schema.$ref];
  }
  return Object.values(schema)
    .filter(value => typeof value === 'object')
    .reduce((refs, value) => unique([...refs, ...collectRefs(value)]), []);
}

function hasNotType(schema: OpenApiSchema): boolean {
  if (isNotSchema(schema)) {
    return true;
  }
  return Object.values(schema)
    .filter(value => typeof value === 'object')
    .reduce(
      (containsNotSchema, value) => containsNotSchema || hasNotType(value),
      false
    );
}
