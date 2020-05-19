/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { Constructable } from '../constructable';
import { EdmTypeShared } from '../edm-types';
import { EntityBase } from '../entity';
import { Field } from './field';

/**
 * Represents a property of an OData entity with a complex type.
 *
 * `ComplexTypeField`s are used as static properties of entities and are generated from the metadata, i.e. for each property of
 * an OData entity, that has a complex type, there exists one static instance of `ComplexTypeField` (or rather one of its subclasses) in the corresponding generated class file.
 * `ComplexTypeField`s are used to represent the domain of complex or custom structures that can be used in select, filter and order by functions.
 * For example, when constructing a query on the TimeSheetEntry entity, an instance of `ComplexTypeField<TimeSheetEntry>`
 * can be supplied as argument to the select function, e.g. `TimeSheetEntry.TIME_SHEET_DATA_FIELDS`.
 * Moreover, classes implementing this abstract class will provide property fields, that can be used for filtering and ordering.
 *
 * See also: [[Selectable]]
 *
 * @typeparam EntityT - Type of the entity the field belongs to
 */
export abstract class ComplexTypeField<
  EntityT extends EntityBase
> extends Field<EntityT> {
  /**
   * The constructor of the entity or the complex type this field belongs to
   */
  readonly fieldOf: ConstructorOrField<EntityT>;

  /**
   * Note that this property is crucial, although not really used.
   * If it is removed this class becomes structural equivalent to e.g. ComplexTypeStringPropertyField which leads to unexpected behavior on the `selectable` list of objects.
   */
  readonly complexTypeName: string | undefined;

  /**
   * Creates an instance of ComplexTypeField.
   *
   * @param fieldName - Actual name of the field used in the OData request
   * @param fieldOf - If the complex field is on root level of entity it is the entity otherwise the parent complex field
   */
  constructor(fieldName: string, fieldOf: ConstructorOrField<EntityT>);

  /**
   * @deprecated Since v1.19.0.
   *
   * Creates an instance of ComplexTypeField.
   *
   * @param fieldName - Actual name of the field used in the OData request
   * @param entityConstructor - Constructor type of the entity the field belongs to
   * @param complexTypeName - Type of the field according to the metadata description
   */
  constructor(
    fieldName: string,
    entityConstructor: Constructable<EntityT>,
    complexTypeName: string
  );

  /*
   * Union of the two possible constructors.
   */
  constructor(
    fieldName: string,
    fieldOf: ConstructorOrField<EntityT>,
    complexTypeName?: string
  ) {
    super(fieldName, getEntityConstructor(fieldOf));
    this.fieldOf = fieldOf;
    this.complexTypeName = complexTypeName;
  }

  fieldPath(): string {
    const value =
      this.fieldOf instanceof ComplexTypeField
        ? `${this.fieldOf.fieldPath()}/${this._fieldName}`
        : this._fieldName;
    return value;
  }
}

export type ConstructorOrField<EntityT extends EntityBase> =
  | Constructable<EntityT>
  | ComplexTypeField<EntityT>;

/**
 * Convenience method to return the entity constructor in the complex extensions of the normal fields e.g. ComplexTypeStringPropertyField
 * @param arg - Contains either the entity containing the complex field or a complex field in case of nested fields.
 * @returns Constructable
 */
export function getEntityConstructor<EntityT extends EntityBase>(
  arg: Constructable<EntityT> | ComplexTypeField<EntityT>
): Constructable<EntityT> {
  return arg instanceof ComplexTypeField ? arg._entityConstructor : arg;
}

/**
 * Convenience method to return the EDM type for the overloaed constructor e.g. ComplexTypeStringPropertyField
 * @param arg1 - Contains either the type name or the EdmType
 * @param arg2 - Contains either the EdmType or undefined
 * @returns EdmType
 */
export function getEdmType<T extends 'v2' | 'v4'>(
  arg1: string | EdmTypeShared<T>,
  arg2: EdmTypeShared<T> | undefined
): EdmTypeShared<T> {
  if ((arg1 as string).includes('Edm.') && !arg2) {
    return arg1 as EdmTypeShared<T>;
  }
  if (typeof arg1 === 'string' && arg2 && (arg2 as string).includes('Edm.')) {
    return arg2 as EdmTypeShared<T>;
  }
  throw new Error('Illegal argument exception!');
}
