import { camelCase } from '@sap-cloud-sdk/util';
import { EntityBase, EntityApi } from '../entity-base';

/**
 * Helper function that maps an entity to its keys map with their original names.
 * @param entity - Entity to map
 * @param entityConstructor - The constructor of the entity
 * @returns object that includes all keys that represent given entity
 * @internal
 */
export function getEntityKeys<EntityT extends EntityBase>(
  entity: EntityT,
  entityApi: EntityApi<EntityT, any>
): Record<string, any> {
  if (!entity) {
    throw new Error(
      'getEntityKeys() cannot extract keys from an undefined or null object.'
    );
  }
  return entityApi.entityConstructor._keys.reduce(
    (prev, curr) => ({
      ...prev,
      [curr]: encodeURIComponent(entity[camelCase(curr)])
    }),
    {}
  );
}
