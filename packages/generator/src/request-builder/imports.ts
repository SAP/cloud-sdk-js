import { ImportDeclarationStructure, StructureKind } from 'ts-morph';
import { ODataVersion, unique } from '@sap-cloud-sdk/util';
import {
  odataImportDeclaration,
  propertyTypeImportNames,
  externalImportDeclarations,
  odataCommonImportDeclaration
} from '../imports';
import { VdmEntity, VdmProperty } from '../vdm-types';

// eslint-disable-next-line valid-jsdoc
/**
 * @internal
 */
export function requestBuilderImportDeclarations(
  entity: VdmEntity,
  oDataVersion: ODataVersion
): ImportDeclarationStructure[] {
  return [
    ...externalImportDeclarations(entity.keys),
    odataCommonImportDeclaration([
      'DeserializedType',
      ...propertyTypeImportNames(entity.keys)
    ]),
    odataImportDeclaration(requestBuilderImports(entity), oDataVersion),
    odataImportDeclaration(['RequestBuilder'], oDataVersion, true),
    entityImportDeclaration(entity),
    ...entityKeyImportDeclaration(entity.keys)
  ];
}

function requestBuilderImports(entity: VdmEntity) {
  const imports = [
    'DefaultDeSerializers',
    'DeSerializers',
    'GetAllRequestBuilder',
    'GetByKeyRequestBuilder'
  ];

  if (entity.creatable) {
    imports.push('CreateRequestBuilder');
  }

  if (entity.updatable) {
    imports.push('UpdateRequestBuilder');
  }

  if (entity.deletable) {
    imports.push('DeleteRequestBuilder');
  }

  return imports;
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
