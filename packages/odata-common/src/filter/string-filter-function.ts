import { EntityBase } from '../entity-base';
import { FilterFunctionParameterType } from './filter-function-base';
import { OrderableFilterFunction } from './orderable-filter-function';

/**
 * Representation of a filter function, that returns a value of type string.
 */
export class StringFilterFunction<
  EntityT extends EntityBase
> extends OrderableFilterFunction<EntityT, string> {
  /**
   * Creates an instance of StringFilterFunction.
   * @param functionName - Name of the function that returns a string value.
   * @param parameters - Representation of the parameters passed to the filter function.
   */
  constructor(
    functionName: string,
    parameters: FilterFunctionParameterType<EntityT>[]
  ) {
    super(functionName, parameters, 'Edm.String');
  }
}
