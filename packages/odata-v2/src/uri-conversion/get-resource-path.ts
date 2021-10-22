import {
  Entity as EntityBase,
  FieldType,
  Constructable
} from '@sap-cloud-sdk/odata-common';
import { oDataUri } from './odata-uri';

/**
 * @deprecated Since v1.21.0. Use [[ODataUri.getResourcePathForKeys]] instead.
 * Get the resource path of an entity specified by key-value pairs.
 * @typeparam EntityT - Type of the entity to get the resource path for
 * @param keys - Key-value pairs where the key is the name of a key property of the given entity and the value is the respective value
 * @param entityConstructor - Constructor type of the entity to get the resource path for
 * @param uriConverter - OData version specific converter for strings in URIs
 * @returns The path to the resource
 */
export function getResourcePathForKeys<EntityT extends EntityBase>(
  keys: Record<string, FieldType> = {},
  entityConstructor: Constructable<EntityT>
): string {
  return oDataUri.getResourcePathForKeys(keys, entityConstructor);
}
