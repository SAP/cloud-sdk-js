import { unixEOL } from '@sap-cloud-sdk/util';
import { Scope, StructureKind } from 'ts-morph';
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
      name: 'ComplexMealField<EntityT extends EntityV2, NullableT extends boolean = false, SelectableT extends boolean = false>',
      extends:
        'ComplexTypeField<EntityT, ComplexMealType, NullableT, SelectableT>',
      isExported: true,
      properties: [
        {
          kind: StructureKind.Property,
          scope: Scope.Private,
          name: '_fieldBuilder',
          type: 'FieldBuilder<this>',
          initializer: 'new FieldBuilder(this)'
        },
        {
          kind: StructureKind.Property,
          name: 'complexity',
          type: "EdmTypeField<EntityT, 'Edm.String', false, false>",
          initializer:
            "this._fieldBuilder.buildEdmTypeField('Complexity', 'Edm.String', false)",
          docs: [
            `Representation of the [[ComplexMealType.complexity]] property for query construction.${unixEOL}Use to reference this property in query operations such as 'filter' in the fluent request API.`
          ]
        },
        {
          kind: StructureKind.Property,
          name: 'amount',
          type: "OrderableEdmTypeField<EntityT, 'Edm.Int16', false, false>",
          initializer:
            "this._fieldBuilder.buildEdmTypeField('Amount', 'Edm.Int16', false)",
          docs: [
            `Representation of the [[ComplexMealType.amount]] property for query construction.${unixEOL}Use to reference this property in query operations such as 'filter' in the fluent request API.`
          ]
        }
      ],
      docs: [
        `ComplexMealField${unixEOL}@typeparam EntityT - Type of the entity the complex type field belongs to.`
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
            },
            {
              hasQuestionToken: true,
              name: 'fieldOptions',
              type: 'FieldOptions<NullableT, SelectableT>'
            }
          ],
          statements: [
            'super(fieldName, fieldOf, ComplexMealType, fieldOptions);'
          ],
          docs: [
            `${unixEOL}Creates an instance of ComplexMealField.${unixEOL}${unixEOL}@param fieldName - Actual name of the field as used in the OData request.${unixEOL}@param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.`
          ]
        }
      ]
    });
  });

  it('fieldTypeClass with nested complex types', () => {
    const actual = fieldTypeClass(complexMealWithDesert, 'v4');
    expect(actual).toEqual({
      kind: StructureKind.Class,
      name: 'ComplexMealWithDesertField<EntityT extends EntityV4, NullableT extends boolean = false, SelectableT extends boolean = false>',
      extends:
        'ComplexTypeField<EntityT, ComplexMealWithDesertType, NullableT, SelectableT>',
      isExported: true,
      properties: [
        {
          kind: StructureKind.Property,
          scope: Scope.Private,
          type: 'FieldBuilder<this>',
          name: '_fieldBuilder',
          initializer: 'new FieldBuilder(this)'
        },
        {
          kind: StructureKind.Property,
          name: 'complexDesert',
          type: 'ComplexDesertField<EntityT, false, false>',
          initializer:
            "this._fieldBuilder.buildComplexTypeField('ComplexDesert', ComplexDesertField, false)",
          docs: [
            `Representation of the [[ComplexMealWithDesertType.complexDesert]] property for query construction.${unixEOL}Use to reference this property in query operations such as 'filter' in the fluent request API.`
          ]
        },
        {
          kind: StructureKind.Property,
          name: 'amount',
          type: "OrderableEdmTypeField<EntityT, 'Edm.Int16', false, false>",
          initializer:
            "this._fieldBuilder.buildEdmTypeField('Amount', 'Edm.Int16', false)",
          docs: [
            `Representation of the [[ComplexMealWithDesertType.amount]] property for query construction.${unixEOL}Use to reference this property in query operations such as 'filter' in the fluent request API.`
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
            },
            {
              hasQuestionToken: true,
              name: 'fieldOptions',
              type: 'FieldOptions<NullableT, SelectableT>'
            }
          ],
          statements: [
            'super(fieldName, fieldOf, ComplexMealWithDesertType, fieldOptions);'
          ],
          docs: [
            `${unixEOL}Creates an instance of ComplexMealWithDesertField.${unixEOL}${unixEOL}@param fieldName - Actual name of the field as used in the OData request.${unixEOL}@param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.`
          ]
        }
      ],
      docs: [
        'ComplexMealWithDesertField\n@typeparam EntityT - Type of the entity the complex type field belongs to.'
      ]
    });
  });
});
