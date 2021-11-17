import {
  EntitySerializer,
  entitySerializer as entitySerializerBase
} from '@sap-cloud-sdk/odata-common/internal';
import { tsToEdm } from './payload-value-converter';

/**
 * Entity serializer instance for v4 entities.
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

export {
  entitySerializer as entitySerializerV4,
  serializeComplexType as serializeComplexTypeV4,
  serializeEntityNonCustomFields as serializeEntityNonCustomFieldsV4
};
