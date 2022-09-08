import { unixEOL } from '@sap-cloud-sdk/util';
import { Scope, StructureKind } from 'ts-morph';
import {
  complexMeal,
  complexMealWithDesert
} from '../../test/test-util/data-model';
import { fieldTypeClass } from './field-type-class';

describe('field-type-class', () => {
  it('fieldTypeClass', () => {
    const actual = fieldTypeClass(complexMeal);

    expect(actual).toEqual({
      kind: StructureKind.Class,
      name: 'ComplexMealField<EntityT extends Entity, DeSerializersT extends DeSerializers = DefaultDeSerializers, NullableT extends boolean = false, SelectableT extends boolean = false>',
      extends:
        'ComplexTypeField<EntityT, DeSerializersT, ComplexMealType, NullableT, SelectableT>',
      isExported: true,
      properties: [
        {
          kind: StructureKind.Property,
          scope: Scope.Private,
          name: '_fieldBuilder',
          type: 'FieldBuilder<this, DeSerializersT>',
          initializer: 'new FieldBuilder(this, this.deSerializers)'
        },
        {
          kind: StructureKind.Property,
          name: 'complexity',
          type: "OrderableEdmTypeField<EntityT, DeSerializersT, 'Edm.String', false, false>",
          initializer:
            "this._fieldBuilder.buildEdmTypeField('Complexity', 'Edm.String', false)",
          docs: [
            `Representation of the {@link ComplexMealType.complexity} property for query construction.${unixEOL}Use to reference this property in query operations such as 'filter' in the fluent request API.`
          ]
        },
        {
          kind: StructureKind.Property,
          name: 'amount',
          type: "OrderableEdmTypeField<EntityT, DeSerializersT, 'Edm.Int16', false, false>",
          initializer:
            "this._fieldBuilder.buildEdmTypeField('Amount', 'Edm.Int16', false)",
          docs: [
            `Representation of the {@link ComplexMealType.amount} property for query construction.${unixEOL}Use to reference this property in query operations such as 'filter' in the fluent request API.`
          ]
        }
      ],
      docs: [
        `ComplexMealField${unixEOL}@typeParam EntityT - Type of the entity the complex type field belongs to.`
      ],
      ctors: [
        {
          docs: [
            '\nCreates an instance of ComplexMealField.\n@param fieldName - Actual name of the field as used in the OData request.\n@param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.'
          ],
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
              name: 'deSerializers',
              type: 'DeSerializersT'
            },
            {
              hasQuestionToken: true,
              name: 'fieldOptions',
              type: 'FieldOptions<NullableT, SelectableT>'
            }
          ],
          statements: [
            'super(fieldName, fieldOf, deSerializers, ComplexMealType, fieldOptions);'
          ]
        }
      ]
    });
  });

  it('fieldTypeClass with nested complex types', () => {
    const actual = fieldTypeClass(complexMealWithDesert);
    expect(actual).toEqual({
      ctors: [
        {
          docs: [
            '\nCreates an instance of ComplexMealWithDesertField.\n@param fieldName - Actual name of the field as used in the OData request.\n@param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.'
          ],
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
              name: 'deSerializers',
              type: 'DeSerializersT'
            },
            {
              hasQuestionToken: true,
              name: 'fieldOptions',
              type: 'FieldOptions<NullableT, SelectableT>'
            }
          ],
          statements: [
            'super(fieldName, fieldOf, deSerializers, ComplexMealWithDesertType, fieldOptions);'
          ]
        }
      ],
      docs: [
        'ComplexMealWithDesertField\n@typeParam EntityT - Type of the entity the complex type field belongs to.'
      ],
      extends:
        'ComplexTypeField<EntityT, DeSerializersT, ComplexMealWithDesertType, NullableT, SelectableT>',
      isExported: true,
      kind: 2,
      name: 'ComplexMealWithDesertField<EntityT extends Entity, DeSerializersT extends DeSerializers = DefaultDeSerializers, NullableT extends boolean = false, SelectableT extends boolean = false>',
      properties: [
        {
          initializer: 'new FieldBuilder(this, this.deSerializers)',
          kind: 31,
          name: '_fieldBuilder',
          scope: 'private',
          type: 'FieldBuilder<this, DeSerializersT>'
        },
        {
          docs: [
            "Representation of the {@link ComplexMealWithDesertType.complexDesert} property for query construction.\nUse to reference this property in query operations such as 'filter' in the fluent request API."
          ],
          initializer:
            "this._fieldBuilder.buildComplexTypeField('ComplexDesert', ComplexDesertField, false)",
          kind: 31,
          name: 'complexDesert',
          type: 'ComplexDesertField<EntityT, DeSerializersT, false, false>'
        },
        {
          docs: [
            "Representation of the {@link ComplexMealWithDesertType.amount} property for query construction.\nUse to reference this property in query operations such as 'filter' in the fluent request API."
          ],
          initializer:
            "this._fieldBuilder.buildEdmTypeField('Amount', 'Edm.Int16', false)",
          kind: 31,
          name: 'amount',
          type: "OrderableEdmTypeField<EntityT, DeSerializersT, 'Edm.Int16', false, false>"
        }
      ]
    });
  });
});
