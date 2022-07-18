import {
  entityDeserializer as entityDeserializerBase,
  EntityDeserializer
} from '@sap-cloud-sdk/odata-common';
import { getLinkedCollectionResult } from '../request-builder/response-data-accessor';
import { extractODataEtag } from '../extract-odata-etag';
import { DeSerializers } from './de-serializers';

/**
 * Entity deserializer instance for v2 entities.
 * See {@link @sap-cloud-sdk/odata-common!EntityDeserializer} for the provided methods.
 * @param deSerializers - DeSerializer.
 * @returns EntityDeserializer.
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
