import { Import } from '@sap-cloud-sdk/generator-common/internal';
import { ODataVersion, unique } from '@sap-cloud-sdk/util';
import {
  externalImportDeclarations2,
  odataImportDeclaration2, propertyTypeImportNames
} from '../imports';
import { VdmEntity, VdmProperty } from '../vdm-types';

/**
 * @internal
 */
export function requestBuilderImportDeclarations(
  entity: VdmEntity,
  oDataVersion: ODataVersion
): Import[] {
  return [
    ...externalImportDeclarations2(entity.keys),
    odataImportDeclaration2(
      [
        ...requestBuilderImports(entity),
        'DeserializedType',
        'RequestBuilder',
        ...propertyTypeImportNames(entity.keys)
      ],
      oDataVersion
    ),
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
): Import {
  return {
    names: [entity.className],
    moduleIdentifier: `./${entity.className}`
  };
}

function entityKeyImportDeclaration(
  properties: VdmProperty[]
): Import[] {
  return unique(
    properties
      .filter(property => property.isEnum)
      .map(property => property.jsType)
  ).map(type => ({
    names: [type],
    moduleIdentifier: `./${type}`
  }));
}
