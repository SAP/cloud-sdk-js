/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  DeSerializers,
  DefaultDeSerializers,
  ActionImportRequestBuilder
} from '@sap-cloud-sdk/odata-v4';
import { TestComplexType1 } from './TestComplexType1';
import { TestComplexType2 } from './TestComplexType2';
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
export declare const actionImports: {
  testActionImportNoParameterComplexReturnType1: typeof testActionImportNoParameterComplexReturnType1;
  testActionImportNoParameterComplexReturnType2: typeof testActionImportNoParameterComplexReturnType2;
};
//# sourceMappingURL=action-imports.d.ts.map
