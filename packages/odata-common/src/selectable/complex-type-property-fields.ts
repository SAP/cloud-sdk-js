import { EntityBase } from '../entity-base';
import { EdmTypeField } from './edm-type-field';
import { OrderableEdmTypeField } from './orderable-edm-type-field';

/**
 * @internal
 */
export type ComplexTypePropertyFields<EntityT extends EntityBase> =
  | EdmTypeField<EntityT, any, any, boolean, false>
  | OrderableEdmTypeField<EntityT, any, any, boolean, false>;
