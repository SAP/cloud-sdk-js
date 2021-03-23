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

export function interfaceFile({ name, schema }: OpenApiNamedSchema): string {
  const imports = serializeImports(getImports(schema));

  return codeBlock`
      ${imports}
      export type ${name} = ${serializeSchema(schema)};
    `;
}

function getImports(schema: OpenApiSchema): Import[] {
  const refImports = collectRefs(schema).map(ref => ({
    names: [parseTypeNameFromRef(ref)],
    moduleIdentifier: `./${parseFileNameFromRef(ref)}`
  }));
  const coreImportNames = hasNotSchema(schema) ? ['Except'] : [];
  return [
    { names: coreImportNames, moduleIdentifier: '@sap-cloud-sdk/core' },
    ...refImports
  ];
}
