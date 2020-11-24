import { codeBlock, flat } from '@sap-cloud-sdk/util';
import { toPascalCase, toPropertyFormat } from '@sap-cloud-sdk/core';
import {
  OpenApiOperation,
  OpenApiPath,
  OpenApiServiceMetadata
} from '../open-api-types';

/**
 * Used by the generator for generating a API request builder class
 * @param serviceMetadata The service metadata model converted from the open api file.
 * @returns class declaration structure of the API request builder class
 */
export function operationsVariable(
  serviceMetadata: OpenApiServiceMetadata
): string {
  return codeBlock`
export const ${serviceMetadata.apiName}ApiRequestBuilder = {
  ${getOperations(serviceMetadata)}
};
`;
}

function getOperations(serviceMetadata: OpenApiServiceMetadata): string {
  return flat(
    serviceMetadata.paths.map(path =>
      getOperationsForPath(serviceMetadata.apiName, path)
    )
  ).join(',\n');
}
function getOperationsForPath(
  apiName: string,
  openApiPath: OpenApiPath
): string[] {
  const pathParameters = openApiPath.pathParameters.map(name => ({
    name,
    type: 'string'
  }));
  return openApiPath.operations.map(operation =>
    getOperation(`${apiName}Api`, pathParameters, operation)
  );
}

function getOperation(
  apiName: string,
  pathParameters: Parameter[],
  operation: OpenApiOperation
): string {
  const parameters = operation.requestBodySchemaRefName
    ? [
        ...pathParameters,
        {
          name: toPropertyFormat(operation.requestBodySchemaRefName),
          type: toPascalCase(operation.requestBodySchemaRefName)
        }
      ]
    : pathParameters;

  const apiFunctionSignatureParams = parameters
    .map(param => `${param.name}: ${param.type}`)
    .join(', ');

  const requestBuilderParams = [
    apiName,
    `'${operation.operationName}'`,
    ...parameters.map(param => param.name)
  ].join(',\n');

  const operationName = toPropertyFormat(operation.operationName);

  return codeBlock`
${operationName}: (${apiFunctionSignatureParams}) => new RestRequestBuilder<${apiName}, '${operationName}'>(
  ${requestBuilderParams}
)`;
}

interface Parameter {
  name: string;
  type: string;
}
