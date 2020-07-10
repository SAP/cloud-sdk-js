/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import {
  ClassDeclarationStructure,
  PropertyDeclarationStructure,
  StructureKind
} from 'ts-morph';
import {
  getComplexTypeFieldDescription,
  getComplexTypePropertyDescription
} from '../typedoc';
import { VdmComplexType, VdmProperty } from '../service-vdm/vdm-types';

export function fieldTypeClass(
  complexType: VdmComplexType
): ClassDeclarationStructure {
  return {
    kind: StructureKind.Class,
    name: `${complexType.fieldType}<EntityT extends Entity>`,
    extends: 'ComplexTypeField<EntityT>',
    isExported: true,
    properties: properties(complexType),
    docs: [getComplexTypeFieldDescription(complexType)]
  };
}

function properties(
  complexType: VdmComplexType
): PropertyDeclarationStructure[] {
  return complexType.properties.map((prop: VdmProperty) =>
    property(prop, complexType)
  );
}

function property(
  prop: VdmProperty,
  complexType: VdmComplexType
): PropertyDeclarationStructure {
  return {
    kind: StructureKind.Property,
    name: prop.instancePropertyName,
    type: `${prop.fieldType}<EntityT>`,
    initializer: getInitializer(prop, complexType),
    docs: [getComplexTypePropertyDescription(prop, complexType.typeName)]
  };
}

// If the property is complex, we initialize the static helper with ComplexTypeField (requires only 2 parameters), otherwise we assign an Edm field constructor.
// Keep in mind that the this pointer is the surrounding or parent field
function getInitializer(
  prop: VdmProperty,
  complexType: VdmComplexType
): string {
  return prop.isComplex
    ? `new ${prop.fieldType}('${prop.originalName}', this)`
    : `new ${prop.fieldType}('${prop.originalName}', this, '${prop.edmType}')`;
}
