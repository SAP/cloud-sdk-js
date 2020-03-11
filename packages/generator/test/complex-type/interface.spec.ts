import { StructureKind } from 'ts-morph';
import { complexTypeInterface } from '../../src/complex-type';
import { complexMeal, complexMealWithDesert } from '../test-util/data-model';

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
          docs: ['something something very good']
        },
        { kind: StructureKind.PropertySignature, name: 'amount', type: 'number', hasQuestionToken: false, docs: ['something something very much'] }
      ],
      docs: ['ComplexMealType']
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
          docs: ['the desert']
        },
        { kind: StructureKind.PropertySignature, name: 'amount', type: 'number', hasQuestionToken: false, docs: ['something something very much'] }
      ],
      docs: ['ComplexMealWithDesertType']
    });
  });
});
