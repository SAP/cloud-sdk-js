import { caps, first, last, ODataVersion } from '@sap-cloud-sdk/util';
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

export function parseFunctionImportReturnTypes(
  returnType: EdmxReturnType | undefined,
  entities: VdmEntity[],
  complexTypes: Omit<VdmComplexType, 'factoryName'>[],
  extractResponse: ExtractResponse,
  oDataVersion: ODataVersion
): VdmFunctionImportReturnType {
  return parseReturnTypes(
    returnType,
    entities,
    complexTypes,
    extractResponse,
    oDataVersion
  ) as VdmFunctionImportReturnType;
}

export function parseActionImportReturnTypes(
  returnType: EdmxReturnType | undefined,
  entities: VdmEntity[],
  complexTypes: Omit<VdmComplexType, 'factoryName'>[],
  extractResponse: ExtractResponse,
  oDataVersion: ODataVersion
): VdmActionImportReturnType {
  return parseReturnTypes(
    returnType,
    entities,
    complexTypes,
    extractResponse,
    oDataVersion
  ) as VdmActionImportReturnType;
}

function parseReturnTypes(
  returnType: EdmxReturnType | undefined,
  entities: VdmEntity[],
  complexTypes: Omit<VdmComplexType, 'factoryName'>[],
  extractResponse: ExtractResponse,
  oDataVersion: ODataVersion
): VdmFunctionImportReturnType | VdmActionImportReturnType {
  if (!returnType) {
    return getVoidReturnType();
  }

  const isCollection = isCollectionType(returnType.Type);
  const isNullable: boolean =
    typeof returnType === 'undefined' ? false : isNullableProperty(returnType);

  const edmType = findEdmType(returnType.Type);
  if (edmType) {
    return getEdmReturnType(
      isCollection,
      isNullable,
      edmType,
      extractResponse,
      oDataVersion
    );
  }

  const filteredEntities = findEntityTypes(returnType.Type, entities);
  if (filteredEntities.length) {
    return getEntityReturnType(isCollection, isNullable, filteredEntities);
  }

  const complexType = findComplexType(returnType.Type, complexTypes);
  if (complexType) {
    return getComplexReturnType(
      isCollection,
      isNullable,
      complexType,
      oDataVersion
    );
  }

  throw Error(`Unable to find a return type for name ${returnType}.`);
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
  const entity = entities.filter(
    e => `${e.entityTypeNamespace}.${e.entityTypeName}` === returnType
  );
  // TODO 1584 remove this block after testing all the s/4 edmx files
  if (!entity.length) {
    const parsedReturnType = last(returnType.split('.'));
    return entities.filter(e => e.entityTypeName === parsedReturnType);
  }
  return entity;
}

function findComplexType(
  returnType: string,
  complexTypes: Omit<VdmComplexType, 'factoryName'>[]
): Omit<VdmComplexType, 'factoryName'> | undefined {
  returnType = parseTypeName(returnType);
  const complexType = complexTypes.find(
    e => `${e.namespace}.${e.originalName}` === returnType
  );
  // TODO 1584 remove this block after testing all the s/4 edmx files
  if (!complexType) {
    const parsedReturnType = last(returnType.split('.'));
    return complexTypes.find(c => c.originalName === parsedReturnType);
  }
  return complexType;
}

function getVoidReturnType(): VdmFunctionImportReturnType {
  return {
    returnTypeCategory: VdmReturnTypeCategory.VOID,
    returnType: 'undefined',
    builderFunction: '(val) => undefined',
    isMulti: false,
    isNullable: false,
    isCollection: false
  };
}

function getEdmReturnType(
  isCollection: boolean,
  isNullable: boolean,
  edmType: string,
  extractResponse: ExtractResponse,
  oDataVersion: ODataVersion
): VdmFunctionImportReturnType {
  const typeMapping = getTypeMappingActionFunction(edmType);
  const valueAlias = 'val';
  const extracted = isCollection ? valueAlias : extractResponse(valueAlias);
  return {
    returnTypeCategory: VdmReturnTypeCategory.EDM_TYPE,
    returnType: typeMapping.jsType,
    builderFunction: `(${valueAlias}) => edmToTs${caps(
      oDataVersion
    )}(${extracted}, '${typeMapping.edmType}')`,
    isMulti: isCollection,
    isNullable,
    isCollection
  };
}

function getEntityReturnType(
  isCollection: boolean,
  isNullable: boolean,
  entities: VdmEntity[]
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
        builderFunction: first(entities)!.className,
        isMulti: isCollection,
        isNullable,
        isCollection
      }
    : {
        returnTypeCategory: VdmReturnTypeCategory.NEVER,
        returnType: 'never',
        isMulti: isCollection,
        isNullable,
        isCollection,
        unsupportedReason: VdmUnsupportedReason.ENTITY_NOT_DESERIALIZABLE
      };
}

function getComplexReturnType(
  isCollection: boolean,
  isNullable: boolean,
  complexType: Omit<VdmComplexType, 'factoryName'>,
  oDataVersion: ODataVersion
): VdmFunctionImportReturnType {
  return {
    returnTypeCategory: VdmReturnTypeCategory.COMPLEX_TYPE,
    returnType: complexType.typeName,
    builderFunction: `(data) => deserializeComplexType${caps(
      oDataVersion
    )}(data, ${complexType.typeName})`,
    isMulti: isCollection,
    isNullable,
    isCollection
  };
}

export function isEntityNotDeserializable(
  returnType: VdmFunctionImportReturnType
): boolean {
  return (
    returnType.returnTypeCategory === VdmReturnTypeCategory.NEVER &&
    returnType.unsupportedReason ===
      VdmUnsupportedReason.ENTITY_NOT_DESERIALIZABLE
  );
}

export type ExtractResponse = (string) => string;
