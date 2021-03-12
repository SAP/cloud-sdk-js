import { codeBlock, pascalCase, unique } from '@sap-cloud-sdk/util';
import { OpenApiOperation, SchemaMetadata } from '../openapi-types';

/**
 * @experimental This API is experimental and might change in newer versions. Use with caution.
 * Get the file contents for an API wrapper file.
 * @param serviceName The name of the service.
 * @param apiName The name of the API.
 * @param operations All operations, that belong to the given API.
 * @returns The generated code for the SDK API wrapper.
 */
export function apiFile(
  serviceName: string,
  apiName: string,
  operations: OpenApiOperation[]
): string {
  const apiNamePascal = pascalCase(apiName);
  const requestBodyTypes = getRequestBodyReferenceTypes(operations);
  return codeBlock`
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
${requestBodyTypes ? `import { ${requestBodyTypes} } from './model';` : ''}

export const ${serviceName}${apiNamePascal}Api = {
  ${getOperations(operations, apiNamePascal)}
};
`;
}

/**
 * Get the reference types for all request body types in the given operation list.
 * @param operations The given operation list.
 * @returns The list of body types as a string.
 */
function getRequestBodyReferenceTypes(operations: OpenApiOperation[]): string {
  const bodyTypes = operations
    .map(operation => operation.requestBody?.parameterType)
    .filter(requestBody => typeof requestBody !== 'undefined')
    .filter(requestBody => requestBody?.isInnerTypeReferenceType)
    .map(requestBody => requestBody?.innerType) as string[];

  return unique(bodyTypes).join(', ');
}

/**
 * Get all operation representations for the given operations that belong to a specific API.
 * @param operations All operations that belong to the given API.
 * @param apiName The name of the API.
 * @returns All operations as a string.
 */
function getOperations(
  operations: OpenApiOperation[],
  apiName: string
): string {
  return operations
    .map(operation => getOperation(operation, apiName))
    .join(',\n');
}

/**
 * Get the string representation of one operation.
 * @param operation Operation to serialize.
 * @param apiName The name of the API.
 * @returns The operation as a string.
 */
function getOperation(operation: OpenApiOperation, apiName: string): string {
  // const params = getParams(operation);
  //   const argsQuestionMark = params.every(param => !param.required) ? '?' : '';
  //   const paramsArg = params.length
  //     ? codeBlock`args${argsQuestionMark}: {
  //   ${params
  //     .map(param => `${param.name}${param.required ? '' : '?'}: ${param.type}`)
  //     .join(',\n')}
  // }`
  //     : '';

  const requestBuilderParams = [
    `'${operation.method}'`,
    `'${operation.path}'`,
    getRequestBuilderParams(operation)
  ];
  return codeBlock`
${operation.operationId}: (${getSignatureParams(
    operation
  )}) => new OpenApiRequestBuilder(
  ${requestBuilderParams.join(',\n')}
)`;
}

interface Parameter {
  type: string;
  name: string;
  required?: boolean;
}

// function getParams(operation: OpenApiOperation): Parameter[] {
//   const parameters = [
//     ...operation.parameters,
//     ...getRequestBodyParams(operation)
//   ];

//   const [required, optional] = partition(parameters, param => !!param.required);
//   return [...required, ...optional];
// }

function getSignatureRequestBodyParam(
  operation: OpenApiOperation
): string | undefined {
  if (operation.requestBody) {
    return `${operation.requestBody.parameterName}: ${getParameterTypeString(
      operation.requestBody.parameterType
    )}${operation.requestBody.required ? ' | undefined' : ''}`;
  }
}

function getSignatureQueryParams(
  operation: OpenApiOperation
): string | undefined {
  if (operation.queryParameters) {
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

function getParameterTypeString(schemaMetadata: SchemaMetadata): string {
  return schemaMetadata.isArrayType
    ? toArrayTypeWithArrayFormat(
        schemaMetadata.innerType,
        schemaMetadata.arrayLevel!
      )
    : schemaMetadata.innerType;
}

function toArrayTypeWithArrayFormat(
  innerType: string,
  arrayLevel: number
): string {
  return arrayLevel === 0
    ? innerType
    : `${toArrayTypeWithArrayFormat(innerType, arrayLevel - 1)}[]`;
}
