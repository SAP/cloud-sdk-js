/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { Entity, EntityODataV4 } from '../entity';
import { Constructable, ConstructableODataV4 } from '../constructable';
import { SelectableEdmTypeField } from './edm-type-field';
import { SimpleTypeFields, SimpleTypeFieldsODataV4 } from './simple-type-fields';
import { ComplexTypeField, ComplexTypeFieldODataV4 } from './complex-type-field';

export class CollectionFieldODataV4<EntityT extends EntityODataV4>
  implements SelectableEdmTypeField {
  readonly selectable: true;
  // Todo simple type field + complex + navi
  constructor(
    readonly _fieldName: string,
    readonly _entityConstructor: ConstructableODataV4<EntityT>,
    readonly _elementType: SimpleTypeFieldsODataV4<EntityT> | ComplexTypeFieldODataV4<EntityT>
  ) {}
}
