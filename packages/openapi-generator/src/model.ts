import { kebabCase, last, pascalCase, unique } from '@sap-cloud-sdk/util';
import { OpenAPIV3 } from 'openapi-types';
import {
  OpenApiAllOfSchema,
  OpenApiAnyOfSchema,
  OpenApiArraySchema,
  OpenApiEnumSchema,
  OpenApiNotSchema,
  OpenApiObjectSchema,
  OpenApiOneOfSchema,
  OpenApiSchema
} from './openapi-types';

export function collectRefs(schema: OpenApiSchema): string[] {
  if (isReferenceObject(schema)) {
    return [schema.$ref];
  }
  return Object.values(schema)
    .filter(value => typeof value === 'object')
    .reduce((refs, value) => unique([...refs, ...collectRefs(value)]), []);
}

export function hasNotType(schema: OpenApiSchema): boolean {
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

/**
 * Type guard to check whether an object is of type `OpenAPIV3.ReferenceObject`.
 * @param obj Object to check.
 * @returns True if the object is a reference object, false otherwise.
 */
export function isReferenceObject(obj: any): obj is OpenAPIV3.ReferenceObject {
  return !!obj?.$ref;
}

export function isArraySchema(obj: any): obj is OpenApiArraySchema {
  return obj?.type === 'array';
}

export function isObjectSchema(obj: any): obj is OpenApiObjectSchema {
  return obj?.type === 'object';
}

export function isEnumSchema(obj: any): obj is OpenApiEnumSchema {
  return obj?.enum;
}

export function isOneOfSchema(obj: any): obj is OpenApiOneOfSchema {
  return obj?.oneOf;
}

export function isAllOfSchema(obj: any): obj is OpenApiAllOfSchema {
  return obj?.allOf;
}

export function isAnyOfSchema(obj: any): obj is OpenApiAnyOfSchema {
  return obj?.anyOf;
}

export function isNotSchema(obj: any): obj is OpenApiNotSchema {
  return obj?.not;
}

/**
 * Parse the type name of a reference object.
 * @param obj Reference object to get the type name from.
 * @returns Parsed type name.
 */
export function parseTypeName(obj: OpenAPIV3.ReferenceObject): string {
  // TODO: How do we know that this is correct?
  return pascalCase(last(obj.$ref.split('/'))!);
}

export function parseFileName(obj: OpenAPIV3.ReferenceObject): string {
  // TODO: How do we know that this is correct?
  return kebabCase(last(obj.$ref.split('/'))!);
}
