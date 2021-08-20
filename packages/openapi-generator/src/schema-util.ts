import { flat, titleFormat } from '@sap-cloud-sdk/util';
import { OpenAPIV3 } from 'openapi-types';
import {
  OpenApiAllOfSchema,
  OpenApiAnyOfSchema,
  OpenApiArraySchema,
  OpenApiEnumSchema,
  OpenApiNotSchema,
  OpenApiObjectSchema,
  OpenApiOneOfSchema,
  OpenApiReferenceSchema,
  OpenApiSchema,
  OpenApiSchemaProperties,
  SchemaNaming
} from './openapi-types';
import { SchemaRefMapping } from './parser/parsing-info';

/**
 * Collect all unique reference schemas within the given schemas.
 * @param schemas - Parsed schemas to retrieve all references for.
 * @returns Returns a list of unique reference schemas within the given schemas.
 */
export function collectRefs(
  ...schemas: (OpenApiSchema | undefined)[]
): OpenApiReferenceSchema[] {
  return getUniqueRefs(flat(schemas.map(schema => collectAllRefs(schema))));
}

/**
 * Collect all reference schemas within a schema.
 * The resulting list of references might contain duplicates.
 * @param schema - Parsed schema to retrieve all references for.
 * @returns Returns a list of reference schemas within a schema. Might contain duplicates.
 */
function collectAllRefs(
  schema: OpenApiSchema | undefined
): OpenApiReferenceSchema[] {
  if (!schema) {
    return [];
  }
  if (isReferenceObject(schema)) {
    return [schema];
  }
  return Object.values(schema)
    .filter(value => typeof value === 'object')
    .reduce((refs, value) => [...refs, ...collectAllRefs(value)], []);
}

/**
 * Reduce a list of reference schemas to a list of unique reference schemas, based on $ref.
 * @param refs - List of reference schemas.
 * @returns List of unique reference schemas.
 */
export function getUniqueRefs(
  refs: OpenApiReferenceSchema[]
): OpenApiReferenceSchema[] {
  return refs.reduce((uniqueRefs: OpenApiReferenceSchema[], collectedRef) => {
    if (!uniqueRefs.some(ref => ref.$ref === collectedRef.$ref)) {
      uniqueRefs.push(collectedRef);
    }
    return uniqueRefs;
  }, []);
}

/**
 * Type guard to check whether an object is of type `OpenAPIV3.ReferenceObject`.
 * @param obj - Object to check.
 * @returns `true` if the object is a reference object, `false` otherwise.
 */
export function isReferenceObject(obj: any): obj is OpenAPIV3.ReferenceObject {
  return !!obj?.$ref;
}

/**
 * Type guard to check whether an object is of type `OpenApiArraySchema`.
 * @param obj - Object to check.
 * @returns `true` if the object is an array schema, `false` otherwise.
 */
export function isArraySchema(obj: any): obj is OpenApiArraySchema {
  return obj?.items;
}

/**
 * Type guard to check whether an object is of type `OpenApiObjectSchema`.
 * @param obj - Object to check.
 * @returns `true` if the object is an object schema, `false` otherwise.
 */
export function isObjectSchema(obj: any): obj is OpenApiObjectSchema {
  return obj?.properties;
}

/**
 * Type guard to check whether an object is of type `OpenApiEnumSchema`.
 * @param obj - Object to check.
 * @returns `true` if the object is an enum schema, `false` otherwise.
 */
export function isEnumSchema(obj: any): obj is OpenApiEnumSchema {
  return obj?.enum;
}

/**
 * Type guard to check whether an object is of type `OpenApiOneOfSchema`.
 * @param obj - Object to check.
 * @returns `true` if the object is an oneOf schema, `false` otherwise.
 */
export function isOneOfSchema(obj: any): obj is OpenApiOneOfSchema {
  return obj?.oneOf;
}

/**
 * Type guard to check whether an object is of type `OpenApiAllOfSchema`.
 * @param obj - Object to check.
 * @returns `true` if the object is an allOf schema, `false` otherwise.
 */
export function isAllOfSchema(obj: any): obj is OpenApiAllOfSchema {
  return obj?.allOf;
}

/**
 * Type guard to check whether an object is of type `OpenApiAnyOfSchema`.
 * @param obj - Object to check.
 * @returns `true` if the object is an anyOf schema, `false` otherwise.
 */
export function isAnyOfSchema(obj: any): obj is OpenApiAnyOfSchema {
  return obj?.anyOf;
}

/**
 * Type guard to check whether an object is of type `OpenApiNotSchema`.
 * @param obj - Object to check.
 * @returns `true` if the object is a not schema, `false` otherwise.
 */
export function isNotSchema(obj: any): obj is OpenApiNotSchema {
  return obj?.not;
}

/**
 * Parse the type name of a reference object.
 * @param obj - Reference object to get the type name from.
 * @param schemaRefMapping - Mapping between reference paths and schema names.
 * @returns Parsed type name.
 */
export function getSchemaNamingFromRef(
  obj: OpenAPIV3.ReferenceObject | string,
  schemaRefMapping: SchemaRefMapping
): SchemaNaming {
  const ref = isReferenceObject(obj) ? obj.$ref : obj;
  const schemaNaming = schemaRefMapping[ref];
  if (!schemaNaming) {
    throw new Error(
      `Could not find schema naming for reference path '${ref}'. Schema does not exist.`
    );
  }
  return schemaNaming;
}

export function getSchemaPropertiesDocumentation(
  schemaProperties: OpenApiSchemaProperties
): string[] {
    return Object.entries(schemaProperties || []).map(([propertyName, value]) => {
      if (propertyName === 'deprecated') {
        return '@deprecated';
      }
      if (propertyName === 'example') {
        return `@example ${JSON.stringify(schemaProperties?.example, null, 2)}`;
      }
      return `${titleFormat(propertyName)}: ${JSON.stringify(value, null, 2)}.`;
    });
  }
}
