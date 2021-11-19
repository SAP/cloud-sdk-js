import moment from 'moment';
import { defaultDeSerializersRaw } from '..';
import { DeSerializationMiddleware } from '../de-serializers/de-serialization-middleware';
import { EdmTypeShared } from '../edm-types';
import { EntityBase, ODataVersionOf } from '../entity-base';
import { NewField } from '../selectable/field-new';
import { NewFilter } from './filter-new';

/**
 * Data structure to represent OData filter functions.
 * Use the factory function [[filterFunction]] to create instances of `FilterFunction`.
 * @internal
 */
export abstract class NewFilterFunction<EntityT extends EntityBase, ReturnT> {
  /**
   * Creates an instance of FilterFunction.
   * @param functionName - Name of the function.
   * @param parameters - Representation of the parameters passed to the filter function.
   * @param edmType - EDM type of the return type of the filter function.
   */
  constructor(
    readonly functionName: string,
    readonly parameters: NewFilterFunctionParameterType<EntityT>[],
    readonly edmType: EdmTypeShared<ODataVersionOf<EntityT>>
  ) {}

  /**
   * @deprecated Since v1.21.0. There will be no replacement. Let us know if you were using this functionality.
   * Serializes the filter function into a string
   * @param parentFieldNames - Names of parents in case the function is part of a filter on a navigation property
   * @returns The filter function as string
   */
  toString(parentFieldNames: string[] = []): string {
    const params = this.parameters
      .map(param => this.transformParameter(param, parentFieldNames))
      .join(', ');
    return `${this.functionName}(${params})`;
  }

  /**
   * Creates an instance of Filter for this filter function and the given value using the operator 'eq', i.e. `==`.
   * @param value - Value to be used in the filter
   * @param edmType - EDM type of the value, used when converting the value to URL. Use `Edm.String` as default value.
   * @returns The resulting filter
   */
  equals(
    value: ReturnT
  ): NewFilter<EntityT, DeSerializationMiddleware, ReturnT> {
    return new NewFilter(defaultDeSerializersRaw, this, 'eq', value);
  }

  /**
   * @deprecated Since v1.21.0. There will be no replacement. Let us know if you were using this functionality.
   * For different type of filter function parameters, build a function that generates a string as url pattern.
   * @param param - One parameter of the filter function
   * @param parentFieldNames - The parent field name list used when the field with navigation properties are involved
   * @returns A function that convert the parameter to url pattern.
   */
  private transformParameter(
    param: NewFilterFunctionParameterType<EntityT>,
    parentFieldNames: string[]
  ): string {
    if (typeof param === 'number') {
      return param.toString();
    }
    if (typeof param === 'string') {
      return `'${param.replace(/'/g, "''")}'`;
    }
    if (moment.isMoment(param)) {
      throw new Error(
        'Date parameters are not supported in the deprecated `transformParameter` method. Use `get-filter` instead.'
      );
    }
    if (param instanceof NewFilterFunction) {
      return param.toString(parentFieldNames);
    }
    if (Array.isArray(param)) {
      throw new Error(
        'Collection parameters are not supported in the deprecated `transformParameter` method. Use `get-filter` instead.'
      );
    }
    return [...parentFieldNames, param._fieldName].join('/');
  }
}

/**
 * Primitive type of a parameter of a filter function.
 */
export type FilterFunctionPrimitiveParameterType =
  | any
  | number
  | string
  | moment.Moment;

/**
 * Type of a parameter of a filter function. This can either be a primitive type, a reference to a field or another filter function.
 */
export type NewFilterFunctionParameterType<EntityT extends EntityBase> =
  | FilterFunctionPrimitiveParameterType
  | NewField<EntityT, boolean, boolean>
  | NewFilterFunction<EntityT, any>
  | FilterFunctionPrimitiveParameterType[];
