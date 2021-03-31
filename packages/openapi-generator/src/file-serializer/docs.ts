import { EOL } from 'os';
import { documentationBlock } from '@sap-cloud-sdk/util';
import {
  OpenApiApi,
  OpenApiNamedSchema,
  OpenApiObjectSchemaProperty,
  OpenApiOperation,
  OpenApiParameter,
  OpenApiRequestBody
} from '../openapi-types';
import { serializeSchema } from './schema';

export function apiDocumentation(api: OpenApiApi, serviceName: string): string {
  return documentationBlock`
  Representation of the '${api.name}'.
  This API is part of the '${serviceName}' service.
  `;
}

export function operationDocumentation(operation: OpenApiOperation): string {
  const signature: string[] = [];
  if (operation.pathParameters.length > 0) {
    signature.push(...getSignatureOfPathParameters(operation.pathParameters));
  }
  if (operation.requestBody) {
    signature.push(getSignatureOfBody(operation.requestBody));
  }
  if (operation.queryParameters.length > 0) {
    signature.push(
      '@param queryParameters Object containing the query parameters.'
    );
  }
  signature.push(`@returns ${serializeSchema(operation.response)}`);

  return documentationBlock`
  ${getOperationDescriptionText(operation)}
  
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

function getOperationDescriptionText(operation: OpenApiOperation): string {
  if (operation.description) {
    return operation.description;
  }

  return `Makes a ${operation.method} request to the '${
    operation.pathPattern
  }' endpoint and returns a '${serializeSchema(operation.response)}'`;
}
