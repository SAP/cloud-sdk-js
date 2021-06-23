import { Entity, ODataVersionOf } from '../entity';
import type { CollectionField } from './collection-field';
import type { AllFields } from './all-fields';
import type { ComplexTypeField } from './complex-type-field';
import type { CustomField } from './custom-field';
import type { Link } from './link';
import type { SimpleTypeFields } from './simple-type-fields';

/**
 * Represents all selectables, i.e. everything that can be used in a `.select` statement.
 *
 * @typeparam EntityT - Type of the entity to be selected on
 */

export type Selectable<
  EntityT extends Entity,
  NullableT extends boolean = false
> = ODataVersionOf<EntityT> extends 'v2'
  ?
      | SimpleTypeFields<EntityT, NullableT>
      | Link<EntityT>
      | ComplexTypeField<EntityT>
      | CustomField<EntityT>
      | CollectionField<EntityT>
      | AllFields<EntityT>
  : ODataVersionOf<EntityT> extends 'v4'
  ?
      | SimpleTypeFields<EntityT, NullableT>
      | ComplexTypeField<EntityT>
      | CustomField<EntityT>
      | CollectionField<EntityT>
      | AllFields<EntityT>
  : never;
