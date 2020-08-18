/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import {
  entityDeserializer,
  EntityDeserializer
} from '../common/entity-deserializer';
import { edmToTs } from './payload-value-converter';
import { extractODataETag } from './extract-odata-etag';
import { extractDataFromOneToManyLink } from './extract-data-from-one-to-many-link';

/**
 * Entity deserializer instance for v2 entities.
 * See [[EntityDeserializerType]] for the provided methods.
 */
const deserializer: EntityDeserializer = entityDeserializer(
  edmToTs,
  extractODataETag,
  extractDataFromOneToManyLink
);

export const deserializeEntity = deserializer.deserializeEntity;
export const deserializeComplexType = deserializer.deserializeComplexType;
