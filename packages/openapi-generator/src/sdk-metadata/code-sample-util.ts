import levenstein from 'fast-levenshtein';
import { codeBlock, pascalCase } from '@sap-cloud-sdk/util';
import { OpenApiApi, OpenApiOperation } from '../openapi-types';

const distanceThreshold = 5;
export function getMainApi(
  serviceName: string,
  apis: OpenApiApi[]
): OpenApiApi {
  let closestApi: OpenApiApi | undefined;
  let minDistance = distanceThreshold;

  apis.forEach(api => {
    const distance = getLevensteinDistance(serviceName, api.name);
    if (distance <= minDistance) {
      minDistance = distance;
      closestApi = api;
    }
  });
  if (closestApi) {
    return closestApi;
  }
  // If no closest api found, return the api with most operations
  const sortedByOperationsLength = apis.sort((a, b) =>
    a.operations.length > b.operations.length ? -1 : 1
  );
  const withGetAll = sortedByOperationsLength.filter(api =>
    api.operations.find(operation =>
      operation.operationId.toLocaleLowerCase('getall')
    )
  );
  if (withGetAll) {
    return withGetAll[0];
  }
  // return the one with most methods
  return sortedByOperationsLength[0];
}

export function getMainOperation(api: OpenApiApi): OpenApiOperation {
  if (api.operations.length === 1) {
    return api.operations[0];
  }
  return (
    getLevensteinClosestOperation(api.name, api.operations) ||
    getGetAllOperation(api.operations) ||
    getGetOperation(api.operations) ||
    getAnyOperationWithoutParams(api.operations) ||
    api.operations[0]
  );
}

export function getLevensteinClosestOperation(
  apiName: string,
  operations: OpenApiOperation[]
): OpenApiOperation | undefined {
  let closestOperation: OpenApiOperation | undefined;
  let minDistance = distanceThreshold;

  operations.forEach(operation => {
    const distance = getLevensteinDistance(apiName, operation.operationId);
    if (distance <= minDistance) {
      minDistance = distance;
      closestOperation = operation;
    }
  });
  return closestOperation;
}

export function getGetAllOperation(
  operations: OpenApiOperation[]
): OpenApiOperation | undefined {
  return operations.find(
    operation =>
      operation.operationId.toLowerCase() === 'getall' &&
      operation.pathParameters.length === 0
  );
}

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

export function getAnyOperationWithoutParams(
  operations: OpenApiOperation[]
): OpenApiOperation | undefined {
  return operations.find(
    operation =>
      operation.pathParameters.length === 0 &&
      operation.queryParameters.length === 0
  );
}

export function getOperationParamCode(operation: OpenApiOperation): string {
  if (
    operation.pathParameters?.length === 0 &&
    operation.queryParameters?.filter(param => param.required).length === 0 &&
    operation.requestBody === undefined
  ) {
    return '';
  }

  const paramSignature: string[] = [];
  if (operation.pathParameters?.length > 0) {
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

  if (operation.queryParameters?.length > 0) {
    const queryParams = operation.queryParameters
      .filter(queryParam => queryParam.required)
      .map(
        queryParam => `${queryParam.name}: 'my${pascalCase(queryParam.name)}'`
      );

    if (queryParams) {
      paramSignature.push(`{ ${queryParams.join(', ')} }`);
    }
  }

  return codeBlock`${paramSignature.join(', ')}`;
}

/**
 * Calculate levenshtein distance of the two strings.
 * @param stringA - The first string.
 * @param stringB - The second string.
 * @returns The levenshtein distance (0 and above).
 * @hidden
 */
function getLevensteinDistance(stringA: string, stringB: string): number {
  return levenstein.get(
    getWordWithoutSpecialChars(stringA).toLowerCase(),
    getWordWithoutSpecialChars(stringB).toLowerCase()
  );
}

function getWordWithoutSpecialChars(text: string): string {
  return text.replace('_', '');
}
