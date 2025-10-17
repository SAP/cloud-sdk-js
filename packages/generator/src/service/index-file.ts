import { StructureKind } from 'ts-morph';
import { hasEntities } from '../generator-utils';
import type { ExportDeclarationStructure, SourceFileStructure } from 'ts-morph';
import type { VdmServiceMetadata } from '../vdm-types';
import type { CreateFileOptions } from '@sap-cloud-sdk/generator-common/internal';

/**
 * @internal
 */
export function indexFile(
  service: VdmServiceMetadata,
  options?: CreateFileOptions
): SourceFileStructure {
  return {
    kind: StructureKind.SourceFile,
    statements: [
      ...service.entities.map(entity => exportStatement(entity.className, options)),
      ...service.entities.map(entity =>
        exportStatement(`${entity.className}RequestBuilder`, options)
      ),
      ...service.complexTypes.map(complexType =>
        exportStatement(complexType.typeName, options)
      ),
      ...service.enumTypes.map(enumType => exportStatement(enumType.typeName, options)),
      ...(service.operations.length ? [exportStatement('operations', options)] : []),
      ...(hasEntities(service) ? [exportStatement('BatchRequest', options)] : []),
      exportStatement('service', options)
    ]
  };
}

function exportStatement(
  moduleName: string,
  options?: CreateFileOptions
): ExportDeclarationStructure {
  return {
    kind: StructureKind.ExportDeclaration,
    moduleSpecifier: options?.generateESM ? `./${moduleName}.js` : `./${moduleName}`
  };
}
