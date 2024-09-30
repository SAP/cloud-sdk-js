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
    .map(([moduleIdentifier, ...names]) =>
      externalImportDeclaration(properties, moduleIdentifier, names)
    )
    .filter(declaration => declaration.names && declaration.names.length);
}

/**
 * @internal
 */
export function externalImportDeclaration(
  properties: VdmMappedEdmType[],
  moduleIdentifier: string,
  names: string[]
): Import {
  return {
    moduleIdentifier,
    names: names.filter(namedImport =>
      properties.map(prop => prop.jsType).includes(namedImport)
    )
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
