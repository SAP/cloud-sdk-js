/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { EntityBase } from '../entity';
import {
  FilterFunction,
  FilterFunctionParameterType
} from './filter-function-base';

/**
 * Representation of a filter function, that returns a value of type boolean.
 */
export class BooleanFilterFunction<
  EntityT extends EntityBase
> extends FilterFunction<EntityT, boolean> {
  /**
   * Creates an instance of BooleanFilterFunction.
   * @param functionName - - Name of the function that returns a boolean value
   * @param parameters - - Representation of the parameters passed to the filter function
   */
  constructor(
    functionName: string,
    parameters: FilterFunctionParameterType<EntityT>[]
  ) {
    super(functionName, parameters, 'Edm.Boolean');
  }
}
