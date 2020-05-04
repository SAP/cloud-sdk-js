/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { Constructable } from '../constructable-v4';
import { Entity, EntityIdentifiableV4 } from '../entity';
import { ODataV4 } from '../odata-v4';

type EntityBasedRequestBuilder<
  EntityCT extends Constructable<Entity<ODataV4>>
> = ReturnType<EntityCT['requestBuilder']>;

/**
 * @hidden
 */
export abstract class RequestBuilder<EntityT extends Entity<ODataV4>>
  implements EntityIdentifiableV4<EntityT> {
  static forEntity<EntityCT extends Constructable<Entity<ODataV4>>>(
    entity: EntityCT
  ): EntityBasedRequestBuilder<EntityCT> {
    return entity.requestBuilder() as EntityBasedRequestBuilder<EntityCT>;
  }

  _entity: EntityT;
  _entityConstructor: Constructable<EntityT>;
}
