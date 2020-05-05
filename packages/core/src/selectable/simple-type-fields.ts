/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { Entity, EntityODataV4 } from '../entity';
import { BigNumberField, BigNumberFieldODataV4 } from './big-number-field';
import { BinaryField, BinaryFieldODataV4 } from './binary-field';
import { BooleanField, BooleanFieldODataV4 } from './boolean-field';
import { DateField, DateFieldODataV4 } from './date-field';
import { NumberField, NumberFieldODataV4 } from './number-field';
import { StringField, StringFieldODataV4 } from './string-field';
import { TimeField, TimeFieldODataV4 } from './time-field';

/**
 * @hidden
 */
export type SimpleTypeFields<EntityT extends Entity> =
  | BigNumberField<EntityT>
  | BinaryField<EntityT>
  | BooleanField<EntityT>
  | DateField<EntityT>
  | NumberField<EntityT>
  | StringField<EntityT>
  | TimeField<EntityT>;

export type SimpleTypeFieldsODataV4<EntityT extends EntityODataV4> =
  | BigNumberFieldODataV4<EntityT>
  | BinaryFieldODataV4<EntityT>
  | BooleanFieldODataV4<EntityT>
  | DateFieldODataV4<EntityT>
  | NumberFieldODataV4<EntityT>
  | StringFieldODataV4<EntityT>
  | TimeFieldODataV4<EntityT>;
