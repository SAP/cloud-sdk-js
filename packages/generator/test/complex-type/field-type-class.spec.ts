import { StructureKind } from 'ts-morph';
import { fieldTypeClass } from '../../src/complex-type';
import { complexMeal, complexMealWithDesert } from '../test-util/data-model';

describe('field-type-class', () => {
  it('fieldTypeClass', () => {
    const actual = fieldTypeClass(complexMeal);

    expect(actual).toEqual({
      kind: StructureKind.Class,
      name: 'ComplexMealField<EntityT extends Entity>',
      extends: 'ComplexTypeField<EntityT>',
      isExported: true,
      properties: [
        {
          kind: StructureKind.Property,
          name: 'complexity',
          type: 'ComplexTypeStringPropertyField<EntityT>',
          initializer: "new ComplexTypeStringPropertyField('Complexity', this._entityConstructor, 'ComplexMeal','Edm.String')",
          docs: [
            "Representation of the [[ComplexMeal.complexity]] property for query construction.\nUse to reference this property in query operations such as 'filter' in the fluent request API."
          ]
        },
        {
          kind: StructureKind.Property,
          name: 'amount',
          type: 'ComplexTypeNumberPropertyField<EntityT>',
          initializer: "new ComplexTypeNumberPropertyField('Amount', this._entityConstructor, 'ComplexMeal','Edm.Int16')",
          docs: [
            "Representation of the [[ComplexMeal.amount]] property for query construction.\nUse to reference this property in query operations such as 'filter' in the fluent request API."
          ]
        }
      ],
      docs: ['ComplexMealField\n@typeparam EntityT Type of the entity the complex type field belongs to.']
    });
  });

  it('fieldTypeClass with nested complex types', () => {
    const actual = fieldTypeClass(complexMealWithDesert);
    expect(actual).toEqual({
      kind: StructureKind.Class,
      name: 'ComplexMealWithDesertField<EntityT extends Entity>',
      extends: 'ComplexTypeField<EntityT>',
      isExported: true,
      properties: [
        {
          kind: StructureKind.Property,
          name: 'complexDesert',
          type: 'ComplexDesertField<EntityT>',
          initializer: "new ComplexDesertField('ComplexDesert', this._entityConstructor, 'ComplexMealWithDesert')",
          docs: [
            "Representation of the [[ComplexMealWithDesert.complexDesert]] property for query construction.\nUse to reference this property in query operations such as 'filter' in the fluent request API."
          ]
        },
        {
          kind: StructureKind.Property,
          name: 'amount',
          type: 'ComplexTypeNumberPropertyField<EntityT>',
          initializer: "new ComplexTypeNumberPropertyField('Amount', this._entityConstructor, 'ComplexMealWithDesert','Edm.Int16')",
          docs: [
            "Representation of the [[ComplexMealWithDesert.amount]] property for query construction.\nUse to reference this property in query operations such as 'filter' in the fluent request API."
          ]
        }
      ],
      docs: ['ComplexMealWithDesertField\n@typeparam EntityT Type of the entity the complex type field belongs to.']
    });
  });
});
