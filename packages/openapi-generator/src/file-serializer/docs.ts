import { EOL } from 'os';
import { documentationBlock } from '@sap-cloud-sdk/util';
import type {
  OpenApiApi,
  OpenApiNamedSchema,
  OpenApiObjectSchemaProperty,
  OpenApiOperation,
  OpenApiParameter,
  OpenApiRequestBody
} from '../openapi-types';

export function apiDocumentation(api: OpenApiApi, serviceName: string): string {
  return documentationBlock`
  Representation of the '${api.name}'.
  This API is part of the '${serviceName}' service.
  `;
}

export function operationDocumentation(
  operation: OpenApiOperation,
  operationResponseType: string
): string {
  const signature: string[] = [];
  if (operation.pathParameters.length) {
    signature.push(...getSignatureOfPathParameters(operation.pathParameters));
  }
  if (operation.requestBody) {
    signature.push(getSignatureOfBody(operation.requestBody));
  }
  if (operation.queryParameters.length) {
    signature.push(
      '@param queryParameters Object containing the query parameters.'
    );
  }
  signature.push(`@returns ${operationResponseType}`);

  return documentationBlock`
  ${getOperationDescriptionText(operation, operationResponseType)}
  
  ${signature.join(EOL)}
  `;
}

export function schemaDocumentation(schema: OpenApiNamedSchema): string {
  return documentationBlock`
  ${schema.description || `Representation of the '${schema.name}' schema`}
  `;
}

export function schemaPropertyDocumentation(
  schema: OpenApiObjectSchemaProperty
): string {
  return schema.description
    ? documentationBlock`${schema.description}` + EOL
    : '';
}

function getSignatureOfPathParameters(
  parameters: OpenApiParameter[]
): string[] {
  return parameters.map(
    (parameter, i) =>
      `@param ${parameter.name} ${
        parameter.description ||
        `Path parameter with the original name ${parameter.originalName}`
      }`
  );
}

function getSignatureOfBody(body: OpenApiRequestBody): string {
  return `@param body ${body.description || 'Request body'}`;
}

function getOperationDescriptionText(
  operation: OpenApiOperation,
  operationResponseType: string
): string {
  if (operation.description) {
    return operation.description;
  }

  return `Makes a ${operation.method} request to the '${operation.pathPattern}' endpoint and returns a '${operationResponseType}'`;
}
