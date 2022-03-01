import { ODataVersion, unique } from '@sap-cloud-sdk/util';
import { Import } from '../../generator-common';
import { VdmMappedEdmType, VdmProperty } from '../../vdm-types';
import { potentialExternalImportDeclarations } from '../../imports';

/**
 * @internal
 */
export function odataImport(
  namedImports: string[],
  odataVersion: ODataVersion
): Import {
  return {
    names: unique(namedImports),
    moduleIdentifier:
      odataVersion === 'v2'
        ? '@sap-cloud-sdk/odata-v2'
        : '@sap-cloud-sdk/odata-v4',
    typeOnly: false
  };
}

/**
 * @internal
 */
export function complexTypeImports(properties: VdmProperty[]): Import[] {
  return mergeImports(
    properties
      .filter(prop => prop.isComplex)
      .map(prop => complexTypeImport(prop))
  );
}

function complexTypeImport(prop: VdmProperty): Import {
  return {
    names: [prop.jsType, ...(prop.isCollection ? [] : [prop.fieldType])],
    moduleIdentifier: `./${prop.jsType}`,
    typeOnly: false
  };
}

/**
 * @internal
 */
export function externalImports(properties: VdmMappedEdmType[]): Import[] {
  return potentialExternalImportDeclarations
    .map(([moduleIdentifier, ...names]) =>
      externalImport(properties, moduleIdentifier, names)
    )
    .filter(anImport => anImport.names && anImport.names.length);
}

function externalImport(
  properties: VdmMappedEdmType[],
  moduleIdentifier: string,
  names: string[]
): Import {
  return {
    moduleIdentifier,
    names: names.filter(name =>
      properties.map(prop => prop.jsType).includes(name)
    )
  };
}

/**
 * @internal
 */
export function enumTypeImports(properties: VdmProperty[]): Import[] {
  return mergeImports(
    properties.filter(prop => prop.isEnum).map(prop => enumTypeImport(prop))
  );
}

function enumTypeImport(prop: VdmProperty): Import {
  return {
    moduleIdentifier: `./${prop.jsType}`,
    names: [prop.jsType],
    typeOnly: false
  };
}

/**
 * @internal
 */
export function mergeImports(imports: Import[]): Import[] {
  return imports
    .reduce((prev, next) => {
      const sameModuleIdentifier = prev.find(
        declaration =>
          declaration.moduleIdentifier === next.moduleIdentifier &&
          !declaration.typeOnly === !next.typeOnly
      );
      if (sameModuleIdentifier) {
        sameModuleIdentifier.names = [
          ...sameModuleIdentifier.names,
          ...next.names
        ];
      } else {
        prev.push(next);
      }
      return prev;
    }, [] as Import[])
    .map(anImport => {
      anImport.names = unique(anImport.names);
      return anImport;
    })
    .filter(anImport => anImport.names && anImport.names.length);
}
