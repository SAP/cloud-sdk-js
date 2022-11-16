import { StructureKind } from 'ts-morph';
import { breakfastEntity, foodService } from '../../test/test-util/data-model';
import { entitySourceFile } from './file';

describe('file', () => {
  it('entitySourceFile bundles entity components correctly', () => {
    const actual = entitySourceFile(breakfastEntity, foodService);

    const imports = (actual.statements as any[]).filter(
      element => element.kind === StructureKind.ImportDeclaration
    );

    expect(imports.map(i => i.moduleSpecifier)).toEqual([
      '@sap-cloud-sdk/odata-v2',
      './BreakfastApi',
      './Brunch'
    ]);

    const entities = (actual.statements as any[]).filter(
      element => element.kind === StructureKind.Class
    );

    expect(entities.length).toBe(1);

    const interfaces = (actual.statements as any[]).filter(
      element => element.kind === StructureKind.Interface
    );
    // One interface for the entity and one for each bound operation (methods)
    expect(interfaces.length).toBe(1 + entities[0].methods.length);

    const namespaces = (actual.statements as any[]).filter(
      element => element.kind === StructureKind.Module
    );

    expect(namespaces.length).toBe(0);
  });
});
