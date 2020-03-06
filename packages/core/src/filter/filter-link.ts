/*!
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { Constructable } from '../constructable';
import { Entity, EntityIdentifiable } from '../entity';
import { Link } from '../selectable';
import { Filterable } from './filterable';

/**
 * Data structure to represent filter on properties of a navigation property (link).
 * In OData v2 filtering for navigation properties is ONLY supported for properties with a one-to-one cardinality ({OneToOneLink}).
 *
 * Example:
 * In the following filter statement `Entity.requestBuilder().filter(Entity.to_NavProperty.filter(LinkedEntity.property.equals(value)))`,
 * `Entity.to_NavProperty.filter(LinkedEntity.property.equals(value))` is a FilterLink.
 *
 * @typeparam EntityT Type of the entity to be filtered
 * @typeparam LinkedEntityT Type of the linked entity which is used in the filter
 */
export class FilterLink<EntityT extends Entity, LinkedEntityT extends Entity> implements EntityIdentifiable<EntityT> {
  /**
   * Constructor type of the entity to be filtered.
   */
  readonly _entityConstructor: Constructable<EntityT>;

  /**
   * Linked entity to be filtered by.
   */
  readonly _linkedEntityType: LinkedEntityT;

  /**
   * Creates an instance of FilterLink.
   *
   * @param link Linked entity to be used in the filter
   * @param filters List of filterables for the linked entity
   */
  constructor(public link: Link<EntityT, LinkedEntityT>, public filters: Filterable<LinkedEntityT>[]) {}
}

export function isFilterLink<EntityT extends Entity, LinkedT extends Entity>(
  filterable: Filterable<EntityT>
): filterable is FilterLink<EntityT, LinkedT> {
  return typeof filterable['link'] !== 'undefined' && typeof filterable['filters'] !== 'undefined';
}
