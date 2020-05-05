/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { Entity, EntityODataV4 } from '../entity';
import { AllFields, AllFieldsODataV4 } from './all-fields';
import { ComplexTypeField, ComplexTypeFieldODataV4 } from './complex-type-field';
import { CustomField, CustomFieldODataV4 } from './custom-field';
import { Link, LinkODataV4 } from './link';
import { SimpleTypeFields, SimpleTypeFieldsODataV4 } from './simple-type-fields';
import { CollectionFieldODataV4 } from './collection-field';

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

export type SelectableODataV4<EntityT extends EntityODataV4> =
  | SimpleTypeFieldsODataV4<EntityT>
  | LinkODataV4<EntityT, any>
  | ComplexTypeFieldODataV4<EntityT>
  | CustomFieldODataV4<EntityT>
  | AllFieldsODataV4<EntityT>
  | CollectionFieldODataV4<EntityT>;
