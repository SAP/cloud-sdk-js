import {
  entityDeserializer as entityDeserializerBase,
  EntityDeserializer
} from '@sap-cloud-sdk/odata-common/internal';
import { extractODataEtag } from './extract-odata-etag';
import { getLinkedCollectionResult } from './request-builder/response-data-accessor';
import { defaultDeSerializers } from './de-serializers/default-de-serializers';

/**
 * Entity deserializer instance for v4 entities.
 * See [[EntityDeserializer]] for the provided methods.
 *  @internal
 */
export const entityDeserializer: EntityDeserializer = entityDeserializerBase(
  defaultDeSerializers,
  extractODataEtag,
  getLinkedCollectionResult
);

/**
 *  @internal
 */
export const deserializeEntity = entityDeserializer.deserializeEntity;
export const deserializeComplexType = entityDeserializer.deserializeComplexType;
