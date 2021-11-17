import {
  EntitySerializer,
  entitySerializer as entitySerializerBase
} from '@sap-cloud-sdk/odata-common';
import { tsToEdm } from './payload-value-converter';

/**
 * Entity serializer instance for v2 entities.
 * See [[EntitySerializer]] for the provided methods.
 * @internal
 */
export const entitySerializer: EntitySerializer = entitySerializerBase(tsToEdm);

/**
 * @internal
 */
export const serializeEntity = entitySerializer.serializeEntity;

/**
 * @internal
 */
export const serializeComplexType = entitySerializer.serializeComplexType;

/**
 * @internal
 */
export const serializeEntityNonCustomFields =
  entitySerializer.serializeEntityNonCustomFields;

/**
 * @internal
 */
export {
  entitySerializer as entitySerializerV2,
  serializeEntity as serializeEntityV2,
  serializeEntity as serializeComplexTypeV2,
  serializeEntityNonCustomFields as serializeEntityNonCustomFieldsV2
};
