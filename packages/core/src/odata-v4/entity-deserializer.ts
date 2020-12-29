import {
  entityDeserializer,
  EntityDeserializer
} from '../odata-common/entity-deserializer';
import { edmToTs } from './payload-value-converter';
import { extractODataEtagV4 } from './extract-odata-etag';
import { getLinkedCollectionResult } from './request-builder/response-data-accessor';

/**
 * Entity deserializer instance for v4 entities.
 * See [[EntityDeserializer]] for the provided methods.
 */
export const entityDeserializerV4: EntityDeserializer = entityDeserializer(
  edmToTs,
  extractODataEtagV4,
  getLinkedCollectionResult
);

export const deserializeEntity = entityDeserializerV4.deserializeEntity;
export const deserializeComplexType =
  entityDeserializerV4.deserializeComplexType;
