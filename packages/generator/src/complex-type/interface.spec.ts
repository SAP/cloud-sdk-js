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
      name: 'ComplexMealType<DeSerializersT extends DeSerializers = DefaultDeSerializers>',
      isExported: true,
      properties: [
        {
          kind: StructureKind.PropertySignature,
          name: 'complexity',
          type: "DeserializedType<DeSerializersT, 'Edm.String'>",
          hasQuestionToken: false,
          docs: ['\nsomething something very good']
        },
        {
          kind: StructureKind.PropertySignature,
          name: 'amount',
          type: "DeserializedType<DeSerializersT, 'Edm.Int16'>",
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
      name: 'ComplexMealWithDesertType<DeSerializersT extends DeSerializers = DefaultDeSerializers>',
      isExported: true,
      properties: [
        {
          kind: StructureKind.PropertySignature,
          name: 'complexDesert',
          type: "DeserializedType<DeSerializersT, 'ComplexDesert'>",
          hasQuestionToken: false,
          docs: ['\nthe desert']
        },
        {
          kind: StructureKind.PropertySignature,
          name: 'amount',
          type: "DeserializedType<DeSerializersT, 'Edm.Int16'>",
          hasQuestionToken: false,
          docs: ['\nsomething something very much']
        }
      ],
      docs: ['\nComplexMealWithDesertType']
    });
  });
});
