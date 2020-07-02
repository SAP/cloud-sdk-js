/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { EntityBase, Constructable } from '../entity';

export class AllFields<EntityT extends EntityBase> {
  readonly selectable: true;

  constructor(
    public _fieldName: string,
    public _entityConstructor: Constructable<EntityT>
  ) {
    this._fieldName = '*';
  }
}
