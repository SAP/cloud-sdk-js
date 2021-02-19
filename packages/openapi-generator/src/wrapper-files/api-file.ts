import { codeBlock, partition, unique } from '@sap-cloud-sdk/util';
import {
  OpenApiDocument,
  OpenApiOperation,
  SchemaMetadata
} from '../openapi-types';

/**
 * @experimental This API is experimental and might change in newer versions. Use with caution.
 * Get the content of the SAP Cloud SDK API wrapper.
 * @param openApiDocument Parsed service.
 * @returns The generated code for the SDK API wrapper.
 */
export function apiFile(openApiDocument: OpenApiDocument): string {
  const requestBodyTypes = getRequestBodyReferenceTypes(openApiDocument);
  return codeBlock`
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
import { DefaultApi } from './openapi/api';
${
  requestBodyTypes
    ? `import { ${requestBodyTypes} } from './openapi/model';`
    : ''
}

export const ${openApiDocument.apiName} = {
  ${getOperations(openApiDocument)}
};
`;
}

/**
 * Get the reference types for all request body types in the given service.
 * @param openApiDocument Parsed service metadata.
 * @returns The list of body types as a string.
 */
function getRequestBodyReferenceTypes(
  openApiDocument: OpenApiDocument
): string {
  const bodyTypes = openApiDocument.operations
    .map(operation => operation.requestBody?.parameterType)
    .filter(requestBody => typeof requestBody !== 'undefined')
    .filter(requestBody => requestBody?.isInnerTypeReferenceType)
    .map(requestBody => requestBody?.innerType) as string[];

  return unique(bodyTypes).join(', ');
}

/**
 * Get all operation representations for the given service.
 * @param openApiDocument Parsed service.
 * @returns All operations as a string.
 */
function getOperations(openApiDocument: OpenApiDocument): string {
  return openApiDocument.operations
    .map(operation => getOperation(operation))
    .join(',\n');
}

/**
 * Get the string representation of one operation.
 * @param operation Operation to serialize.
 * @returns The operation as a string.
 */
function getOperation(operation: OpenApiOperation): string {
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
    'DefaultApi',
    `'${operation.operationId}'`,
    ...params.map(param => `args${argsQuestionMark}.${param.name}`)
  ];

  return codeBlock`
${
  operation.operationId
}: (${paramsArg}) => new OpenApiRequestBuilder<DefaultApi, '${
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
