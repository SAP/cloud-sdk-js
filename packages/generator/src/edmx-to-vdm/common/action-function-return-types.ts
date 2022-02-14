import { first } from '@sap-cloud-sdk/util';
import voca from 'voca';
import {
  VdmActionImportReturnType,
  VdmComplexType,
  VdmEntity,
  VdmFunctionImportReturnType,
  VdmReturnTypeCategory,
  VdmUnsupportedReason
} from '../../vdm-types';
import {
  getTypeMappingActionFunction,
  isCollectionType,
  parseTypeName
} from '../edmx-to-vdm-util';
import { EdmxReturnType } from '../../edmx-parser/v4';
import { isNullableProperty } from '../../generator-utils';
import { getApiName } from '../../generator-without-ts-morph/service';
/* eslint-disable valid-jsdoc */

/**
 * @internal
 */
export function parseFunctionImportReturnTypes(
  returnType: EdmxReturnType | undefined,
  entities: VdmEntity[],
  complexTypes: VdmComplexType[],
  extractResponse: ExtractResponse,
  serviceName: string
): VdmFunctionImportReturnType {
  return parseReturnTypes(
    returnType,
    entities,
    complexTypes,
    extractResponse,
    serviceName
  ) as VdmFunctionImportReturnType;
}
/**
 * @internal
 */
export function parseActionImportReturnTypes(
  returnType: EdmxReturnType | undefined,
  entities: VdmEntity[],
  complexTypes: VdmComplexType[],
  extractResponse: ExtractResponse,
  serviceName: string
): VdmActionImportReturnType {
  return parseReturnTypes(
    returnType,
    entities,
    complexTypes,
    extractResponse,
    serviceName
  ) as VdmActionImportReturnType;
}

function parseReturnTypes(
  returnType: EdmxReturnType | undefined,
  entities: VdmEntity[],
  complexTypes: VdmComplexType[],
  extractResponse: ExtractResponse,
  serviceName: string
): VdmFunctionImportReturnType | VdmActionImportReturnType {
  if (!returnType) {
    return getVoidReturnType();
  }

  const isCollection = isCollectionType(returnType.Type);
  const isNullable: boolean =
    typeof returnType === 'undefined' ? false : isNullableProperty(returnType);

  const edmType = findEdmType(returnType.Type);
  if (edmType) {
    return getEdmReturnType(isCollection, isNullable, edmType, extractResponse);
  }

  const filteredEntities = findEntityTypes(returnType.Type, entities);
  if (filteredEntities.length) {
    return getEntityReturnType(
      isCollection,
      isNullable,
      filteredEntities,
      serviceName
    );
  }

  const complexType = findComplexType(returnType.Type, complexTypes);
  if (complexType) {
    return getComplexReturnType(isCollection, isNullable, complexType);
  }

  throw Error(
    `Unable to find a return type for name ${JSON.stringify(returnType)}.`
  );
}

function findEdmType(returnType: string): string | undefined {
  returnType = parseTypeName(returnType);
  if (returnType.startsWith('Edm.')) {
    return returnType;
  }
}

function findEntityTypes(
  returnType: string,
  entities: VdmEntity[]
): VdmEntity[] {
  returnType = parseTypeName(returnType);
  return entities.filter(
    e => `${e.entityTypeNamespace}.${e.entityTypeName}` === returnType
  );
}

function findComplexType(
  returnType: string,
  complexTypes: VdmComplexType[]
): VdmComplexType | undefined {
  returnType = parseTypeName(returnType);
  return complexTypes.find(
    e => `${e.namespace}.${e.originalName}` === returnType
  );
}

function getVoidReturnType(): VdmFunctionImportReturnType {
  return {
    returnTypeCategory: VdmReturnTypeCategory.VOID,
    returnType: 'undefined',
    builderFunction: '(val) => undefined',
    isNullable: false,
    isCollection: false
  };
}

function getEdmReturnType(
  isCollection: boolean,
  isNullable: boolean,
  edmType: string,
  extractResponse: ExtractResponse
): VdmFunctionImportReturnType {
  const typeMapping = getTypeMappingActionFunction(edmType);
  const valueAlias = 'val';
  const extracted = isCollection ? valueAlias : extractResponse(valueAlias);
  return {
    returnTypeCategory: VdmReturnTypeCategory.EDM_TYPE,
    returnType: typeMapping.jsType,
    builderFunction: `(${valueAlias}) => edmToTs(${extracted}, '${typeMapping.edmType}', deSerializers)`,
    isNullable,
    isCollection
  };
}

function getEntityReturnType(
  isCollection: boolean,
  isNullable: boolean,
  entities: VdmEntity[],
  serviceName: string
): VdmFunctionImportReturnType {
  if (!entities.length) {
    throw Error(
      'Could not get entity return type for function import. No matching entity types found.'
    );
  }

  return entities.length === 1
    ? {
        returnTypeCategory: VdmReturnTypeCategory.ENTITY,
        returnType: first(entities)!.className,
        builderFunction: `${voca.decapitalize(
          serviceName
        )}(deSerializers).${getApiName(first(entities)!.className)}`,
        isNullable,
        isCollection
      }
    : {
        returnTypeCategory: VdmReturnTypeCategory.NEVER,
        returnType: 'never',
        isNullable,
        isCollection,
        unsupportedReason: VdmUnsupportedReason.ENTITY_NOT_DESERIALIZABLE
      };
}

function getComplexReturnType(
  isCollection: boolean,
  isNullable: boolean,
  complexType: VdmComplexType
): VdmFunctionImportReturnType {
  return {
    returnTypeCategory: VdmReturnTypeCategory.COMPLEX_TYPE,
    returnType: complexType.typeName,
    builderFunction: `(data) => entityDeserializer(
          deSerializers
        ).deserializeComplexType(data, ${complexType.typeName})`,
    isNullable,
    isCollection
  };
}
/**
 * @internal
 */
export function isEntityNotDeserializable(
  returnType: VdmFunctionImportReturnType
): boolean {
  return (
    returnType.returnTypeCategory === VdmReturnTypeCategory.NEVER &&
    returnType.unsupportedReason ===
      VdmUnsupportedReason.ENTITY_NOT_DESERIALIZABLE
  );
}
/**
 * @internal
 */
export type ExtractResponse = (string) => string;
