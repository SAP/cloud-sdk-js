/*!
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { Constructable } from '../constructable';
import { Entity, EntityIdentifiable } from '../entity';

type EntityBasedRequestBuilder<EntityCT extends Constructable<Entity>> = ReturnType<EntityCT['requestBuilder']>;

/**
 * @abstract
 * @typeparam EntityT -
 * @hidden
 */
export abstract class RequestBuilder<EntityT extends Entity> implements EntityIdentifiable<EntityT> {
  static forEntity<EntityCT extends Constructable<Entity>>(entity: EntityCT): EntityBasedRequestBuilder<EntityCT> {
    return entity.requestBuilder() as EntityBasedRequestBuilder<EntityCT>;
  }

  _entityConstructor: Constructable<EntityT>;
}
