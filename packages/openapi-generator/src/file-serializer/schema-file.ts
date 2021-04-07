import { codeBlock, documentationBlock } from '@sap-cloud-sdk/util';
import { OpenApiNamedSchema, OpenApiSchema } from '../openapi-types';
import {
  collectRefs,
  hasNotSchema,
  parseFileNameFromRef
} from '../schema-util';
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
    ${schemaDocumentation({ name, schema })}
    export type ${name} = ${serializeSchema(schema)};
  `;
}

function getImports(schema: OpenApiSchema): Import[] {
  const refImports = collectRefs(schema).map(ref => ({
    names: [ref.schemaName],
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

export function schemaDocumentation(schema: OpenApiNamedSchema): string {
  return documentationBlock`${
    schema.description || `Representation of the '${schema.name}' schema.`
  }`;
}
