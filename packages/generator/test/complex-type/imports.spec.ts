import { StructureKind } from 'ts-morph';
import { importDeclarations } from '../../src/complex-type';
import { VdmComplexType } from '../../src/vdm-types';
import { complexMeal, complexMealWithDesert } from '../test-util/data-model';

describe('complex type imports', () => {
  it('importDeclarations', () => {
    const actual = importDeclarations(complexMeal);
    expect(actual).toEqual([
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: '@sap-cloud-sdk/core',
        namedImports: [
          'ComplexTypeField',
          'ComplexTypeNumberPropertyField',
          'ComplexTypeStringPropertyField',
          'Entity',
          'FieldType',
          'createComplexType',
          'edmToTs'
        ]
      }
    ]);
  });

  it('importDeclarations for a complex type that includes a complex type', () => {
    const actual = importDeclarations(complexMealWithDesert);
    expect(actual).toEqual([
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: './ComplexDesert',
        namedImports: ['ComplexDesert', 'ComplexDesertField']
      },
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: '@sap-cloud-sdk/core',
        namedImports: ['ComplexTypeField', 'ComplexTypeNumberPropertyField', 'Entity', 'FieldType', 'createComplexType', 'edmToTs']
      }
    ]);
  });

  it('importDeclarations for a complex type that includes a complex type and no property with an edm type', () => {
    //  We test here the use-case where a complex type includes only complex type properties `edmToTs`. The only deviation with the previous test, is that the 'edmToTs' function should not be imported from core.

    const complexMealWithDesertWithoutEdmProperty: VdmComplexType = {
      ...complexMealWithDesert,
      ...{ properties: [complexMealWithDesert.properties[0]] }
    };
    const actual = importDeclarations(complexMealWithDesertWithoutEdmProperty);
    expect(actual).toEqual([
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: './ComplexDesert',
        namedImports: ['ComplexDesert', 'ComplexDesertField']
      },
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: '@sap-cloud-sdk/core',
        namedImports: ['ComplexTypeField', 'Entity', 'createComplexType']
      }
    ]);
  });
});
