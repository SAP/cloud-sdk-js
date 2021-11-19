/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { FunctionImportParameter } from '@sap-cloud-sdk/odata-common/internal';
import {
  FunctionImportRequestBuilder,
  transformReturnValueForEntity
} from '@sap-cloud-sdk/odata-v4';
import { TestEntity1 } from './TestEntity1';
import { TestEntity2 } from './TestEntity2';

/**
 * Type of the parameters to be passed to [[testFunctionImportEntityReturnType1]].
 */
export interface TestFunctionImportEntityReturnType1Parameters {}

/**
 * Test Function Import Entity Return Type 1.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportEntityReturnType1(
  parameters: TestFunctionImportEntityReturnType1Parameters
): FunctionImportRequestBuilder<
  TestFunctionImportEntityReturnType1Parameters,
  TestEntity1
> {
  const params = {};

  return new FunctionImportRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportEntityReturnType1',
    data => transformReturnValueForEntity(data, TestEntity1),
    params
  );
}

/**
 * Type of the parameters to be passed to [[testFunctionImportEntityReturnType2]].
 */
export interface TestFunctionImportEntityReturnType2Parameters {}

/**
 * Test Function Import Entity Return Type 2.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportEntityReturnType2(
  parameters: TestFunctionImportEntityReturnType2Parameters
): FunctionImportRequestBuilder<
  TestFunctionImportEntityReturnType2Parameters,
  TestEntity2
> {
  const params = {};

  return new FunctionImportRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportEntityReturnType2',
    data => transformReturnValueForEntity(data, TestEntity2),
    params
  );
}

export const functionImports = {
  testFunctionImportEntityReturnType1,
  testFunctionImportEntityReturnType2
};
