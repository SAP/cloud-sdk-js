import { codeBlock } from '@sap-cloud-sdk/util';
import {
  OpenApiApi,
  OpenApiOperation,
  OpenApiReferenceSchema
} from '../openapi-types';
import { collectRefs, getUniqueRefs, hasNotSchema } from '../schema-util';
import { serializeOperation } from './operation';
import { Import, serializeImports } from './imports';
import { EOL } from 'os';
import { codeBlock, documentationBlock, unique } from '@sap-cloud-sdk/util';
import { OpenApiApi, OpenApiOperation } from '../openapi-types';

/**
 * Serialize an API representation to a string representing the resulting API file.
 * @param api Represenation of an API.
 *  * @param serviceName Service name for which the API is created.
 * @returns The serialized API file contents.
 */
export function apiFile(api: OpenApiApi, serviceName: string): string {
  const imports = serializeImports(getImports(api));
  const apiDoc = apiDocumentation(api, serviceName);
  const apiContent = codeBlock`
${imports}

export const ${api.name} = {
  ${api.operations.map(operation => serializeOperation(operation)).join(',\n')}
};
`;

  return [imports, apiDoc, apiContent].join(EOL);
}

/**
 * Get the unique reference schemas for all request body types in the given operation list.
 * @param operations The given operation list.
 * @returns The list of unique referenced body type schemas.
 */
function collectRefsFromOperations(
  operations: OpenApiOperation[]
): OpenApiReferenceSchema[] {
  return getUniqueRefs(
    operations.reduce(
      (referenceTypes, operation) => [
        ...referenceTypes,
        ...collectRefs(operation.requestBody?.schema),
        ...collectRefs(operation.response)
      ],
      []
    )
  );
}

function hasNotSchemaInOperations(operations: OpenApiOperation[]): boolean {
  return operations.some(
    operation => hasNotSchema(operation.requestBody?.schema),
    false
  );
}

function getImports(api: OpenApiApi): Import[] {
  const refs = collectRefsFromOperations(api.operations).map(
    requestBodyType => requestBodyType.schemaName
  );

  const refImports = {
    names: refs,
    moduleIdentifier: './schema',
    typeOnly: true
  };
  const coreImports = {
    names: ['OpenApiRequestBuilder'],
    moduleIdentifier: '@sap-cloud-sdk/core'
  };
  if (hasNotSchemaInOperations(api.operations)) {
    coreImports.names.push('Except');
  }

  return [coreImports, refImports];
}

export function apiDocumentation(api: OpenApiApi, serviceName: string): string {
  return documentationBlock`
  Representation of the '${api.name}'.
  This API is part of the '${serviceName}' service.`;
}
