import {
  testFunctionImportNullableTest,
  TestFunctionImportNullableTestParameters
} from '@sap-cloud-sdk/test-services-odata-v4/test-service';
import { expectError, expectType } from 'tsd';
import { FunctionImportRequestBuilder } from '@sap-cloud-sdk/odata-v4';
import { DefaultDeSerializersV4 } from '../duplicated-types';

// $ExpectError
expectError<any>(testFunctionImportNullableTest({}));

// $ExpectType FunctionImportRequestBuilder<DefaultDeSerializers, TestFunctionImportNullableTestParameters<DefaultDeSerializers>, string[] | null>
expectType<
  FunctionImportRequestBuilder<
    DefaultDeSerializersV4,
    TestFunctionImportNullableTestParameters<DefaultDeSerializersV4>,
    string[] | null
  >
>(
  testFunctionImportNullableTest({
    nullableExplicit: null,
    nullablePerDefault: null,
    nonNullable: ''
  })
);

// $ExpectType FunctionImportRequestBuilder<DefaultDeSerializers, TestFunctionImportNullableTestParameters<DefaultDeSerializers>, string[] | null>
expectType<
  FunctionImportRequestBuilder<
    DefaultDeSerializersV4,
    TestFunctionImportNullableTestParameters<DefaultDeSerializersV4>,
    string[] | null
  >
>(
  testFunctionImportNullableTest({
    nonNullable: 'someValue'
  })
);

// $ExpectType Promise<string[] | null>
expectType<Promise<string[] | null>>(
  testFunctionImportNullableTest({
    nonNullable: 'someValue'
  }).execute({ url: 'someURL' })
);
