import { unique } from '@sap-cloud-sdk/util';
import { potentialExternalImportDeclarations } from '../imports';
import type { Import } from '@sap-cloud-sdk/generator-common/internal';
import type { ODataVersion } from '@sap-cloud-sdk/util';
import type { VdmMappedEdmType } from '../vdm-types';

/**
 * @internal
 */
export function externalImportDeclarations(
  properties: VdmMappedEdmType[]
): Import[] {
  return potentialExternalImportDeclarations
    .map(({ moduleSpecifier, namedImports, defaultImport }) =>
      externalImportDeclaration(
        properties,
        moduleSpecifier,
        namedImports,
        defaultImport
      )
    )
    .filter(
      declaration =>
        (declaration.names && declaration.names.length) ||
        declaration.defaultImport
    );
}

/**
 * @internal
 */
export function externalImportDeclaration(
  properties: VdmMappedEdmType[],
  moduleIdentifier: string,
  names: string[] = [],
  defaultImport: string | undefined
): Import {
  return {
    moduleIdentifier,
    names: names.filter(namedImport =>
      properties.map(prop => prop.jsType).includes(namedImport)
    ),
    defaultImport: properties
      .map(prop => prop.jsType)
      .includes(defaultImport || '')
      ? defaultImport
      : undefined
  };
}

/**
 * @internal
 */
export function odataImportDeclaration(
  namedImports: string[],
  odataVersion: ODataVersion,
  internal = false
): Import {
  return {
    moduleIdentifier:
      odataVersion === 'v2'
        ? '@sap-cloud-sdk/odata-v2' + (internal ? '/internal' : '')
        : '@sap-cloud-sdk/odata-v4' + (internal ? '/internal' : ''),
    names: unique(namedImports)
  };
}
