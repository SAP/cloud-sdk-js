import { codeBlock } from '@sap-cloud-sdk/util';

/**
 * Serialize a list of imports.
 * @param imports The imports to serialize.
 * @returns The serialized imports as a multiline string.
 */
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

/**
 * Representation of module imports.
 */
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
