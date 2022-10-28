import { ImportDeclarationStructure, StructureKind } from 'ts-morph';
import {
  bigNumberImport,
  momentImport
} from '../test/test-util/import-declaration-structures';
import { VdmNavigationProperty, VdmProperty } from './vdm-types';
import {
  complexTypeImportDeclarations,
  navPropertyFieldTypeImportNames,
  propertyFieldTypeImportNames,
  propertyTypeImportNames,
  externalImportDeclarations,
  mergeImportDeclarations
} from './imports';

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
  fieldType: 'OrderableEdmTypeField'
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

  describe('property import name list', () => {
    it('contains time property when there is a time property', () => {
      expect(
        propertyTypeImportNames([
          stringProperty,
          timeProperty,
          momentProperty,
          timeProperty
        ])
      ).toEqual(['Time']);
    });

    it('does not contain time property when there is no time property', () => {
      expect(
        propertyTypeImportNames([
          stringProperty,
          momentProperty,
          numberProperty
        ]).length
      ).toBe(0);
    });

    it('contains unique field name imports', () => {
      expect(
        propertyFieldTypeImportNames([
          stringProperty,
          timeProperty,
          stringProperty,
          momentProperty,
          timeProperty
        ])
      ).toEqual(['OrderableEdmTypeField']);
    });

    it('contains unique one-to-many link import', () => {
      expect(
        navPropertyFieldTypeImportNames([multiLink, multiLink], 'v2')
      ).toEqual(['Link']);
    });

    it('contains unique one to one link import', () => {
      expect(
        navPropertyFieldTypeImportNames([oneToOneLink, oneToOneLink], 'v2')
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

  describe('merge import declarations', () => {
    const emptyDeclaration = {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: './empty',
      namedImports: []
    } as ImportDeclarationStructure;

    const declaration1FromModule = {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: './module',
      namedImports: ['1']
    } as ImportDeclarationStructure;

    const declaration2FromModule = {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: './module',
      namedImports: ['2']
    } as ImportDeclarationStructure;

    it('merges named imports', () => {
      const merged = {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: './module',
        namedImports: ['1', '2']
      } as ImportDeclarationStructure;

      expect(
        mergeImportDeclarations([
          emptyDeclaration,
          declaration1FromModule,
          momentImport,
          momentImport,
          bigNumberImport,
          momentImport,
          bigNumberImport,
          declaration2FromModule
        ])
      ).toEqual([merged, momentImport, bigNumberImport]);
    });

    it('merges named imports including type imports', () => {
      const declarations = [
        { ...declaration1FromModule, isTypeOnly: true },
        declaration2FromModule
      ];

      expect(mergeImportDeclarations(declarations)).toEqual(declarations);
    });
  });
});
