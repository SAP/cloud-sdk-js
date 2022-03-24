import {
  ExportDeclarationStructure,
  SourceFileStructure,
  StructureKind
} from 'ts-morph';
import { VdmServiceMetadata } from '../vdm-types';
import { hasEntities } from '../generator-utils';

/**
 * @internal
 */
export function indexFile(service: VdmServiceMetadata): SourceFileStructure {
  return {
    kind: StructureKind.SourceFile,
    statements: [
      ...service.entities.map(entity => exportStatement(entity.className)),
      ...service.entities.map(entity =>
        exportStatement(`${entity.className}Api`)
      ),
      ...service.entities.map(entity =>
        exportStatement(`${entity.className}RequestBuilder`)
      ),
      ...service.complexTypes.map(complexType =>
        exportStatement(complexType.typeName)
      ),
      ...service.enumTypes.map(enumType => exportStatement(enumType.typeName)),
      ...(service.functionImports && service.functionImports.length
        ? [exportStatement('function-imports')]
        : []),
      ...(service.actionImports && service.actionImports.length
        ? [exportStatement('action-imports')]
        : []),
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
