import { ImportDeclarationStructure, StructureKind } from 'ts-morph';
import {
  complexTypeImportDeclarations,
  coreNavPropertyFieldTypeImportNames,
  corePropertyFieldTypeImportNames,
  corePropertyTypeImportNames,
  externalImportDeclarations,
  mergeImportDeclarations
} from '../src/imports';
import { VdmNavigationProperty, VdmProperty } from '../src/vdm-types';
import {
  bigNumberImport,
  momentImport
} from '../test/test-util/import-declaration-structures';

const momentProperty = {
  jsType: 'Moment',
  edmType: 'Edm.DateTime',
  fieldType: 'OrderableEdmTypeField'
} as VdmProperty;

const bigNumberProperty = {
  jsType: 'BigNumber',
  edmType: 'Edm.Decimal',
  fieldType: 'OrderableEdmTypeField'
} as VdmProperty;

const stringProperty = {
  jsType: 'string',
  edmType: 'Edm.String',
  fieldType: 'EdmTypeField'
} as VdmProperty;

const numberProperty = {
  jsType: 'number',
  edmType: 'Edm.Number',
  fieldType: 'OrderableEdmTypeField'
} as VdmProperty;

const timeProperty = {
  jsType: 'Time',
  edmType: 'Edm.DateTimeOffset',
  fieldType: 'OrderableEdmTypeField'
} as VdmProperty;

const multiLink = {
  isCollection: true
} as VdmNavigationProperty;

const oneToOneLink = {
  isCollection: false
} as VdmNavigationProperty;

describe('imports', () => {
  describe('external import declarations', () => {
    it('are empty when properties do not have external types', () => {
      expect(
        externalImportDeclarations([stringProperty, numberProperty]).length
      ).toBe(0);
    });

    it('contain all imports when properties have all external types', () => {
      expect(
        externalImportDeclarations([
          stringProperty,
          momentProperty,
          numberProperty,
          bigNumberProperty
        ])
      ).toEqual([momentImport, bigNumberImport]);
    });

    it('do not contain duplicates when multiple properties have the same external types', () => {
      expect(
        externalImportDeclarations([
          stringProperty,
          momentProperty,
          momentProperty,
          momentProperty
        ])
      ).toEqual([momentImport]);
    });
  });

  describe('core import name list', () => {
    it('contains time property when there is a time property', () => {
      expect(
        corePropertyTypeImportNames([
          stringProperty,
          timeProperty,
          momentProperty,
          timeProperty
        ])
      ).toEqual(['Time']);
    });

    it('does not contain time property when there is no time property', () => {
      expect(
        corePropertyTypeImportNames([
          stringProperty,
          momentProperty,
          numberProperty
        ]).length
      ).toBe(0);
    });

    it('contains unique field name imports', () => {
      expect(
        corePropertyFieldTypeImportNames([
          stringProperty,
          timeProperty,
          stringProperty,
          momentProperty,
          timeProperty
        ])
      ).toEqual(['EdmTypeField', 'OrderableEdmTypeField']);
    });

    it('contains unique multilink import', () => {
      expect(
        coreNavPropertyFieldTypeImportNames([multiLink, multiLink], 'v2')
      ).toEqual(['Link']);
    });

    it('contains unique one to one link import', () => {
      expect(
        coreNavPropertyFieldTypeImportNames([oneToOneLink, oneToOneLink], 'v2')
      ).toEqual(['OneToOneLink']);
    });
  });

  describe('complex type import declaration list', () => {
    it('contains unique complex type import', () => {
      const complexTypeProperty = {
        edmType: 'ComplexType',
        jsType: 'ComplexType',
        fieldType: 'ComplexTypeField',
        isComplex: true
      } as VdmProperty;

      expect(
        complexTypeImportDeclarations([
          complexTypeProperty,
          complexTypeProperty
        ])
      ).toEqual([
        {
          kind: StructureKind.ImportDeclaration,
          moduleSpecifier: './ComplexType',
          namedImports: ['ComplexType', 'ComplexTypeField']
        }
      ]);
    });
  });

  it('merge import declarations', () => {
    const someEmptyDeclaration = {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: './empty',
      namedImports: []
    } as ImportDeclarationStructure;

    const someDeclaration1 = {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: './someModule',
      namedImports: ['1']
    } as ImportDeclarationStructure;

    const someDeclaration2 = {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: './someModule',
      namedImports: ['2']
    } as ImportDeclarationStructure;

    const merged = {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: './someModule',
      namedImports: ['1', '2']
    } as ImportDeclarationStructure;
    expect(
      mergeImportDeclarations([
        someEmptyDeclaration,
        someDeclaration1,
        momentImport,
        momentImport,
        bigNumberImport,
        momentImport,
        bigNumberImport,
        someDeclaration2
      ])
    ).toEqual([merged, momentImport, bigNumberImport]);
  });
});
