import { unixEOL } from '@sap-cloud-sdk/util';
import {
  ModuleDeclarationStructure,
  StructureKind,
  VariableDeclarationKind,
  VariableStatementStructure
} from 'ts-morph';
import { VdmComplexType } from '../vdm-types';

/**
 * @internal
 */
export function complexTypeNamespace(
  complexType: VdmComplexType
): ModuleDeclarationStructure {
  return {
    kind: StructureKind.Module,
    name: complexType.typeName,
    isExported: true,
    statements: [propertyMetadata(complexType)]
  };
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
