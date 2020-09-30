import {
  entityDeserializer,
  EntityDeserializer
} from '../common/entity-deserializer';
import { edmToTsV2 } from './payload-value-converter';
import { extractODataEtagV2 } from './extract-odata-etag';
import { getLinkedCollectionResult } from './request-builder/response-data-accessor';

/**
 * Entity deserializer instance for v2 entities.
 * See [[EntityDeserializerType]] for the provided methods.
 */
export const entityDeserializerV2: EntityDeserializer = entityDeserializer(
  edmToTsV2,
  extractODataEtagV2,
  getLinkedCollectionResult
);

export const deserializeEntityV2 = entityDeserializerV2.deserializeEntity;
export const deserializeComplexTypeV2 =
  entityDeserializerV2.deserializeComplexType;

export { deserializeEntityV2 as deserializeEntity };
export { deserializeComplexTypeV2 as deserializeComplexType };
