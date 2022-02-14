import {
  testFunctionImportComplexReturnType,
  testFunctionImportComplexReturnTypeCollection,
  testFunctionImportEdmReturnType,
  testFunctionImportEdmReturnTypeCollection,
  testFunctionImportEntityReturnType,
  testFunctionImportEntityReturnTypeCollection,
  testFunctionImportSharedEntityReturnType,
  testService
} from '@sap-cloud-sdk/test-services/v2/test-service';

// $ExpectType FunctionImportRequestBuilder<DefaultDeSerializers, TestFunctionImportEdmReturnTypeParameters<DefaultDeSerializers>, boolean>
const edmReturnTypeRequestBuilder = testFunctionImportEdmReturnType({});

// $ExpectType Promise<boolean>
edmReturnTypeRequestBuilder.execute({
  url: 'somePath'
});

// $ExpectType FunctionImportRequestBuilder<DefaultDeSerializers, TestFunctionImportEdmReturnTypeCollectionParameters<DefaultDeSerializers>, string[]>
const edmCollectionReturnTypeRequestBuilder =
  testFunctionImportEdmReturnTypeCollection({});

// $ExpectType Promise<string[]>
edmCollectionReturnTypeRequestBuilder.execute({
  url: 'somePath'
});

// $ExpectType FunctionImportRequestBuilder<DefaultDeSerializers, TestFunctionImportComplexReturnTypeParameters<DefaultDeSerializers>, TestComplexType<DefaultDeSerializers>>
const ctReturnTypeRequestBuilder = testFunctionImportComplexReturnType({});

// $ExpectType Promise<TestComplexType<DefaultDeSerializers>>
ctReturnTypeRequestBuilder.execute({
  url: 'somePath'
});

// $ExpectType FunctionImportRequestBuilder<DefaultDeSerializers, TestFunctionImportComplexReturnTypeCollectionParameters<DefaultDeSerializers>, TestComplexType<DefaultDeSerializers>[]>
const ctCollectionReturnTypeRequestBuilder =
  testFunctionImportComplexReturnTypeCollection({});

// $ExpectType Promise<TestComplexType<DefaultDeSerializers>[]>
ctCollectionReturnTypeRequestBuilder.execute({
  url: 'somePath'
});

// $ExpectType FunctionImportRequestBuilder<DefaultDeSerializers, TestFunctionImportEntityReturnTypeParameters<DefaultDeSerializers>, TestEntity<DefaultDeSerializers>>
const entityReturnTypeRequestBuilder = testFunctionImportEntityReturnType({});

// $ExpectType Promise<TestEntity<DefaultDeSerializers>>
entityReturnTypeRequestBuilder.execute({
  url: 'somePath'
});

// $ExpectType FunctionImportRequestBuilder<DefaultDeSerializers, TestFunctionImportEntityReturnTypeCollectionParameters<DefaultDeSerializers>, TestEntity<DefaultDeSerializers>[]>
const entityCollectionReturnTypeRequestBuilder =
  testFunctionImportEntityReturnTypeCollection({});

// $ExpectType Promise<TestEntity<DefaultDeSerializers>[]>
entityCollectionReturnTypeRequestBuilder.execute({
  url: 'somePath'
});

// $ExpectType Promise<HttpResponse>
testFunctionImportSharedEntityReturnType({}).executeRaw({
  url: 'somePath'
});

// $ExpectError
testFunctionImportSharedEntityReturnType({}).execute({
  url: 'somePath'
});

// $ExpectType FunctionImportRequestBuilder<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>, TestFunctionImportNoReturnTypeParameters<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>, undefined>
testService().functionImports.testFunctionImportNoReturnType({});
