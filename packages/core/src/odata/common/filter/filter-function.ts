/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { MapType } from '@sap-cloud-sdk/util';
import { EntityBase } from '../entity';
import { BooleanFilterFunction } from './boolean-filter-function';
import { NumberFilterFunction } from './number-filter-function';
import { StringFilterFunction } from './string-filter-function';
import { FilterFunctionParameterType } from './filter-function-base';

export function filterFunction<EntityT extends EntityBase>(
  functionName: string,
  returnType: 'boolean',
  ...parameters: FilterFunctionParameterType<EntityT>[]
): BooleanFilterFunction<EntityT>;

export function filterFunction<EntityT extends EntityBase>(
  functionName: string,
  returnType: 'int' | 'double' | 'decimal',
  ...parameters: FilterFunctionParameterType<EntityT>[]
): NumberFilterFunction<EntityT>;

export function filterFunction<EntityT extends EntityBase>(
  functionName: string,
  returnType: 'string',
  ...parameters: FilterFunctionParameterType<EntityT>[]
): StringFilterFunction<EntityT>;

/**
 * Build a custom filter function.
 * @param functionName - the name of the function, e.g., `substring`
 * @param returnType - the return type of the filter function
 * @param parameters - the parameter(s) used in the function
 * @returns An instance of filter function suited for the given return type
 */
export function filterFunction<EntityT extends EntityBase>(
  functionName: string,
  returnType: FilterFunctionReturnType,
  ...parameters: FilterFunctionParameterType<EntityT>[]
):
  | BooleanFilterFunction<EntityT>
  | NumberFilterFunction<EntityT>
  | StringFilterFunction<EntityT> {
  return createFilterFunction(functionName, returnType, ...parameters);
}

// eslint-disable-next-line valid-jsdoc
/**
 * @hidden
 */
export function createFilterFunction<EntityT extends EntityBase>(
  functionName: string,
  returnType: FilterFunctionReturnType,
  ...parameters: FilterFunctionParameterType<EntityT>[]
):
  | BooleanFilterFunction<EntityT>
  | NumberFilterFunction<EntityT>
  | StringFilterFunction<EntityT> {
  switch (returnType) {
    case 'boolean':
      return new BooleanFilterFunction(functionName, parameters);
    case 'string':
      return new StringFilterFunction(functionName, parameters);
    case 'int':
    case 'double':
    case 'decimal':
      return new NumberFilterFunction(
        functionName,
        parameters,
        numberReturnTypeMapping[returnType]
      );
  }
}

export const numberReturnTypeMapping: MapType<
  'Edm.Int32' | 'Edm.Double' | 'Edm.Decimal'
> = {
  int: 'Edm.Int32',
  double: 'Edm.Double',
  decimal: 'Edm.Decimal'
};

export type FilterFunctionReturnType =
  | 'boolean'
  | 'int'
  | 'double'
  | 'decimal'
  | 'string';
