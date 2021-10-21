import {EdmToPrimitiveV4, edmToTs} from './payload-value-converter';
import { extractODataEtag } from './extract-odata-etag';
import { getLinkedCollectionResult } from './request-builder/response-data-accessor';
import {EdmTypeShared,  entityDeserializer as entityDeserializerBase,
  EntityDeserializer} from "@sap-cloud-sdk/odata-common";
import {EdmTypeV4} from "./edm-types";

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

type EdmToTsTypeV4<EdmT extends EdmTypeV4 = any> = (
    value: any,
    edmType: EdmTypeShared<'v4'>
) => EdmToPrimitiveV4<EdmT>;
