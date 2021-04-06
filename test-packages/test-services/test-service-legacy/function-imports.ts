/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  transformReturnValueForUndefined,
  transformReturnValueForEdmType,
  transformReturnValueForEdmTypeList,
  transformReturnValueForEntity,
  transformReturnValueForEntityList,
  transformReturnValueForComplexType,
  transformReturnValueForComplexTypeList,
  edmToTs,
  FunctionImportRequestBuilder,
  FunctionImportParameter
} from '@sap-cloud-sdk/core';
import { TestEntity } from './TestEntity';
import { TestComplexType } from './TestComplexType';

/**
 * Type of the parameters to be passed to [[testFunctionImportNoReturnType]].
 */
export interface TestFunctionImportNoReturnTypeParameters {}

/**
 * Test Function Import No Return Type.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
export function testFunctionImportNoReturnType(
  parameters: TestFunctionImportNoReturnTypeParameters
): FunctionImportRequestBuilder<
  TestFunctionImportNoReturnTypeParameters,
  undefined
> {
  const params = {};

  return new FunctionImportRequestBuilder(
    'post',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportNoReturnType',
    data => transformReturnValueForUndefined(data, val => undefined),
    params
  );
}

/**
 * Type of the parameters to be passed to [[testFunctionImportEdmReturnType]].
 */
export interface TestFunctionImportEdmReturnTypeParameters {}

/**
 * Test Function Import Edm Return Type.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
export function testFunctionImportEdmReturnType(
  parameters: TestFunctionImportEdmReturnTypeParameters
): FunctionImportRequestBuilder<
  TestFunctionImportEdmReturnTypeParameters,
  boolean
> {
  const params = {};

  return new FunctionImportRequestBuilder(
    'get',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportEdmReturnType',
    data =>
      transformReturnValueForEdmType(data, val => edmToTs(val, 'Edm.Boolean')),
    params
  );
}

/**
 * Type of the parameters to be passed to [[testFunctionImportEdmReturnTypeCollection]].
 */
export interface TestFunctionImportEdmReturnTypeCollectionParameters {}

/**
 * Test Function Import Edm Return Type Collection.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
export function testFunctionImportEdmReturnTypeCollection(
  parameters: TestFunctionImportEdmReturnTypeCollectionParameters
): FunctionImportRequestBuilder<
  TestFunctionImportEdmReturnTypeCollectionParameters,
  string[]
> {
  const params = {};

  return new FunctionImportRequestBuilder(
    'get',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportEdmReturnTypeCollection',
    data =>
      transformReturnValueForEdmTypeList(data, val =>
        edmToTs(val, 'Edm.String')
      ),
    params
  );
}

/**
 * Type of the parameters to be passed to [[testFunctionImportEntityReturnType]].
 */
export interface TestFunctionImportEntityReturnTypeParameters {}

/**
 * Test Function Import Entity Return Type.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
export function testFunctionImportEntityReturnType(
  parameters: TestFunctionImportEntityReturnTypeParameters
): FunctionImportRequestBuilder<
  TestFunctionImportEntityReturnTypeParameters,
  TestEntity
> {
  const params = {};

  return new FunctionImportRequestBuilder(
    'get',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportEntityReturnType',
    data => transformReturnValueForEntity(data, TestEntity),
    params
  );
}

/**
 * Type of the parameters to be passed to [[testFunctionImportEntityReturnTypeCollection]].
 */
export interface TestFunctionImportEntityReturnTypeCollectionParameters {}

/**
 * Test Function Import Entity Return Type Collection.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
export function testFunctionImportEntityReturnTypeCollection(
  parameters: TestFunctionImportEntityReturnTypeCollectionParameters
): FunctionImportRequestBuilder<
  TestFunctionImportEntityReturnTypeCollectionParameters,
  TestEntity[]
> {
  const params = {};

  return new FunctionImportRequestBuilder(
    'get',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportEntityReturnTypeCollection',
    data => transformReturnValueForEntityList(data, TestEntity),
    params
  );
}

/**
 * Type of the parameters to be passed to [[testFunctionImportComplexReturnType]].
 */
export interface TestFunctionImportComplexReturnTypeParameters {}

/**
 * Test Function Import Complex Return Type.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
export function testFunctionImportComplexReturnType(
  parameters: TestFunctionImportComplexReturnTypeParameters
): FunctionImportRequestBuilder<
  TestFunctionImportComplexReturnTypeParameters,
  TestComplexType
> {
  const params = {};

  return new FunctionImportRequestBuilder(
    'get',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportComplexReturnType',
    data => transformReturnValueForComplexType(data, TestComplexType.build),
    params
  );
}

/**
 * Type of the parameters to be passed to [[testFunctionImportComplexReturnTypeCollection]].
 */
export interface TestFunctionImportComplexReturnTypeCollectionParameters {}

/**
 * Test Function Import Complex Return Type Collection.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
export function testFunctionImportComplexReturnTypeCollection(
  parameters: TestFunctionImportComplexReturnTypeCollectionParameters
): FunctionImportRequestBuilder<
  TestFunctionImportComplexReturnTypeCollectionParameters,
  TestComplexType[]
> {
  const params = {};

  return new FunctionImportRequestBuilder(
    'get',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportComplexReturnTypeCollection',
    data => transformReturnValueForComplexTypeList(data, TestComplexType.build),
    params
  );
}

/**
 * Type of the parameters to be passed to [[testFunctionImportGet]].
 */
export interface TestFunctionImportGetParameters {
  /**
   * Simple Param.
   */
  simpleParam: string;
}

/**
 * Test Function Import Get.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
export function testFunctionImportGet(
  parameters: TestFunctionImportGetParameters
): FunctionImportRequestBuilder<TestFunctionImportGetParameters, boolean> {
  const params = {
    simpleParam: new FunctionImportParameter(
      'SimpleParam',
      'Edm.String',
      parameters.simpleParam
    )
  };

  return new FunctionImportRequestBuilder(
    'get',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportGET',
    data =>
      transformReturnValueForEdmType(data, val => edmToTs(val, 'Edm.Boolean')),
    params
  );
}

/**
 * Type of the parameters to be passed to [[testFunctionImportPost]].
 */
export interface TestFunctionImportPostParameters {
  /**
   * Simple Param.
   */
  simpleParam: string;
}

/**
 * Test Function Import Post.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
export function testFunctionImportPost(
  parameters: TestFunctionImportPostParameters
): FunctionImportRequestBuilder<TestFunctionImportPostParameters, boolean> {
  const params = {
    simpleParam: new FunctionImportParameter(
      'SimpleParam',
      'Edm.String',
      parameters.simpleParam
    )
  };

  return new FunctionImportRequestBuilder(
    'post',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportPOST',
    data =>
      transformReturnValueForEdmType(data, val => edmToTs(val, 'Edm.Boolean')),
    params
  );
}

/**
 * Type of the parameters to be passed to [[testFunctionImportMultipleParams]].
 */
export interface TestFunctionImportMultipleParamsParameters {
  /**
   * String Param.
   */
  stringParam: string;
  /**
   * Boolean Param.
   */
  booleanParam: boolean;
}

/**
 * Test Function Import Multiple Params.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
export function testFunctionImportMultipleParams(
  parameters: TestFunctionImportMultipleParamsParameters
): FunctionImportRequestBuilder<
  TestFunctionImportMultipleParamsParameters,
  boolean
> {
  const params = {
    stringParam: new FunctionImportParameter(
      'StringParam',
      'Edm.String',
      parameters.stringParam
    ),
    booleanParam: new FunctionImportParameter(
      'BooleanParam',
      'Edm.Boolean',
      parameters.booleanParam
    )
  };

  return new FunctionImportRequestBuilder(
    'get',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportMultipleParams',
    data =>
      transformReturnValueForEdmType(data, val => edmToTs(val, 'Edm.Boolean')),
    params
  );
}

/**
 * Type of the parameters to be passed to [[createTestComplexType]].
 */
export interface CreateTestComplexTypeParameters {}

/**
 * Create Test Complex Type.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
export function createTestComplexType(
  parameters: CreateTestComplexTypeParameters
): FunctionImportRequestBuilder<
  CreateTestComplexTypeParameters,
  TestComplexType
> {
  const params = {};

  return new FunctionImportRequestBuilder(
    'get',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'CreateTestComplexType',
    data => transformReturnValueForComplexType(data, TestComplexType.build),
    params
  );
}

/**
 * Type of the parameters to be passed to [[fContinue]].
 */
export interface FContinueParameters {}

/**
 * Continue.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
export function fContinue(
  parameters: FContinueParameters
): FunctionImportRequestBuilder<FContinueParameters, boolean> {
  const params = {};

  return new FunctionImportRequestBuilder(
    'get',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'Continue',
    data =>
      transformReturnValueForEdmType(data, val => edmToTs(val, 'Edm.Boolean')),
    params
  );
}

export const functionImports = {
  testFunctionImportNoReturnType,
  testFunctionImportEdmReturnType,
  testFunctionImportEdmReturnTypeCollection,
  testFunctionImportEntityReturnType,
  testFunctionImportEntityReturnTypeCollection,
  testFunctionImportComplexReturnType,
  testFunctionImportComplexReturnTypeCollection,
  testFunctionImportGet,
  testFunctionImportPost,
  testFunctionImportMultipleParams,
  createTestComplexType,
  fContinue
};
