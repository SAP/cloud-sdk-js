/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

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

export function entityTypeInterface(
  entity: VdmEntity,
  service: VdmServiceMetadata
): InterfaceDeclarationStructure {
  return {
    kind: StructureKind.Interface,
    name: `${entity.className}Type`,
    isExported: true,
    properties: [...properties(entity), ...navPoperties(entity, service)]
  };
}

export function entityTypeForceMandatoryInterface(
  entity: VdmEntity,
  service: VdmServiceMetadata
): InterfaceDeclarationStructure {
  return {
    kind: StructureKind.Interface,
    name: `${entity.className}TypeForceMandatory`,
    isExported: true,
    properties: [
      ...propertiesForceMandatory(entity),
      ...navPoperties(entity, service)
    ]
  };
}

function properties(entity: VdmEntity): PropertySignatureStructure[] {
  return entity.properties.map(prop => property(prop));
}

function propertiesForceMandatory(
  entity: VdmEntity
): PropertySignatureStructure[] {
  return entity.properties.map(prop => propertyForceMandatory(prop));
}

function property(prop: VdmProperty): PropertySignatureStructure {
  return {
    kind: StructureKind.PropertySignature,
    name: prop.instancePropertyName + (prop.nullable ? '?' : ''),
    type: prop.jsType
  };
}

function propertyForceMandatory(prop: VdmProperty): PropertySignatureStructure {
  return {
    kind: StructureKind.PropertySignature,
    name: prop.instancePropertyName,
    type: prop.jsType
  };
}

function navPoperties(
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
    name: navProp.instancePropertyName,
    type: entity.className + 'Type' + (navProp.isMultiLink ? '[]' : '')
  };
}
