import { caps, first, last, ODataVersion } from '@sap-cloud-sdk/util';
import {
  VdmActionImportReturnType,
  VdmComplexType,
  VdmEntity,
  VdmFunctionImportReturnType,
  VdmReturnTypeCategory
} from '../../vdm-types';
import {
  getTypeMappingActionFunction,
  isCollectionType,
  parseTypeName
} from '../edmx-to-vdm-util';

export function parseFunctionImportReturnTypes(
  returnType: string | undefined,
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
  returnType: string | undefined,
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
  returnType: string | undefined,
  entities: VdmEntity[],
  complexTypes: Omit<VdmComplexType, 'factoryName'>[],
  extractResponse: ExtractResponse,
  oDataVersion: ODataVersion
): VdmFunctionImportReturnType | VdmActionImportReturnType {
  if (!returnType) {
    return getVoidReturnType();
  }

  const isCollection = isCollectionType(returnType);
  const edmType = findEdmType(returnType);
  if (edmType) {
    return getEdmReturnType(
      isCollection,
      edmType,
      extractResponse,
      oDataVersion
    );
  }

  const entity = findEntityType(returnType, entities);
  if (entity.length) {
    return getEntityReturnType(isCollection, entity);
  }

  const complexType = findComplexType(returnType, complexTypes);
  if (complexType) {
    return getComplexReturnType(isCollection, complexType, oDataVersion);
  }

  throw Error(`Unable to find a return type for name ${returnType}.`);
}

function findEdmType(returnType: string): string | undefined {
  returnType = parseTypeName(returnType);
  if (returnType.startsWith('Edm.')) {
    return returnType;
  }
}

function findEntityType(
  returnType: string,
  entities: VdmEntity[]
): VdmEntity[] {
  returnType = parseTypeName(returnType);
  const entity = entities.filter(
    e => `${e.entityTypeNamespace}.${e.entityTypeName}` === returnType
  );
  // TODO 1584 remove this block after testing all the s/4 edmx files
  if (entity.length) {
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
    isCollection: false
  };
}

function getEdmReturnType(
  isCollection: boolean,
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
    isCollection
  };
}

function getEntityReturnType(
  isCollection: boolean,
  entities: VdmEntity[]
): VdmFunctionImportReturnType {
  if (!entities.length) {
    throw Error('Cannot get entity return type from an empty collection.');
  }

  return entities.length === 1
    ? {
        returnTypeCategory: VdmReturnTypeCategory.ENTITY,
        returnType: first(entities)!.className,
        builderFunction: first(entities)!.className,
        isMulti: isCollection,
        isCollection
      }
    : {
        returnTypeCategory: VdmReturnTypeCategory.ENTITY_NOT_DESERIALIZABLE,
        returnType: 'any',
        builderFunction: '',
        isMulti: false,
        isCollection: false
      };
}

function getComplexReturnType(
  isCollection: boolean,
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
    isCollection
  };
}

export type ExtractResponse = (string) => string;
