import { unixEOL, caps, ODataVersion } from '@sap-cloud-sdk/util';
import {
  ClassDeclarationStructure,
  PropertyDeclarationStructure,
  StructureKind
} from 'ts-morph';
import {
  getComplexTypeFieldDescription,
  getComplexTypePropertyDescription
} from '../typedoc';
import { VdmComplexType, VdmProperty } from '../vdm-types';
import {
  getGenericParameters,
  createPropertyFieldInitializer
} from '../generator-utils';

export function fieldTypeClass(
  complexType: VdmComplexType,
  oDataVersion: ODataVersion
): ClassDeclarationStructure {
  return {
    kind: StructureKind.Class,
    name: `${complexType.fieldType}<EntityT extends Entity${caps(
      oDataVersion
    )}>`,
    extends: `ComplexTypeField<EntityT, ${complexType.typeName}>`,
    isExported: true,
    properties: properties(complexType),
    docs: [getComplexTypeFieldDescription(complexType)],
    ctors: [
      {
        parameters: [
          {
            name: 'fieldName',
            type: 'string'
          },
          {
            name: 'fieldOf',
            type: 'ConstructorOrField<EntityT>'
          }
        ],
        docs: [
          `${unixEOL}Creates an instance of ${complexType.fieldType}.${unixEOL}${unixEOL}@param fieldName - Actual name of the field as used in the OData request.${unixEOL}@param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.`
        ],
        statements: [`super(fieldName, fieldOf, ${complexType.typeName});`]
      }
    ]
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
    type: `${prop.fieldType}<${getGenericParameters('EntityT', prop)}>`,
    initializer: createPropertyFieldInitializer(prop, 'this'),
    docs: [getComplexTypePropertyDescription(prop, complexType.typeName)]
  };
}
