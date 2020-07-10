/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import {
  ExportDeclarationStructure,
  SourceFileStructure,
  StructureKind
} from 'ts-morph';
import { VdmServiceMetadata } from '../vdm-types';

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
      ...(service.functionImports && service.functionImports.length
        ? [exportStatement('function-imports')]
        : []),
      exportStatement('BatchRequest')
    ]
  };
}

function exportStatement(moduleName: string): ExportDeclarationStructure {
  return {
    kind: StructureKind.ExportDeclaration,
    moduleSpecifier: `./${moduleName}`
  };
}
