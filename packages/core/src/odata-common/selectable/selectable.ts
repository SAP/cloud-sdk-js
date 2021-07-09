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
        | ComplexTypeField<EntityT, any, boolean, boolean>
        | CustomField<EntityT, boolean>
        | CollectionField<EntityT, any, boolean, boolean>
        | AllFields<EntityT>
    : ODataVersionOf<EntityT> extends 'v4'
    ?
        | SimpleTypeFields<EntityT>
        | ComplexTypeField<EntityT, any, boolean, boolean>
        | CustomField<EntityT, boolean>
        | CollectionField<EntityT, any, boolean, boolean>
        | AllFields<EntityT>
    : never;
