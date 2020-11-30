import { StructureKind } from 'ts-morph';
import { breakfastEntity } from '../../test/test-util/data-model';
import { requestBuilderSourceFile } from './file';

describe('imports', () => {
  it('importDeclarations', () => {
    const actual = requestBuilderSourceFile(breakfastEntity, 'v2');
    expect(actual.kind).toBe(StructureKind.SourceFile);

    const imports = (actual.statements as any[]).filter(
      element => element.kind === StructureKind.ImportDeclaration
    );
    expect(imports.length).toBe(2);

    const classes = (actual.statements as any[]).filter(
      element => element.kind === StructureKind.Class
    );
    expect(classes.length).toBe(1);
  });
});
