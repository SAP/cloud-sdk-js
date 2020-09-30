import {
  entityDeserializer,
  EntityDeserializer
} from '../common/entity-deserializer';
import { edmToTsV4 } from './payload-value-converter';
import { extractODataEtagV4 } from './extract-odata-etag';
import { getLinkedCollectionResult } from './request-builder/response-data-accessor';

/**
 * Entity deserializer instance for v4 entities.
 * See [[EntityDeserializerType]] for the provided methods.
 */
export const entityDeserializerV4: EntityDeserializer = entityDeserializer(
  edmToTsV4,
  extractODataEtagV4,
  getLinkedCollectionResult
);

export const deserializeEntityV4 = entityDeserializerV4.deserializeEntity;
export const deserializeComplexTypeV4 =
  entityDeserializerV4.deserializeComplexType;
