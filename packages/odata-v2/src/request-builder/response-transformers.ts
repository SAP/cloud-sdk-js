import {
  EntityApi,
  entityDeserializer
} from '@sap-cloud-sdk/odata-common/internal';
import { DeSerializers } from '../de-serializers/de-serializers';
import { Entity } from '../entity';
import { extractODataEtag } from '../extract-odata-etag';
import {
  getSingleResult,
  getCollectionResult,
  getLinkedCollectionResult
} from './response-data-accessor';

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
  const deserializeEntity = entityDeserializer(
    entityApi.deSerializers,
    extractODataEtag,
    getLinkedCollectionResult
  ).deserializeEntity;
  return deserializeEntity(
    getSingleResult(data),
    entityApi
  ).setOrInitializeRemoteState() as ReturnT;
}

export function transformReturnValueForEntityList<
  ReturnT extends Entity,
  DeSerializersT extends DeSerializers
>(data: any, entityApi: EntityApi<ReturnT, DeSerializersT>): ReturnT[] {
  const deserializeEntity = entityDeserializer(
    entityApi.deSerializers,
    extractODataEtag,
    getLinkedCollectionResult
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
