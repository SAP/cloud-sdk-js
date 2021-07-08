import { Entity, ODataVersionOf } from '../entity';
import type { CollectionField } from './collection-field';
import type { AllFields } from './all-fields';
import type { ComplexTypeField } from './complex-type-field';
import type { CustomField } from './custom-field';
import type { Link } from './link';
import type { SimpleTypeFields } from './simple-type-fields';

export type Selectable<EntityT extends Entity> =
  ODataVersionOf<EntityT> extends 'v2'
    ?
        | SimpleTypeFields<EntityT>
        | Link<EntityT>
        | ComplexTypeField<EntityT>
        | CustomField<EntityT>
        | CollectionField<EntityT>
        | AllFields<EntityT>
    : ODataVersionOf<EntityT> extends 'v4'
    ?
        | SimpleTypeFields<EntityT>
        | ComplexTypeField<EntityT>
        | CustomField<EntityT>
        | CollectionField<EntityT>
        | AllFields<EntityT>
    : never;

/**
 * @deprecated Since v1.27.0. This will not be replaced. Use the generic `SelectableT` parameter of Fields instead.
 * Interface denoting a selectable [[EdmTypeField]].
 */
export interface SelectableEdmTypeField {
  /**
   * This property denotes that this is a selectable field.
   */
  selectable: true;
}
