import { StructureKind } from 'ts-morph';
import { breakfastEntity, foodService } from '../../test/test-util/data-model';
import { entitySourceFile } from './file';

describe('file', () => {
  it('entitySourceFile bundles entity components correctly', () => {
    const actual = entitySourceFile(breakfastEntity, foodService);

    const imports = (actual.statements as any[]).filter(
      element => element.kind === StructureKind.ImportDeclaration
    );

    expect(imports.length).toBe(4);

    const entities = (actual.statements as any[]).filter(
      element => element.kind === StructureKind.Class
    );

    expect(entities.length).toBe(1);

    const interfaces = (actual.statements as any[]).filter(
      element => element.kind === StructureKind.Interface
    );

    expect(interfaces.length).toBe(1);

    const namespaces = (actual.statements as any[]).filter(
      element => element.kind === StructureKind.Module
    );

    expect(namespaces.length).toBe(1);
  });
});
