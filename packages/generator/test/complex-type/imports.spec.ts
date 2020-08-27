/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { StructureKind } from 'ts-morph';
import { importDeclarations } from '../../src/complex-type';
import { VdmComplexType } from '../../src/vdm-types';
import { complexMeal, complexMealWithDesert } from '../test-util/data-model';

describe('complex type imports', () => {
  it('importDeclarations', () => {
    const actual = importDeclarations(complexMeal, 'v2');
    expect(actual).toEqual([
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: '@sap-cloud-sdk/core',
        namedImports: [
          'ComplexTypeField',
          'ComplexTypeNumberPropertyField',
          'ComplexTypeStringPropertyField',
          'ConstructorOrField',
          'EntityV2',
          'FieldType',
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
          'ComplexTypeNumberPropertyField',
          'ConstructorOrField',
          'EntityV2',
          'FieldType',
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
          'FieldType',
          'PropertyMetadata',
          'deserializeComplexTypeV2'
        ]
      }
    ]);
  });
});
