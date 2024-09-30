import {
  testFunctionImportComplexReturnType,
  testFunctionImportComplexReturnTypeCollection,
  testFunctionImportEdmReturnType,
  testFunctionImportEdmReturnTypeCollection,
  testFunctionImportEntityReturnType,
  testFunctionImportEntityReturnTypeCollection,
  testFunctionImportSharedEntityReturnType,
  testService
} from '@sap-cloud-sdk/test-services-odata-v2/test-service';
import { expectError, expectType } from 'tsd';
import type {
  TestComplexType,
  TestEntity,
  TestFunctionImportComplexReturnTypeCollectionParameters,
  TestFunctionImportComplexReturnTypeParameters,
  TestFunctionImportEdmReturnTypeCollectionParameters,
  TestFunctionImportEdmReturnTypeParameters,
  TestFunctionImportEntityReturnTypeParameters,
  TestFunctionImportNoReturnTypeParameters
} from '@sap-cloud-sdk/test-services-odata-v2/test-service';
import type { OperationRequestBuilder } from '@sap-cloud-sdk/odata-v2';
import type { HttpResponse } from '@sap-cloud-sdk/http-client';
import type { DefaultDeSerializerV2 } from '../duplicated-types';

const edmReturnTypeRequestBuilder = testFunctionImportEdmReturnType({});
expectType<
  OperationRequestBuilder<
    DefaultDeSerializerV2,
    TestFunctionImportEdmReturnTypeParameters<DefaultDeSerializerV2>,
    boolean
  >
>(edmReturnTypeRequestBuilder);

expectType<Promise<boolean>>(
  edmReturnTypeRequestBuilder.execute({
    url: 'somePath'
  })
);

const edmCollectionReturnTypeRequestBuilder =
  testFunctionImportEdmReturnTypeCollection({});
expectType<
  OperationRequestBuilder<
    DefaultDeSerializerV2,
    TestFunctionImportEdmReturnTypeCollectionParameters<DefaultDeSerializerV2>,
    string[]
  >
>(edmCollectionReturnTypeRequestBuilder);

expectType<Promise<string[]>>(
  edmCollectionReturnTypeRequestBuilder.execute({
    url: 'somePath'
  })
);

const ctReturnTypeRequestBuilder = testFunctionImportComplexReturnType({});
expectType<
  OperationRequestBuilder<
    DefaultDeSerializerV2,
    TestFunctionImportComplexReturnTypeParameters<DefaultDeSerializerV2>,
    TestComplexType<DefaultDeSerializerV2>
  >
>(ctReturnTypeRequestBuilder);

expectType<Promise<TestComplexType<DefaultDeSerializerV2>>>(
  ctReturnTypeRequestBuilder.execute({
    url: 'somePath'
  })
);

const ctCollectionReturnTypeRequestBuilder =
  testFunctionImportComplexReturnTypeCollection({});
expectType<
  OperationRequestBuilder<
    DefaultDeSerializerV2,
    TestFunctionImportComplexReturnTypeCollectionParameters<DefaultDeSerializerV2>,
    TestComplexType<DefaultDeSerializerV2>[]
  >
>(ctCollectionReturnTypeRequestBuilder);

expectType<Promise<TestComplexType<DefaultDeSerializerV2>[]>>(
  ctCollectionReturnTypeRequestBuilder.execute({
    url: 'somePath'
  })
);

const entityReturnTypeRequestBuilder = testFunctionImportEntityReturnType({});
expectType<
  OperationRequestBuilder<
    DefaultDeSerializerV2,
    TestFunctionImportEntityReturnTypeParameters<DefaultDeSerializerV2>,
    TestEntity<DefaultDeSerializerV2>
  >
>(entityReturnTypeRequestBuilder);

expectType<Promise<TestEntity<DefaultDeSerializerV2>>>(
  entityReturnTypeRequestBuilder.execute({
    url: 'somePath'
  })
);

const entityCollectionReturnTypeRequestBuilder =
  testFunctionImportEntityReturnTypeCollection({});
expectType<
  OperationRequestBuilder<
    DefaultDeSerializerV2,
    TestFunctionImportEdmReturnTypeCollectionParameters<DefaultDeSerializerV2>,
    TestEntity<DefaultDeSerializerV2>[]
  >
>(entityCollectionReturnTypeRequestBuilder);

expectType<Promise<TestEntity<DefaultDeSerializerV2>[]>>(
  entityCollectionReturnTypeRequestBuilder.execute({
    url: 'somePath'
  })
);

expectType<Promise<HttpResponse>>(
  testFunctionImportSharedEntityReturnType({}).executeRaw({
    url: 'somePath'
  })
);

expectError<any>(
  testFunctionImportSharedEntityReturnType({}).execute({
    url: 'somePath'
  })
);

expectType<
  OperationRequestBuilder<
    DefaultDeSerializerV2,
    TestFunctionImportNoReturnTypeParameters<DefaultDeSerializerV2>,
    undefined
  >
>(testService().operations.testFunctionImportNoReturnType({}));
