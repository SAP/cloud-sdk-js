import { first } from '@sap-cloud-sdk/util';
import voca from 'voca';
import { EdmxReturnType } from '../../edmx-parser/v4';
import { isNullableProperty } from '../../generator-utils';
import { getApiName } from '../../generator-without-ts-morph/service';
import {
  VdmComplexType,
  VdmPartialEntity,
  VdmOperationReturnType
} from '../../vdm-types';
import {
  getTypeMappingActionFunction,
  isCollectionType,
  parseTypeName
} from '../edmx-to-vdm-util';

/**
 * @internal
 */
export function parseOperationReturnType(
  returnType: EdmxReturnType | undefined,
  entities: VdmPartialEntity[],
  complexTypes: VdmComplexType[],
  extractResponse: ExtractResponse,
  serviceName: string,
  isBound: boolean
): VdmOperationReturnType {
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
    `Unable to find a return type for name ${JSON.stringify(
      returnType
    )} in entities ${entities
      .map(e => `${e.entityTypeNamespace}.${e.entityTypeName}`)
      .join(', ')}.`
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
  entities: VdmPartialEntity[]
): VdmPartialEntity[] {
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
    ({ namespace, originalName }) =>
      `${namespace}.${originalName}` === returnType
  );
}

function getVoidReturnType(): VdmOperationReturnType {
  return {
    returnTypeCategory: 'void',
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
): VdmOperationReturnType {
  const typeMapping = getTypeMappingActionFunction(edmType);
  const valueAlias = 'val';
  const extracted = isCollection ? valueAlias : extractResponse(valueAlias);
  return {
    returnTypeCategory: 'edm-type',
    returnType: typeMapping.jsType,
    builderFunction: `(${valueAlias}) => edmToTs(${extracted}, '${typeMapping.edmType}', deSerializers)`,
    isNullable,
    isCollection
  };
}

function getEntityReturnType(
  isCollection: boolean,
  isNullable: boolean,
  entities: VdmPartialEntity[],
  serviceName: string
): VdmOperationReturnType {
  if (!entities.length) {
    throw Error(
      'Could not get entity return type for function import. No matching entity types found.'
    );
  }

  return entities.length === 1
    ? {
        returnTypeCategory: 'entity',
        returnType: first(entities)!.className,
        builderFunction: `${voca.decapitalize(
          serviceName
        )}(deSerializers).${getApiName(first(entities)!.className)}`,
        isNullable,
        isCollection
      }
    : {
        returnTypeCategory: 'never',
        returnType: 'never',
        isNullable,
        isCollection
      };
}

function getComplexReturnType(
  isCollection: boolean,
  isNullable: boolean,
  complexType: VdmComplexType
): VdmOperationReturnType {
  return {
    returnTypeCategory: 'complex-type',
    returnType: complexType.typeName,
    builderFunction: `(data) => entityDeserializer(
        deSerializers || defaultDeSerializers
        ).deserializeComplexType(data, ${complexType.typeName})`,
    isNullable,
    isCollection
  };
}
/**
 * @internal
 */
export function cannotDeserialize(returnType: VdmOperationReturnType): boolean {
  return returnType.returnTypeCategory === 'never';
}
/**
 * @internal
 */
export type ExtractResponse = (string) => string;
