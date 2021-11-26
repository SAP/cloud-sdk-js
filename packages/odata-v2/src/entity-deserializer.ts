import {
  entityDeserializer as entityDeserializerBase,
  EntityDeserializer
} from '@sap-cloud-sdk/odata-common/internal';
import { edmToTs } from './de-serializers';
import { extractODataEtag } from './extract-odata-etag';
import { getLinkedCollectionResult } from './request-builder/response-data-accessor';

/**
 * Entity deserializer instance for v2 entities.
 * See [[EntityDeserializer]] for the provided methods.
 * @internal
 */
export const entityDeserializer: EntityDeserializer = entityDeserializerBase(
  edmToTs,
  extractODataEtag,
  getLinkedCollectionResult
);

/**
 * @internal
 */
export const deserializeEntity = entityDeserializer.deserializeEntity;
export const deserializeComplexType = entityDeserializer.deserializeComplexType;

/**
 * @internal
 */
export {
  deserializeEntity as deserializeEntityV2,
  deserializeComplexType as deserializeComplexTypeV2,
  entityDeserializer as entityDeserializerV2
};
