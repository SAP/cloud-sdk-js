/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { Entity } from '../entity';
import { ODataV2 } from '../odata-v2';
import { AllFields } from './all-fields';
import { ComplexTypeField } from './complex-type-field';
import { CustomField } from './custom-field';
import { Link } from './link';
import { SimpleTypeFields } from './simple-type-fields';
import { ODataV4 } from '../odata-v4';
import { CollectionField } from './collection-field';



export type SelectableV2<EntityT extends Entity<Version>, Version = ODataV2> =
  | SimpleTypeFields<EntityT,Version>
  | Link<EntityT, any,Version>
  | ComplexTypeField<EntityT,Version>
  | CustomField<EntityT,Version>
  | AllFields<EntityT,Version>;


export type SelectableV4<EntityT extends Entity<ODataV4>> =
  | SelectableV2<EntityT,ODataV4>
  | CollectionField<EntityT>;


/**
 * Represents all selectables, i.e. everything that can be used in a `.select` statement.
 *
 * @typeparam EntityT - Type of the entity to be selected on
 */
export type Selectable<EntityT extends Entity<Version>, Version = ODataV2> =
   Version extends  ODataV4 ? SelectableV4<EntityT> : SelectableV2<EntityT>;
