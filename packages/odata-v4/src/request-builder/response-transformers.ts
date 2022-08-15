import { EntityApi } from '@sap-cloud-sdk/odata-common';
import { Entity } from '../entity';
import { DeSerializers, entityDeserializer } from '../de-serializers';
import { getSingleResult, getCollectionResult } from './response-data-accessor';

/**
 * Transform the payload of the OData response to undefined.
 * This function is used in function imports, when no values need to be returned.
 * @param data - The OData payload.
 * @param builderFn - The deserialization function for transforming the payload.
 * @returns The transformed value.
 */
export function transformReturnValueForUndefined<ReturnT>(
  data: any,
  builderFn: (data: any) => ReturnT
): ReturnT {
  return builderFn(data);
}

/**
 * Transform the payload of an OData response to an entity by using the given (de-)serializers.
 * @param data - The OData payload.
 * @param entityApi - Entity API that holds the (de-)serializers.
 * @returns The transformed value.
 */
export function transformReturnValueForEntity<
  ReturnT extends Entity,
  DeSerializersT extends DeSerializers
>(data: any, entityApi: EntityApi<ReturnT, DeSerializersT>): ReturnT {
  return entityDeserializer(entityApi.deSerializers)
    .deserializeEntity(getSingleResult(data), entityApi)
    .setOrInitializeRemoteState() as ReturnT;
}

/**
 * Transform the payload of the OData response to array of entities by using given (de-)serializers.
 * @param data - The OData payload.
 * @param entityApi - Entity API that holds the (de-)serializers.
 * @returns The transformed value.
 */
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

/**
 * Transform the payload of the OData response to a complex type by using given deserialization function.
 * @param data - The OData payload.
 * @param builderFn - The deserialization function for transforming the payload.
 * @returns The transformed value.
 */
export function transformReturnValueForComplexType<ReturnT>(
  data: any,
  builderFn: (data: any) => ReturnT
): ReturnT {
  return builderFn(getSingleResult(data)) as ReturnT;
}

/**
 * Transform the payload of the OData response to complex type array by using given deserialization function.
 * @param data - The OData payload.
 * @param builderFn - The deserialization function for transforming the payload.
 * @returns The transformed value.
 */
export function transformReturnValueForComplexTypeList<ReturnT>(
  data: any,
  builderFn: (data: any) => ReturnT
): ReturnT[] {
  return getCollectionResult(data).map(json => builderFn(json));
}

/**
 * Transform the payload of the OData response to edm type by using given deserialization function.
 * @param data - The OData payload.
 * @param builderFn - The deserialization function for transforming the payload.
 * @returns The transformed value.
 */
export function transformReturnValueForEdmType<ReturnT>(
  data: any,
  builderFn: (data: any) => ReturnT
): ReturnT {
  return builderFn(getSingleResult(data));
}

/**
 * Transform the payload of the OData response to edm type array by using given deserialization function.
 * @param data - The OData payload.
 * @param builderFn - The deserialization function for transforming the payload.
 * @returns The transformed value.
 */
export function transformReturnValueForEdmTypeList<ReturnT>(
  data: any,
  builderFn: (data: any) => ReturnT
): ReturnT[] {
  return getCollectionResult(data).map(builderFn);
}
