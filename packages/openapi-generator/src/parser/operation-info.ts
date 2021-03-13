import { OpenAPIV3 } from 'openapi-types';
import { Method } from '../openapi-types';

export interface OperationInfo {
  pathPattern: string;
  pathItem: OpenAPIV3.PathItemObject;
  method: Method;
}

export function getOperation({
  pathPattern,
  pathItem,
  method
}: OperationInfo): OpenAPIV3.OperationObject {
  const operation = pathItem[method];
  if (!operation) {
    throw new Error(
      `Method '${method}' is not specified for path '${pathPattern}'.`
    );
  }
  return operation;
}
