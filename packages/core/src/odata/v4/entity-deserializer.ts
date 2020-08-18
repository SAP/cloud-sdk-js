/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import {
  entityDeserializer,
  EntityDeserializer
} from '../common/entity-deserializer';
import { edmToTsV4 } from './payload-value-converter';
import { extractODataETagV4 } from './extract-o-data-e-tag-v4';
import { extractDataFromOneToManyLink } from './extract-data-from-one-to-many-link';

/**
 * Entity deserializer instance for v4 entities.
 * See [[EntityDeserializerType]] for the provided methods.
 */
const deserializer: EntityDeserializer = entityDeserializer(
  edmToTsV4,
  extractODataETagV4,
  extractDataFromOneToManyLink
);

export const deserializeEntityV4 = deserializer.deserializeEntity;
export const deserializeComplexTypeV4 = deserializer.deserializeComplexType;
