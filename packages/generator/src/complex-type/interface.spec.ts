import { StructureKind } from 'ts-morph';
import {
  complexMeal,
  complexMealWithDesert
} from '../../test/test-util/data-model';
import { complexTypeInterface } from './interface';

describe('interface', () => {
  it('complexTypeInterface', () => {
    const actual = complexTypeInterface(complexMeal);
    expect(actual).toEqual({
      kind: StructureKind.Interface,
      name: 'ComplexMealType',
      isExported: true,
      properties: [
        {
          kind: StructureKind.PropertySignature,
          name: 'complexity',
          type: 'string',
          hasQuestionToken: false,
          docs: ['\nsomething something very good']
        },
        {
          kind: StructureKind.PropertySignature,
          name: 'amount',
          type: 'number',
          hasQuestionToken: false,
          docs: ['\nsomething something very much']
        }
      ],
      docs: ['\nComplexMealType']
    });
  });

  it('complexTypeInterface with nested complex types', () => {
    const actual = complexTypeInterface(complexMealWithDesert);
    expect(actual).toEqual({
      kind: StructureKind.Interface,
      name: 'ComplexMealWithDesertType',
      isExported: true,
      properties: [
        {
          kind: StructureKind.PropertySignature,
          name: 'complexDesert',
          type: 'ComplexDesert',
          hasQuestionToken: false,
          docs: ['\nthe desert']
        },
        {
          kind: StructureKind.PropertySignature,
          name: 'amount',
          type: 'number',
          hasQuestionToken: false,
          docs: ['\nsomething something very much']
        }
      ],
      docs: ['\nComplexMealWithDesertType']
    });
  });
});
