/* eslint-disable max-classes-per-file */
import { EdmTypeShared } from '../edm-types';
import { Entity } from '../entity';
import { EdmTypeField } from './edm-type-field';
import { OrderableEdmField } from './orderable-edm-field';
import { SelectableField } from './selectable';

export class SelectableEdmField<
    EntityT extends Entity,
    EdmT extends EdmTypeShared<'any'>,
    NullableT extends boolean = false
  >
  extends EdmTypeField<EntityT, EdmT, NullableT>
  implements SelectableField
{
  readonly selectable: true;
}

/**
 * Represents a selectable property with a number value.
 * @typeparam EntityT - Type of the entity the field belongs to
 */
export class SelectableOrderableEdmField<
    EntityT extends Entity,
    EdmT extends EdmTypeShared<'any'>,
    NullableT extends boolean = false
  >
  extends OrderableEdmField<EntityT, EdmT, NullableT>
  implements SelectableField
{
  readonly selectable: true;
}
