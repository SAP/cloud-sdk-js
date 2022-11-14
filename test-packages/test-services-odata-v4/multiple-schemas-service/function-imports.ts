/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  transformReturnValueForEntity,
  DeSerializers,
  DefaultDeSerializers,
  defaultDeSerializers,
  FunctionImportRequestBuilder
} from '@sap-cloud-sdk/odata-v4';
import { multipleSchemasService } from './service';
import { TestEntity1 } from './TestEntity1';
import { TestEntity1Api } from './TestEntity1Api';
import { TestEntity2 } from './TestEntity2';
import { TestEntity2Api } from './TestEntity2Api';

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
export function testFunctionImportEntityReturnType1<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestFunctionImportEntityReturnType1Parameters<DeSerializersT>,
  deSerializers: DeSerializersT = defaultDeSerializers as any
): FunctionImportRequestBuilder<
  DeSerializersT,
  TestFunctionImportEntityReturnType1Parameters<DeSerializersT>,
  TestEntity1
> {
  const params = {};

  return new FunctionImportRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportEntityReturnType1',
    data =>
      transformReturnValueForEntity(
        data,
        multipleSchemasService(deSerializers).testEntity1Api
      ),
    params,
    deSerializers
  );
}

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
export function testFunctionImportEntityReturnType2<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestFunctionImportEntityReturnType2Parameters<DeSerializersT>,
  deSerializers: DeSerializersT = defaultDeSerializers as any
): FunctionImportRequestBuilder<
  DeSerializersT,
  TestFunctionImportEntityReturnType2Parameters<DeSerializersT>,
  TestEntity2
> {
  const params = {};

  return new FunctionImportRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportEntityReturnType2',
    data =>
      transformReturnValueForEntity(
        data,
        multipleSchemasService(deSerializers).testEntity2Api
      ),
    params,
    deSerializers
  );
}

export const functionImports = {
  testFunctionImportEntityReturnType1,
  testFunctionImportEntityReturnType2
};
