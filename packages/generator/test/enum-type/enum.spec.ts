/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { StructureKind } from 'ts-morph';
import { enumMeal } from '../test-util/data-model';
import { enumTypeClass } from '../../src/enum-type/enum';

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
      name: 'EnumMealType'
    });
  });
});
