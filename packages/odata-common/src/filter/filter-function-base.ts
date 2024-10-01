import { Filter } from './filter';
import type moment from 'moment';
import type { EdmTypeShared } from '../edm-types';
import type { EntityBase, ODataVersionOf } from '../entity-base';
import type { Field } from '../selectable';

/**
 * Data structure to represent OData filter functions.
 * Use the factory function {@link filterFunction} to create instances of `FilterFunction`.
 */
export abstract class FilterFunction<EntityT extends EntityBase, ReturnT> {
  /**
   * Creates an instance of FilterFunction.
   * @param functionName - Name of the function.
   * @param parameters - Representation of the parameters passed to the filter function.
   * @param edmType - EDM type of the return type of the filter function.
   */
  constructor(
    readonly functionName: string,
    readonly parameters: FilterFunctionParameterType<EntityT>[],
    readonly edmType: EdmTypeShared<ODataVersionOf<EntityT>>
  ) {}

  /**
   * Creates an instance of Filter for this filter function and the given value using the operator 'eq', i.e. `==`.
   * @param value - Value to be used in the filter.
   * @returns The resulting filter.
   */
  equals(value: ReturnT): Filter<EntityT, any, ReturnT> {
    return new Filter(this, 'eq', value, this.edmType);
  }

  /**
   * Creates an instance of Filter for this filter function and the given value using the operator 'ne', i.e. `!=`.
   * @param value - Value to be used in the filter.
   * @returns The resulting filter.
   */
  notEquals(value: ReturnT): Filter<EntityT, any, ReturnT> {
    return new Filter(this, 'ne', value, this.edmType);
  }
}

/**
 * Primitive type of a parameter of a filter function.
 */
export type FilterFunctionPrimitiveParameterType =
  | number
  | string
  | moment.Moment;

/**
 * Type of a parameter of a filter function. This can either be a primitive type, a reference to a field or another filter function.
 */
export type FilterFunctionParameterType<EntityT extends EntityBase> =
  | FilterFunctionPrimitiveParameterType
  | Field<EntityT, boolean, boolean>
  | FilterFunction<EntityT, any>
  | FilterFunctionPrimitiveParameterType[];
