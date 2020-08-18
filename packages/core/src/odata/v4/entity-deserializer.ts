/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import {
  entityDeserializer,
  entityDeserializer
} from '../common/entity-deserializer';
import { edmToTs } from './payload-value-converter';
import { extractODataETag } from './extract-odata-etag';
import { extractDataFromOneToManyLink } from './extract-data-from-one-to-many-link';

/**
 * Entity deserializer instance for v4 entities.
 * See [[EntityDeserializerType]] for the provided methods.
 */
const deserializer: entityDeserializer = entityDeserializer(
  edmToTs,
  extractODataETag,
  extractDataFromOneToManyLink
);

export const deserializeEntity = deserializer.deserializeEntity;
export const deserializeComplexType = deserializer.deserializeComplexType;
