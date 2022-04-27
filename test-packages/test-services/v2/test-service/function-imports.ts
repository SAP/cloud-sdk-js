/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  transformReturnValueForUndefinedV2,
  transformReturnValueForEdmTypeV2,
  transformReturnValueForEdmTypeListV2,
  transformReturnValueForEntityV2,
  transformReturnValueForEntityListV2,
  throwErrorWhenReturnTypeIsUnionType,
  transformReturnValueForComplexTypeV2,
  transformReturnValueForComplexTypeListV2,
  edmToTsV2,
  deserializeComplexTypeV2,
  FunctionImportRequestBuilderV2,
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
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportNoReturnType(
  parameters: TestFunctionImportNoReturnTypeParameters
): FunctionImportRequestBuilderV2<
  TestFunctionImportNoReturnTypeParameters,
  undefined
> {
  const params = {};

  return new FunctionImportRequestBuilderV2(
    'post',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportNoReturnType',
    data => transformReturnValueForUndefinedV2(data, val => undefined),
    params
  );
}

/**
 * Type of the parameters to be passed to [[testFunctionImportEdmReturnType]].
 */
export interface TestFunctionImportEdmReturnTypeParameters {}

/**
 * Test Function Import Edm Return Type.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportEdmReturnType(
  parameters: TestFunctionImportEdmReturnTypeParameters
): FunctionImportRequestBuilderV2<
  TestFunctionImportEdmReturnTypeParameters,
  boolean
> {
  const params = {};

  return new FunctionImportRequestBuilderV2(
    'get',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportEdmReturnType',
    data =>
      transformReturnValueForEdmTypeV2(data, val =>
        edmToTsV2(val.TestFunctionImportEdmReturnType, 'Edm.Boolean')
      ),
    params
  );
}

/**
 * Type of the parameters to be passed to [[testFunctionImportEdmReturnTypeCollection]].
 */
export interface TestFunctionImportEdmReturnTypeCollectionParameters {}

/**
 * Test Function Import Edm Return Type Collection.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportEdmReturnTypeCollection(
  parameters: TestFunctionImportEdmReturnTypeCollectionParameters
): FunctionImportRequestBuilderV2<
  TestFunctionImportEdmReturnTypeCollectionParameters,
  string[]
> {
  const params = {};

  return new FunctionImportRequestBuilderV2(
    'get',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportEdmReturnTypeCollection',
    data =>
      transformReturnValueForEdmTypeListV2(data, val =>
        edmToTsV2(val, 'Edm.String')
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
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportEntityReturnType(
  parameters: TestFunctionImportEntityReturnTypeParameters
): FunctionImportRequestBuilderV2<
  TestFunctionImportEntityReturnTypeParameters,
  TestEntity
> {
  const params = {};

  return new FunctionImportRequestBuilderV2(
    'get',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportEntityReturnType',
    data => transformReturnValueForEntityV2(data, TestEntity),
    params
  );
}

/**
 * Type of the parameters to be passed to [[testFunctionImportEntityReturnTypeCollection]].
 */
export interface TestFunctionImportEntityReturnTypeCollectionParameters {}

/**
 * Test Function Import Entity Return Type Collection.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportEntityReturnTypeCollection(
  parameters: TestFunctionImportEntityReturnTypeCollectionParameters
): FunctionImportRequestBuilderV2<
  TestFunctionImportEntityReturnTypeCollectionParameters,
  TestEntity[]
> {
  const params = {};

  return new FunctionImportRequestBuilderV2(
    'get',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportEntityReturnTypeCollection',
    data => transformReturnValueForEntityListV2(data, TestEntity),
    params
  );
}

/**
 * Type of the parameters to be passed to [[testFunctionImportSharedEntityReturnType]].
 */
export interface TestFunctionImportSharedEntityReturnTypeParameters {}

/**
 * Test Function Import Shared Entity Return Type. The 'execute' method does not exist when using this function/action import. Please use the 'executeRaw' for getting the raw response.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportSharedEntityReturnType(
  parameters: TestFunctionImportSharedEntityReturnTypeParameters
): Omit<
  FunctionImportRequestBuilderV2<
    TestFunctionImportSharedEntityReturnTypeParameters,
    never
  >,
  'execute'
> {
  const params = {};

  return new FunctionImportRequestBuilderV2(
    'get',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportSharedEntityReturnType',
    data =>
      throwErrorWhenReturnTypeIsUnionType(
        data,
        'TestFunctionImportSharedEntityReturnType'
      ),
    params
  );
}

/**
 * Type of the parameters to be passed to [[testFunctionImportSharedEntityReturnTypeCollection]].
 */
export interface TestFunctionImportSharedEntityReturnTypeCollectionParameters {}

/**
 * Test Function Import Shared Entity Return Type Collection. The 'execute' method does not exist when using this function/action import. Please use the 'executeRaw' for getting the raw response.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportSharedEntityReturnTypeCollection(
  parameters: TestFunctionImportSharedEntityReturnTypeCollectionParameters
): Omit<
  FunctionImportRequestBuilderV2<
    TestFunctionImportSharedEntityReturnTypeCollectionParameters,
    never
  >,
  'execute'
> {
  const params = {};

  return new FunctionImportRequestBuilderV2(
    'get',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportSharedEntityReturnTypeCollection',
    data =>
      throwErrorWhenReturnTypeIsUnionType(
        data,
        'TestFunctionImportSharedEntityReturnTypeCollection'
      ),
    params
  );
}

/**
 * Type of the parameters to be passed to [[testFunctionImportComplexReturnType]].
 */
export interface TestFunctionImportComplexReturnTypeParameters {}

/**
 * Test Function Import Complex Return Type.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportComplexReturnType(
  parameters: TestFunctionImportComplexReturnTypeParameters
): FunctionImportRequestBuilderV2<
  TestFunctionImportComplexReturnTypeParameters,
  TestComplexType
> {
  const params = {};

  return new FunctionImportRequestBuilderV2(
    'get',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportComplexReturnType',
    data =>
      transformReturnValueForComplexTypeV2(data, data =>
        deserializeComplexTypeV2(data, TestComplexType)
      ),
    params
  );
}

/**
 * Type of the parameters to be passed to [[testFunctionImportUnsupportedEdmTypes]].
 */
export interface TestFunctionImportUnsupportedEdmTypesParameters {
  /**
   * Simple Param.
   */
  simpleParam: any;
}

/**
 * Test Function Import Unsupported Edm Types.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportUnsupportedEdmTypes(
  parameters: TestFunctionImportUnsupportedEdmTypesParameters
): FunctionImportRequestBuilderV2<
  TestFunctionImportUnsupportedEdmTypesParameters,
  any
> {
  const params = {
    simpleParam: new FunctionImportParameter(
      'SimpleParam',
      'Edm.Any',
      parameters.simpleParam
    )
  };

  return new FunctionImportRequestBuilderV2(
    'get',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportUnsupportedEdmTypes',
    data =>
      transformReturnValueForEdmTypeV2(data, val =>
        edmToTsV2(val.TestFunctionImportUnsupportedEdmTypes, 'Edm.Any')
      ),
    params
  );
}

/**
 * Type of the parameters to be passed to [[testFunctionImportComplexReturnTypeCollection]].
 */
export interface TestFunctionImportComplexReturnTypeCollectionParameters {}

/**
 * Test Function Import Complex Return Type Collection.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportComplexReturnTypeCollection(
  parameters: TestFunctionImportComplexReturnTypeCollectionParameters
): FunctionImportRequestBuilderV2<
  TestFunctionImportComplexReturnTypeCollectionParameters,
  TestComplexType[]
> {
  const params = {};

  return new FunctionImportRequestBuilderV2(
    'get',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportComplexReturnTypeCollection',
    data =>
      transformReturnValueForComplexTypeListV2(data, data =>
        deserializeComplexTypeV2(data, TestComplexType)
      ),
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
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportGet(
  parameters: TestFunctionImportGetParameters
): FunctionImportRequestBuilderV2<TestFunctionImportGetParameters, boolean> {
  const params = {
    simpleParam: new FunctionImportParameter(
      'SimpleParam',
      'Edm.String',
      parameters.simpleParam
    )
  };

  return new FunctionImportRequestBuilderV2(
    'get',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportGET',
    data =>
      transformReturnValueForEdmTypeV2(data, val =>
        edmToTsV2(val.TestFunctionImportGET, 'Edm.Boolean')
      ),
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
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportPost(
  parameters: TestFunctionImportPostParameters
): FunctionImportRequestBuilderV2<TestFunctionImportPostParameters, boolean> {
  const params = {
    simpleParam: new FunctionImportParameter(
      'SimpleParam',
      'Edm.String',
      parameters.simpleParam
    )
  };

  return new FunctionImportRequestBuilderV2(
    'post',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportPOST',
    data =>
      transformReturnValueForEdmTypeV2(data, val =>
        edmToTsV2(val.TestFunctionImportPOST, 'Edm.Boolean')
      ),
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
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportMultipleParams(
  parameters: TestFunctionImportMultipleParamsParameters
): FunctionImportRequestBuilderV2<
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

  return new FunctionImportRequestBuilderV2(
    'get',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportMultipleParams',
    data =>
      transformReturnValueForEdmTypeV2(data, val =>
        edmToTsV2(val.TestFunctionImportMultipleParams, 'Edm.Boolean')
      ),
    params
  );
}

/**
 * Type of the parameters to be passed to [[createTestComplexType]].
 */
export interface CreateTestComplexTypeParameters {}

/**
 * Create Test Complex Type.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function createTestComplexType(
  parameters: CreateTestComplexTypeParameters
): FunctionImportRequestBuilderV2<
  CreateTestComplexTypeParameters,
  TestComplexType
> {
  const params = {};

  return new FunctionImportRequestBuilderV2(
    'get',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'CreateTestComplexType',
    data =>
      transformReturnValueForComplexTypeV2(data, data =>
        deserializeComplexTypeV2(data, TestComplexType)
      ),
    params
  );
}

/**
 * Type of the parameters to be passed to [[fContinue]].
 */
export interface FContinueParameters {}

/**
 * Continue.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function fContinue(
  parameters: FContinueParameters
): FunctionImportRequestBuilderV2<FContinueParameters, boolean> {
  const params = {};

  return new FunctionImportRequestBuilderV2(
    'get',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'Continue',
    data =>
      transformReturnValueForEdmTypeV2(data, val =>
        edmToTsV2(val.Continue, 'Edm.Boolean')
      ),
    params
  );
}

export const functionImports = {
  testFunctionImportNoReturnType,
  testFunctionImportEdmReturnType,
  testFunctionImportEdmReturnTypeCollection,
  testFunctionImportEntityReturnType,
  testFunctionImportEntityReturnTypeCollection,
  testFunctionImportSharedEntityReturnType,
  testFunctionImportSharedEntityReturnTypeCollection,
  testFunctionImportComplexReturnType,
  testFunctionImportUnsupportedEdmTypes,
  testFunctionImportComplexReturnTypeCollection,
  testFunctionImportGet,
  testFunctionImportPost,
  testFunctionImportMultipleParams,
  createTestComplexType,
  fContinue
};
