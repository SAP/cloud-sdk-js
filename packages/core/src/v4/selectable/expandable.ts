/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { Entity } from '../entity';
import { AllFields } from './all-fields';
import { OneToOneLink } from './one-to-one-link';
import { OneToManyLink } from './one-to-many-link';

/**
 * Represents all selectables, i.e. everything that can be used in a `.select` statement.
 *
 * @typeparam EntityT - Type of the entity to be selected on
 */

export type Expandable<EntityT extends Entity> =
  | OneToOneLink<EntityT, any>
  | OneToManyLink<EntityT, any>
  | AllFields<EntityT>;
