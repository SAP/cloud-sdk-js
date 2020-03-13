/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { Constructable } from '../constructable';
import { Entity } from '../entity';

export class AllFields<EntityT extends Entity> {
  readonly selectable: true;

  constructor(public _fieldName: string, public _entityConstructor: Constructable<EntityT>) {
    this._fieldName = '*';
  }
}
