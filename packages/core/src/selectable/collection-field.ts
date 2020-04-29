/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { Entity } from '../entity';
import { Constructable } from '../constructable';
import { SelectableEdmTypeField } from './edm-type-field';
import { SimpleTypeFields } from './simple-type-fields';
import { ComplexTypeField } from './complex-type-field';

export class CollectionField<EntityT extends Entity>
  implements SelectableEdmTypeField {
  readonly selectable: true;
  // Todo simple type field + complex + navi
  constructor(
    readonly _fieldName: string,
    readonly _entityConstructor: Constructable<EntityT>,
    readonly _elementType: SimpleTypeFields<EntityT> | ComplexTypeField<EntityT>
  ) {}
}
