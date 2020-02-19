/*!
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { Constructable } from '../constructable';
import { Entity, EntityIdentifiable } from '../entity';
import { Selectable } from './selectable';

/**
 * Represents a navigation property of an OData entity.
 *
 * OData is a relational data model, i.e. entities can be related to one another.
 * For example, BusinessPartner is in a 1:n relation with BusinessPartnerAddress and in a 1:1 relation with Customer.
 * Like normal properties, navigation properties can be used for selecting (expanding) and filtering.
 * For example, when constructing a query on the BusinessPartner entity, an instance of `Link<BusinessPartner, Customer>`
 * can be passed as argument to the select function, e.g. `BusinessPartner.TO_CUSTOMER`.
 *
 * NOTE: the Link class represents navigation properties with a 1:n cardinality.
 * For navigation properties with a 1:0..1 cardinality, see [[OneToOneLink]].
 *
 * See also: [[Selectable]]
 *
 * @typeparam EntityT Type of the entity to be linked from
 * @typeparam LinkedEntityT Type of the entity to be linked to
 */
export class Link<EntityT extends Entity, LinkedEntityT extends Entity> implements EntityIdentifiable<EntityT> {
  /**
   * Create a new link based on a given link.
   *
   * @typeparam EntityT Type of the entity to be linked from
   * @typeparam LinkedEntityT Type of the entity to be linked to
   * @param link Link to be cloned
   * @returns Newly created link
   */
  static clone<EntityT extends Entity, LinkedEntityT extends Entity>(link: Link<EntityT, LinkedEntityT>): Link<EntityT, LinkedEntityT> {
    const clonedLink = new Link<EntityT, LinkedEntityT>(link._fieldName, link._entityConstructor, link._linkedEntity);
    clonedLink.selects = link.selects;
    return clonedLink;
  }

  /**
   * List of selectables on the linked entity.
   */
  selects: Array<Selectable<LinkedEntityT>> = [];

  /**
   * Creates an instance of Link.
   *
   * @param _fieldName Name of the linking field to be used in the OData request.
   * @param _entityConstructor Constructor type of the entity the field belongs to
   * @param _linkedEntity Constructor type of the linked entity
   */
  constructor(
    readonly _fieldName: string,
    readonly _entityConstructor: Constructable<EntityT>,
    readonly _linkedEntity: Constructable<LinkedEntityT>
  ) {}

  /**
   * Creates a selection on a linked entity. Has the same behavior as [[GetAllRequestBuilder.select]] and [[GetByKeyRequestBuilder.select]] but for linked entities.
   *
   * See also, [[Selectable]]
   *
   * @param selects Selection of fields or links on a linked entity
   * @returns The link itself, to facilitate method chaining
   */
  select(...selects: Array<Selectable<LinkedEntityT>>): Link<EntityT, LinkedEntityT> {
    const link = Link.clone(this);
    link.selects = selects;
    return link;
  }
}
