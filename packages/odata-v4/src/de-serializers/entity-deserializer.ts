import {
  entityDeserializer as entityDeserializerBase,
  EntityDeserializer
} from '@sap-cloud-sdk/odata-common/internal';
import { extractODataEtag } from '../extract-odata-etag';
import { getLinkedCollectionResult } from '../request-builder/response-data-accessor';
import { DeSerializers } from './de-serializers';
import { defaultDeSerializers } from './default-de-serializers';

/**
 * Entity deserializer instance for v4 entities.
 * See [[EntityDeserializer]] for the provided methods.
 *  @internal
 *  @param deSerializers - DeSerializer to be used
 *  @returns EntityDeserializer
 */
export function entityDeserializer<DeSerializersT extends DeSerializers>(
  deSerializers: DeSerializersT
): EntityDeserializer {
  return entityDeserializerBase(
    deSerializers,
    extractODataEtag,
    getLinkedCollectionResult
  );
}

const defaultEntityDeserializer = entityDeserializer(defaultDeSerializers);

export const deserializeComplexType =
  defaultEntityDeserializer.deserializeComplexType;
export const deserializeEntity = defaultEntityDeserializer.deserializeEntity;
