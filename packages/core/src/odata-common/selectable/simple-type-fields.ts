import { Entity } from '../entity';
import {
  AnyField,
  BigNumberField,
  BinaryField,
  BooleanField,
  DateField,
  NumberField,
  StringField,
  TimeField
} from './legacy';
import {
  SelectableEdmField,
  SelectableOrderableEdmField
} from './selectable-edm-field';

/**
 * @hidden
 */
export type SimpleTypeFields<EntityT extends Entity> =
  | SelectableEdmField<EntityT, any, boolean>
  | SelectableOrderableEdmField<EntityT, any, boolean>
  | BigNumberField<EntityT>
  | BinaryField<EntityT>
  | BooleanField<EntityT>
  | DateField<EntityT>
  | NumberField<EntityT>
  | StringField<EntityT>
  | TimeField<EntityT>
  | AnyField<EntityT>;
