import {
  InterfaceDeclarationStructure,
  PropertySignatureStructure,
  StructureKind
} from 'ts-morph';
import {
  VdmEntity,
  VdmNavigationProperty,
  VdmProperty,
  VdmServiceMetadata
} from '../vdm-types';
import { getPropertyType } from './class';

/**
 * @internal
 */
export function entityTypeInterface(
  entity: VdmEntity,
  service: VdmServiceMetadata
): InterfaceDeclarationStructure {
  return {
    kind: StructureKind.Interface,
    name: `${entity.className}Type<T extends DeSerializers = DefaultDeSerializers>`,
    isExported: true,
    properties: [...properties(entity), ...navProperties(entity, service)]
  };
}

function properties(entity: VdmEntity): PropertySignatureStructure[] {
  return entity.properties.map(prop => property(prop));
}

function property(prop: VdmProperty): PropertySignatureStructure {
  return {
    kind: StructureKind.PropertySignature,
    name: prop.instancePropertyName + (prop.nullable ? '?' : ''),
    type: getPropertyType(prop)
  };
}

function navProperties(
  entity: VdmEntity,
  service: VdmServiceMetadata
): PropertySignatureStructure[] {
  return entity.navigationProperties.map(navProp =>
    navProperty(navProp, service)
  );
}

function navProperty(
  navProp: VdmNavigationProperty,
  service: VdmServiceMetadata
): PropertySignatureStructure {
  const entity = service.entities.find(e => e.entitySetName === navProp.to);
  if (!entity) {
    throw Error(
      `Failed to find the entity from the service: ${JSON.stringify(
        service
      )} for nav property ${navProp}`
    );
  }

  return {
    kind: StructureKind.PropertySignature,
    name: navProp.instancePropertyName + (navProp.isCollection ? '' : '?'),
    type:
      entity.className + 'Type<T>' + (navProp.isCollection ? '[]' : ' | null')
  };
}
