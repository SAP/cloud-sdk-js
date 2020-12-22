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
export type SimpleTypeFields<EntityT extends Entity> =
  | BigNumberField<EntityT>
  | BinaryField<EntityT>
  | BooleanField<EntityT>
  | DateField<EntityT>
  | NumberField<EntityT>
  | StringField<EntityT>
  | TimeField<EntityT>
  | AnyField<EntityT>;
