import { ImportDeclarationStructure, StructureKind } from 'ts-morph';
import { caps, ODataVersion, unique } from '@sap-cloud-sdk/util';
import {
  coreImportDeclaration,
  corePropertyTypeImportNames,
  externalImportDeclarations
} from '../imports';
import { VdmEntity, VdmProperty } from '../vdm-types';

export function importDeclarations(
  entity: VdmEntity,
  oDataVersion: ODataVersion
): ImportDeclarationStructure[] {
  return [
    ...externalImportDeclarations(entity.keys),
    coreImportDeclaration([
      ...corePropertyTypeImportNames(entity.keys),
      ...requestBuilderCoreImportDeclarations(entity, oDataVersion)
    ]),
    entityImportDeclaration(entity),
    ...entityKeyImportDeclaration(entity.keys)
  ];
}

function requestBuilderCoreImportDeclarations(
  entity: VdmEntity,
  oDataVersion: ODataVersion
) {
  const versionInCap = caps(oDataVersion);
  const coreImports = [
    'RequestBuilder',
    `GetAllRequestBuilder${versionInCap}`,
    `GetByKeyRequestBuilder${versionInCap}`
  ];

  if (entity.creatable) {
    coreImports.push(`CreateRequestBuilder${versionInCap}`);
  }

  if (entity.updatable) {
    coreImports.push(`UpdateRequestBuilder${versionInCap}`);
  }

  if (entity.deletable) {
    coreImports.push(`DeleteRequestBuilder${versionInCap}`);
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
