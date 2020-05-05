/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { Entity } from '../entity';
import { AllFields } from './all-fields';
import { ComplexTypeField } from './complex-type-field';
import { CustomField } from './custom-field';
import { Link } from './link';
import { SimpleTypeFields } from './simple-type-fields';

/**
 * Represents all selectables, i.e. everything that can be used in a `.select` statement.
 *
 * @typeparam EntityT - Type of the entity to be selected on
 */

export type Selectable<EntityT extends Entity> =
  | SimpleTypeFields<EntityT>
  | Link<EntityT, any>
  | ComplexTypeField<EntityT>
  | CustomField<EntityT>
  | AllFields<EntityT>;
