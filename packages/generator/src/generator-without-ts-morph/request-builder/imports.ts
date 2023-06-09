import { Import } from '@sap-cloud-sdk/generator-common/internal';
import { ODataVersion, unique } from '@sap-cloud-sdk/util';
import { propertyTypeImportNames } from '../../imports';
import { VdmEntity, VdmProperty } from '../../vdm-types';
import { externalImportDeclarations, odataImportDeclaration } from '../imports';

/**
 * @internal
 */
export function requestBuilderImportDeclarations(
  entity: VdmEntity,
  oDataVersion: ODataVersion
): Import[] {
  return [
    ...externalImportDeclarations(entity.keys),
    odataImportDeclaration(
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
    'GetAllRequestBuilder'
  ];

  if (entity.creatable) {
    imports.push('CreateRequestBuilder');
  }

  if (entity.keys.length) {
    imports.push('GetByKeyRequestBuilder');

    if (entity.updatable) {
      imports.push('UpdateRequestBuilder');
    }

    if (entity.deletable) {
      imports.push('DeleteRequestBuilder');
    }
  }

  return imports;
}

function entityImportDeclaration(entity: VdmEntity): Import {
  return {
    names: [entity.className],
    moduleIdentifier: `./${entity.className}`
  };
}

function entityKeyImportDeclaration(properties: VdmProperty[]): Import[] {
  return unique(
    properties
      .filter(property => property.isEnum)
      .map(property => property.jsType)
  ).map(type => ({
    names: [type],
    moduleIdentifier: `./${type}`
  }));
}
