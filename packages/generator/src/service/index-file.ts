/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import {
  ExportDeclarationStructure,
  SourceFileStructure,
  StructureKind
} from 'ts-morph';
import { VdmServiceMetadata } from '../vdm-types';
import { hasBatchRequest } from '../generator-utils';

export function indexFile(service: VdmServiceMetadata): SourceFileStructure {
  const basicStatements = [
    ...service.entities.map(entity => exportStatement(entity.className)),
    ...service.entities.map(entity =>
      exportStatement(`${entity.className}RequestBuilder`)
    ),
    ...service.complexTypes.map(complexType =>
      exportStatement(complexType.typeName)
    ),
    ...(service.functionImports && service.functionImports.length
      ? [exportStatement('function-imports')]
      : [])
  ];
  return {
    kind: StructureKind.SourceFile,
    statements: hasBatchRequest(service)
      ? basicStatements.concat(exportStatement('BatchRequest'))
      : basicStatements
  };
}

function exportStatement(moduleName: string): ExportDeclarationStructure {
  return {
    kind: StructureKind.ExportDeclaration,
    moduleSpecifier: `./${moduleName}`
  };
}
