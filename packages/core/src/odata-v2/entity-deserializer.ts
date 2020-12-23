import {
  entityDeserializer as entityDeserializerBase,
  EntityDeserializer
} from '../odata-common/entity-deserializer';
import { edmToTsV2 } from './payload-value-converter';
import { extractODataEtagV2 } from './extract-odata-etag';
import { getLinkedCollectionResult } from './request-builder/response-data-accessor';

/**
 * Entity deserializer instance for v2 entities.
 * See [[EntityDeserializer]] for the provided methods.
 */
export const entityDeserializer: EntityDeserializer = entityDeserializerBase(
  edmToTsV2,
  extractODataEtagV2,
  getLinkedCollectionResult
);

export const deserializeEntity = entityDeserializer.deserializeEntity;
export const deserializeComplexType = entityDeserializer.deserializeComplexType;

export {
  deserializeEntity as deserializeEntityV2,
  deserializeComplexType as deserializeComplexTypeV2,
  entityDeserializer as entityDeserializerV2
};
