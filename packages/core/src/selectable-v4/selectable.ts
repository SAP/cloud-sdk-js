/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { Entity } from '../entity';
import { AllFields } from './all-fields';
import { CustomField } from './custom-field';
import { ODataV4 } from '../odata-v4';

/**
 * Represents all selectables, i.e. everything that can be used in a `.select` statement.
 *
 * @typeparam EntityT - Type of the entity to be selected on
 */

export type Selectable<EntityT extends Entity<ODataV4>> =
  | CustomField<EntityT>
  | AllFields<EntityT>;
