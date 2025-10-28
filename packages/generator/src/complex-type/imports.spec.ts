import { StructureKind } from 'ts-morph';
import {
  complexMeal,
  complexMealWithDesert
} from '../../test/test-util/data-model';
import { importDeclarations } from './imports';
import type { VdmComplexType } from '../vdm-types';
import type { CreateFileOptions } from '@sap-cloud-sdk/generator-common/internal';

describe('complex type imports', () => {
  it('importDeclarations', () => {
    const actual = importDeclarations(complexMeal, 'v2');
    expect(actual).toEqual([
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: '@sap-cloud-sdk/odata-v2',
        namedImports: [
          'ComplexTypeField',
          'ConstructorOrField',
          'DeSerializers',
          'DefaultDeSerializers',
          'DeserializedType',
          'EdmTypeField',
          'Entity',
          'FieldBuilder',
          'FieldOptions',
          'OrderableEdmTypeField',
          'PropertyMetadata'
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
        moduleSpecifier: '@sap-cloud-sdk/odata-v2',
        namedImports: [
          'ComplexTypeField',
          'ConstructorOrField',
          'DeSerializers',
          'DefaultDeSerializers',
          'DeserializedType',
          'EdmTypeField',
          'Entity',
          'FieldBuilder',
          'FieldOptions',
          'OrderableEdmTypeField',
          'PropertyMetadata'
        ]
      }
    ]);
  });

  it('importDeclarations for a complex type that includes a complex type and no property with an EDM type', () => {
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
        moduleSpecifier: '@sap-cloud-sdk/odata-v2',
        namedImports: [
          'ComplexTypeField',
          'ConstructorOrField',
          'DeSerializers',
          'DefaultDeSerializers',
          'DeserializedType',
          'EdmTypeField',
          'Entity',
          'FieldBuilder',
          'FieldOptions',
          'OrderableEdmTypeField',
          'PropertyMetadata'
        ]
      }
    ]);
  });

  describe('ESM support', () => {
    const esmOptions = {
      generateESM: true
    } as CreateFileOptions;

    it('importDeclarations when ESM flag is set to true', () => {
      const actual = importDeclarations(
        complexMealWithDesert,
        'v2',
        esmOptions
      );

      expect(
        actual.find(imp => imp.moduleSpecifier === './ComplexDesert.js')
          ?.moduleSpecifier
      ).toBe('./ComplexDesert.js');
    });
  });
});
