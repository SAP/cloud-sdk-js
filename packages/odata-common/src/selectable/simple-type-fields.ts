import { EntityBase } from '../entity-base';
import { EdmTypeField } from './edm-type-field';
import { OrderableEdmTypeField } from './orderable-edm-type-field';

/**
 * Helper type to unite the {@link EdmTypeField} and {@link OrderableEdmTypeField} which are appearing often together.
 */
export type SimpleTypeFields<EntityT extends EntityBase> =
  | EdmTypeField<EntityT, any, any, boolean, true>
  | OrderableEdmTypeField<EntityT, any, any, boolean, true>;
