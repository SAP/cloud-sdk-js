import {
  testFunctionImportNullableTest,
  TestFunctionImportNullableTestParameters
} from '@sap-cloud-sdk/test-services-odata-v4/test-service';
import { expectError, expectType } from 'tsd';
import { OperationRequestBuilder } from '@sap-cloud-sdk/odata-v4';
import { DefaultDeSerializersV4 } from '../duplicated-types';

expectError<any>(testFunctionImportNullableTest({}));

expectType<
  OperationRequestBuilder<
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

expectType<
  OperationRequestBuilder<
    DefaultDeSerializersV4,
    TestFunctionImportNullableTestParameters<DefaultDeSerializersV4>,
    string[] | null
  >
>(
  testFunctionImportNullableTest({
    nonNullable: 'someValue'
  })
);

expectType<Promise<string[] | null>>(
  testFunctionImportNullableTest({
    nonNullable: 'someValue'
  }).execute({ url: 'someURL' })
);
