import { StructureKind } from 'ts-morph';
import { enumMeal } from '../../test/test-util/data-model';
import { enumTypeSourceFile } from './file';

describe('file', () => {
  it('enumTypeSourceFile', () => {
    const actual = enumTypeSourceFile(enumMeal);

    const enumType = (actual.statements as any[]).filter(
      element => element.kind === StructureKind.Enum
    );

    expect(enumType.length).toBe(1);
  });
});
