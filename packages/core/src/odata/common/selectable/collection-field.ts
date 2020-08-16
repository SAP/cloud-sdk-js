/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { EntityBase } from '../entity';
import { EdmTypeShared } from '../edm-types';
import { SelectableEdmTypeField } from './edm-type-field';
import { Field } from './field';
import { ComplexTypeNamespace } from './complex-type-namespace';
import { getEntityConstructor } from './complex-type-field';
import { ConstructorOrField } from './constructor-or-field';

/**
 * @experimental This is experimental and is subject to change. Use with caution.
 *
 * Represents a static field of an entity or complex type.
 *
 * @typeparam EntityT - Type of the entity the field belongs to
 * @typeparam FieldT - Type of the entries of the collection in the field
 */
export class CollectionField<
  EntityT extends EntityBase,
  // todo there is not super class for enum like TestEnumType
  FieldT extends EdmTypeShared<'any'> | any | Record<string, any> = any
> extends Field<EntityT> implements SelectableEdmTypeField {
  readonly selectable: true;

  /**
   * @experimental This is experimental and is subject to change. Use with caution.
   *
   * Creates an instance of CollectionField.
   *
   * @param fieldName - Actual name of the field used in the OData request.
   * @param fieldOf - The constructor of the entity or the complex type field this field belongs to.
   * @param _fieldType - Type of the field according to the metadata description.
   */
  constructor(
    fieldName: string,
    fieldOf: ConstructorOrField<EntityT>,
    // todo same as the todo in the class signature
    readonly _fieldType: FieldT | any | ComplexTypeNamespace<FieldT>
  ) {
    super(fieldName, getEntityConstructor(fieldOf));
  }
}
