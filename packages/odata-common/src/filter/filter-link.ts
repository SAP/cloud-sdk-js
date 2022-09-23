import { DeSerializers } from '../de-serializers';
import { EntityBase, EntityIdentifiable } from '../entity-base';
import { Link } from '../selectable/link';
import { EntityApi, EntityType } from '../entity-api';
import type { Filterable } from './filterable';

/**
 * Data structure to represent filter on properties of a navigation property (link).
 * In OData v2 filtering for navigation properties is ONLY supported for properties with a one-to-one cardinality ({@link OneToOneLink}).
 * @example
 * In the following filter statement `Entity.requestBuilder().filter(Entity.to_NavProperty.filter(LinkedEntity.property.equals(value)))`,
 * `Entity.to_NavProperty.filter(LinkedEntity.property.equals(value))` is a `FilterLink`.
 *
 * In OData v4 filtering is also possible on one-to-many links. See {@link OneToManyLink}.
 * @typeParam EntityT - Type of the entity to be filtered.
 * @typeParam LinkedEntityT - Type of the linked entity which is used in the filter.
 */
export class FilterLink<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers,
  LinkedEntityApiT extends EntityApi<EntityBase, DeSerializersT>
> implements EntityIdentifiable<EntityT, DeSerializersT>
{
  /**
   * Entity type of the entity tp be filtered.
   */
  readonly _entity: EntityT;
  readonly _deSerializers: DeSerializersT;

  /**
   * Linked entity to be filtered by.
   */
  readonly _linkedEntityType: EntityType<LinkedEntityApiT>;

  /**
   * Creates an instance of `FilterLink`.
   * @param link - Linked entity to be used in the filter.
   * @param filters - List of filterables for the linked entity.
   */
  constructor(
    public link: Link<EntityT, DeSerializersT, LinkedEntityApiT>,
    public filters: Filterable<EntityType<LinkedEntityApiT>, DeSerializersT>[]
  ) {}
}

/**
 * Type guard for the FilterLink.
 * @param filterable - Object to be checked.
 * @returns boolean
 * @internal
 */
export function isFilterLink<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers,
  LinkedEntityApiT extends EntityApi<EntityBase, DeSerializersT>
>(
  filterable: Filterable<EntityT, DeSerializersT>
): filterable is FilterLink<EntityT, DeSerializersT, LinkedEntityApiT> {
  return (
    typeof filterable['link'] !== 'undefined' &&
    typeof filterable['filters'] !== 'undefined'
  );
}
