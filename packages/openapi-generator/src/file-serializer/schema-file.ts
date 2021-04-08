import { codeBlock, documentationBlock } from '@sap-cloud-sdk/util';
import { OpenApiNamedSchema } from '../openapi-types';
import { collectRefs, parseFileNameFromRef } from '../schema-util';
import { serializeSchema } from './schema';
import { Import, serializeImports } from './imports';

/**
 * Serialize a schema representation to a string representing the according schema file contents.
 * @param namedSchema A named schema.
 * @returns The serialized schema file contents.
 */
export function schemaFile(namedSchema: OpenApiNamedSchema): string {
  const imports = serializeImports(getImports(namedSchema));

  return codeBlock`    
    ${imports}
    ${schemaDocumentation(namedSchema)}
    export type ${namedSchema.name} = ${serializeSchema(namedSchema.schema)};
  `;
}

function getImports(namedSchema: OpenApiNamedSchema): Import[] {
  return collectRefs(namedSchema.schema)
    .filter(ref => ref.schemaName !== namedSchema.name)
    .map(ref => ({
      names: [ref.schemaName],
      typeOnly: true,
      moduleIdentifier: `./${parseFileNameFromRef(ref)}`
    }));
}

export function schemaDocumentation(schema: OpenApiNamedSchema): string {
  return documentationBlock`${
    schema.description || `Representation of the '${schema.name}' schema.`
  }`;
}
