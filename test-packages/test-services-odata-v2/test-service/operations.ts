/*
 * Copyright (c) 2026 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  edmToTs,
  entityDeserializer,
  transformReturnValueForUndefined,
  transformReturnValueForEdmType,
  transformReturnValueForEdmTypeList,
  transformReturnValueForEntity,
  transformReturnValueForEntityList,
  throwErrorWhenReturnTypeIsUnionType,
  transformReturnValueForComplexType,
  transformReturnValueForComplexTypeList,
  DeSerializers,
  DefaultDeSerializers,
  defaultDeSerializers,
  OperationParameter,
  OperationRequestBuilder
} from '@sap-cloud-sdk/odata-v2';
import { testService } from './service';
import { TestEntity } from './TestEntity';
import { TestEntityApi } from './TestEntityApi';
import { TestComplexType } from './TestComplexType';

/**
 * Type of the parameters to be passed to {@link testFunctionImportNoReturnType}.
 */
export interface TestFunctionImportNoReturnTypeParameters<
  DeSerializersT extends DeSerializers
> {}

/**
 * Test Function Import No Return Type.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportNoReturnType<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestFunctionImportNoReturnTypeParameters<DeSerializersT>,
  deSerializers: DeSerializersT = defaultDeSerializers as DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  TestFunctionImportNoReturnTypeParameters<DeSerializersT>,
  undefined
> {
  const params = {};

  return new OperationRequestBuilder(
    'post',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportNoReturnType',
    data => transformReturnValueForUndefined(data, val => undefined),
    params,
    deSerializers
  );
}

/**
 * Type of the parameters to be passed to {@link testFunctionImportEdmReturnType}.
 */
export interface TestFunctionImportEdmReturnTypeParameters<
  DeSerializersT extends DeSerializers
> {}

/**
 * Test Function Import Edm Return Type.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportEdmReturnType<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestFunctionImportEdmReturnTypeParameters<DeSerializersT>,
  deSerializers: DeSerializersT = defaultDeSerializers as DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  TestFunctionImportEdmReturnTypeParameters<DeSerializersT>,
  boolean
> {
  const params = {};

  return new OperationRequestBuilder(
    'get',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportEdmReturnType',
    data =>
      transformReturnValueForEdmType(data, val =>
        edmToTs(
          val.TestFunctionImportEdmReturnType,
          'Edm.Boolean',
          deSerializers
        )
      ),
    params,
    deSerializers
  );
}

/**
 * Type of the parameters to be passed to {@link testFunctionImportEdmReturnTypeCollection}.
 */
export interface TestFunctionImportEdmReturnTypeCollectionParameters<
  DeSerializersT extends DeSerializers
> {}

/**
 * Test Function Import Edm Return Type Collection.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportEdmReturnTypeCollection<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestFunctionImportEdmReturnTypeCollectionParameters<DeSerializersT>,
  deSerializers: DeSerializersT = defaultDeSerializers as DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  TestFunctionImportEdmReturnTypeCollectionParameters<DeSerializersT>,
  string[]
> {
  const params = {};

  return new OperationRequestBuilder(
    'get',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportEdmReturnTypeCollection',
    data =>
      transformReturnValueForEdmTypeList(data, val =>
        edmToTs(val, 'Edm.String', deSerializers)
      ),
    params,
    deSerializers
  );
}

/**
 * Type of the parameters to be passed to {@link testFunctionImportEntityReturnType}.
 */
export interface TestFunctionImportEntityReturnTypeParameters<
  DeSerializersT extends DeSerializers
> {}

/**
 * Test Function Import Entity Return Type.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportEntityReturnType<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestFunctionImportEntityReturnTypeParameters<DeSerializersT>,
  deSerializers: DeSerializersT = defaultDeSerializers as DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  TestFunctionImportEntityReturnTypeParameters<DeSerializersT>,
  TestEntity
> {
  const params = {};

  return new OperationRequestBuilder(
    'get',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportEntityReturnType',
    data =>
      transformReturnValueForEntity(
        data,
        testService(deSerializers).testEntityApi
      ),
    params,
    deSerializers
  );
}

/**
 * Type of the parameters to be passed to {@link testFunctionImportEntityReturnTypeCollection}.
 */
export interface TestFunctionImportEntityReturnTypeCollectionParameters<
  DeSerializersT extends DeSerializers
> {}

/**
 * Test Function Import Entity Return Type Collection.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportEntityReturnTypeCollection<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestFunctionImportEntityReturnTypeCollectionParameters<DeSerializersT>,
  deSerializers: DeSerializersT = defaultDeSerializers as DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  TestFunctionImportEntityReturnTypeCollectionParameters<DeSerializersT>,
  TestEntity[]
> {
  const params = {};

  return new OperationRequestBuilder(
    'get',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportEntityReturnTypeCollection',
    data =>
      transformReturnValueForEntityList(
        data,
        testService(deSerializers).testEntityApi
      ),
    params,
    deSerializers
  );
}

/**
 * Type of the parameters to be passed to {@link testFunctionImportSharedEntityReturnType}.
 */
export interface TestFunctionImportSharedEntityReturnTypeParameters<
  DeSerializersT extends DeSerializers
> {}

/**
 * Test Function Import Shared Entity Return Type. The 'execute' method does not exist for this function import. Please use 'executeRaw' to get the raw response.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportSharedEntityReturnType<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestFunctionImportSharedEntityReturnTypeParameters<DeSerializersT>,
  deSerializers: DeSerializersT = defaultDeSerializers as DeSerializersT
): Omit<
  OperationRequestBuilder<
    DeSerializersT,
    TestFunctionImportSharedEntityReturnTypeParameters<DeSerializersT>,
    never
  >,
  'execute'
> {
  const params = {};

  return new OperationRequestBuilder(
    'get',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportSharedEntityReturnType',
    data =>
      throwErrorWhenReturnTypeIsUnionType(
        data,
        'TestFunctionImportSharedEntityReturnType'
      ),
    params,
    deSerializers
  );
}

/**
 * Type of the parameters to be passed to {@link testFunctionImportSharedEntityReturnTypeCollection}.
 */
export interface TestFunctionImportSharedEntityReturnTypeCollectionParameters<
  DeSerializersT extends DeSerializers
> {}

/**
 * Test Function Import Shared Entity Return Type Collection. The 'execute' method does not exist for this function import. Please use 'executeRaw' to get the raw response.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportSharedEntityReturnTypeCollection<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestFunctionImportSharedEntityReturnTypeCollectionParameters<DeSerializersT>,
  deSerializers: DeSerializersT = defaultDeSerializers as DeSerializersT
): Omit<
  OperationRequestBuilder<
    DeSerializersT,
    TestFunctionImportSharedEntityReturnTypeCollectionParameters<DeSerializersT>,
    never
  >,
  'execute'
> {
  const params = {};

  return new OperationRequestBuilder(
    'get',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportSharedEntityReturnTypeCollection',
    data =>
      throwErrorWhenReturnTypeIsUnionType(
        data,
        'TestFunctionImportSharedEntityReturnTypeCollection'
      ),
    params,
    deSerializers
  );
}

/**
 * Type of the parameters to be passed to {@link testFunctionImportComplexReturnType}.
 */
export interface TestFunctionImportComplexReturnTypeParameters<
  DeSerializersT extends DeSerializers
> {}

/**
 * Test Function Import Complex Return Type.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportComplexReturnType<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestFunctionImportComplexReturnTypeParameters<DeSerializersT>,
  deSerializers: DeSerializersT = defaultDeSerializers as DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  TestFunctionImportComplexReturnTypeParameters<DeSerializersT>,
  TestComplexType
> {
  const params = {};

  return new OperationRequestBuilder(
    'get',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportComplexReturnType',
    data =>
      transformReturnValueForComplexType(data, data =>
        entityDeserializer(
          deSerializers || defaultDeSerializers
        ).deserializeComplexType(data, TestComplexType)
      ),
    params,
    deSerializers
  );
}

/**
 * Type of the parameters to be passed to {@link testFunctionImportUnsupportedEdmTypes}.
 */
export interface TestFunctionImportUnsupportedEdmTypesParameters<
  DeSerializersT extends DeSerializers
> {
  /**
   * Simple Param.
   */
  simpleParam: any;
}

/**
 * Test Function Import Unsupported Edm Types.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportUnsupportedEdmTypes<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestFunctionImportUnsupportedEdmTypesParameters<DeSerializersT>,
  deSerializers: DeSerializersT = defaultDeSerializers as DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  TestFunctionImportUnsupportedEdmTypesParameters<DeSerializersT>,
  any
> {
  const params = {
    simpleParam: new OperationParameter(
      'SimpleParam',
      'Edm.Any',
      parameters.simpleParam
    )
  };

  return new OperationRequestBuilder(
    'get',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportUnsupportedEdmTypes',
    data =>
      transformReturnValueForEdmType(data, val =>
        edmToTs(
          val.TestFunctionImportUnsupportedEdmTypes,
          'Edm.Any',
          deSerializers
        )
      ),
    params,
    deSerializers
  );
}

/**
 * Type of the parameters to be passed to {@link testFunctionImportComplexReturnTypeCollection}.
 */
export interface TestFunctionImportComplexReturnTypeCollectionParameters<
  DeSerializersT extends DeSerializers
> {}

/**
 * Test Function Import Complex Return Type Collection.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportComplexReturnTypeCollection<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestFunctionImportComplexReturnTypeCollectionParameters<DeSerializersT>,
  deSerializers: DeSerializersT = defaultDeSerializers as DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  TestFunctionImportComplexReturnTypeCollectionParameters<DeSerializersT>,
  TestComplexType[]
> {
  const params = {};

  return new OperationRequestBuilder(
    'get',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportComplexReturnTypeCollection',
    data =>
      transformReturnValueForComplexTypeList(data, data =>
        entityDeserializer(
          deSerializers || defaultDeSerializers
        ).deserializeComplexType(data, TestComplexType)
      ),
    params,
    deSerializers
  );
}

/**
 * Type of the parameters to be passed to {@link testFunctionImportGet}.
 */
export interface TestFunctionImportGetParameters<
  DeSerializersT extends DeSerializers
> {
  /**
   * Simple Param.
   */
  simpleParam: string;
}

/**
 * Test Function Import Get.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportGet<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestFunctionImportGetParameters<DeSerializersT>,
  deSerializers: DeSerializersT = defaultDeSerializers as DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  TestFunctionImportGetParameters<DeSerializersT>,
  boolean
> {
  const params = {
    simpleParam: new OperationParameter(
      'SimpleParam',
      'Edm.String',
      parameters.simpleParam
    )
  };

  return new OperationRequestBuilder(
    'get',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportGET',
    data =>
      transformReturnValueForEdmType(data, val =>
        edmToTs(val.TestFunctionImportGET, 'Edm.Boolean', deSerializers)
      ),
    params,
    deSerializers
  );
}

/**
 * Type of the parameters to be passed to {@link testFunctionImportPost}.
 */
export interface TestFunctionImportPostParameters<
  DeSerializersT extends DeSerializers
> {
  /**
   * Simple Param.
   */
  simpleParam: string;
}

/**
 * Test Function Import Post.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportPost<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestFunctionImportPostParameters<DeSerializersT>,
  deSerializers: DeSerializersT = defaultDeSerializers as DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  TestFunctionImportPostParameters<DeSerializersT>,
  boolean
> {
  const params = {
    simpleParam: new OperationParameter(
      'SimpleParam',
      'Edm.String',
      parameters.simpleParam
    )
  };

  return new OperationRequestBuilder(
    'post',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportPOST',
    data =>
      transformReturnValueForEdmType(data, val =>
        edmToTs(val.TestFunctionImportPOST, 'Edm.Boolean', deSerializers)
      ),
    params,
    deSerializers
  );
}

/**
 * Type of the parameters to be passed to {@link testFunctionImportMultipleParams}.
 */
export interface TestFunctionImportMultipleParamsParameters<
  DeSerializersT extends DeSerializers
> {
  /**
   * String Param.
   */
  stringParam: string;
  /**
   * Boolean Param.
   */
  booleanParam: boolean;
}

/**
 * Test Function Import Multiple Params.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportMultipleParams<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestFunctionImportMultipleParamsParameters<DeSerializersT>,
  deSerializers: DeSerializersT = defaultDeSerializers as DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  TestFunctionImportMultipleParamsParameters<DeSerializersT>,
  boolean
> {
  const params = {
    stringParam: new OperationParameter(
      'StringParam',
      'Edm.String',
      parameters.stringParam
    ),
    booleanParam: new OperationParameter(
      'BooleanParam',
      'Edm.Boolean',
      parameters.booleanParam
    )
  };

  return new OperationRequestBuilder(
    'get',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportMultipleParams',
    data =>
      transformReturnValueForEdmType(data, val =>
        edmToTs(
          val.TestFunctionImportMultipleParams,
          'Edm.Boolean',
          deSerializers
        )
      ),
    params,
    deSerializers
  );
}

/**
 * Type of the parameters to be passed to {@link createTestComplexType}.
 */
export interface CreateTestComplexTypeParameters<
  DeSerializersT extends DeSerializers
> {}

/**
 * Create Test Complex Type.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function createTestComplexType<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: CreateTestComplexTypeParameters<DeSerializersT>,
  deSerializers: DeSerializersT = defaultDeSerializers as DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  CreateTestComplexTypeParameters<DeSerializersT>,
  TestComplexType
> {
  const params = {};

  return new OperationRequestBuilder(
    'get',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'CreateTestComplexType',
    data =>
      transformReturnValueForComplexType(data, data =>
        entityDeserializer(
          deSerializers || defaultDeSerializers
        ).deserializeComplexType(data, TestComplexType)
      ),
    params,
    deSerializers
  );
}

/**
 * Type of the parameters to be passed to {@link fContinue}.
 */
export interface FContinueParameters<DeSerializersT extends DeSerializers> {}

/**
 * Continue.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function fContinue<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: FContinueParameters<DeSerializersT>,
  deSerializers: DeSerializersT = defaultDeSerializers as DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  FContinueParameters<DeSerializersT>,
  boolean
> {
  const params = {};

  return new OperationRequestBuilder(
    'get',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'Continue',
    data =>
      transformReturnValueForEdmType(data, val =>
        edmToTs(val.Continue, 'Edm.Boolean', deSerializers)
      ),
    params,
    deSerializers
  );
}

export const operations = {
  testFunctionImportNoReturnType,
  testFunctionImportEdmReturnType,
  testFunctionImportEdmReturnTypeCollection,
  testFunctionImportEntityReturnType,
  testFunctionImportEntityReturnTypeCollection,
  testFunctionImportSharedEntityReturnType,
  testFunctionImportSharedEntityReturnTypeCollection,
  testFunctionImportComplexReturnType,
  testFunctionImportUnsupportedEdmTypes,
  testFunctionImportComplexReturnTypeCollection,
  testFunctionImportGet,
  testFunctionImportPost,
  testFunctionImportMultipleParams,
  createTestComplexType,
  fContinue
};
