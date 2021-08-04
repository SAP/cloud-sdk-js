/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  transformReturnValueForEdmTypeV4,
  transformReturnValueForEdmTypeListV4,
  transformReturnValueForEntityV4,
  transformReturnValueForEntityListV4,
  throwErrorWhenReturnTypeIsUnionType,
  transformReturnValueForComplexTypeV4,
  transformReturnValueForComplexTypeListV4,
  transformReturnValueForUndefinedV4,
  edmToTsV4,
  deserializeComplexTypeV4,
  FunctionImportRequestBuilderV4,
  FunctionImportParameter
} from '@sap-cloud-sdk/core';
import { TestEntity } from './TestEntity';
import { TestComplexType } from './TestComplexType';

/**
 * Type of the parameters to be passed to [[testFunctionImportEdmReturnType]].
 */
export interface TestFunctionImportEdmReturnTypeParameters {}

/**
 * Test Function Import Edm Return Type.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportEdmReturnType(
  parameters: TestFunctionImportEdmReturnTypeParameters
): FunctionImportRequestBuilderV4<
  TestFunctionImportEdmReturnTypeParameters,
  boolean
> {
  const params = {};

  return new FunctionImportRequestBuilderV4(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportEdmReturnType',
    data =>
      transformReturnValueForEdmTypeV4(data, val =>
        edmToTsV4(val.value, 'Edm.Boolean')
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
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportEdmReturnTypeCollection(
  parameters: TestFunctionImportEdmReturnTypeCollectionParameters
): FunctionImportRequestBuilderV4<
  TestFunctionImportEdmReturnTypeCollectionParameters,
  string[]
> {
  const params = {};

  return new FunctionImportRequestBuilderV4(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportEdmReturnTypeCollection',
    data =>
      transformReturnValueForEdmTypeListV4(data, val =>
        edmToTsV4(val, 'Edm.String')
      ),
    params
  );
}

/**
 * Type of the parameters to be passed to [[testFunctionImportNullableTest]].
 */
export interface TestFunctionImportNullableTestParameters {
  /**
   * Nullable Per Default.
   */
  nullablePerDefault?: string | null;
  /**
   * Nullable Explicit.
   */
  nullableExplicit?: string | null;
  /**
   * Non Nullable.
   */
  nonNullable: string;
}

/**
 * Test Function Import Nullable Test.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportNullableTest(
  parameters: TestFunctionImportNullableTestParameters
): FunctionImportRequestBuilderV4<
  TestFunctionImportNullableTestParameters,
  string[] | null
> {
  const params = {
    nullablePerDefault: new FunctionImportParameter(
      'NullablePerDefault',
      'Edm.String',
      parameters.nullablePerDefault
    ),
    nullableExplicit: new FunctionImportParameter(
      'NullableExplicit',
      'Edm.String',
      parameters.nullableExplicit
    ),
    nonNullable: new FunctionImportParameter(
      'NonNullable',
      'Edm.String',
      parameters.nonNullable
    )
  };

  return new FunctionImportRequestBuilderV4(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportNullableTest',
    data =>
      transformReturnValueForEdmTypeListV4(data, val =>
        edmToTsV4(val, 'Edm.String')
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
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportEntityReturnType(
  parameters: TestFunctionImportEntityReturnTypeParameters
): FunctionImportRequestBuilderV4<
  TestFunctionImportEntityReturnTypeParameters,
  TestEntity
> {
  const params = {};

  return new FunctionImportRequestBuilderV4(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportEntityReturnType',
    data => transformReturnValueForEntityV4(data, TestEntity),
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
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportEntityReturnTypeCollection(
  parameters: TestFunctionImportEntityReturnTypeCollectionParameters
): FunctionImportRequestBuilderV4<
  TestFunctionImportEntityReturnTypeCollectionParameters,
  TestEntity[]
> {
  const params = {};

  return new FunctionImportRequestBuilderV4(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportEntityReturnTypeCollection',
    data => transformReturnValueForEntityListV4(data, TestEntity),
    params
  );
}

/**
 * Type of the parameters to be passed to [[testFunctionImportSharedEntityReturnType]].
 */
export interface TestFunctionImportSharedEntityReturnTypeParameters {}

/**
 * Test Function Import Shared Entity Return Type. The 'execute' method does not exist when using this function/action import. Please use the 'executeRaw' for getting the raw response.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportSharedEntityReturnType(
  parameters: TestFunctionImportSharedEntityReturnTypeParameters
): Omit<
  FunctionImportRequestBuilderV4<
    TestFunctionImportSharedEntityReturnTypeParameters,
    never
  >,
  'execute'
> {
  const params = {};

  return new FunctionImportRequestBuilderV4(
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
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportSharedEntityReturnTypeCollection(
  parameters: TestFunctionImportSharedEntityReturnTypeCollectionParameters
): Omit<
  FunctionImportRequestBuilderV4<
    TestFunctionImportSharedEntityReturnTypeCollectionParameters,
    never
  >,
  'execute'
> {
  const params = {};

  return new FunctionImportRequestBuilderV4(
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
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportComplexReturnType(
  parameters: TestFunctionImportComplexReturnTypeParameters
): FunctionImportRequestBuilderV4<
  TestFunctionImportComplexReturnTypeParameters,
  TestComplexType
> {
  const params = {};

  return new FunctionImportRequestBuilderV4(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportComplexReturnType',
    data =>
      transformReturnValueForComplexTypeV4(data, data =>
        deserializeComplexTypeV4(data, TestComplexType)
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
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportComplexReturnTypeCollection(
  parameters: TestFunctionImportComplexReturnTypeCollectionParameters
): FunctionImportRequestBuilderV4<
  TestFunctionImportComplexReturnTypeCollectionParameters,
  TestComplexType[]
> {
  const params = {};

  return new FunctionImportRequestBuilderV4(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportComplexReturnTypeCollection',
    data =>
      transformReturnValueForComplexTypeListV4(data, data =>
        deserializeComplexTypeV4(data, TestComplexType)
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
   * Non Nullable String Param.
   */
  nonNullableStringParam: string;
  /**
   * Nullable Boolean Param.
   */
  nullableBooleanParam?: boolean | null;
  /**
   * Nullable Geography Point Param.
   */
  nullableGeographyPointParam?: any | null;
}

/**
 * Test Function Import Multiple Params.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportMultipleParams(
  parameters: TestFunctionImportMultipleParamsParameters
): FunctionImportRequestBuilderV4<
  TestFunctionImportMultipleParamsParameters,
  boolean | null
> {
  const params = {
    stringParam: new FunctionImportParameter(
      'StringParam',
      'Edm.String',
      parameters.stringParam
    ),
    nonNullableStringParam: new FunctionImportParameter(
      'NonNullableStringParam',
      'Edm.String',
      parameters.nonNullableStringParam
    ),
    nullableBooleanParam: new FunctionImportParameter(
      'NullableBooleanParam',
      'Edm.Boolean',
      parameters.nullableBooleanParam
    ),
    nullableGeographyPointParam: new FunctionImportParameter(
      'NullableGeographyPointParam',
      'Edm.Any',
      parameters.nullableGeographyPointParam
    )
  };

  return new FunctionImportRequestBuilderV4(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportMultipleParams',
    data =>
      transformReturnValueForEdmTypeV4(data, val =>
        edmToTsV4(val.value, 'Edm.Boolean')
      ),
    params
  );
}

/**
 * Type of the parameters to be passed to [[testFunctionImportWithDifferentName]].
 */
export interface TestFunctionImportWithDifferentNameParameters {}

/**
 * Test Function Import With Different Name.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportWithDifferentName(
  parameters: TestFunctionImportWithDifferentNameParameters
): FunctionImportRequestBuilderV4<
  TestFunctionImportWithDifferentNameParameters,
  undefined
> {
  const params = {};

  return new FunctionImportRequestBuilderV4(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportWithDifferentName',
    data => transformReturnValueForUndefinedV4(data, val => undefined),
    params
  );
}

export const functionImports = {
  testFunctionImportEdmReturnType,
  testFunctionImportEdmReturnTypeCollection,
  testFunctionImportNullableTest,
  testFunctionImportEntityReturnType,
  testFunctionImportEntityReturnTypeCollection,
  testFunctionImportSharedEntityReturnType,
  testFunctionImportSharedEntityReturnTypeCollection,
  testFunctionImportComplexReturnType,
  testFunctionImportComplexReturnTypeCollection,
  testFunctionImportMultipleParams,
  testFunctionImportWithDifferentName
};
