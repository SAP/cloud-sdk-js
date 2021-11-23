import { EntityBase } from '../entity-base';
import {
  NewFilterFunction,
  NewFilterFunctionParameterType
} from './filter-function-base-new';
import { Filterable } from './filterable';

/**
 * Representation of a filter function, that returns a value of type boolean.
 */
export class NewBooleanFilterFunction<
  EntityT extends EntityBase
> extends NewFilterFunction<EntityT, boolean> {
  /**
   * Creates an instance of BooleanFilterFunction.
   * @param functionName - Name of the function that returns a boolean value
   * @param parameters - Representation of the parameters passed to the filter function
   */
  constructor(
    functionName: string,
    parameters: NewFilterFunctionParameterType<EntityT>[]
  ) {
    super(functionName, parameters, 'Edm.Boolean');
  }
}

/**
 * Typeguard for the BooleanFilterFunction
 * @param filterable - Object to be checked.
 * @returns boolean
 * @internal
 */
export function isBooleanFilterFunction<EntityT extends EntityBase>(
  filterable: Filterable<EntityT>
): filterable is NewBooleanFilterFunction<EntityT> {
  return (
    typeof filterable['functionName'] !== 'undefined' &&
    typeof filterable['parameters'] !== 'undefined' &&
    filterable['edmType'] === 'Edm.Boolean'
  );
}
