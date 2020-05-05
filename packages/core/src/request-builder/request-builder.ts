/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { Constructable } from '../constructable';
import { Entity, EntityIdentifiable } from '../entity';
import { ODataV2 } from '../odata-v2';

type EntityBasedRequestBuilder<
  EntityCT extends Constructable<Entity>
> = ReturnType<EntityCT['requestBuilder']>;

/**
 * @hidden
 */
export abstract class RequestBuilder<
  EntityT extends Entity<Version>,
  Version = ODataV2
> implements EntityIdentifiable<EntityT, Version> {
  static forEntity<EntityCT extends Constructable<Entity>>(
    entity: EntityCT
  ): EntityBasedRequestBuilder<EntityCT> {
    return entity.requestBuilder() as EntityBasedRequestBuilder<EntityCT>;
  }
  _version: Version;
  _entity: EntityT;
  _entityConstructor: Constructable<EntityT, {}, Version>;
}
