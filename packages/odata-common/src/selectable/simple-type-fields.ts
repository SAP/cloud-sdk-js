import { Entity } from '../entity';
import { EdmTypeField } from './edm-type-field';

import { OrderableEdmTypeField } from './orderable-edm-type-field';

/**
 * @hidden
 */
export type SimpleTypeFields<EntityT extends Entity> =
  | EdmTypeField<EntityT, any, boolean, true>
  | OrderableEdmTypeField<EntityT, any, boolean, true>

