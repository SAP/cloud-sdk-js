/*!
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { Constructable } from '../constructable';
import { EdmType } from '../edm-types';
import { Entity } from '../entity';
import { Filter } from '../filter';
import { ComplexTypeField } from './complex-type-field';
import { EdmTypeField, SelectableEdmTypeField } from './edm-type-field';

// tslint:disable: max-classes-per-file

/**
 * Represents a property with a number value.
 *
 * @typeparam EntityT Type of the entity the field belongs to
 */
export class NumberFieldBase<EntityT extends Entity> extends EdmTypeField<EntityT, number> {
  /**
   * Creates an instance of Filter for this field and the given value using the operator 'gt', i.e. `>`.
   *
   * @param value Value to be used in the filter
   * @returns The resulting filter
   */
  greaterThan(value: number): Filter<EntityT, number> {
    return new Filter(this.fieldPath(), 'gt', value, this.edmType);
  }

  /**
   * Creates an instance of Filter for this field and the given value using the operator 'ge', i.e. `>=`.
   *
   * @param value Value to be used in the filter
   * @returns The resulting filter
   */
  greaterOrEqual(value: number): Filter<EntityT, number> {
    return new Filter(this.fieldPath(), 'ge', value, this.edmType);
  }

  /**
   * Creates an instance of Filter for this field and the given value using the operator 'lt', i.e. `<`.
   *
   * @param value Value to be used in the filter
   * @returns The resulting filter
   */
  lessThan(value: number): Filter<EntityT, number> {
    return new Filter(this.fieldPath(), 'lt', value, this.edmType);
  }

  /**
   * Creates an instance of Filter for this field and the given value using the operator 'le', i.e. `<=`.
   *
   * @param value Value to be used in the filter
   * @returns The resulting filter
   */
  lessOrEqual(value: number): Filter<EntityT, number> {
    return new Filter(this.fieldPath(), 'le', value, this.edmType);
  }
}

/**
 * Represents a selectable property with a number value.
 *
 * @typeparam EntityT Type of the entity the field belongs to
 */
export class NumberField<EntityT extends Entity> extends NumberFieldBase<EntityT> implements SelectableEdmTypeField {
  readonly selectable: true;
}

/**
 * Represents a complex type property with a number value.
 *
 * @typeparam EntityT Type of the entity the field belongs to
 */
export class ComplexTypeNumberPropertyField<EntityT extends Entity> extends NumberFieldBase<EntityT> {
  /**
   * Creates an instance of ComplexTypeNumberPropertyField.
   *
   * @param fieldName Actual name of the field used in the OData request
   *  @param parentComplexField  Parent complex field
   * @param edmType Type of the field according to the metadata description
   */
  constructor(fieldName: string, readonly parentComplexField: ComplexTypeField<EntityT>, edmType: EdmType) {
    super(fieldName, parentComplexField._entityConstructor, edmType);
  }

  /**
   * Path to the field to be used in filter and order by queries. Combines the parent complex type name with the field name.
   *
   * @returns Path to the field to be used in filter and order by queries.
   */
  fieldPath(): string {
    return `${this.parentComplexField.pathToRootComplex}/${this._fieldName}`;
  }
}
