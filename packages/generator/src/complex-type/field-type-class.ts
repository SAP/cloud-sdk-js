import { unixEOL, caps, ODataVersion } from '@sap-cloud-sdk/util';
import {
  ClassDeclarationStructure,
  PropertyDeclarationStructure,
  Scope,
  StructureKind
} from 'ts-morph';
import { getGenericParameters } from '../generator-utils';
import {
  getComplexTypeFieldDescription,
  getComplexTypePropertyDescription
} from '../typedoc';
import { VdmComplexType, VdmProperty } from '../vdm-types';

export function fieldTypeClass(
  complexType: VdmComplexType,
  oDataVersion: ODataVersion
): ClassDeclarationStructure {
  return {
    kind: StructureKind.Class,
    name: `${complexType.fieldType}<EntityT extends Entity${caps(
      oDataVersion
    )}, NullableT extends boolean = false, SelectableT extends boolean = false>`,
    extends: `ComplexTypeField<EntityT, ${complexType.typeName}, NullableT, SelectableT>`,
    isExported: true,
    properties: [
      {
        kind: StructureKind.Property,
        scope: Scope.Private,
        name: '_fieldBuilder',
        type: 'FieldBuilder<this>',
        initializer: 'new FieldBuilder(this)'
      },
      ...properties(complexType)
    ],
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
          },
          {
            name: 'fieldOptions',
            type: 'FieldOptions<NullableT, SelectableT>',
            hasQuestionToken: true
          }
        ],
        docs: [
          `${unixEOL}Creates an instance of ${complexType.fieldType}.${unixEOL}${unixEOL}@param fieldName - Actual name of the field as used in the OData request.${unixEOL}@param fieldOf - Either the parent entity constructor of the parent complex type this field belongs to.`
        ],
        statements: [
          `super(fieldName, fieldOf, ${complexType.typeName}, fieldOptions);`
        ]
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
    type: `${prop.fieldType}<${getGenericParameters('EntityT', prop, false)}>`,
    initializer: createPropertyFieldInitializer(prop),
    docs: [getComplexTypePropertyDescription(prop, complexType.typeName)]
  };
}

export function createPropertyFieldInitializer(prop: VdmProperty): string {
  if (prop.isCollection) {
    if (prop.isEnum) {
      return `this._fieldBuilder.buildCollectionField('${prop.originalName}', ${prop.jsType}, ${prop.nullable})`;
    }

    if (prop.isComplex) {
      return `this._fieldBuilder.buildCollectionField('${prop.originalName}', ${prop.jsType}, ${prop.nullable})`;
    }

    return `this._fieldBuilder.buildCollectionField('${prop.originalName}', '${prop.edmType}', ${prop.nullable})`;
  }

  if (prop.isComplex) {
    return `this._fieldBuilder.buildComplexTypeField('${prop.originalName}', ${prop.fieldType}, ${prop.nullable})`;
  }

  if (prop.isEnum) {
    return `this._fieldBuilder.buildEnumField('${prop.originalName}', ${prop.jsType}, ${prop.nullable})`;
  }

  return `this._fieldBuilder.buildEdmTypeField('${prop.originalName}', '${prop.edmType}', ${prop.nullable})`;
}
