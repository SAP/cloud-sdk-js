import { caps, last, ODataVersion } from '@sap-cloud-sdk/util';
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
  if (entity) {
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
): VdmEntity | undefined {
  returnType = parseTypeName(returnType);
  const entity = entities.find(
    e => `${e.entityTypeNamespace}.${e.entityTypeName}` === returnType
  );
  // TODO 1584 remove this block after testing all the s/4 edmx files
  if (!entity) {
    const parsedReturnType = last(returnType.split('.'));
    return entities.find(e => e.entityTypeName === parsedReturnType);
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
  entity: VdmEntity
): VdmFunctionImportReturnType {
  return {
    returnTypeCategory: VdmReturnTypeCategory.ENTITY,
    returnType: entity.className,
    builderFunction: entity.className,
    isMulti: isCollection,
    isCollection
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
