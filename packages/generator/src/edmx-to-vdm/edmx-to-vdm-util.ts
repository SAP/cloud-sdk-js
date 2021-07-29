import { createLogger, last } from '@sap-cloud-sdk/util';
import { EdmxMetadata } from '../edmx-parser/edmx-file-reader';
import { EdmxProperty } from '../edmx-parser/common';
import {
  edmToFieldType,
  edmToTsType,
  getFallbackEdmTypeIfNeeded
} from '../generator-utils';
import { VdmComplexType, VdmEnumType, VdmMappedEdmType } from '../vdm-types';
import { EdmxAction, EdmxFunction } from '../edmx-parser/v4';
import { EdmxFunctionImport } from '../edmx-parser/v2';
import {
  complexTypeForName,
  enumTypeForName,
  findComplexType,
  findEnumType
} from './common';

const logger = createLogger({
  package: 'generator',
  messageContext: 'edmx-to-vdm-util'
});

export function stripNamespace(name: string): string {
  const nameParts = name.split('.');
  return nameParts[nameParts.length - 1];
}

export function isCollectionType(typeName: string): boolean {
  return collectionRegExp.test(typeName);
}

export function isEdmType(typeName: string): boolean {
  return typeName.startsWith('Edm');
}

export function complexTypeName(type: string): string | undefined {
  return last(type.split('.'));
}

export const collectionRegExp = /Collection\((?<collectionType>.*)\)/;

/**
 * @deprecated since version 1.27.0. Use [[isEdmType]] and [[complexTypeName]] if you want to extract type names of non Edm types.
 * @param typeName Name of the edm type for example "Edm.String" or "Namespace.ComplexType"
 * @returns the typename input for Edm types e.g. "Edm.String" or the type without the namesapce.
 */
export function parseType(typeName: string): string {
  return typeName.startsWith('Edm')
    ? typeName
    : typeName.split('.')[typeName.split('.').length - 1];
}

export function parseTypeName(typeName: string): string {
  return isCollectionType(typeName)
    ? parseCollectionTypeName(typeName)
    : typeName;
}

export function parseCollectionTypeName(typeName: string): string {
  const name = typeName.match(collectionRegExp)?.groups?.collectionType;
  if (!name) {
    throw new Error(`Cannot parse type name ${typeName}.`);
  }
  return name;
}

export function isV2Metadata(metadata: EdmxMetadata): boolean {
  return metadata.oDataVersion === 'v2';
}

export function isComplexTypeOrEnumType(typeName: string): boolean {
  const typeParts = typeName.split('.');
  return typeParts[0] !== 'Edm' && typeParts[1] !== undefined;
}

export function isComplexType(
  name: string,
  complexTypes: Omit<VdmComplexType, 'factoryName'>[]
): boolean {
  return isComplexTypeOrEnumType(name)
    ? !!findComplexType(name, complexTypes)
    : false;
}

export function isEnumType(name: string, enumTypes: VdmEnumType[]): boolean {
  return isComplexTypeOrEnumType(name)
    ? !!findEnumType(name, enumTypes)
    : false;
}

export function checkCollectionKind(property: EdmxProperty): void {
  if (property.hasOwnProperty('CollectionKind')) {
    logger.warn(
      `"CollectionKind" attribute found in the "${property.Name}" property. Currently, handling collection of properties is not supported by the generator.`
    );
  }
}

export function complexTypeFieldType(typeName: string): string {
  return typeName + 'Field';
}

export function getTypeMappingActionFunction(
  typeName: string
): VdmMappedEdmType {
  if (isEdmType(typeName)) {
    const edmType = getFallbackEdmTypeIfNeeded(typeName);
    return {
      edmType,
      jsType: edmToTsType(edmType),
      fieldType: edmToFieldType(edmType)
    };
  }
  throw new Error(
    `Could not get a action/function parameter. '${typeName}' is not an EDM type.`
  );
}

export function typesForCollection(
  typeName: string,
  enumTypes: VdmEnumType[],
  complexTypes?: Omit<VdmComplexType, 'factoryName'>[],
  formattedTypes?: Record<string, any>
): VdmMappedEdmType {
  const typeInsideCollection = parseCollectionTypeName(typeName);
  if (isEdmType(typeInsideCollection)) {
    const typeEdm = getFallbackEdmTypeIfNeeded(typeInsideCollection);
    return {
      edmType: typeEdm,
      jsType: edmToTsType(typeEdm),
      fieldType: 'CollectionField'
    };
  }
  if (isComplexTypeOrEnumType(typeInsideCollection)) {
    if (isEnumType(typeInsideCollection, enumTypes)) {
      return {
        edmType: 'Edm.Enum',
        jsType: enumTypeForName(typeInsideCollection, enumTypes),
        fieldType: 'CollectionField'
      };
    }
    const typeComplex =
      complexTypeName(typeInsideCollection) || typeInsideCollection;
    return {
      edmType: typeInsideCollection,
      jsType: complexTypes
        ? complexTypeForName(typeInsideCollection, complexTypes)
        : formattedTypes![typeComplex],
      fieldType: 'CollectionField'
    };
  }
  throw new Error(
    'Types in inside a collection must be either have complex or edm types'
  );
}

export const propertyJsType = (type: string): string | undefined =>
  type.startsWith('Edm.') ? edmToTsType(type) : undefined;

export function hasUnsupportedParameterTypes(
  functionOrAction: EdmxAction | EdmxFunction | EdmxFunctionImport
): boolean {
  const unsupportedParameters = functionOrAction.Parameter.filter(
    p => !isEdmType(p.Type)
  );
  if (unsupportedParameters.length) {
    logger.warn(
      [
        `Found unsupported function or action import parameter types for action '${functionOrAction.Name}'.`,
        'The SAP Cloud SDK only supports EDM types in parameters.',
        'Skipping code generation for function/action import.',
        `Unsupported parameter types: [${unsupportedParameters
          .map(p => `'${p.Type}'`)
          .join(', ')}].`
      ].join('\n')
    );
    return true;
  }
  return false;
}
