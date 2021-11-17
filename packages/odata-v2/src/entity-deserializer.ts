import {
  entityDeserializer as entityDeserializerBase,
  EntityDeserializer,
  EdmTypeShared
  // eslint-disable-next-line import/no-internal-modules
} from '@sap-cloud-sdk/odata-common/internal';
import { EdmToPrimitive, edmToTs } from './payload-value-converter';
import { extractODataEtag } from './extract-odata-etag';
import { getLinkedCollectionResult } from './request-builder/response-data-accessor';
import { EdmType } from './edm-types';

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

/**
 * @internal
 */
export type EdmToTsType<EdmT extends EdmType = any> = (
  value: any,
  edmType: EdmTypeShared<'v2'>
) => EdmToPrimitive<EdmT>;
