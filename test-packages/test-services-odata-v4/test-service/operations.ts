/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  edmToTs,
  entityDeserializer,
  transformReturnValueForEdmType,
  transformReturnValueForEdmTypeList,
  transformReturnValueForEntity,
  transformReturnValueForEntityList,
  throwErrorWhenReturnTypeIsUnionType,
  transformReturnValueForComplexType,
  transformReturnValueForComplexTypeList,
  transformReturnValueForUndefined,
  DeSerializers,
  DefaultDeSerializers,
  defaultDeSerializers,
  OperationParameter,
  OperationRequestBuilder
} from '@sap-cloud-sdk/odata-v4';
import { testService } from './service';
import { TestEntity } from './TestEntity';
import { TestEntityApi } from './TestEntityApi';
import { TestComplexType } from './TestComplexType';

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
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportEdmReturnType',
    data =>
      transformReturnValueForEdmType(data, val =>
        edmToTs(val.value, 'Edm.Boolean', deSerializers)
      ),
    params,
    deSerializers,
    'function'
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
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportEdmReturnTypeCollection',
    data =>
      transformReturnValueForEdmTypeList(data, val =>
        edmToTs(val, 'Edm.String', deSerializers)
      ),
    params,
    deSerializers,
    'function'
  );
}

/**
 * Type of the parameters to be passed to {@link testFunctionImportNullableTest}.
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
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportNullableTest<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestFunctionImportNullableTestParameters<DeSerializersT>,
  deSerializers: DeSerializersT = defaultDeSerializers as DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  TestFunctionImportNullableTestParameters<DeSerializersT>,
  string[] | null
> {
  const params = {
    nullablePerDefault: new OperationParameter(
      'NullablePerDefault',
      'Edm.String',
      parameters.nullablePerDefault
    ),
    nullableExplicit: new OperationParameter(
      'NullableExplicit',
      'Edm.String',
      parameters.nullableExplicit
    ),
    nonNullable: new OperationParameter(
      'NonNullable',
      'Edm.String',
      parameters.nonNullable
    )
  };

  return new OperationRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportNullableTest',
    data =>
      transformReturnValueForEdmTypeList(data, val =>
        edmToTs(val, 'Edm.String', deSerializers)
      ),
    params,
    deSerializers,
    'function'
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
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportEntityReturnType',
    data =>
      transformReturnValueForEntity(
        data,
        testService(deSerializers).testEntityApi
      ),
    params,
    deSerializers,
    'function'
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
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportEntityReturnTypeCollection',
    data =>
      transformReturnValueForEntityList(
        data,
        testService(deSerializers).testEntityApi
      ),
    params,
    deSerializers,
    'function'
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
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportSharedEntityReturnType',
    data =>
      throwErrorWhenReturnTypeIsUnionType(
        data,
        'TestFunctionImportSharedEntityReturnType'
      ),
    params,
    deSerializers,
    'function'
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
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportSharedEntityReturnTypeCollection',
    data =>
      throwErrorWhenReturnTypeIsUnionType(
        data,
        'TestFunctionImportSharedEntityReturnTypeCollection'
      ),
    params,
    deSerializers,
    'function'
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
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportComplexReturnType',
    data =>
      transformReturnValueForComplexType(data, data =>
        entityDeserializer(
          deSerializers || defaultDeSerializers
        ).deserializeComplexType(data, TestComplexType)
      ),
    params,
    deSerializers,
    'function'
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
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportComplexReturnTypeCollection',
    data =>
      transformReturnValueForComplexTypeList(data, data =>
        entityDeserializer(
          deSerializers || defaultDeSerializers
        ).deserializeComplexType(data, TestComplexType)
      ),
    params,
    deSerializers,
    'function'
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
  boolean | null
> {
  const params = {
    stringParam: new OperationParameter(
      'StringParam',
      'Edm.String',
      parameters.stringParam
    ),
    nonNullableStringParam: new OperationParameter(
      'NonNullableStringParam',
      'Edm.String',
      parameters.nonNullableStringParam
    ),
    nullableBooleanParam: new OperationParameter(
      'NullableBooleanParam',
      'Edm.Boolean',
      parameters.nullableBooleanParam
    ),
    nullableGeographyPointParam: new OperationParameter(
      'NullableGeographyPointParam',
      'Edm.Any',
      parameters.nullableGeographyPointParam
    )
  };

  return new OperationRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportMultipleParams',
    data =>
      transformReturnValueForEdmType(data, val =>
        edmToTs(val.value, 'Edm.Boolean', deSerializers)
      ),
    params,
    deSerializers,
    'function'
  );
}

/**
 * Type of the parameters to be passed to {@link testFunctionImportWithDifferentName}.
 */
export interface TestFunctionImportWithDifferentNameParameters<
  DeSerializersT extends DeSerializers
> {}

/**
 * Test Function Import With Different Name.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportWithDifferentName<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestFunctionImportWithDifferentNameParameters<DeSerializersT>,
  deSerializers: DeSerializersT = defaultDeSerializers as DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  TestFunctionImportWithDifferentNameParameters<DeSerializersT>,
  undefined
> {
  const params = {};

  return new OperationRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportWithDifferentName',
    data => transformReturnValueForUndefined(data, val => undefined),
    params,
    deSerializers,
    'function'
  );
}

/**
 * Type of the parameters to be passed to {@link testActionImportNoParameterNoReturnType}.
 */
export interface TestActionImportNoParameterNoReturnTypeParameters<
  DeSerializersT extends DeSerializers
> {}

/**
 * Test Action Import No Parameter No Return Type.
 * @param parameters - Object containing all parameters for the action.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testActionImportNoParameterNoReturnType<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestActionImportNoParameterNoReturnTypeParameters<DeSerializersT>,
  deSerializers: DeSerializersT = defaultDeSerializers as DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  TestActionImportNoParameterNoReturnTypeParameters<DeSerializersT>,
  undefined
> {
  const params = {};

  return new OperationRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestActionImportNoParameterNoReturnType',
    data => transformReturnValueForUndefined(data, val => undefined),
    params,
    deSerializers,
    'action'
  );
}

/**
 * Type of the parameters to be passed to {@link testActionImportMultipleParameterComplexReturnType}.
 */
export interface TestActionImportMultipleParameterComplexReturnTypeParameters<
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
 * Test Action Import Multiple Parameter Complex Return Type.
 * @param parameters - Object containing all parameters for the action.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testActionImportMultipleParameterComplexReturnType<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestActionImportMultipleParameterComplexReturnTypeParameters<DeSerializersT>,
  deSerializers: DeSerializersT = defaultDeSerializers as DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  TestActionImportMultipleParameterComplexReturnTypeParameters<DeSerializersT>,
  TestComplexType
> {
  const params = {
    stringParam: new OperationParameter(
      'StringParam',
      'Edm.String',
      parameters.stringParam
    ),
    nonNullableStringParam: new OperationParameter(
      'NonNullableStringParam',
      'Edm.String',
      parameters.nonNullableStringParam
    ),
    nullableBooleanParam: new OperationParameter(
      'NullableBooleanParam',
      'Edm.Boolean',
      parameters.nullableBooleanParam
    ),
    nullableGeographyPointParam: new OperationParameter(
      'NullableGeographyPointParam',
      'Edm.Any',
      parameters.nullableGeographyPointParam
    )
  };

  return new OperationRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestActionImportMultipleParameterComplexReturnType',
    data =>
      transformReturnValueForComplexType(data, data =>
        entityDeserializer(
          deSerializers || defaultDeSerializers
        ).deserializeComplexType(data, TestComplexType)
      ),
    params,
    deSerializers,
    'action'
  );
}

/**
 * Type of the parameters to be passed to {@link testActionImportUnsupportedEdmTypes}.
 */
export interface TestActionImportUnsupportedEdmTypesParameters<
  DeSerializersT extends DeSerializers
> {
  /**
   * Simple Param.
   */
  simpleParam: any;
}

/**
 * Test Action Import Unsupported Edm Types.
 * @param parameters - Object containing all parameters for the action.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testActionImportUnsupportedEdmTypes<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestActionImportUnsupportedEdmTypesParameters<DeSerializersT>,
  deSerializers: DeSerializersT = defaultDeSerializers as DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  TestActionImportUnsupportedEdmTypesParameters<DeSerializersT>,
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
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestActionImportUnsupportedEdmTypes',
    data =>
      transformReturnValueForEdmType(data, val =>
        edmToTs(val.value, 'Edm.Any', deSerializers)
      ),
    params,
    deSerializers,
    'action'
  );
}

/**
 * Type of the parameters to be passed to {@link testActionImportNoParameterEntityReturnType}.
 */
export interface TestActionImportNoParameterEntityReturnTypeParameters<
  DeSerializersT extends DeSerializers
> {}

/**
 * Test Action Import No Parameter Entity Return Type.
 * @param parameters - Object containing all parameters for the action.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testActionImportNoParameterEntityReturnType<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestActionImportNoParameterEntityReturnTypeParameters<DeSerializersT>,
  deSerializers: DeSerializersT = defaultDeSerializers as DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  TestActionImportNoParameterEntityReturnTypeParameters<DeSerializersT>,
  TestEntity
> {
  const params = {};

  return new OperationRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestActionImportNoParameterEntityReturnType',
    data =>
      transformReturnValueForEntity(
        data,
        testService(deSerializers).testEntityApi
      ),
    params,
    deSerializers,
    'action'
  );
}

/**
 * Type of the parameters to be passed to {@link testActionImportSharedEntityReturnType}.
 */
export interface TestActionImportSharedEntityReturnTypeParameters<
  DeSerializersT extends DeSerializers
> {}

/**
 * Test Action Import Shared Entity Return Type. The 'execute' method does not exist for this action import. Please use 'executeRaw' to get the raw response.
 * @param parameters - Object containing all parameters for the action.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testActionImportSharedEntityReturnType<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestActionImportSharedEntityReturnTypeParameters<DeSerializersT>,
  deSerializers: DeSerializersT = defaultDeSerializers as DeSerializersT
): Omit<
  OperationRequestBuilder<
    DeSerializersT,
    TestActionImportSharedEntityReturnTypeParameters<DeSerializersT>,
    never
  >,
  'execute'
> {
  const params = {};

  return new OperationRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestActionImportSharedEntityReturnType',
    data =>
      throwErrorWhenReturnTypeIsUnionType(
        data,
        'TestActionImportSharedEntityReturnType'
      ),
    params,
    deSerializers,
    'action'
  );
}

/**
 * Type of the parameters to be passed to {@link testActionImportSharedEntityReturnTypeCollection}.
 */
export interface TestActionImportSharedEntityReturnTypeCollectionParameters<
  DeSerializersT extends DeSerializers
> {}

/**
 * Test Action Import Shared Entity Return Type Collection. The 'execute' method does not exist for this action import. Please use 'executeRaw' to get the raw response.
 * @param parameters - Object containing all parameters for the action.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testActionImportSharedEntityReturnTypeCollection<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestActionImportSharedEntityReturnTypeCollectionParameters<DeSerializersT>,
  deSerializers: DeSerializersT = defaultDeSerializers as DeSerializersT
): Omit<
  OperationRequestBuilder<
    DeSerializersT,
    TestActionImportSharedEntityReturnTypeCollectionParameters<DeSerializersT>,
    never
  >,
  'execute'
> {
  const params = {};

  return new OperationRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestActionImportSharedEntityReturnTypeCollection',
    data =>
      throwErrorWhenReturnTypeIsUnionType(
        data,
        'TestActionImportSharedEntityReturnTypeCollection'
      ),
    params,
    deSerializers,
    'action'
  );
}

/**
 * Type of the parameters to be passed to {@link testActionImportNullableTest}.
 */
export interface TestActionImportNullableTestParameters<
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
 * Test Action Import Nullable Test.
 * @param parameters - Object containing all parameters for the action.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testActionImportNullableTest<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestActionImportNullableTestParameters<DeSerializersT>,
  deSerializers: DeSerializersT = defaultDeSerializers as DeSerializersT
): OperationRequestBuilder<
  DeSerializersT,
  TestActionImportNullableTestParameters<DeSerializersT>,
  TestComplexType | null
> {
  const params = {
    nullablePerDefault: new OperationParameter(
      'NullablePerDefault',
      'Edm.String',
      parameters.nullablePerDefault
    ),
    nullableExplicit: new OperationParameter(
      'NullableExplicit',
      'Edm.String',
      parameters.nullableExplicit
    ),
    nonNullable: new OperationParameter(
      'NonNullable',
      'Edm.String',
      parameters.nonNullable
    )
  };

  return new OperationRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestActionImportNullableTest',
    data =>
      transformReturnValueForComplexType(data, data =>
        entityDeserializer(
          deSerializers || defaultDeSerializers
        ).deserializeComplexType(data, TestComplexType)
      ),
    params,
    deSerializers,
    'action'
  );
}

export const operations = {
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
  testFunctionImportWithDifferentName,
  testActionImportNoParameterNoReturnType,
  testActionImportMultipleParameterComplexReturnType,
  testActionImportUnsupportedEdmTypes,
  testActionImportNoParameterEntityReturnType,
  testActionImportSharedEntityReturnType,
  testActionImportSharedEntityReturnTypeCollection,
  testActionImportNullableTest
};
