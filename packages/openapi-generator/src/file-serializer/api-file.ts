import { codeBlock, unique } from '@sap-cloud-sdk/util';
import { collectRefs, parseTypeName } from '../model';
import { OpenApiApi, OpenApiOperation } from '../openapi-types';
import { getTypeFromSchema } from './interface-file';

/**
 * @experimental This API is experimental and might change in newer versions. Use with caution.
 * Get the file contents for an API wrapper file.
 * @param api Parsed OpenApi API representation.
 * @returns The generated code for the SDK API wrapper.
 */
export function apiFile(api: OpenApiApi): string {
  const requestBodyTypes = getRequestBodyReferenceTypes(
    api.operations
  ).map(requestBodyType => parseTypeName({ $ref: requestBodyType }));
  return codeBlock`
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
${
  requestBodyTypes.length
    ? `import { ${requestBodyTypes.join(', ')} } from './model';`
    : ''
}

export const ${api.name} = {
  ${getOperations(api.operations)}
};
`;
}

/**
 * Get the reference types for all request body types in the given operation list.
 * @param operations The given operation list.
 * @returns The list of body types.
 */
function getRequestBodyReferenceTypes(
  operations: OpenApiOperation[]
): string[] {
  return operations.reduce((referenceTypes, operation) => {
    const requestBodySchema = operation.requestBody?.parameterType;
    return requestBodySchema
      ? unique([...referenceTypes, ...collectRefs(requestBodySchema)])
      : referenceTypes;
  }, []);
}

/**
 * Get all operation representations for the given operations that belong to a specific API.
 * @param operations All operations that belong to the given API.
 * @param apiName The name of the API.
 * @returns All operations as a string.
 */
function getOperations(operations: OpenApiOperation[]): string {
  return operations.map(operation => getOperation(operation)).join(',\n');
}

/**
 * Get the string representation of one operation.
 * @param operation Operation to serialize.
 * @param apiName The name of the API.
 * @returns The operation as a string.
 */
function getOperation(operation: OpenApiOperation): string {
  const requestBuilderParams = [
    `'${operation.method}'`,
    `'${operation.pathPattern}'`,
    getRequestBuilderParams(operation)
  ];
  return codeBlock`
${operation.operationId}: (${getSignatureParams(
    operation
  )}) => new OpenApiRequestBuilder(
  ${requestBuilderParams.join(',\n')}
)`;
}

function getSignatureRequestBodyParam(
  operation: OpenApiOperation
): string | undefined {
  if (operation.requestBody) {
    return `${operation.requestBody.parameterName}: ${getTypeFromSchema(
      operation.requestBody.parameterType
    )}${operation.requestBody.required ? ' | undefined' : ''}`;
  }
}

function getSignatureQueryParams(
  operation: OpenApiOperation
): string | undefined {
  if (operation.queryParameters.length) {
    const allOptional = operation.queryParameters.every(
      param => !param.required
    );
    const queryParams = operation.queryParameters
      .map(
        param => `'${param.name}'${param.required ? '' : '?'}: ${param.type}`
      )
      .join(',\n');

    return `queryParameters${allOptional ? '?' : ''}: {${queryParams}}`;
  }
}

function getSignaturePathParams(
  operation: OpenApiOperation
): string | undefined {
  if (operation.pathParameters) {
    return operation.pathParameters
      .map(param => `${param.name}: string`)
      .join(', ');
  }
}

function getSignatureParams(operation: OpenApiOperation): string {
  const pathParams = getSignaturePathParams(operation);
  const requestBodyParam = getSignatureRequestBodyParam(operation);
  const queryParams = getSignatureQueryParams(operation);

  return [pathParams, requestBodyParam, queryParams]
    .filter(params => params)
    .join(', ');
}

function getRequestBuilderParams(
  operation: OpenApiOperation
): string | undefined {
  const pathParams = operation.pathParameters
    .map(param => param.name)
    .join(', ');
  const params: string[] = [];
  if (pathParams) {
    params.push(`pathParameters: [${pathParams}]`);
  }
  if (operation.requestBody) {
    params.push(operation.requestBody.parameterName);
  }
  if (operation.queryParameters.length) {
    params.push('queryParameters');
  }
  if (params.length) {
    return codeBlock`{
      ${params.join(',\n')}
    }`;
  }
}
