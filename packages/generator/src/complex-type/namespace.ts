import { unixEOL, caps, ODataVersion, unique } from '@sap-cloud-sdk/util';
import {
  FunctionDeclarationStructure,
  ModuleDeclarationStructure,
  StructureKind,
  VariableDeclarationKind,
  VariableStatementStructure
} from 'ts-morph';
import { VdmComplexType } from '../vdm-types';

export function complexTypeNamespace(
  complexType: VdmComplexType,
  oDataVersion: ODataVersion
): ModuleDeclarationStructure {
  return {
    kind: StructureKind.Module,
    name: complexType.typeName,
    isExported: true,
    statements: [
      propertyMetadata(complexType),
      factoryFunction(complexType, oDataVersion)
    ]
  };
}

function factoryFunction(
  complexType: VdmComplexType,
  oDataVersion: ODataVersion
): FunctionDeclarationStructure {
  return {
    kind: StructureKind.Function,
    name: 'build',
    returnType: complexType.typeName,
    parameters: [{ name: 'json', type: getJsonType(complexType) }],
    statements: `return deserializeComplexType${caps(oDataVersion)}(json, ${
      complexType.typeName
    });`,
    isExported: true,
    docs: [
      `${unixEOL}@deprecated Since v1.25.0. Use \`deserializeComplexTypeV2\` or \`deserializeComplexTypeV4\` of the \`@sap-cloud-sdk/core\` package instead.`
    ]
  };
}

function getJsonType(complexType: VdmComplexType): string {
  const unionOfAllTypes = [
    'FieldType',
    ...unique(
      complexType.properties
        .filter(prop => prop.isComplex)
        .map(prop => prop.jsType)
    ).sort()
  ].join(' | ');

  return `{ [keys: string]: ${unionOfAllTypes} }`;
}

function getPropertyMetadataInitializer(complexType: VdmComplexType): string {
  return `[${complexType.properties
    .map(
      property =>
        `{
        originalName: '${property.originalName}',
        name: '${property.instancePropertyName}',
        type: ${property.isComplex ? property.jsType : `'${property.edmType}'`},
        isCollection: ${property.isCollection}
      }`
    )
    .join(', ')}]`;
}

function propertyMetadata(
  complexType: VdmComplexType
): VariableStatementStructure {
  return {
    kind: StructureKind.VariableStatement,
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: '_propertyMetadata',
        initializer: getPropertyMetadataInitializer(complexType),
        type: `PropertyMetadata<${complexType.typeName}>[]`
      }
    ],
    docs: [
      `${unixEOL}Metadata information on all properties of the \`${complexType.typeName}\` complex type.`
    ],
    isExported: true
  };
}
