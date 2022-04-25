import { StructureKind } from 'ts-morph';
import { enumMeal } from '../../test/test-util/data-model';
import { enumTypeClass } from './enum';

describe('enum', () => {
  it('enumTypeClass', () => {
    const actual = enumTypeClass(enumMeal);
    expect(actual).toEqual({
      isExported: true,
      kind: StructureKind.Enum,
      members: [
        {
          docs: ['\nOriginal value: 0'],
          name: 'member1',
          value: 'member1'
        },
        {
          docs: ['\nOriginal value: 1'],
          name: 'member2',
          value: 'member2'
        }
      ],
      name: 'EnumMealType',
      docs: [
        'This enum represents the enum type "[[EnumMealName]]".\nThe members represent values of EDM type Edm.Int32.'
      ]
    });
  });
});
