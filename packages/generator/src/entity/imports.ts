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

/**
 * @internal
 */
export function entityImportDeclarations(
  entity: VdmEntity,
  service: VdmServiceMetadata,
  oDataVersion: ODataVersion
): ImportDeclarationStructure[] {
  if (oDataVersion === 'v4') {
    return mergeImportDeclarations([
      odataImportDeclarationTsMorph(
        ['Entity', 'DefaultDeSerializers', 'DeSerializers', 'DeserializedType'],
        oDataVersion
      ),
      ...complexTypeImportDeclarations(entity.properties),
      {
        namedImports: [`${entity.className}Api`],
        moduleSpecifier: `./${entity.className}Api`,
        kind: StructureKind.ImportDeclaration,
        isTypeOnly: true
      },
      ...operationDeclarations(service, entity.operations),
      ...enumTypeImportDeclarations(entity.properties)
    ]);
  }

  return [
    odataImportDeclarationTsMorph(
      ['Entity', 'DefaultDeSerializers', 'DeSerializers', 'DeserializedType'],
      oDataVersion
    ),
    ...complexTypeImportDeclarations(entity.properties),
    {
      namedImports: [`${entity.className}Api`],
      moduleSpecifier: `./${entity.className}Api`,
      kind: StructureKind.ImportDeclaration,
      isTypeOnly: true
    },
    ...enumTypeImportDeclarations(entity.properties)
  ];
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
