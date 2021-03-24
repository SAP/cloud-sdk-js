import { codeBlock } from '@sap-cloud-sdk/util';
import { OpenApiOperation } from '../openapi-types';
import { serializeSchema } from './schema';

/**
 * Serialize an operation to a string.
 * @param operation Operation to serialize.
 * @returns The operation as a string.
 */
export function serializeOperation(operation: OpenApiOperation): string {
  const requestBuilderParams = [
    `'${operation.method}'`,
    `'${operation.pathPattern}'`
  ];

  const bodyAndQueryParams = serializeParamsForRequestBuilder(operation);
  if (bodyAndQueryParams) {
    requestBuilderParams.push(bodyAndQueryParams);
  }
  return codeBlock`
${operation.operationId}: (${serializeOperationSignature(
    operation
  )}) => new OpenApiRequestBuilder<${serializeSchema(operation.response)}>(
  ${requestBuilderParams.join(',\n')}
)`;
}

function serializeOperationSignature(operation: OpenApiOperation): string {
  const pathParams = serializePathParamsForSignature(operation);
  const requestBodyParam = serializeRequestBodyParamForSignature(operation);
  const queryParams = serializeQueryParamsForSignature(operation);

  return [pathParams, requestBodyParam, queryParams]
    .filter(params => params)
    .join(', ');
}

function serializePathParamsForSignature(
  operation: OpenApiOperation
): string | undefined {
  if (operation.pathParameters.length) {
    return operation.pathParameters
      .map(param => `${param.name}: string`)
      .join(', ');
  }
}

function serializeRequestBodyParamForSignature(
  operation: OpenApiOperation
): string | undefined {
  if (operation.requestBody) {
    return `body: ${serializeSchema(operation.requestBody.schema)}${
      operation.requestBody.required ? '' : ' | undefined'
    }`;
  }
}

function serializeQueryParamsForSignature(
  operation: OpenApiOperation
): string | undefined {
  if (operation.queryParameters.length) {
    const allOptional = operation.queryParameters.every(
      param => !param.required
    );
    const queryParams = operation.queryParameters
      .map(
        param =>
          `'${param.name}'${param.required ? '' : '?'}: ${serializeSchema(
            param.schema
          )}`
      )
      .join(',\n');

    return `queryParameters${allOptional ? '?' : ''}: {${queryParams}}`;
  }
}

function serializeParamsForRequestBuilder(
  operation: OpenApiOperation
): string | undefined {
  const params: string[] = [];

  if (operation.pathParameters.length) {
    const pathParamStr = `pathParameters: { ${operation.pathParameters
      .map(param => param.name)
      .join(', ')} }`;
    params.push(pathParamStr);
  }
  if (operation.requestBody) {
    params.push('body');
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
