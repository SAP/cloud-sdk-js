import { EdmTypeShared } from '../edm-types';
import { Entity, ODataVersionOf, Constructable } from '../entity';
import { Filter } from '../filter';
import { Field, FieldType } from './field';

export abstract class EdmTypeField<
  EntityT extends Entity,
  FieldT extends FieldType,
  NullableT extends boolean = false
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
    readonly edmType: EdmTypeShared<ODataVersionOf<EntityT>>,
    readonly isNullable: NullableT = false as NullableT
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

/**
 * Interface denoting a selectable [[EdmTypeField]].
 */
export interface SelectableEdmTypeField {
  /**
   * This property denotes that this is a selectable edm type field.
   */
  selectable: true;
}
