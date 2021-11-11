import { ImportDeclarationStructure, StructureKind } from 'ts-morph';
import { ODataVersion, unique } from '@sap-cloud-sdk/util';
import {
  odataImportDeclaration,
  corePropertyTypeImportNames,
  externalImportDeclarations,
  odataCommonImportDeclaration
} from '../imports';
import { VdmEntity, VdmProperty } from '../vdm-types';
/* eslint-disable valid-jsdoc */

/**
 * @internal
 */
export function importDeclarations(
  entity: VdmEntity,
  oDataVersion: ODataVersion
): ImportDeclarationStructure[] {
  return [
    ...externalImportDeclarations(entity.keys),
    odataCommonImportDeclaration([
      'RequestBuilder',
      ...corePropertyTypeImportNames(entity.keys)
    ]),
    odataImportDeclaration(
      requestBuilderCoreImportDeclarations(entity),
      oDataVersion
    ),
    entityImportDeclaration(entity),
    ...entityKeyImportDeclaration(entity.keys)
  ];
}

function requestBuilderCoreImportDeclarations(entity: VdmEntity) {
  const coreImports = ['GetAllRequestBuilder', 'GetByKeyRequestBuilder'];

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

function entityKeyImportDeclaration(
  properties: VdmProperty[]
): ImportDeclarationStructure[] {
  return unique(
    properties
      .filter(property => property.isEnum)
      .map(property => property.jsType)
  ).map(type => ({
    kind: StructureKind.ImportDeclaration,
    namedImports: [type],
    moduleSpecifier: `./${type}`
  }));
}
