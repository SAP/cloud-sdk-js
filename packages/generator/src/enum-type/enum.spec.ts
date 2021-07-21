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
          name: 'member1',
          value: 'member1'
        },
        {
          name: 'member2',
          value: 'member2'
        }
      ],
      name: 'EnumMealType',
      docs: [
        'Enum type: [[EnumMealName]] that reflects all the members in the metadata.\nThe underlying type of this enum is Edm.Int32\nThe value of the enum entries are:\nmember1: 0\nmember2: 1'
      ]
    });
  });
});
