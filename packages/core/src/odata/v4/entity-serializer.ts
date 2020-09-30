import {
  EntitySerializer,
  entitySerializer
} from '../common/entity-serializer';
import { tsToEdmV4 } from './payload-value-converter';

/**
 * Entity serializer instance for v4 entities.
 * See [[EntitySerializerType]] for the provided methods.
 */
export const entitySerializerV4: EntitySerializer = entitySerializer(tsToEdmV4);

export const serializeEntityV4 = entitySerializerV4.serializeEntity;
export const serializeComplexTypeV4 = entitySerializerV4.serializeComplexType;
export const serializeEntityNonCustomFieldsV4 =
  entitySerializerV4.serializeEntityNonCustomFields;
