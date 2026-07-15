import { createLogger } from '@sap-cloud-sdk/util';

const logger = createLogger('openapi-generator');

/**
 * Type names based on potential types from the OpenAPI specification.
 * Inspired by: https://github.com/OpenAPITools/openapi-generator/blob/5d27799bade1cfd3b121cda3ddb1599d9aed21e5/modules/openapi-generator/src/main/java/org/openapitools/codegen/languages/AbstractTypeScriptClientCodegen.java#L146.
 */
const typeMapping = {
  Set: 'Set',
  set: 'Set',
  Array: 'Array',
  array: 'Array',
  boolean: 'boolean',
  string: 'string',
  int: 'number',
  float: 'number',
  number: 'number',
  long: 'number',
  short: 'number',
  char: 'string',
  double: 'number',
  object: 'Record<string, any>',
  integer: 'number',
  Map: 'any',
  map: 'any',
  date: 'string',
  DateTime: 'string',
  binary: 'Blob',
  Blob: 'Blob',
  File: 'Blob',
  file: 'Blob',
  ByteArray: 'string',
  UUID: 'string',
  URI: 'string',
  Error: 'Error',
  null: 'null',
  AnyType: 'any',
  any: 'any'
};

/**
 * Get the mapped TypeScript type for the given original OpenAPI type.
 *
 * In OpenAPI 3.1 the `type` keyword may be an array of types (aligned with
 * JSON Schema 2020-12), optionally including `"null"`. Such an array is mapped
 * to a union of the individual TypeScript types.
 * @param originalType - Original OpenAPI type, to get a mapping for. May be a
 * single type or an array of types (3.1).
 * @param format - Optional format of the OpenAPI type.
 * @returns The mapped TypeScript type.
 * @internal
 */
export function getType(
  originalType: string | string[] | undefined,
  format?: string
): string {
  if (Array.isArray(originalType)) {
    if (!originalType.length) {
      return 'any';
    }
    return unique(originalType.map(type => getType(type, format))).join(' | ');
  }
  if (originalType === 'string' && format === 'binary') {
    return 'Blob';
  }
  const type = originalType
    ? (typeMapping as Record<string, string>)[originalType]
    : 'any';
  if (!type) {
    logger.verbose(
      `Could not map type '${originalType}' to a native type. Using any.`
    );
    return 'any';
  }
  return type;
}

function unique(values: string[]): string[] {
  return values.filter((value, index) => values.indexOf(value) === index);
}
