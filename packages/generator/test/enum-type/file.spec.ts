/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { StructureKind } from 'ts-morph';
import { enumMeal } from '../test-util/data-model';
import { enumTypeSourceFile } from '../../src/enum-type/file';

describe('file', () => {
  it('enumTypeSourceFile', () => {
    const actual = enumTypeSourceFile(enumMeal);

    const enumType = (actual.statements as any[]).filter(
      element => element.kind === StructureKind.Enum
    );

    expect(enumType.length).toBe(1);
  });
});
