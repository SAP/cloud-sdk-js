/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import {
  VdmActionImportReturnType,
  VdmComplexType,
  VdmEntity,
  VdmFunctionImportReturnType,
  VdmReturnTypeCategory
} from '../../vdm-types';
import {
  isCollectionType,
  parseTypeName,
  propertyJsType
} from '../edmx-to-vdm-util';

export function parseFunctionImportReturnTypes(
  returnType: string | undefined,
  entities: VdmEntity[],
  complexTypes: Omit<VdmComplexType, 'factoryName'>[]
): VdmFunctionImportReturnType {
  return parseReturnTypes(
    returnType,
    entities,
    complexTypes
  ) as VdmFunctionImportReturnType;
}

export function parseActionImportReturnTypes(
  returnType: string | undefined,
  entities: VdmEntity[],
  complexTypes: Omit<VdmComplexType, 'factoryName'>[]
): VdmActionImportReturnType {
  return parseReturnTypes(
    returnType,
    entities,
    complexTypes
  ) as VdmActionImportReturnType;
}

function parseReturnTypes(
  returnType: string | undefined,
  entities: VdmEntity[],
  complexTypes: Omit<VdmComplexType, 'factoryName'>[]
): VdmFunctionImportReturnType | VdmActionImportReturnType {
  if (!returnType) {
    return getVoidReturnType();
  }

  const isCollection = isCollectionType(returnType);
  const edmType = findEdmType(returnType);
  if (edmType) {
    return getEdmReturnType(isCollection, edmType);
  }

  const entity = findEntityType(returnType, entities);
  if (entity) {
    return getEntityReturnType(isCollection, entity);
  }

  const complexType = findComplexType(returnType, complexTypes);
  if (complexType) {
    return getComplexReturnType(isCollection, complexType);
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
  entites: VdmEntity[]
): VdmEntity | undefined {
  returnType = parseTypeName(returnType);
  const parsedReturnType = returnType.split('.').slice(-1)[0];
  return entites.find(e => e.entityTypeName === parsedReturnType);
}

function findComplexType(
  returnType: string,
  complexTypes: Omit<VdmComplexType, 'factoryName'>[]
): Omit<VdmComplexType, 'factoryName'> | undefined {
  returnType = parseTypeName(returnType);
  const parsedReturnType = returnType.split('.').slice(-1)[0];
  return complexTypes.find(c => c.originalName === parsedReturnType);
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
  edmType: string
): VdmFunctionImportReturnType {
  return {
    returnTypeCategory: VdmReturnTypeCategory.EDM_TYPE,
    returnType: propertyJsType(edmType)!,
    builderFunction: `(val) => edmToTs(val, '${edmType}')`,
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
  complexType: Omit<VdmComplexType, 'factoryName'>
): VdmFunctionImportReturnType {
  return {
    returnTypeCategory: VdmReturnTypeCategory.COMPLEX_TYPE,
    returnType: complexType.typeName,
    builderFunction: `(data) => deserializeComplexType(data, ${complexType.typeName})`,
    isMulti: isCollection,
    isCollection
  };
}
