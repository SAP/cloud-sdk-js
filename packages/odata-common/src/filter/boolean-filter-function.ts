import { EntityBase } from '../entity-base';
import {
  FilterFunction,
  FilterFunctionParameterType
} from './filter-function-base';
import { Filterable } from './filterable';

/**
 * Representation of a filter function, that returns a value of type boolean.
 */
export class BooleanFilterFunction<
  EntityT extends EntityBase
> extends FilterFunction<EntityT, boolean> {
  /**
   * Creates an instance of BooleanFilterFunction.
   * @param functionName - Name of the function that returns a boolean value
   * @param parameters - Representation of the parameters passed to the filter function
   */
  constructor(
    functionName: string,
    parameters: FilterFunctionParameterType<EntityT>[]
  ) {
    super(functionName, parameters, 'Edm.Boolean');
  }
}

/**
 * @internal
 * @param filterable
 */
export function isBooleanFilterFunction<EntityT extends EntityBase>(
  filterable: Filterable<EntityT>
): filterable is BooleanFilterFunction<EntityT> {
  return (
    typeof filterable['functionName'] !== 'undefined' &&
    typeof filterable['parameters'] !== 'undefined' &&
    filterable['edmType'] === 'Edm.Boolean'
  );
}
