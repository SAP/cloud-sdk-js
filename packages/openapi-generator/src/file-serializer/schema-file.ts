import { codeBlock } from '@sap-cloud-sdk/util';
import { OpenApiNamedSchema, OpenApiSchema } from '../openapi-types';
import {
  collectRefs,
  hasNotSchema,
  parseTypeNameFromRef,
  parseFileNameFromRef
} from '../model';
import { serializeSchema } from './schema';
import { Import, serializeImports } from './imports';

/**
 * Serialize a schema representation to a string representing the according schema file contents.
 * @param operationInfo A named schema.
 * @returns The serialized schema file contents.
 */
export function schemaFile({ name, schema }: OpenApiNamedSchema): string {
  const imports = serializeImports(getImports(schema));

  return codeBlock`
    ${imports}
    export type ${name} = ${serializeSchema(schema)};
  `;
}

function getImports(schema: OpenApiSchema): Import[] {
  const refImports = collectRefs(schema).map(ref => ({
    names: [parseTypeNameFromRef(ref)],
    typeOnly: true,
    moduleIdentifier: `./${parseFileNameFromRef(ref)}`
  }));
  if (hasNotSchema(schema)) {
    return [
      { names: ['Except'], moduleIdentifier: '@sap-cloud-sdk/core' },
      ...refImports
    ];
  }
  return refImports;
}
