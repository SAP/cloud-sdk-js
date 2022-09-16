import { EntityBase, ODataVersionOf } from '../entity-base';
import { DeSerializers } from '../de-serializers';
import { EntityApi } from '../entity-api';
import type { CollectionField } from './collection-field';
import type { AllFields } from './all-fields';
import type { ComplexTypeField } from './complex-type-field';
import type { CustomField } from './custom-field';
import type { Link } from './link';
import type { SimpleTypeFields } from './simple-type-fields';

/**
 * Union type of all selectable fields.
 */
export type Selectable<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers
> = ODataVersionOf<EntityT> extends 'v2'
  ?
      | SimpleTypeFields<EntityT>
      | Link<EntityT, DeSerializersT, EntityApi<EntityBase, DeSerializersT>>
      | ComplexTypeField<EntityT, DeSerializersT, any, boolean, boolean>
      | CustomField<EntityT, any, boolean>
      | CollectionField<EntityT, DeSerializersT, any, boolean, boolean>
      | AllFields<EntityT>
  : ODataVersionOf<EntityT> extends 'v4'
  ?
      | SimpleTypeFields<EntityT>
      | ComplexTypeField<EntityT, DeSerializersT, any, boolean, boolean>
      | CustomField<EntityT, DeSerializersT, boolean>
      | CollectionField<EntityT, DeSerializersT, any, boolean, boolean>
      | AllFields<EntityT>
  : never;
