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
 * Interface to denote a selectable [[Field]].
 */
export interface SelectableField {
  /**
   * This property denotes that this is a selectable field.
   */
  selectable: true;
}

/**
 * @deprecated Since v1.27.0. Use [[SelectableField]] instead.
 * Interface denoting a selectable [[EdmTypeField]].
 */
export type SelectableEdmTypeField = SelectableField;
