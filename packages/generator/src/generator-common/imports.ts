import { codeBlock } from '@sap-cloud-sdk/util';

export interface Import {
  /**
   * Names of the exports that are to be imported.
   */
  names: string[];
  /**
   * The module to import from.
   */
  moduleIdentifier: string;
  /**
   * Indicates whether this is a type-only import.
   */
  typeOnly?: boolean;
}

export function serializeImports(imports: Import[]): string {
  const relevantImports = imports.filter(({ names }) => names.length);
  return relevantImports
    .map(
      ({ names, moduleIdentifier, typeOnly }) =>
        codeBlock`import ${typeOnly ? 'type ' : ''}{ ${names.join(
          ', '
        )} } from '${moduleIdentifier}';`
    )
    .join('\n');
}
