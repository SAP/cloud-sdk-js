import { StructureKind } from 'ts-morph';
import { complexTypeImportDeclarations, getImportsWithESM } from './imports';
import type { CreateFileOptions } from '@sap-cloud-sdk/generator-common/internal';
import type { VdmProperty } from './vdm-types';

const complexTypeProperty: VdmProperty = {
  edmType: 'ComplexType',
  jsType: 'ComplexType',
  fieldType: 'ComplexTypeField',
  isComplex: true,
  description: 'Complex type property',
  originalName: 'complexTypeProperty',
  instancePropertyName: 'complexTypeProperty',
  propertyNameAsParam: 'complexTypeProperty',
  staticPropertyName: 'complexTypeProperty',
  nullable: false,
  isCollection: false
};

const enumTypeProperty: VdmProperty = {
  edmType: 'EnumType',
  jsType: 'EnumType',
  fieldType: 'EnumField',
  isEnum: true,
  description: 'Enum type property',
  originalName: 'enumTypeProperty',
  instancePropertyName: 'enumTypeProperty',
  propertyNameAsParam: 'enumTypeProperty',
  staticPropertyName: 'enumTypeProperty',
  nullable: false,
  isCollection: false
};

const commonjsOptions: CreateFileOptions = {
  generateESM: false,
  overwrite: false,
  prettierOptions: {}
};

const esmOptions: CreateFileOptions = {
  generateESM: true,
  overwrite: false,
  prettierOptions: {}
};

describe('ESM imports', () => {
  it('generates CommonJS imports when generateESM is false', () => {
    expect(
      complexTypeImportDeclarations([complexTypeProperty], commonjsOptions)
    ).toEqual([
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: './ComplexType',
        namedImports: ['ComplexType', 'ComplexTypeField']
      }
    ]);

    expect(
      getImportsWithESM(
        'TestSchema',
        'test-file',
        [complexTypeProperty],
        commonjsOptions
      )
    ).toEqual([
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: './ComplexType',
        namedImports: ['ComplexType', 'ComplexTypeField']
      }
    ]);
  });

  it('generates ESM imports when generateESM is true', () => {
    expect(
      complexTypeImportDeclarations([complexTypeProperty], esmOptions)
    ).toEqual([
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: './ComplexType.js',
        namedImports: ['ComplexType', 'ComplexTypeField']
      }
    ]);

    expect(
      getImportsWithESM(
        'TestSchema',
        'test-file',
        [complexTypeProperty],
        esmOptions
      )
    ).toEqual([
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: './ComplexType.js',
        namedImports: ['ComplexType', 'ComplexTypeField']
      }
    ]);
  });

  it('handles mixed complex and enum types with ESM', () => {
    const mixedProperties = [complexTypeProperty, enumTypeProperty];

    const esmResult = getImportsWithESM(
      'TestSchema',
      'test-file',
      mixedProperties,
      esmOptions
    );

    expect(esmResult).toEqual([
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: './ComplexType.js',
        namedImports: ['ComplexType', 'ComplexTypeField']
      },
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: './EnumType.js',
        namedImports: ['EnumType']
      }
    ]);
  });

  it('filters out non-complex and non-enum properties', () => {
    const primitiveProperty: VdmProperty = {
      edmType: 'Edm.String',
      jsType: 'string',
      fieldType: 'EdmTypeField',
      isComplex: false,
      isEnum: false,
      description: 'Primitive property',
      originalName: 'primitiveProperty',
      instancePropertyName: 'primitiveProperty',
      propertyNameAsParam: 'primitiveProperty',
      staticPropertyName: 'primitiveProperty',
      nullable: false,
      isCollection: false
    };

    const esmResult = getImportsWithESM(
      'TestSchema',
      'test-file',
      [primitiveProperty],
      esmOptions
    );

    expect(esmResult).toEqual([]);
  });

  it('handles collection properties correctly', () => {
    const collectionProperty: VdmProperty = {
      edmType: 'ComplexType',
      jsType: 'ComplexType',
      fieldType: 'ComplexTypeField',
      isComplex: true,
      isCollection: true,
      description: 'Collection property',
      originalName: 'collectionProperty',
      instancePropertyName: 'collectionProperty',
      propertyNameAsParam: 'collectionProperty',
      staticPropertyName: 'collectionProperty',
      nullable: false
    };

    const esmResult = getImportsWithESM(
      'TestSchema',
      'test-file',
      [collectionProperty],
      esmOptions
    );

    expect(esmResult).toEqual([
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: './ComplexType.js',
        namedImports: ['ComplexType'] // No fieldType for collections
      }
    ]);
  });

  it('maintains backward compatibility when options is undefined', () => {
    expect(
      complexTypeImportDeclarations([complexTypeProperty], undefined)
    ).toEqual([
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: './ComplexType',
        namedImports: ['ComplexType', 'ComplexTypeField']
      }
    ]);

    expect(
      getImportsWithESM(
        'TestSchema',
        'test-file',
        [complexTypeProperty],
        undefined
      )
    ).toEqual([
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: './ComplexType',
        namedImports: ['ComplexType', 'ComplexTypeField']
      }
    ]);
  });
});
