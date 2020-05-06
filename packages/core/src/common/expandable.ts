/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { OneToOneLink, AllFields } from './selectable';
import { Entity } from './entity';
import { OneToManyLink } from './selectable/one-to-many-link';

/**
 * Represents all expandables, i.e. everything that can be used in a `.select` statement.
 *
 * @typeparam EntityT - Type of the entity to be selected on
 */

export type Expandable<EntityT extends Entity> = EntityT extends {
  _odataVersion: 'v2';
}
  ? never
  :
      | OneToOneLink<EntityT, any>
      | OneToManyLink<EntityT, any>
      | AllFields<EntityT>;
