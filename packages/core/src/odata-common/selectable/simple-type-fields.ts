import { Entity } from '../entity';
import { BigNumberField } from './big-number-field';
import { BinaryField } from './binary-field';
import { BooleanField } from './boolean-field';
import { DateField } from './date-field';
import { NumberField } from './number-field';
import { StringField } from './string-field';
import { TimeField } from './time-field';
import { NullableBigNumberField } from './nullable-big-number-field';
import { NullableBinaryField } from './nullable-binary-field';
import { NullableBooleanField } from './nullable-boolean-field';
import { NullableDateField } from './nullable-date-field';
import { NullableNumberField } from './nullable-number-field';
import { NullableStringField } from './nullable-string-field';
import { NullableTimeField } from './nullable-time-field';
import { AnyField } from './any-field';

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
  | TimeField<EntityT>
  | NullableBigNumberField<EntityT>
  | NullableBinaryField<EntityT>
  | NullableBooleanField<EntityT>
  | NullableDateField<EntityT>
  | NullableNumberField<EntityT>
  | NullableStringField<EntityT>
  | NullableTimeField<EntityT>
  | AnyField<EntityT>;
