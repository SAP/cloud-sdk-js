import { EOL } from 'os';
import { documentationBlock } from '@sap-cloud-sdk/util';
import {
  OpenApiApi,
  OpenApiDocument,
  OpenApiOperation,
  OpenApiParameter,
  OpenApiRequestBody
} from '../openapi-types';
import { serializeSchema } from './schema';

export function apiDocumentation(
  api: OpenApiApi,
  document: OpenApiDocument
): string {
  return documentationBlock`
  Representation of the ${api.name} API.
  This API is part of the ${document.serviceName} service.
  
  This API client has been created automatically using the SAP Cloud SDK - do not edit manually.
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
      '@param queryParameters Optional object containing the query parameters.'
    );
  }
  signature.push(`@returns ${serializeSchema(operation.response)}`);

  return documentationBlock`
  ${
    operation.description
      ? operation.description
      : getOperationDescriptionText(operation)
  }
  
  ${signature.join(EOL)}
  `;
}

function getSignatureOfPathParameters(
  parameters: OpenApiParameter[]
): string[] {
  return parameters.map(
    (parameter, i) =>
      `@param ${parameter.name} ${
        parameter.description || `Path parameter number ${i + 1}`
      }`
  );
}

function getSignatureOfBody(body: OpenApiRequestBody): string {
  return `@param body ${
    body.required ? 'Object' : 'Optional object'
  } containing the request body of type '${serializeSchema(body.schema)}'`;
}

function getOperationDescriptionText(operation: OpenApiOperation): string {
  return `Makes a ${operation.method} request to the '${
    operation.pathPattern
  }' endpoint and returns a '${serializeSchema(operation.response)}'`;
}
