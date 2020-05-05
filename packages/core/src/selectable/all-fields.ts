/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { Constructable, ConstructableODataV4 } from '../constructable';
import { Entity, EntityODataV4 } from '../entity';

export class AllFields<EntityT extends Entity> {
  readonly selectable: true;

  constructor(
    public _fieldName: string,
    public _entityConstructor: Constructable<EntityT>
  ) {
    this._fieldName = '*';
  }
}

export class AllFieldsODataV4<EntityT extends EntityODataV4> {
  readonly selectable: true;

  constructor(
    public _fieldName: string,
    public _entityConstructor: ConstructableODataV4<EntityT>
  ) {
    this._fieldName = '*';
  }
}
