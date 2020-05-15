/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { MapType } from '@sap-cloud-sdk/util';
import { EntityBase, FieldType, Constructable } from '../../common';
import { oDataUri } from './odata-uri';

/**
 * Get the resource path of an entity specified by key-value pairs.
 *
 * @typeparam EntityT - Type of the entity to get the resource path for
 * @param keys - Key-value pairs where the key is the name of a key property of the given entity and the value is the respective value
 * @param entityConstructor - Constructor type of the entity to get the resource path for
 * @param uriConverter - OData version specific converter for strings in URIs
 * @returns The path to the resource
 */
export function getResourcePathForKeys<EntityT extends EntityBase>(
  keys: MapType<FieldType> = {},
  entityConstructor: Constructable<EntityT>
): string {
  return oDataUri.getResourcePathForKeys(keys, entityConstructor);
}
