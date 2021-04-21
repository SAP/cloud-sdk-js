import { OpenAPIV3 } from 'openapi-types';
import { OperationNameExtended } from '../extensions';
import { Method } from '../openapi-types';

/**
 * Represents an object holding all relevant information for operation parsing.
 * The OpenApi path definitions have the following structure:
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

export interface SchemaInfo {
  refPath: string;
  name: string;
  schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject;
}
