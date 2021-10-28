import { EntityBase } from '../entity-base';
import { EdmTypeField } from './edm-type-field';
import { OrderableEdmTypeField } from './orderable-edm-type-field';

/**
 * @internal
 */
export type SimpleTypeFields<EntityT extends EntityBase> =
  | EdmTypeField<EntityT, any, boolean, true>
  | OrderableEdmTypeField<EntityT, any, boolean, true>;
