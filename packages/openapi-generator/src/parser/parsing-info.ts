import { OpenAPIV3 } from 'openapi-types';
import { OperationNameExtended } from '../extensions';
import { Method, SchemaNaming } from '../openapi-types';

/**
 * Represents an object holding all relevant information for operation parsing.
 * The OpenAPI path definitions have the following structure:
 * "my/path-pattern": {
 *    parameters: [...],
 *    get: {...},
 *    post {...}
 *    ...
 *  }
 * Each path (pattern), e. g. "my/path-pattern", can define operations for multiple HTTP methods.
 * Each of those operations are then referenced by the same path and can have shared parameters defined on the path.
 */
export interface OperationInfo {
  /**
   * Path pattern as given in the original OpenAPI document.
   */
  pathPattern: string;
  /**
   * Original operation as given in the OpenAPI document.
   */
  operation: OpenAPIV3.OperationObject & OperationNameExtended;
  /**
   * HTTP method for the operation as given in the OpenAPI document.
   */
  method: Method;
  /**
   * Parameters from the path items.
   */
  pathItemParameters: (OpenAPIV3.ParameterObject | OpenAPIV3.ReferenceObject)[];
}

/**
 * Represents an object holding all relevant information for schema parsing.
 */
export interface SchemaInfo extends SchemaNaming {
  /**
   * Path, by which this schema is referenced.
   */
  refPath: string;
  /**
   * Original name for this schema.
   */
  name: string;
  /**
   * The original schema as in the specification.
   */
  schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject;
}

/**
 * Type of an object representing a mapping between the reference path (key) and the unique parsed names for the schema.
 */
export type SchemaRefMapping = Record<string, SchemaNaming>;
