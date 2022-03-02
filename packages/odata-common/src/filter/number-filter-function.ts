import { EntityBase } from '../entity-base';
import { FilterFunctionParameterType } from './filter-function-base';
import { OrderableFilterFunction } from './orderable-filter-function';

/**
 * Representation of a filter function, that returns a value of type number. This supports int, double and decimal values.
 * @internal
 */
export class NumberFilterFunction<
  EntityT extends EntityBase
> extends OrderableFilterFunction<EntityT, number> {
  /**
   * Creates an instance of NumberFilterFunction.
   * @param functionName - Name of the function that returns a numeric value.
   * @param parameters - Representation of the parameters passed to the filter function.
   * @param edmType - Type of the returned numeric value. This influences the formatting of the returned value.
   */
  constructor(
    functionName: string,
    parameters: FilterFunctionParameterType<EntityT>[],
    edmType: 'Edm.Int32' | 'Edm.Double' | 'Edm.Decimal'
  ) {
    super(functionName, parameters, edmType);
  }
}
