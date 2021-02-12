import {
  codeBlock,
  createLogger,
  partition,
  pascalCase,
  unique
} from '@sap-cloud-sdk/util';
import { OpenApiOperation, SchemaMetadata } from '../openapi-types';
const logger = createLogger('openapi-generator');
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
import { ${apiNamePascal}Api } from './openapi/api';
${
  requestBodyTypes
    ? `import { ${requestBodyTypes} } from './openapi/model';`
    : ''
}

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
  const params = getParams(operation);
  const argsQuestionMark = params.every(param => !param.required) ? '?' : '';
  const paramsArg = params.length
    ? codeBlock`args${argsQuestionMark}: {
  ${params
    .map(param => `${param.name}${param.required ? '' : '?'}: ${param.type}`)
    .join(',\n')}
}`
    : '';
  const requestBuilderParams = [
    `${apiName}Api`,
    `'${operation.operationId}'`,
    ...params.map(param => `args${argsQuestionMark}.${param.name}`)
  ];

  return codeBlock`
${
  operation.operationId
}: (${paramsArg}) => new OpenApiRequestBuilder<${apiName}Api, '${
    operation.operationId
  }'>(
  ${requestBuilderParams.join(',\n')}
)`;
}

interface Parameter {
  type: string;
  name: string;
  required?: boolean;
}

function getParams(operation: OpenApiOperation): Parameter[] {
  const parameters = [
    ...operation.parameters,
    ...getRequestBodyParams(operation)
  ];

  const [required, optional] = partition(parameters, param => !!param.required);
  return [...required, ...optional];
}

function getRequestBodyParams(operation: OpenApiOperation): Parameter[] {
  return operation.requestBody
    ? [
        {
          name: operation.requestBody.parameterName,
          type: getParameterTypeString(operation.requestBody.parameterType),
          required: operation.requestBody.required
        }
      ]
    : [];
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
