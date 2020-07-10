/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { ImportDeclarationStructure, StructureKind } from 'ts-morph';
import { ODataVersion } from '@sap-cloud-sdk/util';
import {
  coreImportDeclaration,
  corePropertyTypeImportNames,
  externalImportDeclarations
} from '../imports';
import { VdmEntity } from '../edmx-to-vdm/vdm-types';

export function importDeclarations(
  entity: VdmEntity,
  oDataVersion: ODataVersion
): ImportDeclarationStructure[] {
  return [
    ...externalImportDeclarations(entity.keys),
    coreImportDeclaration(
      [
        ...corePropertyTypeImportNames(entity.keys),
        ...requestBuilderCoreImportDeclarations(entity)
      ],
      oDataVersion
    ),
    entityImportDeclaration(entity)
  ];
}

function requestBuilderCoreImportDeclarations(entity: VdmEntity) {
  const coreImports = [
    'RequestBuilder',
    'GetAllRequestBuilder',
    'GetByKeyRequestBuilder'
  ];

  if (entity.creatable) {
    coreImports.push('CreateRequestBuilder');
  }

  if (entity.updatable) {
    coreImports.push('UpdateRequestBuilder');
  }

  if (entity.deletable) {
    coreImports.push('DeleteRequestBuilder');
  }

  return coreImports;
}

function entityImportDeclaration(
  entity: VdmEntity
): ImportDeclarationStructure {
  return {
    kind: StructureKind.ImportDeclaration,
    namedImports: [entity.className],
    moduleSpecifier: `./${entity.className}`
  };
}
