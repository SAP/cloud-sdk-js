import { codeBlock, unique } from '@sap-cloud-sdk/util';
import { OpenApiDocument, OpenApiOperation } from '../openapi-types';

/**
 * @experimental This API is experimental and might change in newer versions. Use with caution.
 * Get the content of the SAP Cloud SDK API wrapper.
 * @param openApiDocument Parsed service.
 * @returns The generated code for the SDK API wrapper.
 */
export function apiFile(openApiDocument: OpenApiDocument): string {
  const requestBodyTypes = getRequestBodyTypes(openApiDocument);
  return codeBlock`
import { RestRequestBuilder } from '@sap-cloud-sdk/core';
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
 * Get the types for all request body types in the given service.
 * @param openApiDocument Parsed service metadata.
 * @returns The list of body types as a string.
 */
function getRequestBodyTypes(openApiDocument: OpenApiDocument): string {
  const bodyTypes = openApiDocument.operations
    .map(operation => operation.requestBody?.parameterType)
    .filter(requestBody => typeof requestBody !== 'undefined') as string[];

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
  const parameters = getAllParameters(operation);

  // TODO: The order of parameters should be changed if the parameters are required, so that required parameters come first
  const apiFunctionSignatureParams = parameters.map(
    param => `${param.name}${param.required ? '' : '?'}: ${param.type}`
  );
  const requestBuilderParams = [
    'DefaultApi',
    `'${operation.operationName}'`,
    ...parameters.map(param => param.name)
  ];

  return codeBlock`
${operation.operationName}: (${apiFunctionSignatureParams.join(
    ', '
  )}) => new RestRequestBuilder<DefaultApi, '${operation.operationName}'>(
  ${requestBuilderParams.join(',\n')}
)`;
}

interface Parameter {
  type: string;
  name: string;
  required?: boolean;
}

function getAllParameters(operation: OpenApiOperation): Parameter[] {
  if (operation.requestBody) {
    return [
      ...operation.parameters,
      {
        name: operation.requestBody.parameterName,
        type: operation.requestBody.parameterType
      }
    ];
  }

  return operation.parameters;
}
