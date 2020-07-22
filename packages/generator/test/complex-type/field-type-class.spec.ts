/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { StructureKind } from 'ts-morph';
import { fieldTypeClass } from '../../src/complex-type';
import { complexMeal, complexMealWithDesert } from '../test-util/data-model';

describe('field-type-class', () => {
  it('fieldTypeClass', () => {
    const actual = fieldTypeClass(complexMeal);

    expect(actual).toEqual({
      kind: StructureKind.Class,
      name: 'ComplexMealField<EntityT extends Entity>',
      extends: 'ComplexTypeField<EntityT, ComplexMealType>',
      isExported: true,
      properties: [
        {
          kind: StructureKind.Property,
          name: 'complexity',
          type: 'ComplexTypeStringPropertyField<EntityT>',
          initializer:
            "new ComplexTypeStringPropertyField('Complexity', this, 'Edm.String')",
          docs: [
            "Representation of the [[ComplexMealType.complexity]] property for query construction.\nUse to reference this property in query operations such as 'filter' in the fluent request API."
          ]
        },
        {
          kind: StructureKind.Property,
          name: 'amount',
          type: 'ComplexTypeNumberPropertyField<EntityT>',
          initializer:
            "new ComplexTypeNumberPropertyField('Amount', this, 'Edm.Int16')",
          docs: [
            "Representation of the [[ComplexMealType.amount]] property for query construction.\nUse to reference this property in query operations such as 'filter' in the fluent request API."
          ]
        }
      ],
      docs: [
        'ComplexMealField\n@typeparam EntityT - Type of the entity the complex type field belongs to.'
      ],
      ctors: [
        {
          parameters: [
            {
              name: 'fieldName',
              type: 'string'
            },
            {
              name: 'fieldOf',
              type: 'ConstructorOrField<EntityT, ComplexMealType>'
            }
          ],
          statements: ['super(fieldName, fieldOf, ComplexMealType);'],
          docs: [
            '\nCreates an instance of ComplexMealField.\n\n@param fieldName - Actual name of the field as used in the OData request.\n@param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.'
          ]
        }
      ]
    });
  });

  it('fieldTypeClass with nested complex types', () => {
    const actual = fieldTypeClass(complexMealWithDesert);
    expect(actual).toEqual({
      kind: StructureKind.Class,
      name: 'ComplexMealWithDesertField<EntityT extends Entity>',
      extends: 'ComplexTypeField<EntityT, ComplexMealWithDesertType>',
      isExported: true,
      properties: [
        {
          kind: StructureKind.Property,
          name: 'complexDesert',
          type: 'ComplexDesertField<EntityT>',
          initializer: "new ComplexDesertField('ComplexDesert', this)",
          docs: [
            "Representation of the [[ComplexMealWithDesertType.complexDesert]] property for query construction.\nUse to reference this property in query operations such as 'filter' in the fluent request API."
          ]
        },
        {
          kind: StructureKind.Property,
          name: 'amount',
          type: 'ComplexTypeNumberPropertyField<EntityT>',
          initializer:
            "new ComplexTypeNumberPropertyField('Amount', this, 'Edm.Int16')",
          docs: [
            "Representation of the [[ComplexMealWithDesertType.amount]] property for query construction.\nUse to reference this property in query operations such as 'filter' in the fluent request API."
          ]
        }
      ],
      ctors: [
        {
          parameters: [
            {
              name: 'fieldName',
              type: 'string'
            },
            {
              name: 'fieldOf',
              type: 'ConstructorOrField<EntityT, ComplexMealWithDesertType>'
            }
          ],
          statements: ['super(fieldName, fieldOf, ComplexMealWithDesertType);'],
          docs: [
            '\nCreates an instance of ComplexMealWithDesertField.\n\n@param fieldName - Actual name of the field as used in the OData request.\n@param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.'
          ]
        }
      ],
      docs: [
        'ComplexMealWithDesertField\n@typeparam EntityT - Type of the entity the complex type field belongs to.'
      ]
    });
  });
});
