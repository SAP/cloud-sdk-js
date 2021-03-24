import { OpenAPIV3 } from 'openapi-types';
import { OperationNameExtended } from '../extensions';
import { Method } from '../openapi-types';

/**
 * Represents an object holding all relevant information for operation parsing.
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
}
