import { StructureKind } from 'ts-morph';
import { hasEntities } from '../generator-utils';
import type { ExportDeclarationStructure, SourceFileStructure } from 'ts-morph';
import type { VdmServiceMetadata } from '../vdm-types';

/**
 * @internal
 */
export function indexFile(service: VdmServiceMetadata): SourceFileStructure {
  return {
    kind: StructureKind.SourceFile,
    statements: [
      ...service.entities.map(entity => exportStatement(entity.className)),
      ...service.entities.map(entity =>
        exportStatement(`${entity.className}RequestBuilder`)
      ),
      ...service.complexTypes.map(complexType =>
        exportStatement(complexType.typeName)
      ),
      ...service.enumTypes.map(enumType => exportStatement(enumType.typeName)),
      ...(service.operations.length ? [exportStatement('operations')] : []),
      ...(hasEntities(service) ? [exportStatement('BatchRequest')] : []),
      exportStatement('service')
    ]
  };
}

function exportStatement(moduleName: string): ExportDeclarationStructure {
  return {
    kind: StructureKind.ExportDeclaration,
    moduleSpecifier: `./${moduleName}`
  };
}
