/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { MapType } from '@sap-cloud-sdk/util';
import { Entity } from '../entity';
import { Field } from '../selectable';
import { BooleanFilterFunction } from './boolean-filter-function';
import { FilterFunctionParameterType } from './filter-function';
import { NumberFilterFunction } from './number-filter-function';
import { StringFilterFunction } from './string-filter-function';
import { ODataV2 } from '../odata-v2';

/**
 * Build an OData (V2) filter function to test whether a string is a substring of the other. Evaluates to boolean.
 * @param p0 - The substring to test for. This can either be a string, a reference to a field or another filter function.
 * @param p1 - The string to test. This can either be a string, a reference to a field or another filter function.
 *
 * @returns The newly created filter function
 */
export function substringOf<EntityT extends Entity>(
  p0: string | Field<EntityT,ODataV2> | StringFilterFunction<EntityT>,
  p1: string | Field<EntityT,ODataV2> | StringFilterFunction<EntityT>
): BooleanFilterFunction<EntityT> {
  return filterFunction('substringof', 'boolean', p0, p1);
}

/**
 * Build an OData (V2) filter function to get a substring starting from a designated position. Evaluates to string.
 * @param p0 - the original string. This can either be a string, a reference to a field or another filter function.
 * @param pos - the starting position of the original string. This can be either a number, a reference to a field or another filter function.
 * @returns The newly created filter function
 */
export function substring<EntityT extends Entity>(
  p0: string | Field<EntityT,ODataV2> | StringFilterFunction<EntityT>,
  pos: number | Field<EntityT,ODataV2> | NumberFilterFunction<EntityT>
): StringFilterFunction<EntityT> {
  return filterFunction('substring', 'string', p0, pos);
}

/**
 * Build an OData (V2) filter function to get the length of a string.
 * @param p0 - the given string for computing the length
 * @returns The newly created filter function
 */
export function length<EntityT extends Entity>(
  p0: string | Field<EntityT,ODataV2> | StringFilterFunction<EntityT>
): NumberFilterFunction<EntityT> {
  return filterFunction('length', 'int', p0);
}

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

/**
 * Build a custom OData (V2) filter function.
 * @param functionName - the name of the function, e.g., `substring`
 * @param returnType - the return type of the filter function
 * @param parameters - the parameter(s) used in the function
 * @returns An instance of filter function suited for the given return type
 */
export function filterFunction<EntityT extends Entity>(
  functionName: string,
  returnType: 'boolean' | 'int' | 'double' | 'decimal' | 'string',
  ...parameters: FilterFunctionParameterType<EntityT>[]
):
  | BooleanFilterFunction<EntityT>
  | NumberFilterFunction<EntityT>
  | StringFilterFunction<EntityT> {
  if (returnType === 'boolean') {
    return new BooleanFilterFunction(functionName, parameters);
  }
  if (returnType === 'string') {
    return new StringFilterFunction(functionName, parameters);
  }
  return new NumberFilterFunction(
    functionName,
    parameters,
    returnTypeToEdmType[returnType]
  );
}

const returnTypeToEdmType: MapType<
  'Edm.Int32' | 'Edm.Double' | 'Edm.Decimal'
> = {
  int: 'Edm.Int32',
  double: 'Edm.Double',
  decimal: 'Edm.Decimal'
};
