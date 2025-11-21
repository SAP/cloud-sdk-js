import { unique } from '@sap-cloud-sdk/util';
import { propertyTypeImportNames } from '../../imports';
import { externalImportDeclarations, odataImportDeclaration } from '../imports';
import type {
  Import,
  CreateFileOptions
} from '@sap-cloud-sdk/generator-common/internal';
import type { ODataVersion } from '@sap-cloud-sdk/util';
import type { VdmEntity, VdmProperty } from '../../vdm-types';

/**
 * @internal
 */
export function requestBuilderImportDeclarations(
  entity: VdmEntity,
  oDataVersion: ODataVersion,
  options?: CreateFileOptions
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
    entityImportDeclaration(entity, options),
    ...entityKeyImportDeclaration(entity.keys, options)
  ];
}

/**
 * @internal
 */
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

/**
 * @internal
 */
function entityImportDeclaration(
  entity: VdmEntity,
  options?: CreateFileOptions
): Import {
  const generateESM = options?.generateESM;
  return {
    names: [entity.className],
    moduleIdentifier: generateESM
      ? `./${entity.className}.js`
      : `./${entity.className}`
  };
}

/**
 * @internal
 */
function entityKeyImportDeclaration(
  properties: VdmProperty[],
  options?: CreateFileOptions
): Import[] {
  const generateESM = options?.generateESM;
  return unique(
    properties
      .filter(property => property.isEnum)
      .map(property => property.jsType)
  ).map(type => ({
    names: [type],
    moduleIdentifier: generateESM ? `./${type}.js` : `./${type}`
  }));
}
