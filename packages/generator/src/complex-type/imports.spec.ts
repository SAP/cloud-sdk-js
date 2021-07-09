import { StructureKind } from 'ts-morph';
import {
  complexMeal,
  complexMealWithDesert
} from '../../test/test-util/data-model';
import { VdmComplexType } from '../vdm-types';
import { importDeclarations } from './imports';

describe('complex type imports', () => {
  it('importDeclarations', () => {
    const actual = importDeclarations(complexMeal, 'v2');
    expect(actual).toEqual([
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: '@sap-cloud-sdk/core',
        namedImports: [
          'ComplexTypeField',
          'ConstructorOrField',
          'EdmTypeField',
          'EntityV2',
          'FieldBuilder',
          'FieldOptions',
          'FieldType',
          'OrderableEdmTypeField',
          'PropertyMetadata',
          'deserializeComplexTypeV2'
        ]
      }
    ]);
  });

  it('importDeclarations for a complex type that includes a complex type', () => {
    const actual = importDeclarations(complexMealWithDesert, 'v2');
    expect(actual).toEqual([
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: './ComplexDesert',
        namedImports: ['ComplexDesert', 'ComplexDesertField']
      },
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: '@sap-cloud-sdk/core',
        namedImports: [
          'ComplexTypeField',
          'ConstructorOrField',
          'EntityV2',
          'FieldBuilder',
          'FieldOptions',
          'FieldType',
          'OrderableEdmTypeField',
          'PropertyMetadata',
          'deserializeComplexTypeV2'
        ]
      }
    ]);
  });

  it('importDeclarations for a complex type that includes a complex type and no property with an edm type', () => {
    //  We test here the use-case where a complex type includes only complex type properties `edmToTs`. The only deviation with the previous test, is that the 'edmToTs' function should not be imported from core.

    const complexMealWithDesertWithoutEdmProperty: VdmComplexType = {
      ...complexMealWithDesert,
      ...{ properties: [complexMealWithDesert.properties[0]] }
    };
    const actual = importDeclarations(
      complexMealWithDesertWithoutEdmProperty,
      'v2'
    );
    expect(actual).toEqual([
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: './ComplexDesert',
        namedImports: ['ComplexDesert', 'ComplexDesertField']
      },
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: '@sap-cloud-sdk/core',
        namedImports: [
          'ComplexTypeField',
          'ConstructorOrField',
          'EntityV2',
          'FieldBuilder',
          'FieldOptions',
          'FieldType',
          'PropertyMetadata',
          'deserializeComplexTypeV2'
        ]
      }
    ]);
  });
});
