/*!
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { Constructable } from '../constructable';
import { Entity } from '../entity';
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
 * @typeparam EntityT Type of the entity the field belongs to
 */
export abstract class ComplexTypeField<EntityT extends Entity> extends Field<EntityT> {
  readonly pathToRootComplex;

  /**
   * Creates an instance of ComplexTypeField.
   *
   * @param fieldName Actual name of the field used in the OData request
   * @param rootEntityOrParentComplexField If the complex field is on root level of entity it is the entity otherwise the parent complex field
   * @param complexTypeName Type of the field according to the metadata description
   */
  constructor(fieldName: string, rootEntityOrParentComplexField: Constructable<Entity> | ComplexTypeField<EntityT>) {
    super(fieldName, (rootEntityOrParentComplexField as ComplexTypeField<EntityT>)._entityConstructor || rootEntityOrParentComplexField);
    const pathToRoot = (rootEntityOrParentComplexField as ComplexTypeField<EntityT>).pathToRootComplex;
    this.pathToRootComplex = pathToRoot ? `${pathToRoot}/${fieldName}` : fieldName;
  }
}
