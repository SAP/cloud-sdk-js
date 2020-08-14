/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import {
  EntitySerializer,
  entitySerializer
} from '../common/entity-serializer';
import { tsToEdm } from './payload-value-converter';

/**
 * Entity serializer instance for v2 entities.
 * See [[EntitySerializerType]] for the provided methods.
 */
const serializer: EntitySerializer = entitySerializer(tsToEdm);

export const serializeEntity = serializer.serializeEntity;
export const serializeComplexType = serializer.serializeComplexType;
export const serializeEntityNonCustomFields =
  serializer.serializeEntityNonCustomFields;
