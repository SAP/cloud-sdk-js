/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
/* eslint-disable max-classes-per-file */

import { Constructable } from '../constructable';
import { EdmType } from '../edm-types';
import { Entity } from '../entity';
import { ODataV4 } from '../odata-v4';
import { SelectableEdmTypeField } from './edm-type-field';

/**
 * Represents a property with a string value.
 *
 * @typeparam EntityT - Type of the entity the field belongs to
 */
class CollectionFieldBase<EntityT extends Entity<ODataV4>> {
  constructor(
    readonly _fieldName: string,
    readonly _entityConstructor: Constructable<EntityT, {}, ODataV4>,
    readonly edmType: EdmType
  ) {}
}

/**
 * Represents a selectable property with a string value.
 *
 * @typeparam EntityT - Type of the entity the field belongs to
 */
export class CollectionField<EntityT extends Entity<ODataV4>>
  extends CollectionFieldBase<EntityT>
  implements SelectableEdmTypeField {
  readonly selectable: true;
}
