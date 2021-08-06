import { Entity, ODataVersionOf } from '../entity';
import { FieldType } from '../selectable';
import { EdmTypeShared } from '../edm-types';
import { Filter } from './filter';
import {
  FilterFunction,
  FilterFunctionParameterType
} from './filter-function-base';

/**
 * Representation of a filter function, that returns a value of an orderable type. This supports int, double and decimal values.
 */
export abstract class OrderableFilterFunction<
  EntityT extends Entity,
  ReturnT extends FieldType
> extends FilterFunction<EntityT, ReturnT> {
  /**
   * Creates an instance of OrderableFilterFunction.
   * @param functionName - Name of the function that returns a numeric value
   * @param parameters - Representation of the parameters passed to the filter function
   * @param edmType - Type of the returned numeric value. This influences the formatting of the returned value.
   */
  constructor(
    functionName: string,
    parameters: FilterFunctionParameterType<EntityT>[],
    edmType: EdmTypeShared<ODataVersionOf<EntityT>>
  ) {
    super(functionName, parameters, edmType);
  }

  /**
   * Creates an instance of Filter for this filter function and the given value using the operator 'gt', i.e. `>`.
   * @param value - Value to be used in the filter
   * @param edmType - EdmType of the field to filter on
   * @returns The resulting filter
   */
  greaterThan(value: ReturnT): Filter<EntityT, ReturnT> {
    return new Filter(this, 'gt', value, this.edmType);
  }

  /**
   * Creates an instance of Filter for this filter function and the given value using the operator 'ge', i.e. `>=`.
   * @param value - Value to be used in the filter
   * @param edmType - EdmType of the field to filter on
   * @returns The resulting filter
   */
  greaterOrEqual(value: ReturnT): Filter<EntityT, ReturnT> {
    return new Filter(this, 'ge', value, this.edmType);
  }

  /**
   * Creates an instance of Filter for this filter function and the given value using the operator 'lt', i.e. `<`.
   * @param value - Value to be used in the filter
   * @param edmType - EdmType of the field to filter on
   * @returns The resulting filter
   */
  lessThan(value: ReturnT): Filter<EntityT, ReturnT> {
    return new Filter(this, 'lt', value, this.edmType);
  }

  /**
   * Creates an instance of Filter for this filter function and the given value using the operator 'le', i.e. `<=`.
   * @param value - Value to be used in the filter
   * @param edmType - EdmType of the field to filter on
   * @returns The resulting filter
   */
  lessOrEqual(value: ReturnT): Filter<EntityT, ReturnT> {
    return new Filter(this, 'le', value, this.edmType);
  }
}
