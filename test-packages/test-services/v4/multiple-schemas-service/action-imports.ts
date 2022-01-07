/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import '@sap-cloud-sdk/odata-common/internal';
import {
  entityDeserializer,
  ActionImportRequestBuilder,
  ActionImportParameter,
  transformReturnValueForComplexType,
  DeSerializers,
  DefaultDeSerializers,
  defaultDeSerializers
} from '@sap-cloud-sdk/odata-v4';
import { multipleSchemasService } from './service';
import { TestComplexType1 } from './TestComplexType1';
import { TestComplexType2 } from './TestComplexType2';

/**
 * Type of the parameters to be passed to [[testActionImportNoParameterComplexReturnType1]].
 */
export interface TestActionImportNoParameterComplexReturnType1Parameters<
  DeSerializersT extends DeSerializers
> {}

/**
 * Test Action Import No Parameter Complex Return Type 1.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testActionImportNoParameterComplexReturnType1<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestActionImportNoParameterComplexReturnType1Parameters<DeSerializersT>,
  deSerializers: DeSerializersT = defaultDeSerializers as any
): ActionImportRequestBuilder<
  DeSerializersT,
  TestActionImportNoParameterComplexReturnType1Parameters<DeSerializersT>,
  TestComplexType1
> {
  const params = {};

  return new ActionImportRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestActionImportNoParameterComplexReturnType1',
    data =>
      transformReturnValueForComplexType(data, data =>
        entityDeserializer(deSerializers).deserializeComplexType(
          data,
          TestComplexType1
        )
      ),
    params,
    deSerializers
  );
}

/**
 * Type of the parameters to be passed to [[testActionImportNoParameterComplexReturnType2]].
 */
export interface TestActionImportNoParameterComplexReturnType2Parameters<
  DeSerializersT extends DeSerializers
> {}

/**
 * Test Action Import No Parameter Complex Return Type 2.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testActionImportNoParameterComplexReturnType2<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestActionImportNoParameterComplexReturnType2Parameters<DeSerializersT>,
  deSerializers: DeSerializersT = defaultDeSerializers as any
): ActionImportRequestBuilder<
  DeSerializersT,
  TestActionImportNoParameterComplexReturnType2Parameters<DeSerializersT>,
  TestComplexType2
> {
  const params = {};

  return new ActionImportRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestActionImportNoParameterComplexReturnType2',
    data =>
      transformReturnValueForComplexType(data, data =>
        entityDeserializer(deSerializers).deserializeComplexType(
          data,
          TestComplexType2
        )
      ),
    params,
    deSerializers
  );
}

export const actionImports = {
  testActionImportNoParameterComplexReturnType1,
  testActionImportNoParameterComplexReturnType2
};
