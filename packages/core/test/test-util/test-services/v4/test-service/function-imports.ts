/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { transformReturnValueForEdmType, transformReturnValueForEdmTypeList, transformReturnValueForEntity, transformReturnValueForEntityList, transformReturnValueForComplexType, transformReturnValueForComplexTypeList, transformReturnValueForUndefined, edmToTs, deserializeComplexType, FunctionImportRequestBuilder, FunctionImportParameter } from '../../../../../src';
import { TestEntity } from './TestEntity';
import { TestComplexType } from './TestComplexType';

/**
 * Type of the parameters to be passed to [[testFunctionImportEdmReturnType]].
 */
export interface TestFunctionImportEdmReturnTypeParameters {
}

/**
 * Test Function Import Edm Return Type.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
export function testFunctionImportEdmReturnType(parameters: TestFunctionImportEdmReturnTypeParameters): FunctionImportRequestBuilder<TestFunctionImportEdmReturnTypeParameters, boolean> {
  const params = {

  }

  return new FunctionImportRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportEdmReturnType', (data) => transformReturnValueForEdmType(data, (val) => edmToTs(val, 'Edm.Boolean')), params);
}

/**
 * Type of the parameters to be passed to [[testFunctionImportEdmReturnTypeCollection]].
 */
export interface TestFunctionImportEdmReturnTypeCollectionParameters {
}

/**
 * Test Function Import Edm Return Type Collection.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
export function testFunctionImportEdmReturnTypeCollection(parameters: TestFunctionImportEdmReturnTypeCollectionParameters): FunctionImportRequestBuilder<TestFunctionImportEdmReturnTypeCollectionParameters, string[]> {
  const params = {

  }

  return new FunctionImportRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportEdmReturnTypeCollection', (data) => transformReturnValueForEdmTypeList(data, (val) => edmToTs(val, 'Edm.String')), params);
}

/**
 * Type of the parameters to be passed to [[testFunctionImportEntityReturnType]].
 */
export interface TestFunctionImportEntityReturnTypeParameters {
}

/**
 * Test Function Import Entity Return Type.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
export function testFunctionImportEntityReturnType(parameters: TestFunctionImportEntityReturnTypeParameters): FunctionImportRequestBuilder<TestFunctionImportEntityReturnTypeParameters, TestEntity> {
  const params = {

  }

  return new FunctionImportRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportEntityReturnType', (data) => transformReturnValueForEntity(data, TestEntity), params);
}

/**
 * Type of the parameters to be passed to [[testFunctionImportEntityReturnTypeCollection]].
 */
export interface TestFunctionImportEntityReturnTypeCollectionParameters {
}

/**
 * Test Function Import Entity Return Type Collection.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
export function testFunctionImportEntityReturnTypeCollection(parameters: TestFunctionImportEntityReturnTypeCollectionParameters): FunctionImportRequestBuilder<TestFunctionImportEntityReturnTypeCollectionParameters, TestEntity[]> {
  const params = {

  }

  return new FunctionImportRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportEntityReturnTypeCollection', (data) => transformReturnValueForEntityList(data, TestEntity), params);
}

/**
 * Type of the parameters to be passed to [[testFunctionImportComplexReturnType]].
 */
export interface TestFunctionImportComplexReturnTypeParameters {
}

/**
 * Test Function Import Complex Return Type.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
export function testFunctionImportComplexReturnType(parameters: TestFunctionImportComplexReturnTypeParameters): FunctionImportRequestBuilder<TestFunctionImportComplexReturnTypeParameters, TestComplexType> {
  const params = {

  }

  return new FunctionImportRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportComplexReturnType', (data) => transformReturnValueForComplexType(data, (data) => deserializeComplexType(data, TestComplexType)), params);
}

/**
 * Type of the parameters to be passed to [[testFunctionImportComplexReturnTypeCollection]].
 */
export interface TestFunctionImportComplexReturnTypeCollectionParameters {
}

/**
 * Test Function Import Complex Return Type Collection.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
export function testFunctionImportComplexReturnTypeCollection(parameters: TestFunctionImportComplexReturnTypeCollectionParameters): FunctionImportRequestBuilder<TestFunctionImportComplexReturnTypeCollectionParameters, TestComplexType[]> {
  const params = {

  }

  return new FunctionImportRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportComplexReturnTypeCollection', (data) => transformReturnValueForComplexTypeList(data, (data) => deserializeComplexType(data, TestComplexType)), params);
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
  nullableBooleanParam?: boolean;
  /**
   * Nullable Geography Point Param.
   */
  nullableGeographyPointParam?: any;
}

/**
 * Test Function Import Multiple Params.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
export function testFunctionImportMultipleParams(parameters: TestFunctionImportMultipleParamsParameters): FunctionImportRequestBuilder<TestFunctionImportMultipleParamsParameters, boolean> {
  const params = {
    stringParam: new FunctionImportParameter('StringParam', 'Edm.String', parameters.stringParam),
    nonNullableStringParam: new FunctionImportParameter('NonNullableStringParam', 'Edm.String', parameters.nonNullableStringParam),
    nullableBooleanParam: new FunctionImportParameter('NullableBooleanParam', 'Edm.Boolean', parameters.nullableBooleanParam),
    nullableGeographyPointParam: new FunctionImportParameter('NullableGeographyPointParam', 'Edm.Any', parameters.nullableGeographyPointParam)
  }

  return new FunctionImportRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportMultipleParams', (data) => transformReturnValueForEdmType(data, (val) => edmToTs(val, 'Edm.Boolean')), params);
}

/**
 * Type of the parameters to be passed to [[testFunctionImportWithDifferentName]].
 */
export interface TestFunctionImportWithDifferentNameParameters {
}

/**
 * Test Function Import With Different Name.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
export function testFunctionImportWithDifferentName(parameters: TestFunctionImportWithDifferentNameParameters): FunctionImportRequestBuilder<TestFunctionImportWithDifferentNameParameters, undefined> {
  const params = {

  }

  return new FunctionImportRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportWithDifferentName', (data) => transformReturnValueForUndefined(data, (val) => undefined), params);
}

export const functionImports = {
  testFunctionImportEdmReturnType,
  testFunctionImportEdmReturnTypeCollection,
  testFunctionImportEntityReturnType,
  testFunctionImportEntityReturnTypeCollection,
  testFunctionImportComplexReturnType,
  testFunctionImportComplexReturnTypeCollection,
  testFunctionImportMultipleParams,
  testFunctionImportWithDifferentName
};
