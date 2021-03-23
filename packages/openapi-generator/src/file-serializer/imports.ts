import { codeBlock } from '@sap-cloud-sdk/util';

export function serializeImports(imports: Import[]): string {
  const relevantImports = imports.filter(({ names }) => names.length);
  return relevantImports
    .map(
      ({ names, moduleIdentifier }) =>
        codeBlock`import { ${names.join(', ')} } from '${moduleIdentifier}';`
    )
    .join('\n');
}

export interface Import {
  names: string[];
  moduleIdentifier: string;
}
