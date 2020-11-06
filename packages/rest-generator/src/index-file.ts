import { SourceFileStructure, StructureKind } from 'ts-morph';
export function indexFile(): SourceFileStructure {
  return {
    kind: StructureKind.SourceFile,
    statements: [
      {
        kind: StructureKind.ExportDeclaration,
        moduleSpecifier: './open-api/model'
      }
    ]
  };
}
