/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { EntityBase } from '../entity';
import { EdmTypeShared } from '../edm-types';
import { SelectableEdmTypeField } from './edm-type-field';
import { Field } from './field';
import { ComplexTypeNamespace } from './complex-type-namespace';
import { ConstructorOrField, getEntityConstructor } from './complex-type-field';

/**
 * @experimental This is experimental and is subject to change. Use with caution.
 *
 * Creates an instance of CollectionField.
 *
 * @typeparam EntityT - Type of the entity the field belongs to
 * @typeparam FieldT - Type of the entries of the collection in the field
 *
 * @param _fieldName - Actual name of the field used in the OData request
 * @param _entityConstructor - The constructor of the entity this field belongs to
 * @param _fieldType - Type of the field according to the metadata description
 */
export class CollectionField<
  EntityT extends EntityBase,
  FieldT extends EdmTypeShared<'any'> | Record<string, any> = any
> extends Field<EntityT> implements SelectableEdmTypeField {
  readonly selectable: true;

  constructor(
    fieldName: string,
    fieldOf: ConstructorOrField<EntityT>,
    readonly _fieldType: FieldT | ComplexTypeNamespace<FieldT>
  ) {
    super(fieldName, getEntityConstructor(fieldOf));
  }
}
