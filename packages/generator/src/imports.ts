import { unique } from '@sap-cloud-sdk/util';
import { StructureKind } from 'ts-morph';
import { linkClass } from './generator-utils';
import type { ImportDeclarationStructure } from 'ts-morph';
import type { ODataVersion } from '@sap-cloud-sdk/util';
import type {
  VdmMappedEdmType,
  VdmNavigationProperty,
  VdmProperty
} from './vdm-types';
import type { CreateFileOptions } from '@sap-cloud-sdk/generator-common/internal';

/**
 * @internal
 */
export const potentialExternalImportDeclarations = [
  ['moment', 'Moment', 'Duration'],
  ['bignumber.js', 'BigNumber']
];

/**
 * @internal
 */
export function externalImportDeclarationsTsMorph(
  properties: VdmMappedEdmType[]
): ImportDeclarationStructure[] {
  return potentialExternalImportDeclarations
    .map(([moduleSpecifier, ...namedImports]) =>
      externalImportDeclarationTsMorph(
        properties,
        moduleSpecifier,
        namedImports
      )
    )
    .filter(
      declaration => declaration.namedImports && declaration.namedImports.length
    );
}

/**
 * @internal
 */
export function externalImportDeclarationTsMorph(
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
export function odataImportDeclarationTsMorph(
  namedImports: string[],
  odataVersion: ODataVersion,
  internal = false
): ImportDeclarationStructure {
  return {
    kind: StructureKind.ImportDeclaration,
    moduleSpecifier:
      odataVersion === 'v2'
        ? '@sap-cloud-sdk/odata-v2' + (internal ? '/internal' : '')
        : '@sap-cloud-sdk/odata-v4' + (internal ? '/internal' : ''),
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
  properties: VdmProperty[],
  options?: CreateFileOptions
): ImportDeclarationStructure[] {
  return mergeImportDeclarations(
    properties
      .filter(prop => prop.isComplex)
      .map(prop => complexTypeImportDeclaration(prop, options))
  );
}

/**
 * @internal
 */
export function enumTypeImportDeclarations(
  properties: VdmProperty[],
  options?: CreateFileOptions
): ImportDeclarationStructure[] {
  return mergeImportDeclarations(
    properties
      .filter(prop => prop.isEnum)
      .map(prop => enumTypeImportDeclaration(prop, options))
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
            declaration.moduleSpecifier === importDeclaration.moduleSpecifier &&
            declaration.isTypeOnly === importDeclaration.isTypeOnly
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
  prop: VdmProperty,
  options?: CreateFileOptions
): ImportDeclarationStructure {
  return {
    kind: StructureKind.ImportDeclaration,
    moduleSpecifier: options?.generateESM
      ? `./${prop.jsType}.js`
      : `./${prop.jsType}`,
    namedImports: [prop.jsType, ...(prop.isCollection ? [] : [prop.fieldType])]
  };
}

function enumTypeImportDeclaration(
  prop: VdmProperty,
  options?: CreateFileOptions
): ImportDeclarationStructure {
  return {
    kind: StructureKind.ImportDeclaration,
    moduleSpecifier: options?.generateESM
      ? `./${prop.jsType}.js`
      : `./${prop.jsType}`,
    namedImports: [prop.jsType]
  };
}

/**
 * @internal
 */
export function getImportsWithESM(
  schemaName: string,
  fileName: string,
  properties: VdmProperty[],
  options?: CreateFileOptions
): ImportDeclarationStructure[] {
  return mergeImportDeclarations(
    properties
      .filter(prop => prop.isComplex || prop.isEnum)
      .map(prop => ({
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: options?.generateESM
          ? `./${prop.jsType}.js`
          : `./${prop.jsType}`,
        namedImports: [prop.jsType, ...(prop.isCollection ? [] : [prop.fieldType])]
      }))
  );
}
