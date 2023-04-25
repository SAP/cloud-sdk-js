/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  DeSerializers,
  DefaultDeSerializers,
  FunctionImportRequestBuilder,
  ActionImportRequestBuilder
} from '@sap-cloud-sdk/odata-v4';
import { TestComplexType1 } from './TestComplexType1';
import { TestComplexType2 } from './TestComplexType2';
import { TestEntity1 } from './TestEntity1';
import { TestEntity2 } from './TestEntity2';
/**
 * Type of the parameters to be passed to {@link testActionImportNoParameterComplexReturnType1}.
 */
export interface TestActionImportNoParameterComplexReturnType1Parameters<
  DeSerializersT extends DeSerializers
> {}
/**
 * Test Action Import No Parameter Complex Return Type 1.
 * @param parameters - Object containing all parameters for the action.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testActionImportNoParameterComplexReturnType1<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestActionImportNoParameterComplexReturnType1Parameters<DeSerializersT>,
  deSerializers?: DeSerializersT
): ActionImportRequestBuilder<
  DeSerializersT,
  TestActionImportNoParameterComplexReturnType1Parameters<DeSerializersT>,
  TestComplexType1
>;
/**
 * Type of the parameters to be passed to {@link testActionImportNoParameterComplexReturnType2}.
 */
export interface TestActionImportNoParameterComplexReturnType2Parameters<
  DeSerializersT extends DeSerializers
> {}
/**
 * Test Action Import No Parameter Complex Return Type 2.
 * @param parameters - Object containing all parameters for the action.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testActionImportNoParameterComplexReturnType2<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestActionImportNoParameterComplexReturnType2Parameters<DeSerializersT>,
  deSerializers?: DeSerializersT
): ActionImportRequestBuilder<
  DeSerializersT,
  TestActionImportNoParameterComplexReturnType2Parameters<DeSerializersT>,
  TestComplexType2
>;
/**
 * Type of the parameters to be passed to {@link testFunctionImportEntityReturnType1}.
 */
export interface TestFunctionImportEntityReturnType1Parameters<
  DeSerializersT extends DeSerializers
> {}
/**
 * Test Function Import Entity Return Type 1.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportEntityReturnType1<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestFunctionImportEntityReturnType1Parameters<DeSerializersT>,
  deSerializers?: DeSerializersT
): FunctionImportRequestBuilder<
  DeSerializersT,
  TestFunctionImportEntityReturnType1Parameters<DeSerializersT>,
  TestEntity1
>;
/**
 * Type of the parameters to be passed to {@link testFunctionImportEntityReturnType2}.
 */
export interface TestFunctionImportEntityReturnType2Parameters<
  DeSerializersT extends DeSerializers
> {}
/**
 * Test Function Import Entity Return Type 2.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportEntityReturnType2<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestFunctionImportEntityReturnType2Parameters<DeSerializersT>,
  deSerializers?: DeSerializersT
): FunctionImportRequestBuilder<
  DeSerializersT,
  TestFunctionImportEntityReturnType2Parameters<DeSerializersT>,
  TestEntity2
>;
export declare const operations: {
  testActionImportNoParameterComplexReturnType1: typeof testActionImportNoParameterComplexReturnType1;
  testActionImportNoParameterComplexReturnType2: typeof testActionImportNoParameterComplexReturnType2;
  testFunctionImportEntityReturnType1: typeof testFunctionImportEntityReturnType1;
  testFunctionImportEntityReturnType2: typeof testFunctionImportEntityReturnType2;
};
