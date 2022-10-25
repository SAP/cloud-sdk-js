import { ODataVersion } from '@sap-cloud-sdk/util';
import { ImportDeclarationStructure, StructureKind } from 'ts-morph';
import { importDeclarationsAction, importDeclarationsFunction } from '../action-function-import';
import {
  complexTypeImportDeclarations, enumTypeImportDeclarations, odataImportDeclaration
} from '../imports';
import { VdmEntity, VdmServiceMetadata } from '../vdm-types';

/**
 * @internal
 */
export function entityImportDeclarations(
  entity: VdmEntity,
  service: VdmServiceMetadata,
  oDataVersion: ODataVersion
): ImportDeclarationStructure[] {
  if (oDataVersion === 'v4') {
    return [
      odataImportDeclaration(
        [
          'Entity',
          'DefaultDeSerializers',
          'DeSerializers',
          'DeserializedType',
          'entityDeserializer',
          'BoundActionRequestBuilder',
          'transformReturnValueForComplexType',
          'defaultDeSerializers',
          'BoundFunctionRequestBuilder',
          'FunctionImportParameter',
          'ActionImportParameter'
        ],
        oDataVersion
      ),
      ...complexTypeImportDeclarations(entity.properties),
      {
        namedImports: [`${entity.className}Api`],
        moduleSpecifier: `./${entity.className}Api`,
        kind: StructureKind.ImportDeclaration,
        isTypeOnly: true
      },
      ...importDeclarationsAction(service, entity.actions), //fixme(fwilhe) need to filter here
      ...importDeclarationsFunction(service, entity.functions),
      ...enumTypeImportDeclarations(entity.properties)
    ];
  }
  return [
    odataImportDeclaration(
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
  .filter(name => name !== entity.className).map(name => otherEntityImport(name));
}

function otherEntityImport(name: string): ImportDeclarationStructure {
  return {
    kind: StructureKind.ImportDeclaration,
    namedImports: [name, `${name}Type`],
    moduleSpecifier: `./${name}`
  };
}
