/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  FunctionImportParameter,
  throwErrorWhenReturnTypeIsUnionType
} from '@sap-cloud-sdk/odata-common/internal';
import {
  edmToTs,
  entityDeserializer,
  FunctionImportRequestBuilder,
  DeSerializers,
  transformReturnValueForEdmType,
  transformReturnValueForEdmTypeList,
  transformReturnValueForEntity,
  transformReturnValueForEntityList,
  transformReturnValueForComplexType,
  transformReturnValueForComplexTypeList,
  transformReturnValueForUndefined,
  DefaultDeSerializers,
  defaultDeSerializers
} from '@sap-cloud-sdk/odata-v4';
import { testService } from './service';
import { TestEntity } from './TestEntity';
import { TestEntityApi } from './TestEntityApi';
import { TestComplexType } from './TestComplexType';

/**
 * Type of the parameters to be passed to [[testFunctionImportEdmReturnType]].
 */
export interface TestFunctionImportEdmReturnTypeParameters<
  DeSerializersT extends DeSerializers
> {}

/**
 * Test Function Import Edm Return Type.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportEdmReturnType<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestFunctionImportEdmReturnTypeParameters<DeSerializersT>,
  deSerializers: DeSerializersT = defaultDeSerializers as any
): FunctionImportRequestBuilder<
  DeSerializersT,
  TestFunctionImportEdmReturnTypeParameters<DeSerializersT>,
  boolean
> {
  const params = {};

  return new FunctionImportRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportEdmReturnType',
    data =>
      transformReturnValueForEdmType(data, val =>
        edmToTs(val.value, 'Edm.Boolean', deSerializers)
      ),
    params,
    deSerializers
  );
}

/**
 * Type of the parameters to be passed to [[testFunctionImportEdmReturnTypeCollection]].
 */
export interface TestFunctionImportEdmReturnTypeCollectionParameters<
  DeSerializersT extends DeSerializers
> {}

/**
 * Test Function Import Edm Return Type Collection.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportEdmReturnTypeCollection<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestFunctionImportEdmReturnTypeCollectionParameters<DeSerializersT>,
  deSerializers: DeSerializersT = defaultDeSerializers as any
): FunctionImportRequestBuilder<
  DeSerializersT,
  TestFunctionImportEdmReturnTypeCollectionParameters<DeSerializersT>,
  string[]
> {
  const params = {};

  return new FunctionImportRequestBuilder(
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
 * Type of the parameters to be passed to [[testFunctionImportNullableTest]].
 */
export interface TestFunctionImportNullableTestParameters<
  DeSerializersT extends DeSerializers
> {
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
 * Test Function Import Nullable Test.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportNullableTest<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestFunctionImportNullableTestParameters<DeSerializersT>,
  deSerializers: DeSerializersT = defaultDeSerializers as any
): FunctionImportRequestBuilder<
  DeSerializersT,
  TestFunctionImportNullableTestParameters<DeSerializersT>,
  string[] | null
> {
  const params = {
    nullablePerDefault: new FunctionImportParameter(
      'NullablePerDefault',
      'Edm.String',
      parameters.nullablePerDefault
    ),
    nullableExplicit: new FunctionImportParameter(
      'NullableExplicit',
      'Edm.String',
      parameters.nullableExplicit
    ),
    nonNullable: new FunctionImportParameter(
      'NonNullable',
      'Edm.String',
      parameters.nonNullable
    )
  };

  return new FunctionImportRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportNullableTest',
    data =>
      transformReturnValueForEdmTypeList(data, val =>
        edmToTs(val, 'Edm.String', deSerializers)
      ),
    params,
    deSerializers
  );
}

/**
 * Type of the parameters to be passed to [[testFunctionImportEntityReturnType]].
 */
export interface TestFunctionImportEntityReturnTypeParameters<
  DeSerializersT extends DeSerializers
> {}

/**
 * Test Function Import Entity Return Type.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportEntityReturnType<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestFunctionImportEntityReturnTypeParameters<DeSerializersT>,
  deSerializers: DeSerializersT = defaultDeSerializers as any
): FunctionImportRequestBuilder<
  DeSerializersT,
  TestFunctionImportEntityReturnTypeParameters<DeSerializersT>,
  TestEntity
> {
  const params = {};

  return new FunctionImportRequestBuilder(
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
 * Type of the parameters to be passed to [[testFunctionImportEntityReturnTypeCollection]].
 */
export interface TestFunctionImportEntityReturnTypeCollectionParameters<
  DeSerializersT extends DeSerializers
> {}

/**
 * Test Function Import Entity Return Type Collection.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportEntityReturnTypeCollection<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestFunctionImportEntityReturnTypeCollectionParameters<DeSerializersT>,
  deSerializers: DeSerializersT = defaultDeSerializers as any
): FunctionImportRequestBuilder<
  DeSerializersT,
  TestFunctionImportEntityReturnTypeCollectionParameters<DeSerializersT>,
  TestEntity[]
> {
  const params = {};

  return new FunctionImportRequestBuilder(
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
 * Type of the parameters to be passed to [[testFunctionImportSharedEntityReturnType]].
 */
export interface TestFunctionImportSharedEntityReturnTypeParameters<
  DeSerializersT extends DeSerializers
> {}

/**
 * Test Function Import Shared Entity Return Type. The 'execute' method does not exist when using this function/action import. Please use the 'executeRaw' for getting the raw response.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportSharedEntityReturnType<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestFunctionImportSharedEntityReturnTypeParameters<DeSerializersT>,
  deSerializers: DeSerializersT = defaultDeSerializers as any
): Omit<
  FunctionImportRequestBuilder<
    DeSerializersT,
    TestFunctionImportSharedEntityReturnTypeParameters<DeSerializersT>,
    never
  >,
  'execute'
> {
  const params = {};

  return new FunctionImportRequestBuilder(
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
 * Type of the parameters to be passed to [[testFunctionImportSharedEntityReturnTypeCollection]].
 */
export interface TestFunctionImportSharedEntityReturnTypeCollectionParameters<
  DeSerializersT extends DeSerializers
> {}

/**
 * Test Function Import Shared Entity Return Type Collection. The 'execute' method does not exist when using this function/action import. Please use the 'executeRaw' for getting the raw response.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportSharedEntityReturnTypeCollection<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestFunctionImportSharedEntityReturnTypeCollectionParameters<DeSerializersT>,
  deSerializers: DeSerializersT = defaultDeSerializers as any
): Omit<
  FunctionImportRequestBuilder<
    DeSerializersT,
    TestFunctionImportSharedEntityReturnTypeCollectionParameters<DeSerializersT>,
    never
  >,
  'execute'
> {
  const params = {};

  return new FunctionImportRequestBuilder(
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
 * Type of the parameters to be passed to [[testFunctionImportComplexReturnType]].
 */
export interface TestFunctionImportComplexReturnTypeParameters<
  DeSerializersT extends DeSerializers
> {}

/**
 * Test Function Import Complex Return Type.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportComplexReturnType<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestFunctionImportComplexReturnTypeParameters<DeSerializersT>,
  deSerializers: DeSerializersT = defaultDeSerializers as any
): FunctionImportRequestBuilder<
  DeSerializersT,
  TestFunctionImportComplexReturnTypeParameters<DeSerializersT>,
  TestComplexType
> {
  const params = {};

  return new FunctionImportRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportComplexReturnType',
    data =>
      transformReturnValueForComplexType(data, data =>
        entityDeserializer(deSerializers).deserializeComplexType(
          data,
          TestComplexType
        )
      ),
    params,
    deSerializers
  );
}

/**
 * Type of the parameters to be passed to [[testFunctionImportComplexReturnTypeCollection]].
 */
export interface TestFunctionImportComplexReturnTypeCollectionParameters<
  DeSerializersT extends DeSerializers
> {}

/**
 * Test Function Import Complex Return Type Collection.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportComplexReturnTypeCollection<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestFunctionImportComplexReturnTypeCollectionParameters<DeSerializersT>,
  deSerializers: DeSerializersT = defaultDeSerializers as any
): FunctionImportRequestBuilder<
  DeSerializersT,
  TestFunctionImportComplexReturnTypeCollectionParameters<DeSerializersT>,
  TestComplexType[]
> {
  const params = {};

  return new FunctionImportRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportComplexReturnTypeCollection',
    data =>
      transformReturnValueForComplexTypeList(data, data =>
        entityDeserializer(deSerializers).deserializeComplexType(
          data,
          TestComplexType
        )
      ),
    params,
    deSerializers
  );
}

/**
 * Type of the parameters to be passed to [[testFunctionImportMultipleParams]].
 */
export interface TestFunctionImportMultipleParamsParameters<
  DeSerializersT extends DeSerializers
> {
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
 * Test Function Import Multiple Params.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportMultipleParams<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestFunctionImportMultipleParamsParameters<DeSerializersT>,
  deSerializers: DeSerializersT = defaultDeSerializers as any
): FunctionImportRequestBuilder<
  DeSerializersT,
  TestFunctionImportMultipleParamsParameters<DeSerializersT>,
  boolean | null
> {
  const params = {
    stringParam: new FunctionImportParameter(
      'StringParam',
      'Edm.String',
      parameters.stringParam
    ),
    nonNullableStringParam: new FunctionImportParameter(
      'NonNullableStringParam',
      'Edm.String',
      parameters.nonNullableStringParam
    ),
    nullableBooleanParam: new FunctionImportParameter(
      'NullableBooleanParam',
      'Edm.Boolean',
      parameters.nullableBooleanParam
    ),
    nullableGeographyPointParam: new FunctionImportParameter(
      'NullableGeographyPointParam',
      'Edm.Any',
      parameters.nullableGeographyPointParam
    )
  };

  return new FunctionImportRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportMultipleParams',
    data =>
      transformReturnValueForEdmType(data, val =>
        edmToTs(val.value, 'Edm.Boolean', deSerializers)
      ),
    params,
    deSerializers
  );
}

/**
 * Type of the parameters to be passed to [[testFunctionImportWithDifferentName]].
 */
export interface TestFunctionImportWithDifferentNameParameters<
  DeSerializersT extends DeSerializers
> {}

/**
 * Test Function Import With Different Name.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportWithDifferentName<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestFunctionImportWithDifferentNameParameters<DeSerializersT>,
  deSerializers: DeSerializersT = defaultDeSerializers as any
): FunctionImportRequestBuilder<
  DeSerializersT,
  TestFunctionImportWithDifferentNameParameters<DeSerializersT>,
  undefined
> {
  const params = {};

  return new FunctionImportRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportWithDifferentName',
    data => transformReturnValueForUndefined(data, val => undefined),
    params,
    deSerializers
  );
}

export const functionImports = {
  testFunctionImportEdmReturnType,
  testFunctionImportEdmReturnTypeCollection,
  testFunctionImportNullableTest,
  testFunctionImportEntityReturnType,
  testFunctionImportEntityReturnTypeCollection,
  testFunctionImportSharedEntityReturnType,
  testFunctionImportSharedEntityReturnTypeCollection,
  testFunctionImportComplexReturnType,
  testFunctionImportComplexReturnTypeCollection,
  testFunctionImportMultipleParams,
  testFunctionImportWithDifferentName
};
