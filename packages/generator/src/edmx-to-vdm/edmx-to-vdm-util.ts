import { createLogger, last } from '@sap-cloud-sdk/util';
import type { EdmxProperty } from '../edmx-parser/common/edmx-types';
import type { EdmxMetadata } from '../edmx-parser/edmx-file-reader';
import type { EdmxFunctionImportV2 } from '../edmx-parser/v2/edm-types';
import {
  edmToFieldType,
  edmToTsType,
  getFallbackEdmTypeIfNeeded
} from '../generator-utils';
import type {
  VdmComplexType,
  VdmEnumType,
  VdmMappedEdmType
} from '../vdm-types';
import type { EdmxJoinedOperation } from './v4';

const logger = createLogger({
  package: 'generator',
  messageContext: 'edmx-to-vdm-util'
});

/**
 * @internal
 */
export function stripNamespace(name: string): string {
  const nameParts = name.split('.');
  return nameParts[nameParts.length - 1];
}

/**
 * @internal
 */
export function isCollectionType(typeName: string): boolean {
  return collectionRegExp.test(typeName);
}

/**
 * @internal
 */
export function isEdmType(typeName: string): boolean {
  return typeName.startsWith('Edm');
}

/**
 * @internal
 */
export function complexTypeName(type: string): string | undefined {
  return last(type.split('.'));
}

/**
 * @internal
 */
export const collectionRegExp = /Collection\((?<collectionType>.*)\)/;

/**
 * @internal
 */
export function parseTypeName(typeName: string): string {
  return isCollectionType(typeName)
    ? parseCollectionTypeName(typeName)
    : typeName;
}

/**
 * @internal
 */
export function parseCollectionTypeName(typeName: string): string {
  const name = typeName.match(collectionRegExp)?.groups?.collectionType;
  if (!name) {
    throw new Error(`Cannot parse type name ${typeName}.`);
  }
  return name;
}

/**
 * @internal
 */
export function isV2Metadata(metadata: EdmxMetadata): boolean {
  return metadata.oDataVersion === 'v2';
}

/**
 * @internal
 */
export function isComplexTypeOrEnumType(typeName: string): boolean {
  const typeParts = typeName.split('.');
  return typeParts[0] !== 'Edm' && typeParts[1] !== undefined;
}

/**
 * @internal
 */
export function isComplexType(
  name: string,
  complexTypes: VdmComplexType[]
): boolean {
  return isComplexTypeOrEnumType(name)
    ? !!findComplexType(name, complexTypes)
    : false;
}

/**
 * @internal
 */
export function isEnumType(name: string, enumTypes: VdmEnumType[]): boolean {
  return isComplexTypeOrEnumType(name)
    ? !!findEnumType(name, enumTypes)
    : false;
}

/**
 * @internal
 */
export function checkCollectionKind(property: EdmxProperty): void {
  if (property.hasOwnProperty('CollectionKind')) {
    logger.warn(
      `"CollectionKind" attribute found in the "${property.Name}" property. Currently, handling collection of properties is not supported by the generator.`
    );
  }
}

/**
 * @internal
 */
export function complexTypeFieldType(typeName: string): string {
  return typeName + 'Field';
}

/**
 * @internal
 */
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

/**
 * @internal
 */
export function typesForCollection(
  typeName: string,
  enumTypes: VdmEnumType[],
  complexTypes?: VdmComplexType[],
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
    'Types in inside a collection must be either have complex or EDM types.'
  );
}

/**
 * @internal
 */
export const propertyJsType = (type: string): string | undefined =>
  type.startsWith('Edm.') ? edmToTsType(type) : undefined;

/**
 * @internal
 */
export function hasUnsupportedParameterTypes(
  operation: EdmxJoinedOperation | EdmxFunctionImportV2
): boolean {
  const unsupportedParameters = operation.Parameter.filter(
    p => !isEdmType(p.Type)
  );
  if (unsupportedParameters.length) {
    logger.warn(
      [
        `Found unsupported parameter types for function or action '${operation.Name}'.`,
        'The SAP Cloud SDK only supports EDM types in parameters.',
        'Skipping code generation for function/action.',
        `Unsupported parameter types: [${unsupportedParameters
          .map(p => `'${p.Type}'`)
          .join(', ')}].`
      ].join('\n')
    );
    return true;
  }
  return false;
}

const getPostfix = (type: string) => last(type.split('.'));

/**
 * @internal
 */
export const findComplexType = (
  name: string,
  complexTypes: VdmComplexType[]
): VdmComplexType | undefined =>
  complexTypes.find(c => c.originalName === getPostfix(name));

/**
 * @internal
 */
export const findEnumType = (
  name: string,
  enumTypes: VdmEnumType[]
): VdmEnumType | undefined =>
  enumTypes.find(e => e.originalName === getPostfix(name));

/**
 * @internal
 */
export function complexTypeForName(
  name: string,
  complexTypes: VdmComplexType[]
): string {
  const complexType = findComplexType(name, complexTypes);
  if (complexType) {
    return complexType.typeName;
  }
  logger.warn(
    `No complex type mapping found for ${name}! Using "any" instead. This will most likely result in errors.`
  );
  return 'any';
}

/**
 * @internal
 */
export function complexTypeFieldForName(
  name: string,
  complexTypes: VdmComplexType[]
): string {
  const complexType = findComplexType(name, complexTypes);
  if (complexType) {
    return complexTypeFieldType(complexType.typeName);
  }
  logger.warn(
    `No complex type mapping found for ${name}! Using "any" instead. This will most likely result in errors.`
  );
  return 'any';
}

/**
 * @internal
 */
export function enumTypeForName(
  name: string,
  enumTypes: VdmEnumType[]
): string {
  const enumType = findEnumType(name, enumTypes);
  if (enumType) {
    return enumType.typeName;
  }
  logger.warn(
    `No enum type mapping found for ${name}! Using "any" instead. This will most likely result in errors.`
  );
  return 'any';
}
