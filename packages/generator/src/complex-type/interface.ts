import type {
  InterfaceDeclarationStructure,
  PropertySignatureStructure
} from 'ts-morph';
import { StructureKind } from 'ts-morph';
import { getPropertyDescription, addLeadingNewline } from '../typedoc';
import type { VdmComplexType, VdmProperty } from '../vdm-types';

/**
 * @internal
 */
export function complexTypeInterface(
  complexType: VdmComplexType
): InterfaceDeclarationStructure {
  return {
    kind: StructureKind.Interface,
    name: `${complexType.typeName}<DeSerializersT extends DeSerializers = DefaultDeSerializers>`,
    isExported: true,
    properties: properties(complexType),
    docs: [addLeadingNewline(complexType.typeName)]
  };
}

function properties(complexType: VdmComplexType): PropertySignatureStructure[] {
  return complexType.properties.map(prop => property(prop));
}

function property(prop: VdmProperty): PropertySignatureStructure {
  return {
    kind: StructureKind.PropertySignature,
    name: prop.instancePropertyName,
    type: `DeserializedType<DeSerializersT, '${prop.edmType}'>`,
    hasQuestionToken: prop.nullable,
    docs: [
      addLeadingNewline(
        getPropertyDescription(prop, {
          nullable: prop.nullable,
          maxLength: prop.maxLength
        })
      )
    ]
  };
}
