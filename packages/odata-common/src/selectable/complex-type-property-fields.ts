import { EntityBase } from '../entity-base';
import { EdmTypeField } from './edm-type-field';
import { OrderableEdmTypeField } from './orderable-edm-type-field';

/**
 * A complex type contains multiple properties.
 * This type represents the possible types of these properties.
 */
export type ComplexTypePropertyFields<EntityT extends EntityBase> =
  | EdmTypeField<EntityT, any, any, boolean, false>
  | OrderableEdmTypeField<EntityT, any, any, boolean, false>;
