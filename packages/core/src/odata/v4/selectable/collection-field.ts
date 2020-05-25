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
    // TODO because complex type field is then used when calling `deserializeComplexType`
    readonly _fieldType: SimpleTypeFields<EntityT> | ComplexTypeField<EntityT>
  ) {
    super(_fieldName, _entityConstructor);
  }
}
