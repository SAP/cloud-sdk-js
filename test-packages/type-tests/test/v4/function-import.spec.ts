import { testFunctionImportNullableTest } from '@sap-cloud-sdk/test-services/v4/test-service';

// $ExpectError
testFunctionImportNullableTest({});

// $ExpectType FunctionImportRequestBuilder<DefaultDeSerializers, TestFunctionImportNullableTestParameters<DefaultDeSerializers>, string[] | null>
testFunctionImportNullableTest({
  nullableExplicit: null,
  nullablePerDefault: null,
  nonNullable: ''
});

// $ExpectType FunctionImportRequestBuilder<DefaultDeSerializers, TestFunctionImportNullableTestParameters<DefaultDeSerializers>, string[] | null>
testFunctionImportNullableTest({
  nonNullable: 'someValue'
});

// $ExpectType Promise<string[] | null>
testFunctionImportNullableTest({
  nonNullable: 'someValue'
}).execute({ url: 'someURL' });
