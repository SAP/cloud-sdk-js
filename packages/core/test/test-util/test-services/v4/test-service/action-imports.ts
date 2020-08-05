/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { transformReturnValueForUndefined, transformReturnValueForComplexType, deserializeComplexType, ActionImportRequestBuilder, ActionImportParameter } from '../../../../../src/v4';
import { TestComplexType } from './TestComplexType';

/**
 * Type of the parameters to be passed to [[testActionImportNoParameterNoReturnType]].
 */
export interface TestActionImportNoParameterNoReturnTypeParameters {
}

/**
 * Test Action Import No Parameter No Return Type.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
export function testActionImportNoParameterNoReturnType(parameters: TestActionImportNoParameterNoReturnTypeParameters): ActionImportRequestBuilder<TestActionImportNoParameterNoReturnTypeParameters, undefined> {
  const params = {

  }

  return new ActionImportRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestActionImportNoParameterNoReturnType', (data) => transformReturnValueForUndefined(data, (val) => undefined), params);
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
  nullableBooleanParam?: boolean;
}

/**
 * Test Action Import Multiple Parameter Complex Return Type.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
export function testActionImportMultipleParameterComplexReturnType(parameters: TestActionImportMultipleParameterComplexReturnTypeParameters): ActionImportRequestBuilder<TestActionImportMultipleParameterComplexReturnTypeParameters, TestComplexType> {
  const params = {
    stringParam: new ActionImportParameter('StringParam', 'Edm.String', parameters.stringParam),
    nonNullableStringParam: new ActionImportParameter('NonNullableStringParam', 'Edm.String', parameters.nonNullableStringParam),
    nullableBooleanParam: new ActionImportParameter('NullableBooleanParam', 'Edm.Boolean', parameters.nullableBooleanParam)
  }

  return new ActionImportRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestActionImportMultipleParameterComplexReturnType', (data) => transformReturnValueForComplexType(data, (data) => deserializeComplexType(data, TestComplexType)), params);
}

export const actionImports = {
  testActionImportNoParameterNoReturnType,
  testActionImportMultipleParameterComplexReturnType
};
