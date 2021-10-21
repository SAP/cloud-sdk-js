import { Entity } from '../entity';
import {
  FilterFunction,
  FilterFunctionParameterType
} from './filter-function-base';

/**
 * Representation of a filter function, that returns a value of type string.
 */
export class StringFilterFunction<
  EntityT extends Entity
> extends FilterFunction<EntityT, string> {
  /**
   * Creates an instance of StringFilterFunction.
   * @param functionName - Name of the function that returns a string value
   * @param parameters - Representation of the parameters passed to the filter function
   */
  constructor(
    functionName: string,
    parameters: FilterFunctionParameterType<EntityT>[]
  ) {
    super(functionName, parameters, 'Edm.String');
  }
}
