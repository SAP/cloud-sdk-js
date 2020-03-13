/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { ImportDeclarationStructure, StructureKind } from 'ts-morph';
import { coreImportDeclaration } from '../imports';
import { VdmServiceMetadata } from '../vdm-types';

export function importBatchDeclarations(service: VdmServiceMetadata): ImportDeclarationStructure[] {
  return [
    coreImportDeclaration([
      'CreateRequestBuilder',
      'DeleteRequestBuilder',
      'GetAllRequestBuilder',
      'GetByKeyRequestBuilder',
      'ODataBatchChangeSet',
      'ODataBatchRequestBuilder',
      'UpdateRequestBuilder'
    ]),
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: './index',
      namedImports: getNamedImports(service)
    }
  ];
}

function getNamedImports(service: VdmServiceMetadata): string[] {
  return service.entities.map(e => e.className);
}
