import { codeBlock, documentationBlock, unixEOL } from '@sap-cloud-sdk/util';
import { OpenApiPersistedSchema } from '../openapi-types';
import { collectRefs, getSchemaPropertiesDocumentation } from '../schema-util';
import { serializeSchema } from './schema';
import { Import, serializeImports } from './imports';

/**
 * Serialize a schema representation to a string representing the according schema file contents.
 * @param namedSchema - A named schema.
 * @returns The serialized schema file contents.
 * @internal
 */
export function schemaFile(namedSchema: OpenApiPersistedSchema): string {
  const imports = serializeImports(getImports(namedSchema));

  return codeBlock`    
    ${imports}
    ${schemaDocumentation(namedSchema)}
    export type ${namedSchema.schemaName} = ${serializeSchema(
    namedSchema.schema
  )};
  `;
}

function getImports(namedSchema: OpenApiPersistedSchema): Import[] {
  return collectRefs(namedSchema.schema)
    .filter(ref => ref.schemaName !== namedSchema.schemaName)
    .map(ref => ({
      names: [ref.schemaName],
      typeOnly: true,
      moduleIdentifier: `./${ref.fileName}`
    }));
}

/**
 * @internal
 */
export function schemaDocumentation(schema: OpenApiPersistedSchema): string {
  const lines = [
    schema.description ||
      `Representation of the '${schema.schemaName}' schema.`,
    ...getSchemaPropertiesDocumentation(schema.schemaProperties)
  ];
  return documentationBlock`${lines.join(unixEOL)}`;
}
