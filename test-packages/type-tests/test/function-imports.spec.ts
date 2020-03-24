/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import {
  testFunctionImportComplexReturnType,
  testFunctionImportComplexReturnTypeCollection,
  testFunctionImportEdmReturnType,
  testFunctionImportEdmReturnTypeCollection,
  testFunctionImportEntityReturnType,
  testFunctionImportEntityReturnTypeCollection
} from '@sap-cloud-sdk/test-services/test-service';

// $ExpectType FunctionImportRequestBuilder<TestFunctionImportEdmReturnTypeParameters, boolean>
const edmReturnTypeRequestBuilder = testFunctionImportEdmReturnType({});

// $ExpectType Promise<boolean>
edmReturnTypeRequestBuilder.execute({
  url: 'somePath'
});

// $ExpectType FunctionImportRequestBuilder<TestFunctionImportEdmReturnTypeCollectionParameters, string[]>
const edmCollectionReturnTypeRequestBuilder = testFunctionImportEdmReturnTypeCollection({});

// $ExpectType Promise<string[]>
edmCollectionReturnTypeRequestBuilder.execute({
  url: 'somePath'
});

// $ExpectType FunctionImportRequestBuilder<TestFunctionImportComplexReturnTypeParameters, TestComplexType>
const ctReturnTypeRequestBuilder = testFunctionImportComplexReturnType({});

// $ExpectType Promise<TestComplexType>
ctReturnTypeRequestBuilder.execute({
  url: 'somePath'
});

// $ExpectType FunctionImportRequestBuilder<TestFunctionImportComplexReturnTypeCollectionParameters, TestComplexType[]>
const ctCollectionReturnTypeRequestBuilder = testFunctionImportComplexReturnTypeCollection({});

// $ExpectType Promise<TestComplexType[]>
ctCollectionReturnTypeRequestBuilder.execute({
  url: 'somePath'
});

// $ExpectType FunctionImportRequestBuilder<TestFunctionImportEntityReturnTypeParameters, TestEntity>
const entityReturnTypeRequestBuilder = testFunctionImportEntityReturnType({});

// $ExpectType Promise<TestEntity>
entityReturnTypeRequestBuilder.execute({
  url: 'somePath'
});

// $ExpectType FunctionImportRequestBuilder<TestFunctionImportEntityReturnTypeCollectionParameters, TestEntity[]>
const entityCollectionReturnTypeRequestBuilder = testFunctionImportEntityReturnTypeCollection({});

// $ExpectType Promise<TestEntity[]>
entityCollectionReturnTypeRequestBuilder.execute({
  url: 'somePath'
});
