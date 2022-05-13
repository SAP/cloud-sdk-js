import { EntityApi } from '@sap-cloud-sdk/odata-common/internal';
import { entityDeserializer } from '../de-serializers';
import { DeSerializers } from '../de-serializers/de-serializers';
import { Entity } from '../entity';
import { getSingleResult, getCollectionResult } from './response-data-accessor';

/**
 * Convert the payload of the OData response to undefined.
 * @param data - The OData payload.
 * @param builderFn - The deserialization function for converting the payload.
 * @returns The converted value.
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
 * @returns The converted value.
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
 * Convert the payload of the OData response to Entity array by using given (De-)serializers.
 * @param data - The OData payload.
 * @param entityApi - Entity API that holds the (De-)serializers.
 * @returns The converted value.
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
 * Convert the payload of the OData response to complex type by using given deserialization function.
 * @param data - The OData payload.
 * @param builderFn - The deserialization function for converting the payload.
 * @returns The converted value.
 */
export function transformReturnValueForComplexType<ReturnT>(
  data: any,
  builderFn: (data: any) => ReturnT
): ReturnT {
  return builderFn(getSingleResult(data)) as ReturnT;
}

/**
 * Convert the payload of the OData response to complex type array by using given deserialization function.
 * @param data - The OData payload.
 * @param builderFn - The deserialization function for converting the payload.
 * @returns The converted value.
 */
export function transformReturnValueForComplexTypeList<ReturnT>(
  data: any,
  builderFn: (data: any) => ReturnT
): ReturnT[] {
  return getCollectionResult(data).map(json => builderFn(json));
}

/**
 * Convert the payload of the OData response to edm type by using given deserialization function.
 * @param data - The OData payload.
 * @param builderFn - The deserialization function for converting the payload.
 * @returns The converted value.
 */
export function transformReturnValueForEdmType<ReturnT>(
  data: any,
  builderFn: (data: any) => ReturnT
): ReturnT {
  return builderFn(getSingleResult(data));
}

/**
 * Convert the payload of the OData response to edm type array by using given deserialization function.
 * @param data - The OData payload.
 * @param builderFn - The deserialization function for converting the payload.
 * @returns The converted value.
 */
export function transformReturnValueForEdmTypeList<ReturnT>(
  data: any,
  builderFn: (data: any) => ReturnT
): ReturnT[] {
  return getCollectionResult(data).map(builderFn);
}
