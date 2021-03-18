import { codeBlock, createLogger } from '@sap-cloud-sdk/util';
import { OpenApiNamedSchema } from '../openapi-types';
import {
  collectRefs,
  hasNotType,
  parseTypeName,
  parseFileName
} from '../model';
import { serializeSchema } from './schema';
const logger = createLogger('openapi-generator');

export function interfaceFile({ name, schema }: OpenApiNamedSchema): string {
  const refs = collectRefs(schema);
  const coreImports = hasNotType(schema)
    ? "import { Except } from '@sap-cloud-sdk/core';"
    : '';

  const imports = codeBlock`${[...getImportsFromRefs(refs), coreImports].join(
    '\n'
  )}`;

  return codeBlock`
      ${imports}
      export type ${name} = ${serializeSchema(schema)};
    `;
}

function getImportsFromRefs(refs: string[]): string[] {
  return refs.map(
    ref =>
      codeBlock`import { ${parseTypeName({
        $ref: ref
      })} } from './${parseFileName({ $ref: ref })}';`
  );
}
