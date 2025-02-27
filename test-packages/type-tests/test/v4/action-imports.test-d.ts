import {
  testActionImportMultipleParameterComplexReturnType,
  testActionImportNoParameterNoReturnType,
  testActionImportNullableTest,
  testActionImportUnsupportedEdmTypes
} from '@sap-cloud-sdk/test-services-odata-v4/test-service/operations';
import { testService } from '@sap-cloud-sdk/test-services-odata-v4/test-service';
import { expectError, expectType } from 'tsd';
import type { TestComplexType } from '@sap-cloud-sdk/test-services-odata-v4/test-service';
import type {
  TestActionImportMultipleParameterComplexReturnTypeParameters,
  TestActionImportNoParameterNoReturnTypeParameters,
  TestActionImportNullableTestParameters,
  TestActionImportUnsupportedEdmTypesParameters
} from '@sap-cloud-sdk/test-services-odata-v4/test-service/operations';
import type { OperationRequestBuilder } from '@sap-cloud-sdk/odata-v4';
import type { DefaultDeSerializersV4 } from '../duplicated-types';

const noReturnTypeRequestBuilder = testActionImportNoParameterNoReturnType({});
expectType<
  OperationRequestBuilder<
    DefaultDeSerializersV4,
    TestActionImportNoParameterNoReturnTypeParameters<DefaultDeSerializersV4>,
    undefined
  >
>(noReturnTypeRequestBuilder);

expectType<Promise<undefined>>(
  noReturnTypeRequestBuilder.execute({
    url: 'somePath'
  })
);

const complexReturnTypeRequestBuilder =
  testActionImportMultipleParameterComplexReturnType({
    stringParam: 'stringParam',
    nonNullableStringParam: 'nonNullableStringParam'
  });
expectType<
  OperationRequestBuilder<
    DefaultDeSerializersV4,
    TestActionImportMultipleParameterComplexReturnTypeParameters<DefaultDeSerializersV4>,
    TestComplexType<DefaultDeSerializersV4>
  >
>(complexReturnTypeRequestBuilder);

expectType<Promise<TestComplexType<DefaultDeSerializersV4>>>(
  complexReturnTypeRequestBuilder.execute({
    url: 'somePath'
  })
);

const unsupportedEdmTypesRequestBuilder = testActionImportUnsupportedEdmTypes({
  simpleParam: 123
});
expectType<
  OperationRequestBuilder<
    DefaultDeSerializersV4,
    TestActionImportUnsupportedEdmTypesParameters<DefaultDeSerializersV4>,
    any
  >
>(unsupportedEdmTypesRequestBuilder);

expectType<Promise<any>>(
  unsupportedEdmTypesRequestBuilder.execute({
    url: 'somePath'
  })
);

expectError<any>(testActionImportNullableTest({}));

expectType<
  OperationRequestBuilder<
    DefaultDeSerializersV4,
    TestActionImportNullableTestParameters<DefaultDeSerializersV4>,
    TestComplexType<DefaultDeSerializersV4> | null
  >
>(
  testActionImportNullableTest({
    nonNullable: 'someValue',
    nullablePerDefault: null,
    nullableExplicit: null
  })
);

expectType<
  OperationRequestBuilder<
    DefaultDeSerializersV4,
    TestActionImportNullableTestParameters<DefaultDeSerializersV4>,
    TestComplexType<DefaultDeSerializersV4> | null
  >
>(testActionImportNullableTest({ nonNullable: 'someValue' }));

expectType<Promise<TestComplexType<DefaultDeSerializersV4> | null>>(
  testActionImportNullableTest({ nonNullable: 'someValue' }).execute({
    url: 'someUrl'
  })
);

expectType<
  OperationRequestBuilder<
    DefaultDeSerializersV4,
    TestActionImportNoParameterNoReturnTypeParameters<DefaultDeSerializersV4>,
    undefined
  >
>(testService().operations.testActionImportNoParameterNoReturnType({}));
