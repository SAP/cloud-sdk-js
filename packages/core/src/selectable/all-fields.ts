/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { Constructable } from '../constructable';
import { Entity } from '../entity';
import { ODataV2 } from '../odata-v2';

export class AllFields<EntityT extends Entity<Version>, Version = ODataV2> {
  readonly selectable: true;

  constructor(
    public _fieldName: string,
    public _entityConstructor: Constructable<EntityT, {}, Version>
  ) {
    this._fieldName = '*';
  }
}
