import { codeBlock, documentationBlock, unixEOL } from '@sap-cloud-sdk/util';
import { serializeImports } from '@sap-cloud-sdk/generator-common/internal';
import { collectRefs, getSchemaPropertiesDocumentation } from '../schema-util';
import { serializeSchema } from './schema';
import type { OpenApiPersistedSchema } from '../openapi-types';
import type {
  Import,
  CreateFileOptions
} from '@sap-cloud-sdk/generator-common/internal';

/**
 * Serialize a schema representation to a string representing the according schema file contents.
 * @param namedSchema - A named schema.
 * @returns The serialized schema file contents.
 * @internal
 */
export function schemaFile(
  namedSchema: OpenApiPersistedSchema,
  options?: CreateFileOptions
): string {
  const imports = serializeImports(getImports(namedSchema, options));

  return codeBlock`    
    ${imports}
    ${schemaDocumentation(namedSchema)}
    export type ${namedSchema.schemaName} = ${serializeSchema(
      namedSchema.schema
    )}${namedSchema.nullable ? ' | null' : ''};
  `;
}

function getImports(
  namedSchema: OpenApiPersistedSchema,
  options?: CreateFileOptions
): Import[] {
  return collectRefs(namedSchema.schema)
    .filter(ref => ref.schemaName !== namedSchema.schemaName)
    .map(ref => ({
      names: [ref.schemaName],
      typeOnly: true,
      moduleIdentifier: options?.generateESM
        ? `./${ref.fileName}.js`
        : `./${ref.fileName}`
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
