/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { transformReturnValueForUndefined, transformReturnValueForComplexType, deserializeComplexType, ActionImportRequestBuilder, ActionImportPayloadElement } from '@sap-cloud-sdk/core/v4';
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
  const payload = {

  }

  return new ActionImportRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestActionImportNoParameterNoReturnType', (data) => transformReturnValueForUndefined(data, (val) => undefined), payload);
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
  const payload = {
    stringParam: new ActionImportPayloadElement('StringParam', 'Edm.String', parameters.stringParam),
    nonNullableStringParam: new ActionImportPayloadElement('NonNullableStringParam', 'Edm.String', parameters.nonNullableStringParam),
    nullableBooleanParam: new ActionImportPayloadElement('NullableBooleanParam', 'Edm.Boolean', parameters.nullableBooleanParam)
  }

  return new ActionImportRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestActionImportMultipleParameterComplexReturnType', (data) => transformReturnValueForComplexType(data, (data) => deserializeComplexType(data, TestComplexType)), payload);
}

export const actionImports = {
  testActionImportNoParameterNoReturnType,
  testActionImportMultipleParameterComplexReturnType
};
