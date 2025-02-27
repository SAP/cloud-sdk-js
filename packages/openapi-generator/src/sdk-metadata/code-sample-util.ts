import { getLevenshteinClosest } from '@sap-cloud-sdk/generator-common/internal';
import { codeBlock, pascalCase } from '@sap-cloud-sdk/util';
import type {
  OpenApiApi,
  OpenApiOperation,
  OpenApiParameter
} from '../openapi-types';

/**
 * @internal
 */
export function getMainApi(
  serviceName: string,
  apis: OpenApiApi[]
): OpenApiApi {
  return (
    getLevenshteinClosest(serviceName, apis, x => x.name) ||
    getApiWithMaxOperations(apis)
  );
}
/**
 * @internal
 */
export function getApiWithMaxOperations(apis: OpenApiApi[]): OpenApiApi {
  const sortedByOperationsLength = apis.sort((a, b) =>
    a.operations.length > b.operations.length ? -1 : 1
  );
  const withGetAll = sortedByOperationsLength.find(api =>
    api.operations.find(operation =>
      operation.operationId.toLocaleLowerCase('getall')
    )
  );
  if (withGetAll) {
    return withGetAll;
  }
  // return the one with most methods
  return sortedByOperationsLength[0];
}
/**
 * @internal
 */
export function getMainOperation(api: OpenApiApi): OpenApiOperation {
  if (api.operations.length === 1) {
    return api.operations[0];
  }
  return (
    getLevenshteinClosest(api.name, api.operations, op => op.operationId) ||
    getGetAllOperation(api.operations) ||
    getGetOperation(api.operations) ||
    getAnyOperationWithoutParams(api.operations) ||
    api.operations[0]
  );
}
/**
 * @internal
 */
export function getGetAllOperation(
  operations: OpenApiOperation[]
): OpenApiOperation | undefined {
  return operations.find(
    operation => operation.operationId.toLowerCase() === 'getall'
  );
}
/**
 * @internal
 */
export function getGetOperation(
  operations: OpenApiOperation[]
): OpenApiOperation | undefined {
  const getOperations = operations.filter(
    operation => operation.method === 'get'
  );

  // check if get operation without parameters exists
  // else return operation with min parameters
  if (getOperations.length > 0) {
    const getOperationsWithoutParams = getOperations.filter(
      getOperation =>
        getOperation.pathParameters.length === 0 &&
        getOperation.queryParameters.length === 0
    );
    if (getOperationsWithoutParams.length > 0) {
      return getOperationsWithoutParams[0];
    }
    return getOperations[0];
  }
  return undefined;
}
/**
 * @internal
 */
export function getAnyOperationWithoutParams(
  operations: OpenApiOperation[]
): OpenApiOperation | undefined {
  return operations.find(
    operation =>
      operation.pathParameters.length === 0 &&
      operation.queryParameters.length === 0
  );
}
/**
 * @internal
 */
export function getOperationParamCode(operation: OpenApiOperation): string {
  const paramSignature: string[] = [];
  if (operation.pathParameters?.length) {
    paramSignature.push(
      operation.pathParameters.map(pathParam => pathParam.name).join(', ')
    );
  }

  if (operation.requestBody) {
    let reqBody = 'undefined';
    if (operation.requestBody.required) {
      reqBody = 'myRequestBody';
    }
    paramSignature.push(reqBody);
  }

  const formatParams = (params: OpenApiParameter[]) =>
    params
      .filter(param => param.required)
      .map(param => `${param.name}: 'my${pascalCase(param.name)}'`)
      .join(', ');

  if (operation.queryParameters) {
    const queryParams = formatParams(operation.queryParameters);
    if (queryParams) {
      paramSignature.push(`{ ${queryParams} }`);
    }
  }

  if (operation.headerParameters) {
    const headerParams = formatParams(operation.headerParameters);
    if (headerParams) {
      paramSignature.push(`{ ${headerParams} }`);
    }
  }

  return codeBlock`${paramSignature.join(', ')}`;
}
