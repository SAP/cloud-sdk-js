import { Entity, Constructable } from '../entity';
import { Field } from '../selectable';
import { toPropertyFormat } from '../name-converter';

/**
 * Helper function that maps an entity to its keys map with their original names.
 * @param entity - Entity to map
 * @param entityConstructor - The constructor of the entity
 * @returns object that includes all keys that represent given entity
 */
export function getEntityKeys<EntityT extends Entity>(
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
      [curr._fieldName]: encodeURIComponent(
        entity[toPropertyFormat(curr._fieldName)]
      )
    }),
    {}
  );
}
