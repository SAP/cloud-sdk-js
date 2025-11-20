import { StructureKind } from 'ts-morph';
import {
  complexTypeImportDeclarations,
  enumTypeImportDeclarations,
  mergeImportDeclarations,
  odataImportDeclarationTsMorph
} from '../imports';
import { operationDeclarations } from '../operations';
import type { ImportDeclarationStructure } from 'ts-morph';
import type { ODataVersion } from '@sap-cloud-sdk/util';
import type { VdmEntity, VdmServiceMetadata } from '../vdm-types';
import type { CreateFileOptions } from '@sap-cloud-sdk/generator-common/internal';

/**
 * @internal
 */
export function entityImportDeclarations(
  entity: VdmEntity,
  service: VdmServiceMetadata,
  oDataVersion: ODataVersion,
  options?: CreateFileOptions
): ImportDeclarationStructure[] {
  if (oDataVersion === 'v4') {
    return mergeImportDeclarations([
      odataImportDeclarationTsMorph(
        ['Entity', 'DefaultDeSerializers', 'DeSerializers', 'DeserializedType'],
        oDataVersion
      ),
      ...complexTypeImportDeclarations(entity.properties, options),
      {
        namedImports: [`${entity.className}Api`],
        moduleSpecifier: options?.generateESM
          ? `./${entity.className}Api.js`
          : `./${entity.className}Api`,
        kind: StructureKind.ImportDeclaration,
        isTypeOnly: true
      },
      ...operationDeclarations(service, entity.operations),
      ...enumTypeImportDeclarations(entity.properties, options)
    ]);
  }

  return [
    odataImportDeclarationTsMorph(
      ['Entity', 'DefaultDeSerializers', 'DeSerializers', 'DeserializedType'],
      oDataVersion
    ),
    ...complexTypeImportDeclarations(entity.properties, options),
    {
      namedImports: [`${entity.className}Api`],
      moduleSpecifier: options?.generateESM
        ? `./${entity.className}Api.js`
        : `./${entity.className}Api`,
      kind: StructureKind.ImportDeclaration,
      isTypeOnly: true
    },
    ...enumTypeImportDeclarations(entity.properties, options)
  ];
}
/**
 * @internal
 */
export function otherEntityImports(
  entity: VdmEntity,
  service: VdmServiceMetadata,
  options?: CreateFileOptions
): ImportDeclarationStructure[] {
  return Array.from(new Set(entity.navigationProperties.map(n => n.to)))
    .map(to => {
      const matchedEntity = service.entities.find(e => e.entitySetName === to);
      if (!matchedEntity) {
        throw Error(
          `Failed to find the entity from the service: ${JSON.stringify(
            service
          )} for entity ${entity}`
        );
      }
      return matchedEntity.className;
    })
    .filter(name => name !== entity.className)
    .map(name => otherEntityImport(name, options));
}

function otherEntityImport(
  name: string,
  options?: CreateFileOptions
): ImportDeclarationStructure {
  return {
    kind: StructureKind.ImportDeclaration,
    namedImports: [name, `${name}Type`],
    moduleSpecifier: options?.generateESM ? `./${name}.js` : `./${name}`
  };
}
