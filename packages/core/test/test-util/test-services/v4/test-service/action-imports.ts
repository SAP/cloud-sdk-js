/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  transformReturnValueForUndefinedV4,
  transformReturnValueForComplexTypeV4,
  transformReturnValueForEdmTypeV4,
  transformReturnValueForEntityV4,
  throwErrorWhenReturnTypeIsUnionType,
  edmToTsV4,
  deserializeComplexTypeV4,
  ActionImportRequestBuilder,
  ActionImportParameter
} from '../../../../../src';
import { TestComplexType } from './TestComplexType';
import { TestEntity } from './TestEntity';

/**
 * Type of the parameters to be passed to [[testActionImportNoParameterNoReturnType]].
 */
export interface TestActionImportNoParameterNoReturnTypeParameters {}

/**
 * Test Action Import No Parameter No Return Type.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testActionImportNoParameterNoReturnType(
  parameters: TestActionImportNoParameterNoReturnTypeParameters
): ActionImportRequestBuilder<
  TestActionImportNoParameterNoReturnTypeParameters,
  undefined
> {
  const params = {};

  return new ActionImportRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestActionImportNoParameterNoReturnType',
    data => transformReturnValueForUndefinedV4(data, val => undefined),
    params
  );
}

/**
 * Type of the parameters to be passed to [[testActionImportMultipleParameterComplexReturnType]].
 */
export interface TestActionImportMultipleParameterComplexReturnTypeParameters {
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
 * Test Action Import Multiple Parameter Complex Return Type.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testActionImportMultipleParameterComplexReturnType(
  parameters: TestActionImportMultipleParameterComplexReturnTypeParameters
): ActionImportRequestBuilder<
  TestActionImportMultipleParameterComplexReturnTypeParameters,
  TestComplexType
> {
  const params = {
    stringParam: new ActionImportParameter(
      'StringParam',
      'Edm.String',
      parameters.stringParam
    ),
    nonNullableStringParam: new ActionImportParameter(
      'NonNullableStringParam',
      'Edm.String',
      parameters.nonNullableStringParam
    ),
    nullableBooleanParam: new ActionImportParameter(
      'NullableBooleanParam',
      'Edm.Boolean',
      parameters.nullableBooleanParam
    ),
    nullableGeographyPointParam: new ActionImportParameter(
      'NullableGeographyPointParam',
      'Edm.Any',
      parameters.nullableGeographyPointParam
    )
  };

  return new ActionImportRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestActionImportMultipleParameterComplexReturnType',
    data =>
      transformReturnValueForComplexTypeV4(data, data =>
        deserializeComplexTypeV4(data, TestComplexType)
      ),
    params
  );
}

/**
 * Type of the parameters to be passed to [[testActionImportUnsupportedEdmTypes]].
 */
export interface TestActionImportUnsupportedEdmTypesParameters {
  /**
   * Simple Param.
   */
  simpleParam: any;
}

/**
 * Test Action Import Unsupported Edm Types.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testActionImportUnsupportedEdmTypes(
  parameters: TestActionImportUnsupportedEdmTypesParameters
): ActionImportRequestBuilder<
  TestActionImportUnsupportedEdmTypesParameters,
  any
> {
  const params = {
    simpleParam: new ActionImportParameter(
      'SimpleParam',
      'Edm.Any',
      parameters.simpleParam
    )
  };

  return new ActionImportRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestActionImportUnsupportedEdmTypes',
    data =>
      transformReturnValueForEdmTypeV4(data, val =>
        edmToTsV4(val.value, 'Edm.Any')
      ),
    params
  );
}

/**
 * Type of the parameters to be passed to [[testActionImportNoParameterEntityReturnType]].
 */
export interface TestActionImportNoParameterEntityReturnTypeParameters {}

/**
 * Test Action Import No Parameter Entity Return Type.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testActionImportNoParameterEntityReturnType(
  parameters: TestActionImportNoParameterEntityReturnTypeParameters
): ActionImportRequestBuilder<
  TestActionImportNoParameterEntityReturnTypeParameters,
  TestEntity
> {
  const params = {};

  return new ActionImportRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestActionImportNoParameterEntityReturnType',
    data => transformReturnValueForEntityV4(data, TestEntity),
    params
  );
}

/**
 * Type of the parameters to be passed to [[testActionImportSharedEntityReturnType]].
 */
export interface TestActionImportSharedEntityReturnTypeParameters {}

/**
 * Test Action Import Shared Entity Return Type. The 'execute' method does not exist when using this function/action import. Please use the 'executeRaw' for getting the raw response.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testActionImportSharedEntityReturnType(
  parameters: TestActionImportSharedEntityReturnTypeParameters
): Omit<
  ActionImportRequestBuilder<
    TestActionImportSharedEntityReturnTypeParameters,
    never
  >,
  'execute'
> {
  const params = {};

  return new ActionImportRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestActionImportSharedEntityReturnType',
    data =>
      throwErrorWhenReturnTypeIsUnionType(
        data,
        'TestActionImportSharedEntityReturnType'
      ),
    params
  );
}

/**
 * Type of the parameters to be passed to [[testActionImportSharedEntityReturnTypeCollection]].
 */
export interface TestActionImportSharedEntityReturnTypeCollectionParameters {}

/**
 * Test Action Import Shared Entity Return Type Collection. The 'execute' method does not exist when using this function/action import. Please use the 'executeRaw' for getting the raw response.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testActionImportSharedEntityReturnTypeCollection(
  parameters: TestActionImportSharedEntityReturnTypeCollectionParameters
): Omit<
  ActionImportRequestBuilder<
    TestActionImportSharedEntityReturnTypeCollectionParameters,
    never
  >,
  'execute'
> {
  const params = {};

  return new ActionImportRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestActionImportSharedEntityReturnTypeCollection',
    data =>
      throwErrorWhenReturnTypeIsUnionType(
        data,
        'TestActionImportSharedEntityReturnTypeCollection'
      ),
    params
  );
}

/**
 * Type of the parameters to be passed to [[testActionImportNullableTest]].
 */
export interface TestActionImportNullableTestParameters {
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
 * Test Action Import Nullable Test.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testActionImportNullableTest(
  parameters: TestActionImportNullableTestParameters
): ActionImportRequestBuilder<
  TestActionImportNullableTestParameters,
  TestComplexType | null
> {
  const params = {
    nullablePerDefault: new ActionImportParameter(
      'NullablePerDefault',
      'Edm.String',
      parameters.nullablePerDefault
    ),
    nullableExplicit: new ActionImportParameter(
      'NullableExplicit',
      'Edm.String',
      parameters.nullableExplicit
    ),
    nonNullable: new ActionImportParameter(
      'NonNullable',
      'Edm.String',
      parameters.nonNullable
    )
  };

  return new ActionImportRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestActionImportNullableTest',
    data =>
      transformReturnValueForComplexTypeV4(data, data =>
        deserializeComplexTypeV4(data, TestComplexType)
      ),
    params
  );
}

export const actionImports = {
  testActionImportNoParameterNoReturnType,
  testActionImportMultipleParameterComplexReturnType,
  testActionImportUnsupportedEdmTypes,
  testActionImportNoParameterEntityReturnType,
  testActionImportSharedEntityReturnType,
  testActionImportSharedEntityReturnTypeCollection,
  testActionImportNullableTest
};
