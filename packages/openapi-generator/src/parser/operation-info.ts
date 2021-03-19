import { OpenAPIV3 } from 'openapi-types';
import { Method } from '../openapi-types';

export interface OperationInfo {
  pathPattern: string;
  operation: OpenAPIV3.OperationObject | OperationNameExtended;
  method: Method;
}
