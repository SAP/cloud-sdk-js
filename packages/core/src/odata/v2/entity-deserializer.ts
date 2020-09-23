/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import {
  entityDeserializer,
  EntityDeserializer
} from '../common/entity-deserializer';
import { edmToTsV2 } from './payload-value-converter';
import { extractODataEtagV2 } from './extract-odata-etag';

/**
 * Entity deserializer instance for v2 entities.
 * See [[EntityDeserializerType]] for the provided methods.
 */
const deserializer: EntityDeserializer = entityDeserializer(
  edmToTsV2,
  extractODataEtagV2
);

export const deserializeEntityV2 = deserializer.deserializeEntity;
export const deserializeComplexTypeV2 = deserializer.deserializeComplexType;

export { deserializeEntityV2 as deserializeEntity };
export { deserializeComplexTypeV2 as deserializeComplexType };
