/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { EntityBase, ODataVersionOf } from '../entity';
import { CollectionField } from './collection-field';
import { AllFields } from './all-fields';
import { ComplexTypeField } from './complex-type-field';
import { CustomFieldBase } from './custom-field';
import { Link } from './link';
import { SimpleTypeFields } from './simple-type-fields';

/**
 * Represents all selectables, i.e. everything that can be used in a `.select` statement.
 *
 * @typeparam EntityT - Type of the entity to be selected on
 */

export type Selectable<EntityT extends EntityBase> = ODataVersionOf<
  EntityT
> extends 'v2'
  ?
      | SimpleTypeFields<EntityT>
      | Link<EntityT, any>
      | ComplexTypeField<EntityT>
      | CustomFieldBase<EntityT>
      | CollectionField<EntityT>
      | AllFields<EntityT>
  : ODataVersionOf<EntityT> extends 'v4'
  ?
      | SimpleTypeFields<EntityT>
      | ComplexTypeField<EntityT>
      | CustomFieldBase<EntityT>
      | CollectionField<EntityT>
      | AllFields<EntityT>
  : never;
