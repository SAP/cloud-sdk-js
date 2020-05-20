/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { Entity } from '../entity';
import {
  ComplexTypeField,
  Field,
  SelectableEdmTypeField,
  SimpleTypeFields
} from '../../common/selectable';
import { Constructable } from '../../common';

export class CollectionField<EntityT extends Entity> extends Field<EntityT>
  implements SelectableEdmTypeField {
  readonly selectable: true;
  constructor(
    readonly _fieldName: string,
    readonly _entityConstructor: Constructable<EntityT>,
    readonly _elementType: SimpleTypeFields<EntityT> | ComplexTypeField<EntityT>
  ) {
    super(_fieldName, _entityConstructor);
  }
}
