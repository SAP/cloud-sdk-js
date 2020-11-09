import {
  EntitySerializer,
  entitySerializer
} from '../odata-common/entity-serializer';
import { tsToEdmV2 } from './payload-value-converter';

/**
 * Entity serializer instance for v2 entities.
 * See [[EntitySerializer]] for the provided methods.
 */
export const entitySerializerV2: EntitySerializer = entitySerializer(tsToEdmV2);

export const serializeEntityV2 = entitySerializerV2.serializeEntity;
export const serializeComplexTypeV2 = entitySerializerV2.serializeComplexType;
export const serializeEntityNonCustomFieldsV2 =
  entitySerializerV2.serializeEntityNonCustomFields;

export { serializeEntityV2 as serializeEntity };
export { serializeComplexTypeV2 as serializeComplexType };
export { serializeEntityNonCustomFieldsV2 as serializeEntityNonCustomFields };
