import { EntityBase } from '../entity-base';
import { DeSerializers } from '../de-serializers';
import {
  FilterFunction,
  FilterFunctionParameterType
} from './filter-function-base';
import { Filterable } from './filterable';

/**
 * Representation of a filter function, that returns a value of type boolean.
 * @internal
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
 * Typeguard for the BooleanFilterFunction
 * @param filterable - Object to be checked.
 * @returns boolean
 * @internal
 */
export function isBooleanFilterFunction<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers
>(
  filterable: Filterable<
    EntityT,
    DeSerializersT
  >
): filterable is BooleanFilterFunction<EntityT> {
  return (
    typeof filterable['functionName'] !== 'undefined' &&
    typeof filterable['parameters'] !== 'undefined' &&
    filterable['edmType'] === 'Edm.Boolean'
  );
}
