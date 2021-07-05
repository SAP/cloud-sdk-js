import { Entity } from '../entity';
import { BigNumberField } from './legacy/big-number-field';
import { BinaryField } from './binary-field';
import { BooleanField } from './boolean-field';
import { DateField } from './legacy/date-field';
import { NumberField } from './legacy/number-field';
import { StringField } from './legacy/string-field';
import { TimeField } from './time-field';
import { AnyField } from './legacy/any-field';
import {
  SelectableGreaterOrLessEdmTypeField
} from './field-builder';
import { SelectableEdmField } from './selectable-edm-field';

/**
 * @hidden
 */
export type SimpleTypeFields<EntityT extends Entity> =
  | SelectableEdmField<EntityT, any, boolean>
  | SelectableGreaterOrLessEdmTypeField<EntityT, any, boolean>
  | BigNumberField<EntityT>
  | BinaryField<EntityT>
  | BooleanField<EntityT>
  | DateField<EntityT>
  | NumberField<EntityT>
  | StringField<EntityT>
  | TimeField<EntityT>
  | AnyField<EntityT>;
