import { codeBlock } from '@sap-cloud-sdk/util';
/**
 * @internal
 */
export interface Import {
  /**
   * Names of the exports that are to be imported.
   */
  names: string[];
  /**
   * The default export to import.
   */
  defaultImport?: string | undefined;
  /**
   * The module to import from.
   */
  moduleIdentifier: string;
  /**
   * Indicates whether this is a type-only import.
   */
  typeOnly?: boolean;
}

/**
 * @internal
 */
export function serializeImports(imports: Import[]): string {
  const relevantImports = imports.filter(
    ({ names, defaultImport }) => names.length || defaultImport
  );
  return relevantImports
    .map(
      ({ names, defaultImport, moduleIdentifier, typeOnly }) =>
        codeBlock`import ${typeOnly ? 'type ' : ''}${defaultImport ? `${defaultImport},` : ''}{ ${names.join(
          ', '
        )} } from '${moduleIdentifier}';`
    )
    .join('\n');
}
