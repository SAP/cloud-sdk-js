import { codeBlock, unique } from '@sap-cloud-sdk/util';
import { OpenApiApi, OpenApiOperation } from '../openapi-types';
import { collectRefs, parseTypeNameFromRef } from '../model';
import { serializeOperation } from './operation';

export function apiFile(api: OpenApiApi): string {
  const requestBodyTypes = getRequestBodyReferenceTypes(
    api.operations
  ).map(requestBodyType => parseTypeNameFromRef({ $ref: requestBodyType }));
  return codeBlock`
import { OpenApiRequestBuilder } from '@sap-cloud-sdk/core';
${
  requestBodyTypes.length
    ? `import { ${requestBodyTypes.join(', ')} } from './model';`
    : ''
}

export const ${api.name} = {
  ${api.operations.map(operation => serializeOperation(operation)).join(',\n')}
};
`;
}

/**
 * Get the reference types for all request body types in the given operation list.
 * @param operations The given operation list.
 * @returns The list of body types.
 */
function getRequestBodyReferenceTypes(
  operations: OpenApiOperation[]
): string[] {
  return operations.reduce((referenceTypes, operation) => {
    const requestBodySchema = operation.requestBody?.parameterType;
    return requestBodySchema
      ? unique([...referenceTypes, ...collectRefs(requestBodySchema)])
      : referenceTypes;
  }, []);
}
