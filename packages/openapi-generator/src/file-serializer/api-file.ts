import {
  codeBlock,
  documentationBlock,
  removeSlashes,
  unixEOL
} from '@sap-cloud-sdk/util';
import { serializeImports } from '@sap-cloud-sdk/generator-common/internal';
import { collectRefs, getUniqueRefs } from '../schema-util';
import { serializeOperation } from './operation';
import type {
  OpenApiApi,
  OpenApiOperation,
  OpenApiReferenceSchema
} from '../openapi-types';
import type {
  Import,
  CreateFileOptions
} from '@sap-cloud-sdk/generator-common/internal';

/**
 * Serialize an API representation to a string representing the resulting API file.
 * @param api - Representation of an API.
 * @param serviceName - Service name for which the API is created.
 * @param options - Options to configure the file creation.
 * @param basePath - Base path for the API obtained from optionsPerService.
 * @returns The serialized API file contents.
 * @internal
 */
export function apiFile(
  api: OpenApiApi,
  serviceName: string,
  options?: CreateFileOptions,
  basePath?: string
): string {
  const imports = serializeImports(getImports(api, options));
  const apiDoc = apiDocumentation(api, serviceName);
  const apiContent = codeBlock`
export const ${api.name} = {
  _defaultBasePath: ${basePath ? `'${basePath}'` : undefined},
  ${api.operations.map(operation => serializeOperation(operation, api.name)).join(',\n')}
};
`;

  return [imports, apiDoc, apiContent].join(unixEOL);
}
/**
 * Get the unique reference schemas for all request body types in the given operation list.
 * @param operations - The given operation list.
 * @returns The list of unique referenced body type schemas.
 */
function collectRefsFromOperations(
  operations: OpenApiOperation[]
): OpenApiReferenceSchema[] {
  return getUniqueRefs(
    operations.reduce(
      (referenceTypes, operation) => [
        ...referenceTypes,
        ...collectRefs(
          ...[
            operation.requestBody?.schema,
            operation.response,
            ...operation.queryParameters.map(({ schema }) => schema)
          ]
        )
      ],
      []
    )
  );
}

function getImports(api: OpenApiApi, options?: CreateFileOptions): Import[] {
  const refs = collectRefsFromOperations(api.operations).map(
    requestBodyType => requestBodyType.schemaName
  );

  const refImports = {
    names: refs,
    moduleIdentifier: options?.generateESM ? './schema/index.js' : './schema',
    typeOnly: true
  };
  const openApiImports = {
    names: ['OpenApiRequestBuilder'],
    moduleIdentifier: '@sap-cloud-sdk/openapi'
  };

  return [openApiImports, refImports];
}

/**
 * @internal
 */
export function apiDocumentation(api: OpenApiApi, serviceName: string): string {
  return documentationBlock`
  Representation of the '${api.name}'.
  This API is part of the '${serviceName}' service.`;
}
