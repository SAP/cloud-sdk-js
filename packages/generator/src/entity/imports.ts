import { ImportDeclarationStructure, StructureKind } from 'ts-morph';
import { caps, ODataVersion } from '@sap-cloud-sdk/util';
import {
  complexTypeImportDeclarations,
  coreImportDeclaration,
  coreNavPropertyFieldTypeImportNames,
  corePropertyFieldTypeImportNames,
  corePropertyTypeImportNames,
  enumTypeImportDeclarations,
  externalImportDeclarations
} from '../imports';
import { VdmEntity, VdmServiceMetadata } from '../vdm-types';

export function importDeclarations(
  entity: VdmEntity,
  oDataVersion: ODataVersion
): ImportDeclarationStructure[] {
  const versionInCap = caps(oDataVersion);
  return [
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `./${entity.className}RequestBuilder`,
      namedImports: [`${entity.className}RequestBuilder`]
    },
    ...externalImportDeclarations(entity.properties),
    ...complexTypeImportDeclarations(entity.properties),
    ...enumTypeImportDeclarations(entity.properties),
    coreImportDeclaration(
      [
        ...corePropertyTypeImportNames(entity.properties),
        ...corePropertyFieldTypeImportNames(entity.properties),
        ...coreNavPropertyFieldTypeImportNames(
          entity.navigationProperties,
          oDataVersion
        ),
        'AllFields',
        'Constructable',
        `CustomField${versionInCap}`,
        `Entity${versionInCap}`,
        'EntityBuilderType',
        'FieldBuilder',
        'Field'
      ].sort()
    )
  ];
}

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
