import { ImportDeclarationStructure, StructureKind } from 'ts-morph';
import { caps, ODataVersion } from '@sap-cloud-sdk/util';
import {
  coreImportDeclaration,
  corePropertyTypeImportNames,
  externalImportDeclarations
} from '../imports';
import { VdmEntity } from '../vdm-types';

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
    entityImportDeclaration(entity)
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
