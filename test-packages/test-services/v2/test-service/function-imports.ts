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
  DeSerializersT extends DeSerializers
> {}

/**
 * Test Function Import No Return Type.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportNoReturnType<
  DeSerializersT extends DeSerializers
>(
  deSerializers: DeSerializersT,
  parameters: TestFunctionImportNoReturnTypeParameters<DeSerializersT>
): FunctionImportRequestBuilder<
  TestFunctionImportNoReturnTypeParameters<DeSerializersT>,
  undefined,
  DeSerializersT
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
  DeSerializersT extends DeSerializers
> {}

/**
 * Test Function Import Edm Return Type.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportEdmReturnType<
  DeSerializersT extends DeSerializers
>(
  deSerializers: DeSerializersT,
  parameters: TestFunctionImportEdmReturnTypeParameters<DeSerializersT>
): FunctionImportRequestBuilder<
  TestFunctionImportEdmReturnTypeParameters<DeSerializersT>,
  DeserializedType<DeSerializersT, 'Edm.Boolean'>,
  DeSerializersT
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
  DeSerializersT extends DeSerializers
> {}

/**
 * Test Function Import Edm Return Type Collection.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportEdmReturnTypeCollection<
  DeSerializersT extends DeSerializers
>(
  deSerializers: DeSerializersT,
  parameters: TestFunctionImportEdmReturnTypeCollectionParameters<DeSerializersT>
): FunctionImportRequestBuilder<
  TestFunctionImportEdmReturnTypeCollectionParameters<DeSerializersT>,
  DeserializedType<DeSerializersT, 'Edm.String'>[],
  DeSerializersT
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
  DeSerializersT extends DeSerializers
> {}

/**
 * Test Function Import Entity Return Type.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportEntityReturnType<
  DeSerializersT extends DeSerializers
>(
  deSerializers: DeSerializersT,
  parameters: TestFunctionImportEntityReturnTypeParameters<DeSerializersT>
): FunctionImportRequestBuilder<
  TestFunctionImportEntityReturnTypeParameters<DeSerializersT>,
  TestEntity<DeSerializersT>,
  DeSerializersT
> {
  const params = {};

  return new FunctionImportRequestBuilder(
    'get',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportEntityReturnType',
    data =>
      transformReturnValueForEntity(
        data,
        new TestEntityApi(deSerializers)
      ) as TestEntity<DeSerializersT>,
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
  DeSerializersT extends DeSerializers
>(
  deSerializers: DeSerializersT,
  parameters: TestFunctionImportEntityReturnTypeCollectionParameters<DeSerializersT>
): FunctionImportRequestBuilder<
  TestFunctionImportEntityReturnTypeCollectionParameters<DeSerializersT>,
  TestEntity<DeSerializersT>[],
  DeSerializersT
> {
  const params = {};

  return new FunctionImportRequestBuilder(
    'get',
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportEntityReturnTypeCollection',
    data =>
      transformReturnValueForEntityList(
        data,
        new TestEntityApi(deSerializers)
      ) as TestEntity<DeSerializersT>[],
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
  DeSerializersT extends DeSerializers
>(
  deSerializers: DeSerializersT,
  parameters: TestFunctionImportSharedEntityReturnTypeParameters<DeSerializersT>
): Omit<
  FunctionImportRequestBuilder<
    TestFunctionImportSharedEntityReturnTypeParameters<DeSerializersT>,
    never,
    DeSerializersT
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
  DeSerializersT extends DeSerializers
> {}

/**
 * Test Function Import Shared Entity Return Type Collection. The 'execute' method does not exist when using this function/action import. Please use the 'executeRaw' for getting the raw response.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportSharedEntityReturnTypeCollection<
  DeSerializersT extends DeSerializers
>(
  deSerializers: DeSerializersT,
  parameters: TestFunctionImportSharedEntityReturnTypeCollectionParameters<DeSerializersT>
): Omit<
  FunctionImportRequestBuilder<
    TestFunctionImportSharedEntityReturnTypeCollectionParameters<DeSerializersT>,
    never,
    DeSerializersT
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
  DeSerializersT extends DeSerializers
> {}

/**
 * Test Function Import Complex Return Type.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportComplexReturnType<
  DeSerializersT extends DeSerializers
>(
  deSerializers: DeSerializersT,
  parameters: TestFunctionImportComplexReturnTypeParameters<DeSerializersT>
): FunctionImportRequestBuilder<
  TestFunctionImportComplexReturnTypeParameters<DeSerializersT>,
  TestComplexType,
  DeSerializersT
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
  DeSerializersT extends DeSerializers
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
export function testFunctionImportUnsupportedEdmTypes<
  DeSerializersT extends DeSerializers
>(
  deSerializers: DeSerializersT,
  parameters: TestFunctionImportUnsupportedEdmTypesParameters<DeSerializersT>
): FunctionImportRequestBuilder<
  TestFunctionImportUnsupportedEdmTypesParameters<DeSerializersT>,
  any,
  DeSerializersT
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
  DeSerializersT extends DeSerializers
> {}

/**
 * Test Function Import Complex Return Type Collection.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportComplexReturnTypeCollection<
  DeSerializersT extends DeSerializers
>(
  deSerializers: DeSerializersT,
  parameters: TestFunctionImportComplexReturnTypeCollectionParameters<DeSerializersT>
): FunctionImportRequestBuilder<
  TestFunctionImportComplexReturnTypeCollectionParameters<DeSerializersT>,
  TestComplexType[],
  DeSerializersT
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
export interface TestFunctionImportGetParameters<
  DeSerializersT extends DeSerializers
> {
  /**
   * Simple Param.
   */
  simpleParam: DeserializedType<DeSerializersT, 'Edm.String'>;
}

/**
 * Test Function Import Get.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportGet<DeSerializersT extends DeSerializers>(
  deSerializers: DeSerializersT,
  parameters: TestFunctionImportGetParameters<DeSerializersT>
): FunctionImportRequestBuilder<
  TestFunctionImportGetParameters<DeSerializersT>,
  DeserializedType<DeSerializersT, 'Edm.Boolean'>,
  DeSerializersT
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
export interface TestFunctionImportPostParameters<
  DeSerializersT extends DeSerializers
> {
  /**
   * Simple Param.
   */
  simpleParam: DeserializedType<DeSerializersT, 'Edm.String'>;
}

/**
 * Test Function Import Post.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportPost<DeSerializersT extends DeSerializers>(
  deSerializers: DeSerializersT,
  parameters: TestFunctionImportPostParameters<DeSerializersT>
): FunctionImportRequestBuilder<
  TestFunctionImportPostParameters<DeSerializersT>,
  DeserializedType<DeSerializersT, 'Edm.Boolean'>
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
  DeSerializersT extends DeSerializers
> {
  /**
   * String Param.
   */
  stringParam: DeserializedType<DeSerializersT, 'Edm.String'>;
  /**
   * Boolean Param.
   */
  booleanParam: DeserializedType<DeSerializersT, 'Edm.Boolean'>;
}

/**
 * Test Function Import Multiple Params.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function testFunctionImportMultipleParams<
  DeSerializersT extends DeSerializers
>(
  deSerializers: DeSerializersT,
  parameters: TestFunctionImportMultipleParamsParameters<DeSerializersT>
): FunctionImportRequestBuilder<
  TestFunctionImportMultipleParamsParameters<DeSerializersT>,
  boolean,
  DeSerializersT
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
export interface CreateTestComplexTypeParameters<
  DeSerializersT extends DeSerializers
> {}

/**
 * Create Test Complex Type.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function createTestComplexType<DeSerializersT extends DeSerializers>(
  deSerializers: DeSerializersT,
  parameters: CreateTestComplexTypeParameters<DeSerializersT>
): FunctionImportRequestBuilder<
  CreateTestComplexTypeParameters<DeSerializersT>,
  TestComplexType,
  DeSerializersT
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
export interface FContinueParameters<DeSerializersT extends DeSerializers> {}

/**
 * Continue.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function fContinue<DeSerializersT extends DeSerializers>(
  deSerializers: DeSerializersT,
  parameters: FContinueParameters<DeSerializersT>
): FunctionImportRequestBuilder<
  FContinueParameters<DeSerializersT>,
  DeserializedType<DeSerializersT, 'Edm.Boolean'>
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
