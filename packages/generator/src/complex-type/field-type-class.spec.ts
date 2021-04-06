import { EOL } from 'os';
import { StructureKind } from 'ts-morph';
import {
  complexMeal,
  complexMealWithDesert
} from '../../test/test-util/data-model';
import { fieldTypeClass } from './field-type-class';

describe('field-type-class', () => {
  it('fieldTypeClass', () => {
    const actual = fieldTypeClass(complexMeal, 'v2');

    expect(actual).toEqual({
      kind: StructureKind.Class,
      name: 'ComplexMealField<EntityT extends EntityV2>',
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
            `Representation of the [[ComplexMealType.complexity]] property for query construction.${EOL}Use to reference this property in query operations such as 'filter' in the fluent request API.`
          ]
        },
        {
          kind: StructureKind.Property,
          name: 'amount',
          type: 'ComplexTypeNumberPropertyField<EntityT>',
          initializer:
            "new ComplexTypeNumberPropertyField('Amount', this, 'Edm.Int16')",
          docs: [
            `Representation of the [[ComplexMealType.amount]] property for query construction.${EOL}Use to reference this property in query operations such as 'filter' in the fluent request API.`
          ]
        }
      ],
      docs: [
        `ComplexMealField${EOL}@typeparam EntityT - Type of the entity the complex type field belongs to.`
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
              type: 'ConstructorOrField<EntityT>'
            }
          ],
          statements: ['super(fieldName, fieldOf, ComplexMealType);'],
          docs: [
            `${EOL}Creates an instance of ComplexMealField.${EOL}${EOL}@param fieldName - Actual name of the field as used in the OData request.${EOL}@param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.`
          ]
        }
      ]
    });
  });

  it('fieldTypeClass with nested complex types', () => {
    const actual = fieldTypeClass(complexMealWithDesert, 'v4');
    expect(actual).toEqual({
      kind: StructureKind.Class,
      name: 'ComplexMealWithDesertField<EntityT extends EntityV4>',
      extends: 'ComplexTypeField<EntityT, ComplexMealWithDesertType>',
      isExported: true,
      properties: [
        {
          kind: StructureKind.Property,
          name: 'complexDesert',
          type: 'ComplexDesertField<EntityT>',
          initializer: "new ComplexDesertField('ComplexDesert', this)",
          docs: [
            `Representation of the [[ComplexMealWithDesertType.complexDesert]] property for query construction.${EOL}Use to reference this property in query operations such as 'filter' in the fluent request API.`
          ]
        },
        {
          kind: StructureKind.Property,
          name: 'amount',
          type: 'ComplexTypeNumberPropertyField<EntityT>',
          initializer:
            "new ComplexTypeNumberPropertyField('Amount', this, 'Edm.Int16')",
          docs: [
            `Representation of the [[ComplexMealWithDesertType.amount]] property for query construction.${EOL}Use to reference this property in query operations such as 'filter' in the fluent request API.`
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
              type: 'ConstructorOrField<EntityT>'
            }
          ],
          statements: ['super(fieldName, fieldOf, ComplexMealWithDesertType);'],
          docs: [
            `${EOL}Creates an instance of ComplexMealWithDesertField.${EOL}${EOL}@param fieldName - Actual name of the field as used in the OData request.${EOL}@param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.`
          ]
        }
      ],
      docs: [
        'ComplexMealWithDesertField\n@typeparam EntityT - Type of the entity the complex type field belongs to.'
      ]
    });
  });
});
