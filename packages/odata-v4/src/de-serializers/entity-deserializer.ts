import { entityDeserializer as entityDeserializerBase } from '@sap-cloud-sdk/odata-common/internal';
import { extractODataEtag } from '../extract-odata-etag';
// eslint-disable-next-line import/no-internal-modules
import { getLinkedCollectionResult } from '../request-builder/response-data-accessor';
import type { EntityDeserializer } from '@sap-cloud-sdk/odata-common/internal';
import type { DeSerializers } from './de-serializers';

/**
 * Entity deserializer instance for v4 entities.
 * See {@link @sap-cloud-sdk/odata-common!EntityDeserializer} for the provided methods.
 * @param deSerializers - DeSerializer to be used.
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
