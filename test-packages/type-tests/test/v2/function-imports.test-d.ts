import {
  TestComplexType,
  TestEntity,
  testFunctionImportComplexReturnType,
  testFunctionImportComplexReturnTypeCollection,
  TestFunctionImportComplexReturnTypeCollectionParameters,
  TestFunctionImportComplexReturnTypeParameters,
  testFunctionImportEdmReturnType,
  testFunctionImportEdmReturnTypeCollection,
  TestFunctionImportEdmReturnTypeCollectionParameters,
  TestFunctionImportEdmReturnTypeParameters,
  testFunctionImportEntityReturnType,
  testFunctionImportEntityReturnTypeCollection,
  TestFunctionImportEntityReturnTypeParameters,
  TestFunctionImportNoReturnTypeParameters,
  testFunctionImportSharedEntityReturnType,
  testService
} from '@sap-cloud-sdk/test-services-odata-v2/test-service';
import { expectError, expectType } from 'tsd';
import { FunctionImportRequestBuilder } from '@sap-cloud-sdk/odata-v2';
import { HttpResponse } from '@sap-cloud-sdk/http-client';
import { DefaultDeSerializerV2 } from '../duplicated-types';

const edmReturnTypeRequestBuilder = testFunctionImportEdmReturnType({});
expectType<
  FunctionImportRequestBuilder<
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
  FunctionImportRequestBuilder<
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
  FunctionImportRequestBuilder<
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
  FunctionImportRequestBuilder<
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
  FunctionImportRequestBuilder<
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
  FunctionImportRequestBuilder<
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
  FunctionImportRequestBuilder<
    DefaultDeSerializerV2,
    TestFunctionImportNoReturnTypeParameters<DefaultDeSerializerV2>,
    undefined
  >
>(testService().functionImports.testFunctionImportNoReturnType({}));
