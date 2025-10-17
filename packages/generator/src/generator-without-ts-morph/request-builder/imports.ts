import { unique } from '@sap-cloud-sdk/util';
import { propertyTypeImportNames } from '../../imports';
import { externalImportDeclarations, odataImportDeclaration } from '../imports';
import type { CreateFileOptions, Import } from '@sap-cloud-sdk/generator-common/internal';
import type { ODataVersion } from '@sap-cloud-sdk/util';
import type { VdmEntity, VdmProperty } from '../../vdm-types';
import { ImportDeclarationStructure, StructureKind } from 'ts-morph';

/**
 * @internal
 */
export function requestBuilderImportDeclarations(
  entity: VdmEntity,
  oDataVersion: ODataVersion,
  options?: CreateFileOptions
): ImportDeclarationStructure[] {
  return [
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: options?.generateESM ? `./${entity.className}.js` : `./${entity.className}`,
      namedImports: [entity.className]
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `@sap-cloud-sdk/odata-${oDataVersion}`,
      namedImports: ['RequestBuilder']
    }
  ];
}



function entityImportDeclaration(entity: VdmEntity, options?: CreateFileOptions): Import {
  return {
    names: [entity.className],
    moduleIdentifier: options?.generateESM ? `./${entity.className}.js` : `./${entity.className}`
  };
}

/**
 * @internal
 */
export function requestBuilderImports(
  entity: VdmEntity,
  oDataVersion: ODataVersion,
  options?: CreateFileOptions
): Import[] {
  const imports = [
    entityImportDeclaration(entity, options),
    {
      names: ['RequestBuilder'],
      moduleIdentifier: `@sap-cloud-sdk/odata-${oDataVersion}`
    },
    {
      names: requestBuilderClassImports(entity),
      moduleIdentifier: `@sap-cloud-sdk/odata-${oDataVersion}`
    }
  ];

  const enumImports = entityKeyImportDeclaration(entity.keys, options);
  return [...imports, ...enumImports];
}

function requestBuilderClassImports(entity: VdmEntity): string[] {
  const imports = [
    'DefaultDeSerializers',
    'DeSerializers',
    'GetAllRequestBuilder'
  ];

  if (entity.creatable) {
    imports.push('CreateRequestBuilder');
  }

  if (entity.keys.length) {
    imports.push('GetByKeyRequestBuilder', 'DeserializedType');

    if (entity.updatable) {
      imports.push('UpdateRequestBuilder');
    }

    if (entity.deletable) {
      imports.push('DeleteRequestBuilder');
    }
  }

  return imports;
}

function entityKeyImportDeclaration(properties: VdmProperty[], options?: CreateFileOptions): Import[] {
  return unique(
    properties
      .filter(property => property.isEnum)
      .map(property => property.jsType)
  ).map(type => ({
    names: [type],
    moduleIdentifier: options?.generateESM ? `./${type}.js` : `./${type}`
  }));
}
