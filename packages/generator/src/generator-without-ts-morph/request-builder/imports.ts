import { unique } from '@sap-cloud-sdk/util';
import { propertyTypeImportNames } from '../../imports';
import { externalImportDeclarations, odataImportDeclaration } from '../imports';
import type { Import } from '@sap-cloud-sdk/generator-common/internal';
import type { ODataVersion } from '@sap-cloud-sdk/util';
import type { VdmEntity, VdmProperty } from '../../vdm-types';

/**
 * @internal
 */
export function requestBuilderImportDeclarations(
  entity: VdmEntity,
  oDataVersion: ODataVersion,
  generateESM?: boolean
): Import[] {
  return [
    ...externalImportDeclarations(entity.keys),
    odataImportDeclaration(
      [
        ...requestBuilderImports(entity),
        'DeserializedType',
        'RequestBuilder',
        ...propertyTypeImportNames(entity.keys)
      ].sort(),
      oDataVersion
    ),
    entityImportDeclaration(entity, generateESM),
    ...entityKeyImportDeclaration(entity.keys, generateESM)
  ];
}

export function requestBuilderImports(entity: VdmEntity): string[] {
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

function entityImportDeclaration(entity: VdmEntity, generateESM?: boolean): Import {
  return {
    names: [entity.className],
    moduleIdentifier: generateESM ? `./${entity.className}.js` : `./${entity.className}`
  };
}

function entityKeyImportDeclaration(properties: VdmProperty[], generateESM?: boolean): Import[] {
  return unique(
    properties
      .filter(property => property.isEnum)
      .map(property => property.jsType)
  ).map(type => ({
    names: [type],
    moduleIdentifier: generateESM ? `./${type}.js` : `./${type}`
  }));
}
