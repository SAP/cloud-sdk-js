import { StructureKind } from 'ts-morph';
import { requestBuilderSourceFile } from '../../src/request-builder';
import { breakfastEntity } from '../test-util/data-model';

describe('imports', () => {
  it('importDeclarations', () => {
    const actual = requestBuilderSourceFile(breakfastEntity);
    expect(actual.kind).toBe(StructureKind.SourceFile);

    const imports = (actual.statements as any[]).filter(element => element.kind === StructureKind.ImportDeclaration);
    expect(imports.length).toBe(2);

    const classes = (actual.statements as any[]).filter(element => element.kind === StructureKind.Class);
    expect(classes.length).toBe(1);
  });
});
