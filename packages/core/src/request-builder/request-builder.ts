/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { Constructable, ConstructableODataV4 } from '../constructable';
import { Entity, EntityIdentifiable, EntityIdentifiableODataV4, EntityODataV4 } from '../entity';

type EntityBasedRequestBuilder<
  EntityCT extends Constructable<Entity>
> = ReturnType<EntityCT['requestBuilder']>;

type EntityBasedRequestBuilderODataV4<
  EntityCT extends ConstructableODataV4<EntityODataV4>
  > = ReturnType<EntityCT['requestBuilder']>;

/**
 * @hidden
 */
export abstract class RequestBuilder<EntityT extends Entity>
  implements EntityIdentifiable<EntityT> {
  static forEntity<EntityCT extends Constructable<Entity>>(
    entity: EntityCT
  ): EntityBasedRequestBuilder<EntityCT> {
    return entity.requestBuilder() as EntityBasedRequestBuilder<EntityCT>;
  }

  _entity: EntityT;
  _entityConstructor: Constructable<EntityT>;
}

export abstract class RequestBuilderODataV4<EntityT extends EntityODataV4>
  implements EntityIdentifiableODataV4<EntityT> {
  static forEntity<EntityCT extends ConstructableODataV4<EntityODataV4>>(
    entity: EntityCT
  ): EntityBasedRequestBuilderODataV4<EntityCT> {
    return entity.requestBuilder() as EntityBasedRequestBuilderODataV4<EntityCT>;
  }

  _entity: EntityT;
  _entityConstructor: ConstructableODataV4<EntityT>;
}
