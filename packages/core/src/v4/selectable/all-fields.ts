/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { Constructable } from '../constructable';
import { Entity } from '../entity';
import { Field } from './field';

export class AllFields<EntityT extends Entity> extends Field<EntityT> {
  readonly selectable: true;
  readonly expandable: true;

  constructor(_fieldName: string, _entityConstructor: Constructable<EntityT>) {
    super('*', _entityConstructor);
  }
}
