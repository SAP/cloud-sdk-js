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
  {
    moduleSpecifier: 'moment',
    namedImports: ['Moment', 'Duration']
  },
  {
    moduleSpecifier: 'bignumber.js',
    defaultImport: 'BigNumber'
  }
];

/**
 * @internal
 */
export function externalImportDeclarationsTsMorph(
  properties: VdmMappedEdmType[]
): ImportDeclarationStructure[] {
  return potentialExternalImportDeclarations
    .map(importDeclaration =>
      externalImportDeclarationTsMorph(properties, importDeclaration)
    )
    .filter(
      declaration =>
        (declaration.namedImports && declaration.namedImports.length) ||
        declaration.defaultImport
    );
}

function externalImportDeclarationTsMorph(
  properties: VdmMappedEdmType[],
  {
    moduleSpecifier,
    namedImports = [],
    defaultImport
  }: (typeof potentialExternalImportDeclarations)[number]
): ImportDeclarationStructure {
  return {
    kind: StructureKind.ImportDeclaration,
    moduleSpecifier,
    namedImports: namedImports.filter(namedImport =>
      properties.map(prop => prop.jsType).includes(namedImport)
    ),
    defaultImport:
      defaultImport &&
      properties
        .map(prop => prop.jsType)
        .find(jsType => jsType === defaultImport)
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

// Does not support writer functions or strings as named imports
/**
 * @internal
 */
export function mergeImportDeclarations(
  importDeclarations: ImportDeclarationStructure[]
): ImportDeclarationStructure[] {
  return importDeclarations
    .reduce(
      (mergedDeclarations: ImportDeclarationStructure[], importDeclaration) => {
        const mergedDeclaration = mergedDeclarations.find(
          declaration =>
            declaration.moduleSpecifier === importDeclaration.moduleSpecifier &&
            declaration.isTypeOnly === importDeclaration.isTypeOnly
        );
        if (mergedDeclaration) {
          const mergedNamedImports = mergedDeclaration.namedImports || [];
          const newNamedImports = importDeclaration.namedImports || [];
          if (
            !Array.isArray(mergedNamedImports) ||
            !Array.isArray(newNamedImports)
          ) {
            throw new Error(
              'mergeImportDeclarations only supports array or undefined named imports. This should never happen.'
            );
          }
          mergedDeclaration.namedImports = unique([
            ...mergedNamedImports,
            ...newNamedImports
          ]);

          mergedDeclaration.defaultImport =
            mergedDeclaration.defaultImport || importDeclaration.defaultImport;
        } else {
          mergedDeclarations.push(importDeclaration);
        }
        return mergedDeclarations;
      },
      []
    )
    .filter(
      importDeclaration =>
        (importDeclaration.namedImports &&
          importDeclaration.namedImports.length) ||
        importDeclaration.defaultImport
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
