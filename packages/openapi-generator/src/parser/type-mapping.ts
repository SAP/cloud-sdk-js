import { createLogger } from '@sap-cloud-sdk/util';
import { OpenAPIV3 } from 'openapi-types';
import { OpenApiSimpleSchema } from '../openapi-types';

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
  Blob: 'Blob',
  binary: 'any',
  File: 'any',
  file: 'any',
  ByteArray: 'string',
  UUID: 'string',
  URI: 'string',
  Error: 'Error',
  AnyType: 'any',
  any: 'any'
};

/**
 * Get the mapped TypeScript type for the given original OpenAPI type.
 * @param schema - Original OpenAPI schema, to get a type mapping for.
 * @returns The mapped TypeScript type.
 * @internal
 */
export function getType(
  schema: OpenAPIV3.NonArraySchemaObject | OpenApiSimpleSchema
): string {
  if (
    'format' in schema &&
    schema.type === 'string' &&
    schema.format === 'binary'
  ) {
    return 'Blob';
  }

  const type = schema.type ? typeMapping[schema.type] : 'any';
  if (!type) {
    logger.verbose(
      `Could not map type '${schema.type}' to a native type. Using any.`
    );
    return 'any';
  }
  return type;
}
