import { EdmTypeShared } from '../../edm-types';
import { Entity, ODataVersionOf, Constructable } from '../../entity';
import { Filter } from '../../filter';
import { Field, FieldType } from '../field';

/**
 * @deprecated Since v1.27.0. Use [[EdmField]] instead.
 * Represents a property of an OData entity with an Edm type.
 *
 * `EdmTypeField`s are used as static properties of entities and are generated from the metadata, i.e. for each property of
 * an OData entity, that has an Edm type, there exists one static instance of `EdmTypeField` (or rather one of its subclasses) in the corresponding generated class file.
 * `EdmTypeField`s are used to represent the domain of more or less primitive values that can be used in select, filter and order by functions.
 * For example, when constructing a query on the BusinessPartner entity, an instance of `EdmTypeField<BusinessPartner, string>`
 * can be supplied as argument to the select function, e.g. `BusinessPartner.FIRST_NAME`.
 *
 * See also: [[Selectable]]
 *
 * @typeparam EntityT - Type of the entity the field belongs to
 * @typeparam FieldT - Type of the field
 */
export abstract class EdmTypeField<
  EntityT extends Entity,
  FieldT extends FieldType
> extends Field<EntityT> {
  /**
   * Creates an instance of EdmTypeField.
   *
   * @param fieldName - Actual name of the field used in the OData request
   * @param entityConstructor - Constructor type of the entity the field belongs to
   * @param edmType - Type of the field according to the metadata description
   */
  constructor(
    fieldName: string,
    entityConstructor: Constructable<EntityT>,
    readonly edmType: EdmTypeShared<ODataVersionOf<EntityT>>
  ) {
    super(fieldName, entityConstructor);
  }

  /**
   * Creates an instance of Filter for this field and the given value using the operator 'eq', i.e. `==`.
   *
   * @param value - Value to be used in the filter
   * @returns The resulting filter
   */
  equals(value: FieldT): Filter<EntityT, FieldT> {
    return new Filter(this.fieldPath(), 'eq', value, this.edmType);
  }

  /**
   * Creates an instance of Filter for this field and the given value using the operator 'ne', i.e. `!=`.
   *
   * @param value - Value to be used in the filter
   * @returns The resulting filter
   */
  notEquals(value: FieldT): Filter<EntityT, FieldT> {
    return new Filter(this.fieldPath(), 'ne', value, this.edmType);
  }
}
