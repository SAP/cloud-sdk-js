/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import {
  InterfaceDeclarationStructure,
  PropertySignatureStructure,
  StructureKind
} from 'ts-morph';
import { getPropertyDescription, makeBlockComment } from '../typedoc';
import { VdmComplexType, VdmProperty } from '../vdm-types';

export function complexTypeInterface(
  complexType: VdmComplexType
): InterfaceDeclarationStructure {
  return {
    kind: StructureKind.Interface,
    name: complexType.typeName,
    isExported: true,
    properties: properties(complexType),
    docs: [makeBlockComment(complexType.typeName)]
  };
}

function properties(complexType: VdmComplexType): PropertySignatureStructure[] {
  return complexType.properties.map(prop => property(prop));
}

function property(prop: VdmProperty): PropertySignatureStructure {
  return {
    kind: StructureKind.PropertySignature,
    name: prop.instancePropertyName,
    type: prop.jsType,
    hasQuestionToken: prop.nullable,
    docs: [
      getPropertyDescription(prop, {
        nullable: prop.nullable,
        maxLength: prop.maxLength
      })
    ]
  };
}
