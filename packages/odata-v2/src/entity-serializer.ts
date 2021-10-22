import {
  EntitySerializer,
  entitySerializer as entitySerializerBase
} from '@sap-cloud-sdk/odata-common';
import { tsToEdm } from './payload-value-converter';

/**
 * Entity serializer instance for v2 entities.
 * See [[EntitySerializer]] for the provided methods.
 */
export const entitySerializer: EntitySerializer = entitySerializerBase(tsToEdm);

export const serializeEntity = entitySerializer.serializeEntity;
export const serializeComplexType = entitySerializer.serializeComplexType;
export const serializeEntityNonCustomFields =
  entitySerializer.serializeEntityNonCustomFields;

export {
  entitySerializer as entitySerializerV2,
  serializeEntity as serializeEntityV2,
  serializeEntity as serializeComplexTypeV2,
  serializeEntityNonCustomFields as serializeEntityNonCustomFieldsV2
};
