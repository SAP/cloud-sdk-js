/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  Constructable,
  entityDeserializer,
  FunctionImportParameter,
  throwErrorWhenReturnTypeIsUnionType,
  Time
} from '@sap-cloud-sdk/odata-common/internal';
import {
  edmToTs,
  // deserializeComplexType,
  FunctionImportRequestBuilder,
  transformReturnValueForUndefined,
  transformReturnValueForEdmType,
  transformReturnValueForEdmTypeList,
  transformReturnValueForEntity,
  transformReturnValueForEntityList,
  transformReturnValueForComplexType,
  transformReturnValueForComplexTypeList,
  defaultDeSerializers,
  mergeDefaultDeSerializersWith
} from '@sap-cloud-sdk/odata-v2';
import { TestEntity } from './TestEntity';
import { TestComplexType } from './TestComplexType';
import { DeSerializers } from '@sap-cloud-sdk/odata-v2/internal';
import {
  extractODataEtag,
  getLinkedCollectionResult
} from '@sap-cloud-sdk/odata-v2/internal';
import { DeserializedType } from '@sap-cloud-sdk/odata-common/dist/de-serializers/de-serializers';
import { responseTransformers } from '@sap-cloud-sdk/odata-v2/internal';
import { TestEntityApi } from './TestEntityApi';
import BigNumber from 'bignumber.js';

/**
 * Type of the parameters to be passed to [[testFunctionImportNoReturnType]].
 */
export interface TestFunctionImportNoReturnTypeParameters<
  T extends DeSerializers
> {}

/**
 * Test Function Import No Return Type.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportNoReturnType<T extends DeSerializers>(
  deSerializers: T,
  parameters: TestFunctionImportNoReturnTypeParameters<T>
): FunctionImportRequestBuilder<
  TestFunctionImportNoReturnTypeParameters<T>,
  undefined,
  T
> {
  const params = {};

  return new FunctionImportRequestBuilder(
    'post',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportNoReturnType',
    data => transformReturnValueForUndefined(data, val => undefined),
    params,
    deSerializers
  );
}

/**
 * Type of the parameters to be passed to [[testFunctionImportEdmReturnType]].
 */
export interface TestFunctionImportEdmReturnTypeParameters<
  T extends DeSerializers
> {}

/**
 * Test Function Import Edm Return Type.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportEdmReturnType<T extends DeSerializers>(
  deSerializers: T,
  parameters: TestFunctionImportEdmReturnTypeParameters<T>
): FunctionImportRequestBuilder<
  TestFunctionImportEdmReturnTypeParameters<T>,
  DeserializedType<T, 'Edm.Boolean'>,
  T
> {
  const params = {};

  return new FunctionImportRequestBuilder(
    'get',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportEdmReturnType',
    data =>
      transformReturnValueForEdmType(data, val =>
        deSerializers['Edm.Boolean'].deserialize(
          val.TestFunctionImportEdmReturnType
        )
      ),
    params,
    deSerializers
  );
}

/**
 * Type of the parameters to be passed to [[testFunctionImportEdmReturnTypeCollection]].
 */
export interface TestFunctionImportEdmReturnTypeCollectionParameters<
  T extends DeSerializers
> {}

/**
 * Test Function Import Edm Return Type Collection.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportEdmReturnTypeCollection<
  T extends DeSerializers
>(
  deSerializers: T,
  parameters: TestFunctionImportEdmReturnTypeCollectionParameters<T>
): FunctionImportRequestBuilder<
  TestFunctionImportEdmReturnTypeCollectionParameters<T>,
  DeserializedType<T, 'Edm.String'>[],
  T
> {
  const params = {};

  return new FunctionImportRequestBuilder(
    'get',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportEdmReturnTypeCollection',
    data =>
      transformReturnValueForEdmTypeList(data, val =>
        deSerializers['Edm.String'].deserialize(val)
      ),
    params,
    deSerializers
  );
}

/**
 * Type of the parameters to be passed to [[testFunctionImportEntityReturnType]].
 */
export interface TestFunctionImportEntityReturnTypeParameters<
  T extends DeSerializers
> {}

/**
 * Test Function Import Entity Return Type.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportEntityReturnType<T extends DeSerializers>(
  deSerializers: T,
  parameters: TestFunctionImportEntityReturnTypeParameters<T>
): FunctionImportRequestBuilder<
  TestFunctionImportEntityReturnTypeParameters<T>,
  TestEntity<T>,
  T
> {
  const params = {};

  return new FunctionImportRequestBuilder(
    'get',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportEntityReturnType',
    data =>
      responseTransformers(deSerializers).transformReturnValueForEntity(
        data,
        TestEntity as Constructable<TestEntity<T>>,
        new TestEntityApi(deSerializers).schema
      ) as TestEntity<T>,
    params,
    deSerializers
  );
}

/**
 * Type of the parameters to be passed to [[testFunctionImportEntityReturnTypeCollection]].
 */
export interface TestFunctionImportEntityReturnTypeCollectionParameters<
  T extends DeSerializers
> {}

/**
 * Test Function Import Entity Return Type Collection.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportEntityReturnTypeCollection<
  T extends DeSerializers
>(
  deSerializers: T,
  parameters: TestFunctionImportEntityReturnTypeCollectionParameters<T>
): FunctionImportRequestBuilder<
  TestFunctionImportEntityReturnTypeCollectionParameters<T>,
  TestEntity<T>[],
  T
> {
  const params = {};

  return new FunctionImportRequestBuilder(
    'get',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportEntityReturnTypeCollection',
    data =>
      responseTransformers(deSerializers).transformReturnValueForEntityList(
        data,
        TestEntity as Constructable<TestEntity<T>>,
        new TestEntityApi(deSerializers).schema
      ) as TestEntity<T>[],
    params,
    deSerializers
  );
}

/**
 * Type of the parameters to be passed to [[testFunctionImportSharedEntityReturnType]].
 */
export interface TestFunctionImportSharedEntityReturnTypeParameters<
  T extends DeSerializers
> {}

/**
 * Test Function Import Shared Entity Return Type. The 'execute' method does not exist when using this function/action import. Please use the 'executeRaw' for getting the raw response.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportSharedEntityReturnType<
  T extends DeSerializers
>(
  deSerializers: T,
  parameters: TestFunctionImportSharedEntityReturnTypeParameters<T>
): Omit<
  FunctionImportRequestBuilder<
    TestFunctionImportSharedEntityReturnTypeParameters<T>,
    never,
    T
  >,
  'execute'
> {
  const params = {};

  return new FunctionImportRequestBuilder(
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
 * Type of the parameters to be passed to [[testFunctionImportSharedEntityReturnTypeCollection]].
 */
export interface TestFunctionImportSharedEntityReturnTypeCollectionParameters<
  T extends DeSerializers
> {}

/**
 * Test Function Import Shared Entity Return Type Collection. The 'execute' method does not exist when using this function/action import. Please use the 'executeRaw' for getting the raw response.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportSharedEntityReturnTypeCollection<
  T extends DeSerializers
>(
  deSerializers: T,
  parameters: TestFunctionImportSharedEntityReturnTypeCollectionParameters<T>
): Omit<
  FunctionImportRequestBuilder<
    TestFunctionImportSharedEntityReturnTypeCollectionParameters<T>,
    never,
    T
  >,
  'execute'
> {
  const params = {};

  return new FunctionImportRequestBuilder(
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
 * Type of the parameters to be passed to [[testFunctionImportComplexReturnType]].
 */
export interface TestFunctionImportComplexReturnTypeParameters<
  T extends DeSerializers
> {}

/**
 * Test Function Import Complex Return Type.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportComplexReturnType<T extends DeSerializers>(
  deSerializers: T,
  parameters: TestFunctionImportComplexReturnTypeParameters<T>
): FunctionImportRequestBuilder<
  TestFunctionImportComplexReturnTypeParameters<T>,
  TestComplexType,
  T
> {
  const params = {};

  const entityDes = entityDeserializer(
    new TestEntityApi(deSerializers).schema,
    edmToTs,
    extractODataEtag,
    getLinkedCollectionResult,
    deSerializers
  );

  return new FunctionImportRequestBuilder(
    'get',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportComplexReturnType',
    data =>
      transformReturnValueForComplexType(data, data =>
        entityDes.deserializeComplexType(data, TestComplexType)
      ),
    params,
    deSerializers
  );
}

/**
 * Type of the parameters to be passed to [[testFunctionImportUnsupportedEdmTypes]].
 */
export interface TestFunctionImportUnsupportedEdmTypesParameters<
  T extends DeSerializers
> {
  /**
   * Simple Param.
   */
  simpleParam: any;
}

/**
 * Test Function Import Unsupported Edm Types.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportUnsupportedEdmTypes<T extends DeSerializers>(
  deSerializers: T,
  parameters: TestFunctionImportUnsupportedEdmTypesParameters<T>
): FunctionImportRequestBuilder<
  TestFunctionImportUnsupportedEdmTypesParameters<T>,
  any,
  T
> {
  const params = {
    simpleParam: new FunctionImportParameter(
      'SimpleParam',
      'Edm.Any',
      parameters.simpleParam
    )
  };

  return new FunctionImportRequestBuilder(
    'get',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportUnsupportedEdmTypes',
    data =>
      transformReturnValueForEdmType(data, val =>
        deSerializers['Edm.Any'].deserialize(
          val.TestFunctionImportUnsupportedEdmTypes
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
  T extends DeSerializers
> {}

/**
 * Test Function Import Complex Return Type Collection.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportComplexReturnTypeCollection<
  T extends DeSerializers
>(
  deSerializers: T,
  parameters: TestFunctionImportComplexReturnTypeCollectionParameters<T>
): FunctionImportRequestBuilder<
  TestFunctionImportComplexReturnTypeCollectionParameters<T>,
  TestComplexType[],
  T
> {
  const params = {};

  const entityDes = entityDeserializer(
    new TestEntityApi(deSerializers).schema,
    edmToTs,
    extractODataEtag,
    getLinkedCollectionResult,
    deSerializers
  );

  return new FunctionImportRequestBuilder(
    'get',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportComplexReturnTypeCollection',
    data =>
      transformReturnValueForComplexTypeList(data, data =>
        entityDes.deserializeComplexType(data, TestComplexType)
      ),
    params,
    deSerializers
  );
}

/**
 * Type of the parameters to be passed to [[testFunctionImportGet]].
 */
export interface TestFunctionImportGetParameters<T extends DeSerializers> {
  /**
   * Simple Param.
   */
  simpleParam: DeserializedType<T, 'Edm.String'>;
}

/**
 * Test Function Import Get.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportGet<T extends DeSerializers>(
  deSerializers: T,
  parameters: TestFunctionImportGetParameters<T>
): FunctionImportRequestBuilder<
  TestFunctionImportGetParameters<T>,
  DeserializedType<T, 'Edm.Boolean'>,
  T
> {
  const params = {
    simpleParam: new FunctionImportParameter(
      'SimpleParam',
      'Edm.String',
      parameters.simpleParam
    )
  };

  return new FunctionImportRequestBuilder(
    'get',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportGET',
    data =>
      transformReturnValueForEdmType(data, val =>
        deSerializers['Edm.Boolean'].deserialize(val.TestFunctionImportGET)
      ),
    params,
    deSerializers
  );
}

/**
 * Type of the parameters to be passed to [[testFunctionImportPost]].
 */
export interface TestFunctionImportPostParameters<T extends DeSerializers> {
  /**
   * Simple Param.
   */
  simpleParam: DeserializedType<T, 'Edm.String'>;
}

/**
 * Test Function Import Post.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportPost<T extends DeSerializers>(
  deSerializers: T,
  parameters: TestFunctionImportPostParameters<T>
): FunctionImportRequestBuilder<
  TestFunctionImportPostParameters<T>,
  DeserializedType<T, 'Edm.Boolean'>
> {
  const params = {
    simpleParam: new FunctionImportParameter(
      'SimpleParam',
      'Edm.String',
      parameters.simpleParam
    )
  };

  return new FunctionImportRequestBuilder(
    'post',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportPOST',
    data =>
      transformReturnValueForEdmType(data, val =>
        deSerializers['Edm.Boolean'].deserialize(val.TestFunctionImportPOST)
      ),
    params,
    deSerializers
  );
}

/**
 * Type of the parameters to be passed to [[testFunctionImportMultipleParams]].
 */
export interface TestFunctionImportMultipleParamsParameters<
  T extends DeSerializers
> {
  /**
   * String Param.
   */
  stringParam: DeserializedType<T, 'Edm.String'>;
  /**
   * Boolean Param.
   */
  booleanParam: DeserializedType<T, 'Edm.Boolean'>;
}

/**
 * Test Function Import Multiple Params.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportMultipleParams<T extends DeSerializers>(
  deSerializers: T,
  parameters: TestFunctionImportMultipleParamsParameters<T>
): FunctionImportRequestBuilder<
  TestFunctionImportMultipleParamsParameters<T>,
  boolean,
  T
> {
  const params = {
    stringParam: new FunctionImportParameter(
      'StringParam',
      'Edm.String',
      parameters.stringParam
    ),
    booleanParam: new FunctionImportParameter(
      'BooleanParam',
      'Edm.Boolean',
      parameters.booleanParam
    )
  };

  return new FunctionImportRequestBuilder(
    'get',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportMultipleParams',
    data =>
      transformReturnValueForEdmType(data, val =>
        deSerializers['Edm.Boolean'].deserialize(
          val.TestFunctionImportMultipleParams
        )
      ),
    params,
    deSerializers
  );
}

/**
 * Type of the parameters to be passed to [[createTestComplexType]].
 */
export interface CreateTestComplexTypeParameters<T extends DeSerializers> {}

/**
 * Create Test Complex Type.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function createTestComplexType<T extends DeSerializers>(
  deSerializers: T,
  parameters: CreateTestComplexTypeParameters<T>
): FunctionImportRequestBuilder<
  CreateTestComplexTypeParameters<T>,
  TestComplexType,
  T
> {
  const params = {};
  const entityDes = entityDeserializer(
    new TestEntityApi(deSerializers).schema,
    edmToTs,
    extractODataEtag,
    getLinkedCollectionResult,
    deSerializers
  );

  return new FunctionImportRequestBuilder(
    'get',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'CreateTestComplexType',
    data =>
      transformReturnValueForComplexType(data, data =>
        entityDes.deserializeComplexType(data, TestComplexType)
      ),
    params,
    deSerializers
  );
}

/**
 * Type of the parameters to be passed to [[fContinue]].
 */
export interface FContinueParameters<T extends DeSerializers> {}

/**
 * Continue.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function fContinue<T extends DeSerializers>(
  deSerializers: T,
  parameters: FContinueParameters<T>
): FunctionImportRequestBuilder<
  FContinueParameters<T>,
  DeserializedType<T, 'Edm.Boolean'>
> {
  const params = {};

  return new FunctionImportRequestBuilder(
    'get',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'Continue',
    data =>
      transformReturnValueForEdmType(data, val =>
        deSerializers['Edm.Boolean'].deserialize(val.Continue)
      ),
    params,
    deSerializers
  );
}

export function functionImports<
  BinaryT = string,
  BooleanT = boolean,
  ByteT = number,
  DecimalT = BigNumber,
  DoubleT = number,
  FloatT = number,
  Int16T = number,
  Int32T = number,
  Int64T = BigNumber,
  GuidT = string,
  SByteT = number,
  SingleT = number,
  StringT = string,
  AnyT = any,
  DateTimeT = moment.Moment,
  DateTimeOffsetT = moment.Moment,
  TimeT = Time
>(
  customDeSerializers: Partial<
    DeSerializers<
      BinaryT,
      BooleanT,
      ByteT,
      DecimalT,
      DoubleT,
      FloatT,
      Int16T,
      Int32T,
      Int64T,
      GuidT,
      SByteT,
      SingleT,
      StringT,
      AnyT,
      DateTimeT,
      DateTimeOffsetT,
      TimeT
    >
  > = defaultDeSerializers as any
) {
  const deSerializers = mergeDefaultDeSerializersWith(customDeSerializers);
  return {
    testFunctionImportNoReturnType: (
      parameters: TestFunctionImportNoReturnTypeParameters<typeof deSerializers>
    ) => testFunctionImportNoReturnType(deSerializers, parameters),
    testFunctionImportEdmReturnType: (
      parameters: TestFunctionImportEdmReturnTypeParameters<
        typeof deSerializers
      >
    ) => testFunctionImportEdmReturnType(deSerializers, parameters),
    testFunctionImportEdmReturnTypeCollection: (
      parameters: TestFunctionImportEdmReturnTypeCollectionParameters<
        typeof deSerializers
      >
    ) => testFunctionImportEdmReturnTypeCollection(deSerializers, parameters),
    testFunctionImportEntityReturnType: (
      parameters: TestFunctionImportEntityReturnTypeParameters<
        typeof deSerializers
      >
    ) => testFunctionImportEntityReturnType(deSerializers, parameters),
    testFunctionImportEntityReturnTypeCollection: (
      parameters: TestFunctionImportEntityReturnTypeCollectionParameters<
        typeof deSerializers
      >
    ) =>
      testFunctionImportEntityReturnTypeCollection(deSerializers, parameters),
    testFunctionImportSharedEntityReturnType: (
      parameters: TestFunctionImportSharedEntityReturnTypeParameters<
        typeof deSerializers
      >
    ) => testFunctionImportSharedEntityReturnType(deSerializers, parameters),
    testFunctionImportSharedEntityReturnTypeCollection: (
      parameters: TestFunctionImportSharedEntityReturnTypeCollectionParameters<
        typeof deSerializers
      >
    ) =>
      testFunctionImportSharedEntityReturnTypeCollection(
        deSerializers,
        parameters
      ),
    testFunctionImportComplexReturnType: (
      parameters: TestFunctionImportComplexReturnTypeParameters<
        typeof deSerializers
      >
    ) => testFunctionImportComplexReturnType(deSerializers, parameters),
    testFunctionImportUnsupportedEdmTypes: (
      parameters: TestFunctionImportUnsupportedEdmTypesParameters<
        typeof deSerializers
      >
    ) => testFunctionImportUnsupportedEdmTypes(deSerializers, parameters),
    testFunctionImportComplexReturnTypeCollection: (
      parameters: TestFunctionImportComplexReturnTypeCollectionParameters<
        typeof deSerializers
      >
    ) =>
      testFunctionImportComplexReturnTypeCollection(deSerializers, parameters),
    testFunctionImportGet: (
      parameters: TestFunctionImportGetParameters<typeof deSerializers>
    ) => testFunctionImportGet(deSerializers, parameters),
    testFunctionImportPost: (
      parameters: TestFunctionImportPostParameters<typeof deSerializers>
    ) => testFunctionImportPost(deSerializers, parameters),
    testFunctionImportMultipleParams: (
      parameters: TestFunctionImportMultipleParamsParameters<
        typeof deSerializers
      >
    ) => testFunctionImportMultipleParams(deSerializers, parameters),
    createTestComplexType: (
      parameters: CreateTestComplexTypeParameters<typeof deSerializers>
    ) => createTestComplexType(deSerializers, parameters),
    fContinue: (parameters: FContinueParameters<typeof deSerializers>) =>
      fContinue(deSerializers, parameters)
  };
}
