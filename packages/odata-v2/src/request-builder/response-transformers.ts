import {
  Constructable,
  entityDeserializer
} from '@sap-cloud-sdk/odata-common/internal';
import { DeSerializationMiddlewareV2BASE } from '../de-serializers/de-serialization-middleware';
import { edmToTs } from '../de-serializers/payload-value-converter';
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
  T extends DeSerializationMiddlewareV2BASE
>(
  deSerializers: T,
  data: any,
  entityConstructor: Constructable<ReturnT>,
  schema: Record<string, any>
): ReturnT {
  const deserializeEntity = entityDeserializer(
    schema,
    edmToTs,
    extractODataEtag,
    getLinkedCollectionResult,
    deSerializers
  ).deserializeEntity;
  return deserializeEntity(
    getSingleResult(data),
    entityConstructor
  ).setOrInitializeRemoteState() as ReturnT;
}

export function transformReturnValueForEntityList<
  ReturnT extends Entity,
  T extends DeSerializationMiddlewareV2BASE
>(
  deSerializers: T,
  data: any,
  entityConstructor: Constructable<ReturnT>,
  schema: Record<string, any>
): ReturnT[] {
  const deserializeEntity = entityDeserializer(
    schema,
    edmToTs,
    extractODataEtag,
    getLinkedCollectionResult,
    deSerializers
  ).deserializeEntity;

  return getCollectionResult(data).map(
    entityJson =>
      deserializeEntity(
        entityJson,
        entityConstructor
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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function responseTransformers<T extends DeSerializationMiddlewareV2BASE>(
  deSerializers: T
) {
  return {
    transformReturnValueForUndefined,
    transformReturnValueForEntity: <ReturnT extends Entity>(
      data: any,
      entityConstructor: Constructable<ReturnT>,
      schema: Record<string, any>
    ): ReturnT =>
      transformReturnValueForEntity(
        deSerializers,
        data,
        entityConstructor,
        schema
      ),
    transformReturnValueForEntityList: <ReturnT extends Entity>(
      data: any,
      entityConstructor: Constructable<ReturnT>,
      schema: Record<string, any>
    ): ReturnT[] =>
      transformReturnValueForEntityList(
        deSerializers,
        data,
        entityConstructor,
        schema
      ),
    transformReturnValueForComplexType,
    transformReturnValueForComplexTypeList,
    transformReturnValueForEdmType,
    transformReturnValueForEdmTypeList
  };
}
