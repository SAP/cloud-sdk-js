import { unique, ODataVersion } from '@sap-cloud-sdk/util';
import { ImportDeclarationStructure, StructureKind } from 'ts-morph';
import { linkClass } from './generator-utils';
import {
  VdmMappedEdmType,
  VdmNavigationProperty,
  VdmProperty
} from './vdm-types';

const potentialExternalImportDeclarations = [
  ['moment', 'Moment', 'Duration'],
  ['bignumber.js', 'BigNumber']
];
/* eslint-disable valid-jsdoc */

/**
 * @internal
 */
export function externalImportDeclarations(
  properties: VdmMappedEdmType[]
): ImportDeclarationStructure[] {
  return potentialExternalImportDeclarations
    .map(([moduleSpecifier, ...namedImports]) =>
      externalImportDeclaration(properties, moduleSpecifier, namedImports)
    )
    .filter(
      declaration => declaration.namedImports && declaration.namedImports.length
    );
}
/**
 * @internal
 */
export function externalImportDeclaration(
  properties: VdmMappedEdmType[],
  moduleSpecifier: string,
  namedImports: string[]
): ImportDeclarationStructure {
  return {
    kind: StructureKind.ImportDeclaration,
    moduleSpecifier,
    namedImports: namedImports.filter(namedImport =>
      properties.map(prop => prop.jsType).includes(namedImport)
    )
  };
}
/**
 * @internal
 */
export function odataCommonImportDeclaration(
  namedImports: string[]
): ImportDeclarationStructure {
  return {
    kind: StructureKind.ImportDeclaration,
    moduleSpecifier: '@sap-cloud-sdk/odata-common/internal',
    namedImports: unique(namedImports)
  };
}
/**
 * @internal
 */
export function odataImportDeclaration(
  namedImports: string[],
  odataVersion: ODataVersion
): ImportDeclarationStructure {
  return {
    kind: StructureKind.ImportDeclaration,
    moduleSpecifier:
      odataVersion === 'v2'
        ? '@sap-cloud-sdk/odata-v2'
        : '@sap-cloud-sdk/odata-v4',
    namedImports: unique(namedImports)
  };
}
/**
 * @internal
 */
export function propertyTypeImportNames(
  properties: VdmMappedEdmType[]
): string[] {
  return properties.map(prop => prop.jsType).includes('Time') ? ['Time'] : [];
}
/**
 * @internal
 */
export function propertyFieldTypeImportNames(
  properties: VdmProperty[]
): string[] {
  return unique(
    properties
      .filter(prop => !prop.isComplex || prop.isCollection)
      .map(prop => prop.fieldType)
  );
}
/**
 * @internal
 */
export function navPropertyFieldTypeImportNames(
  navProperties: VdmNavigationProperty[],
  oDataVersion: ODataVersion
): string[] {
  return unique(navProperties.map(navProp => linkClass(navProp, oDataVersion)));
}
/**
 * @internal
 */
export function complexTypeImportDeclarations(
  properties: VdmProperty[]
): ImportDeclarationStructure[] {
  return mergeImportDeclarations(
    properties
      .filter(prop => prop.isComplex)
      .map(prop => complexTypeImportDeclaration(prop))
  );
}
/**
 * @internal
 */
export function enumTypeImportDeclarations(
  properties: VdmProperty[]
): ImportDeclarationStructure[] {
  return mergeImportDeclarations(
    properties
      .filter(prop => prop.isEnum)
      .map(prop => enumTypeImportDeclaration(prop))
  );
}

// Only supports named imports
/**
 * @internal
 */
export function mergeImportDeclarations(
  importDeclarations: ImportDeclarationStructure[]
): ImportDeclarationStructure[] {
  return importDeclarations
    .reduce(
      (mergedDeclarations: ImportDeclarationStructure[], importDeclaration) => {
        const sameModuleSpecifier = mergedDeclarations.find(
          declaration =>
            declaration.moduleSpecifier === importDeclaration.moduleSpecifier
        );
        if (sameModuleSpecifier) {
          if (!sameModuleSpecifier.namedImports) {
            sameModuleSpecifier.namedImports = [
              ...(importDeclaration.namedImports as string[])
            ];
          } else if (sameModuleSpecifier.namedImports instanceof Array) {
            sameModuleSpecifier.namedImports = [
              ...sameModuleSpecifier.namedImports,
              ...(importDeclaration.namedImports as string[])
            ];
          } else {
            sameModuleSpecifier.namedImports = [
              sameModuleSpecifier.namedImports,
              ...(importDeclaration.namedImports as string[])
            ];
          }
        } else {
          mergedDeclarations.push(importDeclaration);
        }
        return mergedDeclarations;
      },
      []
    )
    .map(importDeclaration => {
      if (!importDeclaration.namedImports) {
        importDeclaration.namedImports = undefined;
      } else if (importDeclaration.namedImports instanceof Array) {
        importDeclaration.namedImports = unique(importDeclaration.namedImports);
      } else {
        importDeclaration.namedImports = [importDeclaration.namedImports];
      }
      return importDeclaration;
    })
    .filter(
      importDeclaration =>
        importDeclaration.namedImports && importDeclaration.namedImports.length
    );
}

function complexTypeImportDeclaration(
  prop: VdmProperty
): ImportDeclarationStructure {
  return {
    kind: StructureKind.ImportDeclaration,
    moduleSpecifier: `./${prop.jsType}`,
    namedImports: [prop.jsType, ...(prop.isCollection ? [] : [prop.fieldType])]
  };
}

function enumTypeImportDeclaration(
  prop: VdmProperty
): ImportDeclarationStructure {
  return {
    kind: StructureKind.ImportDeclaration,
    moduleSpecifier: `./${prop.jsType}`,
    namedImports: [prop.jsType]
  };
}
