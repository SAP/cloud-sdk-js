import moment from 'moment';
import {
  FilterFunctionParameterType,
  BooleanFilterFunction,
  NumberFilterFunction,
  StringFilterFunction,
  FilterFunctionReturnType as FilterFunctionReturnTypeBase,
  createFilterFunction,
  numberReturnTypeMapping,
  CollectionFilterFunction
} from '@sap-cloud-sdk/odata-common/internal';
import { Entity } from './entity';
import { DateFilterFunction } from './filter';
// eslint-disable valid-jsdoc

export function filterFunction<EntityT extends Entity>(
  functionName: string,
  returnType: 'boolean',
  ...parameters: FilterFunctionParameterType<EntityT>[]
): BooleanFilterFunction<EntityT>;

export function filterFunction<EntityT extends Entity>(
  functionName: string,
  returnType: 'int' | 'double' | 'decimal',
  ...parameters: FilterFunctionParameterType<EntityT>[]
): NumberFilterFunction<EntityT>;

export function filterFunction<EntityT extends Entity>(
  functionName: string,
  returnType: 'string',
  ...parameters: FilterFunctionParameterType<EntityT>[]
): StringFilterFunction<EntityT>;

export function filterFunction<EntityT extends Entity>(
  functionName: string,
  returnType: 'datetimeoffset',
  ...parameters: FilterFunctionParameterType<EntityT>[]
): DateFilterFunction<EntityT>;

export function filterFunction<EntityT extends Entity>(
  functionName: string,
  returnType: 'boolean[]',
  ...parameters: FilterFunctionParameterType<EntityT>[]
): CollectionFilterFunction<EntityT, boolean>;

export function filterFunction<EntityT extends Entity>(
  functionName: string,
  returnType: 'string[]',
  ...parameters: FilterFunctionParameterType<EntityT>[]
): CollectionFilterFunction<EntityT, string>;

export function filterFunction<EntityT extends Entity>(
  functionName: string,
  returnType: 'int[]' | 'double[]' | 'decimal[]',
  ...parameters: FilterFunctionParameterType<EntityT>[]
): CollectionFilterFunction<EntityT, number>;

export function filterFunction<EntityT extends Entity>(
  functionName: string,
  returnType: 'datetimeoffset[]',
  ...parameters: FilterFunctionParameterType<EntityT>[]
): CollectionFilterFunction<EntityT, moment.Moment>;

/**
 * Build a custom filter function.
 * @param functionName - the name of the function, e.g., `substring`.
 * @param returnType - the return type of the filter function.
 * @param parameters - the parameter(s) used in the function/
 * @returns An instance of filter function suited for the given return type.
 */
export function filterFunction<EntityT extends Entity>(
  functionName: string,
  returnType: FilterFunctionReturnType,
  ...parameters: FilterFunctionParameterType<EntityT>[]
):
  | BooleanFilterFunction<EntityT>
  | NumberFilterFunction<EntityT>
  | StringFilterFunction<EntityT>
  | DateFilterFunction<EntityT>
  | CollectionFilterFunction<EntityT, any> {
  if (returnType === 'datetimeoffset') {
    return new DateFilterFunction(functionName, parameters);
  }
  if (isCollectionReturnType(returnType)) {
    const edmType = returnTypeMapping[returnType.replace('[]', '')];
    if (edmType) {
      return new CollectionFilterFunction(functionName, parameters, edmType);
    }
    throw new Error(
      `Cannot create filter function for unknown return type ${returnType}.`
    );
  }
  return createFilterFunction(functionName, returnType, ...parameters);
}

function isCollectionReturnType(
  returnType: FilterFunctionReturnType
): returnType is CollectionReturnType {
  return returnType.endsWith('[]');
}

type CollectionReturnType =
  | 'datetimeoffset[]'
  | 'boolean[]'
  | 'int[]'
  | 'double[]'
  | 'decimal[]'
  | 'string[]';

type FilterFunctionReturnType =
  | FilterFunctionReturnTypeBase
  | CollectionReturnType
  | 'datetimeoffset';

const returnTypeMapping = {
  datetimeoffset: 'Edm.DateTimeOffset',
  boolean: 'Edm.Boolean',
  string: 'Edm.String',
  ...numberReturnTypeMapping
};
