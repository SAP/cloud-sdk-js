import {
  EdmTypeShared,
  entityDeserializer as entityDeserializerBase,
  EntityDeserializer
} from '@sap-cloud-sdk/odata-common/internal';
import {
  EdmToPrimitive,
  edmToTs,
  defaultDeSerializers
} from './de-serializers';
import { extractODataEtag } from './extract-odata-etag';
import { getLinkedCollectionResult } from './request-builder';
import { EdmType } from './edm-types';

/**
 * Entity deserializer instance for v4 entities.
 * See [[EntityDeserializer]] for the provided methods.
 *  @internal
 */
export const entityDeserializer: EntityDeserializer = entityDeserializerBase(
  edmToTs,
  extractODataEtag,
  getLinkedCollectionResult
);

/**
 *  @internal
 */
export const deserializeEntity = entityDeserializer.deserializeEntity;
export const deserializeComplexType = entityDeserializer.deserializeComplexType;

/**
 * @internal
 */
export type EdmToTsType<EdmT extends EdmType = any> = (
  value: any,
  edmType: EdmTypeShared<'v4'>
) => EdmToPrimitive<EdmT>;
