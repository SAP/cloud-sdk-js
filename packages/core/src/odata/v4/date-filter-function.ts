/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { EntityBase } from '../common/entity';
import {
  Filter,
  FilterFunction,
  FilterFunctionParameterType
} from '../common/filter';

/**
 * Representation of a filter function, that returns a value of type date. This supports DateTimeOffset values.
 */
export class DateFilterFunction<
  EntityT extends EntityBase
> extends FilterFunction<EntityT, number> {
  /**
   * Creates an instance of DateFilterFunction.
   * @param functionName - Name of the function that returns a numeric value
   * @param parameters - Representation of the parameters passed to the filter function
   * @param edmType - Type of the returned numeric value. This influences the formatting of the returned value.
   */
  constructor(
    functionName: string,
    parameters: FilterFunctionParameterType<EntityT>[]
  ) {
    super(functionName, parameters);
    this.edmType = 'Edm.DateTimeOffset';
  }

  /**
   * Creates an instance of Filter for this filter function and the given value using the operator 'gt', i.e. `>`.
   *
   * @param value - Value to be used in the filter
   * @param edmType - EdmType of the field to filter on
   * @returns The resulting filter
   */
  greaterThan(value: number): Filter<EntityT, number> {
    return new Filter(this, 'gt', value, this.edmType);
  }

  /**
   * Creates an instance of Filter for this filter function and the given value using the operator 'ge', i.e. `>=`.
   *
   * @param value - Value to be used in the filter
   * @param edmType - EdmType of the field to filter on
   * @returns The resulting filter
   */
  greaterOrEqual(value: number): Filter<EntityT, number> {
    return new Filter(this, 'ge', value, this.edmType);
  }

  /**
   * Creates an instance of Filter for this filter function and the given value using the operator 'lt', i.e. `<`.
   *
   * @param value - Value to be used in the filter
   * @param edmType - EdmType of the field to filter on
   * @returns The resulting filter
   */
  lessThan(value: number): Filter<EntityT, number> {
    return new Filter(this, 'lt', value, this.edmType);
  }

  /**
   * Creates an instance of Filter for this filter function and the given value using the operator 'le', i.e. `<=`.
   *
   * @param value - Value to be used in the filter
   * @param edmType - EdmType of the field to filter on
   * @returns The resulting filter
   */
  lessOrEqual(value: number): Filter<EntityT, number> {
    return new Filter(this, 'le', value, this.edmType);
  }
}
