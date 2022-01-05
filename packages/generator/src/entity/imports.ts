import { ImportDeclarationStructure, StructureKind } from 'ts-morph';
import { ODataVersion } from '@sap-cloud-sdk/util';
import {
  complexTypeImportDeclarations,
  odataImportDeclaration,
  enumTypeImportDeclarations
} from '../imports';
import { VdmEntity, VdmServiceMetadata } from '../vdm-types';
/* eslint-disable valid-jsdoc */

/**
 * @internal
 */
export function entityImportDeclarations(
  entity: VdmEntity,
  oDataVersion: ODataVersion
): ImportDeclarationStructure[] {
  return [
    odataImportDeclaration(
      ['Entity', 'DefaultDeSerializers', 'DeSerializers', 'DeserializedType'],
      oDataVersion
    ),
    ...complexTypeImportDeclarations(entity.properties),
    ...enumTypeImportDeclarations(entity.properties)
  ].sort();
}
/**
 * @internal
 */
export function otherEntityImports(
  entity: VdmEntity,
  service: VdmServiceMetadata
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
    .map(name => otherEntityImport(name));
}

function otherEntityImport(name: string): ImportDeclarationStructure {
  return {
    kind: StructureKind.ImportDeclaration,
    namedImports: [name, `${name}Type`],
    moduleSpecifier: `./${name}`
  };
}
