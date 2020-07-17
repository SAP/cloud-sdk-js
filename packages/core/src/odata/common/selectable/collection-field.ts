/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { EntityBase, Constructable } from '../entity';
import { SelectableEdmTypeField } from './edm-type-field';
import { Field } from './field';
import { ComplexTypeField } from './complex-type-field';
import { SimpleTypeFields } from './simple-type-fields';

export class CollectionField<EntityT extends EntityBase> extends Field<EntityT>
  implements SelectableEdmTypeField {
  readonly selectable: true;
  constructor(
    readonly _fieldName: string,
    readonly _entityConstructor: Constructable<EntityT>,
    // TODO: for simple type fields this can be improved to just use the edm type
    // for complex types this is a little more complex due to the nature of complex types and should be revisted latest for v2.0
    readonly _fieldType:
      | SimpleTypeFields<EntityT>
      | ComplexTypeField<EntityT, any>
  ) {
    super(_fieldName, _entityConstructor);
  }
}
