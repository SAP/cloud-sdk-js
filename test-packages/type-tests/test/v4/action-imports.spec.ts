import {
  testActionImportMultipleParameterComplexReturnType,
  testActionImportNoParameterNoReturnType,
  testActionImportNullableTest,
  testActionImportUnsupportedEdmTypes
} from '@sap-cloud-sdk/test-services/v4/test-service/action-imports';

// $ExpectType ActionImportRequestBuilder<DefaultDeSerializers, TestActionImportNoParameterNoReturnTypeParameters<DefaultDeSerializers>, undefined>
const noReturnTypeRequestBuilder = testActionImportNoParameterNoReturnType({});

// $ExpectType Promise<undefined>
noReturnTypeRequestBuilder.execute({
  url: 'somePath'
});

// $ExpectType  ActionImportRequestBuilder<DefaultDeSerializers, TestActionImportMultipleParameterComplexReturnTypeParameters<DefaultDeSerializers>, TestComplexType<DefaultDeSerializers>>
const complexReturnTypeRequestBuilder =
  testActionImportMultipleParameterComplexReturnType({
    stringParam: 'stringParam',
    nonNullableStringParam: 'nonNullableStringParam'
  });

// $ExpectType Promise<TestComplexType<DefaultDeSerializers>>
complexReturnTypeRequestBuilder.execute({
  url: 'somePath'
});

// $ExpectType  ActionImportRequestBuilder<DefaultDeSerializers, TestActionImportUnsupportedEdmTypesParameters<DefaultDeSerializers>, any>
const unsupportedEdmTypesRequestBuilder = testActionImportUnsupportedEdmTypes({
  simpleParam: 123
});

// $ExpectType Promise<any>
unsupportedEdmTypesRequestBuilder.execute({
  url: 'somePath'
});

// $ExpectError
testActionImportNullableTest({});

// $ExpectType ActionImportRequestBuilder<DefaultDeSerializers, TestActionImportNullableTestParameters<DefaultDeSerializers>, TestComplexType<DefaultDeSerializers> | null>
testActionImportNullableTest({
  nonNullable: 'someValue',
  nullablePerDefault: null,
  nullableExplicit: null
});

// $ExpectType ActionImportRequestBuilder<DefaultDeSerializers, TestActionImportNullableTestParameters<DefaultDeSerializers>, TestComplexType<DefaultDeSerializers> | null>
testActionImportNullableTest({ nonNullable: 'someValue' });

// $ExpectType Promise<TestComplexType<DefaultDeSerializers> | null>
testActionImportNullableTest({ nonNullable: 'someValue' }).execute({
  url: 'someUrl'
});
