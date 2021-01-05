import {
  entityDeserializer as entityDeserializerBase,
  EntityDeserializer
} from '../odata-common/entity-deserializer';
import { edmToTs } from './payload-value-converter';
import { extractODataEtag } from './extract-odata-etag';
import { getLinkedCollectionResult } from './request-builder/response-data-accessor';

/**
 * Entity deserializer instance for v4 entities.
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
  entityDeserializer as entityDeserializerV4,
  deserializeEntity as deserializeEntityV4,
  deserializeComplexType as deserializeComplexTypeV4
};
