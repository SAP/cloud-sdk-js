import { camelCase } from '@sap-cloud-sdk/util';
import { EntityBase, Constructable } from '../entity-base';
import { Field } from '../selectable/field';

/**
 * Helper function that maps an entity to its keys map with their original names.
 * @param entity - Entity to map
 * @param entityConstructor - The constructor of the entity
 * @returns object that includes all keys that represent given entity
 */
export function getEntityKeys<EntityT extends EntityBase>(
  entity: EntityT,
  entityConstructor: Constructable<EntityT>
): Record<string, any> {
  if (!entity) {
    throw new Error(
      'getEntityKeys() cannot extract keys from an undefined or null object.'
    );
  }
  // type assertion for backwards compatibility, TODO: remove in v2.0
  return (entityConstructor._keyFields as Field<EntityT>[]).reduce(
    (prev, curr) => ({
      ...prev,
      [curr._fieldName]: encodeURIComponent(entity[camelCase(curr._fieldName)])
    }),
    {}
  );
}
