/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { transformReturnValueForEntityV4, FunctionImportRequestBuilderV4, FunctionImportParameter } from '../../../../../src';
import { TestEntity1 } from './TestEntity1';
import { TestEntity2 } from './TestEntity2';

/**
 * Type of the parameters to be passed to [[testFunctionImportEntityReturnType1]].
 */
export interface TestFunctionImportEntityReturnType1Parameters {
}

/**
 * Test Function Import Entity Return Type 1. 
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportEntityReturnType1(parameters: TestFunctionImportEntityReturnType1Parameters): FunctionImportRequestBuilderV4<TestFunctionImportEntityReturnType1Parameters, TestEntity1> {
  const params = {

  }

  return new FunctionImportRequestBuilderV4('VALUE_IS_UNDEFINED', 'TestFunctionImportEntityReturnType1', (data) => transformReturnValueForEntityV4(data, TestEntity1), params);
}

/**
 * Type of the parameters to be passed to [[testFunctionImportEntityReturnType2]].
 */
export interface TestFunctionImportEntityReturnType2Parameters {
}

/**
 * Test Function Import Entity Return Type 2. 
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportEntityReturnType2(parameters: TestFunctionImportEntityReturnType2Parameters): FunctionImportRequestBuilderV4<TestFunctionImportEntityReturnType2Parameters, TestEntity2> {
  const params = {

  }

  return new FunctionImportRequestBuilderV4('VALUE_IS_UNDEFINED', 'TestFunctionImportEntityReturnType2', (data) => transformReturnValueForEntityV4(data, TestEntity2), params);
}

export const functionImports = {
  testFunctionImportEntityReturnType1,
  testFunctionImportEntityReturnType2
};
