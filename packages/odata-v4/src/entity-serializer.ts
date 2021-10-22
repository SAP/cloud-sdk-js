import {
  EntitySerializer,
  entitySerializer as entitySerializerBase
} from '@sap-cloud-sdk/odata-common';
import { tsToEdm } from './payload-value-converter';

/**
 * Entity serializer instance for v4 entities.
 * See [[EntitySerializer]] for the provided methods.
 */
export const entitySerializer: EntitySerializer = entitySerializerBase(tsToEdm);

export const serializeEntity = entitySerializer.serializeEntity;
export const serializeComplexType = entitySerializer.serializeComplexType;
export const serializeEntityNonCustomFields =
  entitySerializer.serializeEntityNonCustomFields;

export {
  entitySerializer as entitySerializerV4,
  serializeComplexType as serializeComplexTypeV4,
  serializeEntityNonCustomFields as serializeEntityNonCustomFieldsV4
};
