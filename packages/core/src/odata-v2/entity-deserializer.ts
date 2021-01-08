import {
  entityDeserializer as entityDeserializerBase,
  EntityDeserializer
} from '../odata-common/entity-deserializer';
import { edmToTs } from './payload-value-converter';
import { extractODataEtag } from './extract-odata-etag';
import { getLinkedCollectionResult } from './request-builder/response-data-accessor';

/**
 * Entity deserializer instance for v2 entities.
 * See [[EntityDeserializer]] for the provided methods.
 */
export const entityDeserializer: EntityDeserializer = entityDeserializerBase(
  edmToTs,
  extractODataEtag,
  getLinkedCollectionResult
);

export const deserializeEntity = entityDeserializer.deserializeEntity;
export const deserializeComplexType = entityDeserializer.deserializeComplexType;

export {
  deserializeEntity as deserializeEntityV2,
  deserializeComplexType as deserializeComplexTypeV2,
  entityDeserializer as entityDeserializerV2
};
