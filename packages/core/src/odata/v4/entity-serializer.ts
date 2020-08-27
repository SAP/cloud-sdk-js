/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import {
  EntitySerializer,
  entitySerializer
} from '../common/entity-serializer';
import { tsToEdmV4 } from './payload-value-converter';

/**
 * Entity serializer instance for v4 entities.
 * See [[EntitySerializerType]] for the provided methods.
 */
const serializer: EntitySerializer = entitySerializer(tsToEdmV4);

export const serializeEntityV4 = serializer.serializeEntity;
export const serializeComplexTypeV4 = serializer.serializeComplexType;
export const serializeEntityNonCustomFieldsV4 =
  serializer.serializeEntityNonCustomFields;
