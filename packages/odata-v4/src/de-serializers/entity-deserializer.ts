import {
  entityDeserializer as entityDeserializerBase,
  EntityDeserializer
} from '@sap-cloud-sdk/odata-common/internal';
import { extractODataEtag } from '../extract-odata-etag';
import { getLinkedCollectionResult } from '../request-builder/response-data-accessor';
import { DeSerializers } from './de-serializers';

/**
 * Entity deserializer instance for v4 entities.
 * See [[EntityDeserializer]] for the provided methods.
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
