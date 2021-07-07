import { unixEOL } from '@sap-cloud-sdk/util';
import { StructureKind, VariableDeclarationKind } from 'ts-morph';
import {
  complexMeal,
  complexMealWithDesert
} from '../../test/test-util/data-model';
import { complexTypeNamespace } from './namespace';
describe('namespace', () => {
  it('complexTypeSourceFile', () => {
    const actual = complexTypeNamespace(complexMeal, 'v2');
    expect(actual).toEqual({
      kind: StructureKind.Module,
      name: 'ComplexMealType',
      isExported: true,
      statements: [
        {
          kind: StructureKind.VariableStatement,
          declarationKind: VariableDeclarationKind.Const,
          declarations: [
            {
              name: '_propertyMetadata',
              initializer: `[{
        originalName: 'Complexity',
        name: 'complexity',
        type: 'Edm.String',
        isCollection: false
      }, {
        originalName: 'Amount',
        name: 'amount',
        type: 'Edm.Int16',
        isCollection: false
      }]`,
              type: 'PropertyMetadata<ComplexMealType>[]'
            }
          ],
          docs: [
            `${unixEOL}Metadata information on all properties of the \`ComplexMealType\` complex type.`
          ],
          isExported: true
        },
        {
          kind: StructureKind.Function,
          name: 'build',
          returnType: 'ComplexMealType',
          parameters: [
            {
              name: 'json',
              type: '{ [keys: string]: FieldType }'
            }
          ],
          statements: 'return deserializeComplexTypeV2(json, ComplexMealType);',
          isExported: true,
          docs: [
            `${unixEOL}@deprecated Since v1.25.0. Use \`deserializeComplexTypeV2\` or \`deserializeComplexTypeV4\` of the \`@sap-cloud-sdk/core\` package instead.`
          ]
        }
      ]
    });
  });

  it('should generate a builder when a complex type includes a complex type property', () => {
    const actual = complexTypeNamespace(complexMealWithDesert, 'v4');
    expect(actual).toEqual({
      kind: StructureKind.Module,
      name: 'ComplexMealWithDesertType',
      isExported: true,
      statements: [
        {
          kind: StructureKind.VariableStatement,
          declarationKind: VariableDeclarationKind.Const,
          declarations: [
            {
              name: '_propertyMetadata',
              initializer: `[{
        originalName: 'ComplexDesert',
        name: 'complexDesert',
        type: ComplexDesert,
        isCollection: false
      }, {
        originalName: 'Amount',
        name: 'amount',
        type: 'Edm.Int16',
        isCollection: false
      }]`,
              type: 'PropertyMetadata<ComplexMealWithDesertType>[]'
            }
          ],
          docs: [
            `${unixEOL}Metadata information on all properties of the \`ComplexMealWithDesertType\` complex type.`
          ],
          isExported: true
        },
        {
          kind: StructureKind.Function,
          name: 'build',
          returnType: 'ComplexMealWithDesertType',
          parameters: [
            {
              name: 'json',
              type: '{ [keys: string]: FieldType | ComplexDesert }'
            }
          ],
          statements:
            'return deserializeComplexTypeV4(json, ComplexMealWithDesertType);',
          isExported: true,
          docs: [
            `${unixEOL}@deprecated Since v1.25.0. Use \`deserializeComplexTypeV2\` or \`deserializeComplexTypeV4\` of the \`@sap-cloud-sdk/core\` package instead.`
          ]
        }
      ]
    });
  });
});
