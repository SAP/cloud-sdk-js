import { EntityApi } from '@sap-cloud-sdk/odata-common/internal';
import { Entity } from '../entity';
import { DeSerializers, entityDeserializer } from '../de-serializers';
import { getSingleResult, getCollectionResult } from './response-data-accessor';
/* eslint-disable valid-jsdoc */

export function transformReturnValueForUndefined<ReturnT>(
  data: any,
  builderFn: (data: any) => ReturnT
): ReturnT {
  return builderFn(data);
}

export function transformReturnValueForEntity<
  ReturnT extends Entity,
  DeSerializersT extends DeSerializers
>(data: any, entityApi: EntityApi<ReturnT, DeSerializersT>): ReturnT {
  return entityDeserializer(entityApi.deSerializers)
    .deserializeEntity(getSingleResult(data), entityApi)
    .setOrInitializeRemoteState() as ReturnT;
}

export function transformReturnValueForEntityList<
  ReturnT extends Entity,
  DeSerializersT extends DeSerializers
>(data: any, entityApi: EntityApi<ReturnT, DeSerializersT>): ReturnT[] {
  const deserializeEntity = entityDeserializer(
    entityApi.deSerializers
  ).deserializeEntity;

  return getCollectionResult(data).map(
    entityJson =>
      deserializeEntity(
        entityJson,
        entityApi
      ).setOrInitializeRemoteState() as ReturnT
  );
}

export function transformReturnValueForComplexType<ReturnT>(
  data: any,
  builderFn: (data: any) => ReturnT
): ReturnT {
  return builderFn(getSingleResult(data)) as ReturnT;
}

export function transformReturnValueForComplexTypeList<ReturnT>(
  data: any,
  builderFn: (data: any) => ReturnT
): ReturnT[] {
  return getCollectionResult(data).map(json => builderFn(json));
}

export function transformReturnValueForEdmType<ReturnT>(
  data: any,
  builderFn: (data: any) => ReturnT
): ReturnT {
  return builderFn(getSingleResult(data));
}

export function transformReturnValueForEdmTypeList<ReturnT>(
  data: any,
  builderFn: (data: any) => ReturnT
): ReturnT[] {
  return getCollectionResult(data).map(builderFn);
}
