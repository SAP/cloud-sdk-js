/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { throwErrorWhenReturnTypeIsUnionType } from '@sap-cloud-sdk/odata-common/internal';
import { edmToTs, entityDeserializer, ActionImportRequestBuilder, ActionImportParameter, transformReturnValueForUndefined, transformReturnValueForComplexType, transformReturnValueForEdmType, transformReturnValueForEntity, DeSerializers, DefaultDeSerializers, defaultDeSerializers } from '@sap-cloud-sdk/odata-v4';
import { testService } from './service';
import { TestComplexType } from './TestComplexType';
import { TestEntity } from './TestEntity';
import { TestEntityApi } from './TestEntityApi';

/**
 * Type of the parameters to be passed to [[testActionImportNoParameterNoReturnType]].
 */
export interface TestActionImportNoParameterNoReturnTypeParameters<DeSerializersT extends DeSerializers> {
}

/**
 * Test Action Import No Parameter No Return Type. 
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testActionImportNoParameterNoReturnType<DeSerializersT extends DeSerializers = DefaultDeSerializers>(parameters: TestActionImportNoParameterNoReturnTypeParameters<DeSerializersT>, deSerializers: DeSerializersT = defaultDeSerializers as any): ActionImportRequestBuilder<DeSerializersT, TestActionImportNoParameterNoReturnTypeParameters<DeSerializersT>, undefined> {
  const params = {

  }

  return new ActionImportRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestActionImportNoParameterNoReturnType', (data) => transformReturnValueForUndefined(data, (val) => undefined), params, deSerializers);
}

/**
 * Type of the parameters to be passed to [[testActionImportMultipleParameterComplexReturnType]].
 */
export interface TestActionImportMultipleParameterComplexReturnTypeParameters<DeSerializersT extends DeSerializers> {
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
export function testActionImportMultipleParameterComplexReturnType<DeSerializersT extends DeSerializers = DefaultDeSerializers>(parameters: TestActionImportMultipleParameterComplexReturnTypeParameters<DeSerializersT>, deSerializers: DeSerializersT = defaultDeSerializers as any): ActionImportRequestBuilder<DeSerializersT, TestActionImportMultipleParameterComplexReturnTypeParameters<DeSerializersT>, TestComplexType> {
  const params = {
    stringParam: new ActionImportParameter('StringParam', 'Edm.String', parameters.stringParam),
    nonNullableStringParam: new ActionImportParameter('NonNullableStringParam', 'Edm.String', parameters.nonNullableStringParam),
    nullableBooleanParam: new ActionImportParameter('NullableBooleanParam', 'Edm.Boolean', parameters.nullableBooleanParam),
    nullableGeographyPointParam: new ActionImportParameter('NullableGeographyPointParam', 'Edm.Any', parameters.nullableGeographyPointParam)
  }

  return new ActionImportRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestActionImportMultipleParameterComplexReturnType', (data) => transformReturnValueForComplexType(data, (data) => entityDeserializer(
    deSerializers
  ).deserializeComplexType(data, TestComplexType)), params, deSerializers);
}

/**
 * Type of the parameters to be passed to [[testActionImportUnsupportedEdmTypes]].
 */
export interface TestActionImportUnsupportedEdmTypesParameters<DeSerializersT extends DeSerializers> {
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
export function testActionImportUnsupportedEdmTypes<DeSerializersT extends DeSerializers = DefaultDeSerializers>(parameters: TestActionImportUnsupportedEdmTypesParameters<DeSerializersT>, deSerializers: DeSerializersT = defaultDeSerializers as any): ActionImportRequestBuilder<DeSerializersT, TestActionImportUnsupportedEdmTypesParameters<DeSerializersT>, any> {
  const params = {
    simpleParam: new ActionImportParameter('SimpleParam', 'Edm.Any', parameters.simpleParam)
  }

  return new ActionImportRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestActionImportUnsupportedEdmTypes', (data) => transformReturnValueForEdmType(data, (val) => edmToTs(val.value, 'Edm.Any', deSerializers)), params, deSerializers);
}

/**
 * Type of the parameters to be passed to [[testActionImportNoParameterEntityReturnType]].
 */
export interface TestActionImportNoParameterEntityReturnTypeParameters<DeSerializersT extends DeSerializers> {
}

/**
 * Test Action Import No Parameter Entity Return Type. 
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testActionImportNoParameterEntityReturnType<DeSerializersT extends DeSerializers = DefaultDeSerializers>(parameters: TestActionImportNoParameterEntityReturnTypeParameters<DeSerializersT>, deSerializers: DeSerializersT = defaultDeSerializers as any): ActionImportRequestBuilder<DeSerializersT, TestActionImportNoParameterEntityReturnTypeParameters<DeSerializersT>, TestEntity> {
  const params = {

  }

  return new ActionImportRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestActionImportNoParameterEntityReturnType', (data) => transformReturnValueForEntity(data, testService(deSerializers).testEntityApi), params, deSerializers);
}

/**
 * Type of the parameters to be passed to [[testActionImportSharedEntityReturnType]].
 */
export interface TestActionImportSharedEntityReturnTypeParameters<DeSerializersT extends DeSerializers> {
}

/**
 * Test Action Import Shared Entity Return Type. The 'execute' method does not exist when using this function/action import. Please use the 'executeRaw' for getting the raw response.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testActionImportSharedEntityReturnType<DeSerializersT extends DeSerializers = DefaultDeSerializers>(parameters: TestActionImportSharedEntityReturnTypeParameters<DeSerializersT>, deSerializers: DeSerializersT = defaultDeSerializers as any): Omit<ActionImportRequestBuilder<DeSerializersT, TestActionImportSharedEntityReturnTypeParameters<DeSerializersT>, never>, 'execute'> {
  const params = {

  }

  return new ActionImportRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestActionImportSharedEntityReturnType', (data) => throwErrorWhenReturnTypeIsUnionType(data, 'TestActionImportSharedEntityReturnType'), params, deSerializers);
}

/**
 * Type of the parameters to be passed to [[testActionImportSharedEntityReturnTypeCollection]].
 */
export interface TestActionImportSharedEntityReturnTypeCollectionParameters<DeSerializersT extends DeSerializers> {
}

/**
 * Test Action Import Shared Entity Return Type Collection. The 'execute' method does not exist when using this function/action import. Please use the 'executeRaw' for getting the raw response.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testActionImportSharedEntityReturnTypeCollection<DeSerializersT extends DeSerializers = DefaultDeSerializers>(parameters: TestActionImportSharedEntityReturnTypeCollectionParameters<DeSerializersT>, deSerializers: DeSerializersT = defaultDeSerializers as any): Omit<ActionImportRequestBuilder<DeSerializersT, TestActionImportSharedEntityReturnTypeCollectionParameters<DeSerializersT>, never>, 'execute'> {
  const params = {

  }

  return new ActionImportRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestActionImportSharedEntityReturnTypeCollection', (data) => throwErrorWhenReturnTypeIsUnionType(data, 'TestActionImportSharedEntityReturnTypeCollection'), params, deSerializers);
}

/**
 * Type of the parameters to be passed to [[testActionImportNullableTest]].
 */
export interface TestActionImportNullableTestParameters<DeSerializersT extends DeSerializers> {
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
export function testActionImportNullableTest<DeSerializersT extends DeSerializers = DefaultDeSerializers>(parameters: TestActionImportNullableTestParameters<DeSerializersT>, deSerializers: DeSerializersT = defaultDeSerializers as any): ActionImportRequestBuilder<DeSerializersT, TestActionImportNullableTestParameters<DeSerializersT>, TestComplexType | null> {
  const params = {
    nullablePerDefault: new ActionImportParameter('NullablePerDefault', 'Edm.String', parameters.nullablePerDefault),
    nullableExplicit: new ActionImportParameter('NullableExplicit', 'Edm.String', parameters.nullableExplicit),
    nonNullable: new ActionImportParameter('NonNullable', 'Edm.String', parameters.nonNullable)
  }

  return new ActionImportRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestActionImportNullableTest', (data) => transformReturnValueForComplexType(data, (data) => entityDeserializer(
    deSerializers
  ).deserializeComplexType(data, TestComplexType)), params, deSerializers);
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
