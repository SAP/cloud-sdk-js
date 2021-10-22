import {
  entityDeserializer as entityDeserializerBase,
  EntityDeserializer
,EdmTypeShared } from '@sap-cloud-sdk/odata-common';
import { EdmToPrimitiveV2, edmToTs } from './payload-value-converter';
import { extractODataEtag } from './extract-odata-etag';
import { getLinkedCollectionResult } from './request-builder/response-data-accessor';
import { EdmType } from './edm-types';

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

export type EdmToTsTypeV2<EdmT extends EdmType = any> = (
    value: any,
    edmType: EdmTypeShared<'v2'>
) => EdmToPrimitiveV2<EdmT>;
