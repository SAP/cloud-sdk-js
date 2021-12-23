import { EntityBase } from '../entity-base';
import { EdmTypeShared } from '../edm-types';
import {
  FilterFunction,
  FilterFunctionParameterType
} from './filter-function-base';

/**
 * Representation of a filter function, that returns a collection of values.
 * @internal
 */
export class CollectionFilterFunction<
  EntityT extends EntityBase,
  FieldT
> extends FilterFunction<EntityT, FieldT[]> {
  /**
   * Creates an instance of CollectionFilterFunction.
   * @param functionName - Name of the function that returns a collection value
   * @param parameters - Representation of the parameters passed to the filter function
   * @param edmType - Type of the returned collection value. This influences the formatting of the returned value.
   */
  constructor(
    functionName: string,
    parameters: FilterFunctionParameterType<EntityT>[],
    edmType: EdmTypeShared<'any'>
  ) {
    super(functionName, parameters, edmType);
  }
}
