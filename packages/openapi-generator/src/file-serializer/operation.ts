import { codeBlock, documentationBlock, unixEOL } from '@sap-cloud-sdk/util';
import { serializeSchema } from './schema';
import type {
  OpenApiOperation,
  OpenApiParameter,
  OpenApiRequestBody
} from '../openapi-types';

/**
 * Serialize an operation to a string.
 * @param operation - Operation to serialize.
 * @param apiName - Name of the API the operation is part of.
 * @returns The operation as a string.
 * @internal
 */
export function serializeOperation(
  operation: OpenApiOperation,
  apiName: string
): string {
  const requestBuilderParams = [
    `'${operation.method}'`,
    `"${operation.pathPattern}"`
  ];

  const bodyAndQueryParams = serializeParamsForRequestBuilder(operation);
  if (bodyAndQueryParams) {
    requestBuilderParams.push(bodyAndQueryParams);
  } else {
    requestBuilderParams.push('{}');
  }

  const responseType = serializeSchema(operation.response);
  return codeBlock`
${operationDocumentation(operation)}
${operation.operationId}: (${serializeOperationSignature(
    operation
  )}) => new OpenApiRequestBuilder<${responseType}>(
  ${requestBuilderParams.join(',\n')},
  ${apiName}._defaultBasePath
)`;
}

function serializeOperationSignature(operation: OpenApiOperation): string {
  const pathParams = serializePathParamsForSignature(operation);
  const requestBodyParam = serializeRequestBodyParamForSignature(operation);

  const allOptionalHeaders = operation.headerParameters.every(
    param => !param.required
  );
  const allOptionalQuery = operation.queryParameters.every(
    param => !param.required
  );

  const headerParams = serializeParamsForSignature(
    operation,
    'headerParameters',
    allOptionalHeaders
  );

  const queryParams = serializeParamsForSignature(
    operation,
    'queryParameters',
    allOptionalHeaders && allOptionalQuery
  );

  return [pathParams, requestBodyParam, queryParams, headerParams]
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

function serializeParamsForSignature(
  operation: OpenApiOperation,
  paramType: 'queryParameters' | 'headerParameters',
  isAllOptional: boolean
): string | undefined {
  const parameters = operation[paramType];
  if (parameters.length) {
    const paramsString = parameters
      .map(
        param =>
          `'${param.name}'${param.required ? '' : '?'}: ${serializeSchema(
            param.schema
          )}`
      )
      .join(', ');

    return `${paramType}${isAllOptional ? '?' : ''}: {${paramsString}}`;
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
    if (
      operation.requestBody.encoding &&
      Object.keys(operation.requestBody.encoding).length
    ) {
      params.push(
        `_encoding: ${JSON.stringify(operation.requestBody.encoding)}`
      );
    }
    if (operation.requestBody.mediaType) {
      const contentTypeStr = `'content-type': '${operation.requestBody.mediaType}'`;
      if (operation.headerParameters.length) {
        params.push(
          `headerParameters: {${contentTypeStr}, ...headerParameters}`
        );
      } else {
        params.push(`headerParameters: {${contentTypeStr}}`);
      }
    } else if (operation.headerParameters.length) {
      params.push('headerParameters');
    }
  } else if (operation.headerParameters.length) {
    params.push('headerParameters');
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

/**
 * @internal
 */
export function operationDocumentation(operation: OpenApiOperation): string {
  const signature: string[] = [];
  if (operation.pathParameters.length) {
    signature.push(...getSignatureOfPathParameters(operation.pathParameters));
  }
  if (operation.requestBody) {
    signature.push(getSignatureOfBody(operation.requestBody));
  }
  if (operation.queryParameters.length) {
    signature.push(
      `@param queryParameters - Object containing the following keys: ${operation.queryParameters
        .map(param => `${param.name}`)
        .join(', ')}.`
    );
  }
  if (operation.headerParameters?.length) {
    signature.push(
      `@param headerParameters - Object containing the following keys: ${operation.headerParameters
        .map(param => `${param.name}`)
        .join(', ')}.`
    );
  }
  signature.push(
    '@returns The request builder, use the `execute()` method to trigger the request.'
  );
  const lines = [getOperationDescriptionText(operation), ...signature];
  return documentationBlock`${lines.join(unixEOL)}`;
}

function getSignatureOfPathParameters(
  parameters: OpenApiParameter[]
): string[] {
  return parameters.map(
    parameter =>
      `@param ${parameter.name} - ${parameter.description || 'Path parameter.'}`
  );
}

function getSignatureOfBody(body: OpenApiRequestBody): string {
  return `@param body - ${body.description || 'Request body.'}`;
}

function getOperationDescriptionText(operation: OpenApiOperation): string {
  if (operation.description) {
    return operation.description;
  }

  return `Create a request builder for execution of ${operation.method} requests to the '${operation.pathPattern}' endpoint.`;
}
