/*!
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { Entity } from '../entity';
import { Filter } from './filter';
import { FilterFunction, FilterFunctionParameterType } from './filter-function';

/**
 * Representation of a filter function, that has returns a value of type number. This supports int, double and decimal values.
 */
export class NumberFilterFunction<EntityT extends Entity> extends FilterFunction<EntityT, number> {
  /**
   * Creates an instance of NumberFilterFunction.
   * @param functionName Name of the function that returns a numeric value
   * @param parameters Representation of the parameters passed to the filter function
   * @param edmType Type of the returned numeric value. This influences the formatting of the returned value.
   */
  constructor(functionName: string, parameters: FilterFunctionParameterType<EntityT>[], edmType: 'Edm.Int32' | 'Edm.Double' | 'Edm.Decimal') {
    super(functionName, parameters);
    this.edmType = edmType;
  }

  /**
   * Creates an instance of Filter for this filter function and the given value using the operator 'gt', i.e. `>`.
   *
   * @param value Value to be used in the filter
   * @param edmType EdmType of the field to filter on
   * @returns The resulting filter
   */
  greaterThan(value: number): Filter<EntityT, number> {
    return new Filter(this, 'gt', value, this.edmType);
  }

  /**
   * Creates an instance of Filter for this filter function and the given value using the operator 'ge', i.e. `>=`.
   *
   * @param value Value to be used in the filter
   * @param edmType EdmType of the field to filter on
   * @returns The resulting filter
   */
  greaterOrEqual(value: number): Filter<EntityT, number> {
    return new Filter(this, 'ge', value, this.edmType);
  }

  /**
   * Creates an instance of Filter for this filter function and the given value using the operator 'lt', i.e. `<`.
   *
   * @param value Value to be used in the filter
   * @param edmType EdmType of the field to filter on
   * @returns The resulting filter
   */
  lessThan(value: number): Filter<EntityT, number> {
    return new Filter(this, 'lt', value, this.edmType);
  }

  /**
   * Creates an instance of Filter for this filter function and the given value using the operator 'le', i.e. `<=`.
   *
   * @param value Value to be used in the filter
   * @param edmType EdmType of the field to filter on
   * @returns The resulting filter
   */
  lessOrEqual(value: number): Filter<EntityT, number> {
    return new Filter(this, 'le', value, this.edmType);
  }
}
