/*!
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { BigNumber } from 'bignumber.js';
import { Constructable } from '../constructable';
import { EdmType } from '../edm-types';
import { Entity } from '../entity';
import { Filter } from '../filter';
import { EdmTypeField, SelectableEdmTypeField } from './edm-type-field';

// tslint:disable: max-classes-per-file

/**
 * Represents a property with a big number value.
 *
 * @typeparam EntityT Type of the entity the field belongs to
 */
class BigNumberFieldBase<EntityT extends Entity> extends EdmTypeField<EntityT, BigNumber> {
  /**
   * Creates an instance of Filter for this field and the given value using the operator 'gt', i.e. `>`.
   *
   * @param value Value to be used in the filter
   * @returns The resulting filter
   */
  greaterThan(value: BigNumber): Filter<EntityT, BigNumber> {
    return new Filter(this.fieldPath(), 'gt', value, this.edmType);
  }

  /**
   * Creates an instance of Filter for this field and the given value using the operator 'ge', i.e. `>=`.
   *
   * @param value Value to be used in the filter
   * @returns The resulting filter
   */
  greaterOrEqual(value: BigNumber): Filter<EntityT, BigNumber> {
    return new Filter(this.fieldPath(), 'ge', value, this.edmType);
  }

  /**
   * Creates an instance of Filter for this field and the given value using the operator 'lt', i.e. `<`.
   *
   * @param value Value to be used in the filter
   * @returns The resulting filter
   */
  lessThan(value: BigNumber): Filter<EntityT, BigNumber> {
    return new Filter(this.fieldPath(), 'lt', value, this.edmType);
  }

  /**
   * Creates an instance of Filter for this field and the given value using the operator 'le', i.e. `<=`.
   *
   * @param value Value to be used in the filter
   * @returns The resulting filter
   */
  lessOrEqual(value: BigNumber): Filter<EntityT, BigNumber> {
    return new Filter(this.fieldPath(), 'le', value, this.edmType);
  }
}

/**
 * Represents a selectable property with a big number value.
 *
 * @typeparam EntityT Type of the entity the field belongs to
 */
export class BigNumberField<EntityT extends Entity> extends BigNumberFieldBase<EntityT> implements SelectableEdmTypeField {
  readonly selectable: true;
}

/**
 * Represents a complex type property with a big number value.
 *
 * @typeparam EntityT Type of the entity the field belongs to
 */
export class ComplexTypeBigNumberPropertyField<EntityT extends Entity> extends BigNumberFieldBase<EntityT> {
  /**
   * Creates an instance of ComplexTypeBigNumberPropertyField.
   *
   * @param fieldName Actual name of the field used in the OData request
   * @param entityConstructor Constructor type of the entity the field belongs to
   * @param parentTypeName Name of the parent complex type
   * @param edmType Type of the field according to the metadata description
   */
  constructor(fieldName: string, entityConstructor: Constructable<EntityT>, readonly parentTypeName: string, edmType: EdmType) {
    super(fieldName, entityConstructor, edmType);
  }

  /**
   * Path to the field to be used in filter and order by queries. Combines the parent complex type name with the field name.
   *
   * @returns Path to the field to be used in filter and order by queries.
   */
  fieldPath(): string {
    return `${this.parentTypeName}/${this._fieldName}`;
  }
}
