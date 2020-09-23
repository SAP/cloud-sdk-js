/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import {
  entityDeserializer,
  EntityDeserializer
} from '../common/entity-deserializer';
import { edmToTsV4 } from './payload-value-converter';
import { extractODataEtagV4 } from './extract-odata-etag';

/**
 * Entity deserializer instance for v4 entities.
 * See [[EntityDeserializerType]] for the provided methods.
 */
const deserializer: EntityDeserializer = entityDeserializer(
  edmToTsV4,
  extractODataEtagV4
);

export const deserializeEntityV4 = deserializer.deserializeEntity;
export const deserializeComplexTypeV4 = deserializer.deserializeComplexType;
