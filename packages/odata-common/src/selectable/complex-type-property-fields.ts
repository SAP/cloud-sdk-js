import { Entity } from '../entity';
import { EdmTypeField } from './edm-type-field';

import { OrderableEdmTypeField } from './orderable-edm-type-field';

/**
 * @hidden
 */
export type ComplexTypePropertyFields<EntityT extends Entity, ComplexT> =
  | EdmTypeField<EntityT, any, boolean, false>
  | OrderableEdmTypeField<EntityT, any, boolean, false>

