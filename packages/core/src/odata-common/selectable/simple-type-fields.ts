import { Entity } from '../entity';
import { EdmTypeField } from './edm-type-field';
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
import { OrderableEdmTypeField } from './orderable-edm-type-field';

/**
 * @hidden
 */
export type SimpleTypeFields<EntityT extends Entity> =
  | EdmTypeField<EntityT, any, boolean, true>
  | OrderableEdmTypeField<EntityT, any, boolean, true>
  | BigNumberField<EntityT>
  | BinaryField<EntityT>
  | BooleanField<EntityT>
  | DateField<EntityT>
  | NumberField<EntityT>
  | StringField<EntityT>
  | TimeField<EntityT>
  | AnyField<EntityT>;
