import { Entity } from '../entity';
import { BigNumberField } from './big-number-field';
import { BinaryField } from './binary-field';
import { BooleanField } from './boolean-field';
import { DateField } from './date-field';
import { NumberField } from './number-field';
import { StringField } from './string-field';
import { TimeField } from './time-field';
import { AnyField } from './any-field';

/**
 * @hidden
 */
export type SimpleTypeFields<
  EntityT extends Entity,
  NullableT extends boolean = false
> =
  | BigNumberField<EntityT, NullableT>
  | BinaryField<EntityT, NullableT>
  | BooleanField<EntityT, NullableT>
  | DateField<EntityT, NullableT>
  | NumberField<EntityT, NullableT>
  | StringField<EntityT, NullableT>
  | TimeField<EntityT, NullableT>
  | AnyField<EntityT>;
