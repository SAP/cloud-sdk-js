import {
  testActionImportMultipleParameterComplexReturnType,
  testActionImportNoParameterNoReturnType,
  testActionImportNullableTest,
  testActionImportUnsupportedEdmTypes
} from '@sap-cloud-sdk/test-services/v4/test-service/action-imports';

// $ExpectType ActionImportRequestBuilder<TestActionImportNoParameterNoReturnTypeParameters, undefined>
const noReturnTypeRequestBuilder = testActionImportNoParameterNoReturnType({});

// $ExpectType Promise<undefined>
noReturnTypeRequestBuilder.execute({
  url: 'somePath'
});

// $ExpectType ActionImportRequestBuilder<TestActionImportMultipleParameterComplexReturnTypeParameters, TestComplexType>
const complexReturnTypeRequestBuilder =
  testActionImportMultipleParameterComplexReturnType({
    stringParam: 'stringParam',
    nonNullableStringParam: 'nonNullableStringParam'
  });

// $ExpectType Promise<TestComplexType>
complexReturnTypeRequestBuilder.execute({
  url: 'somePath'
});

// $ExpectType ActionImportRequestBuilder<TestActionImportUnsupportedEdmTypesParameters, any>
const unsupportedEdmTypesRequestBuilder = testActionImportUnsupportedEdmTypes({
  simpleParam: 123
});

// $ExpectType Promise<any>
unsupportedEdmTypesRequestBuilder.execute({
  url: 'somePath'
});

// $ExpectError
testActionImportNullableTest({});

// $ExpectType ActionImportRequestBuilder<TestActionImportNullableTestParameters, TestComplexType | null>
testActionImportNullableTest({
  nonNullable: 'someValue',
  nullablePerDefault: null,
  nullableExplicit: null
});

// $ExpectType ActionImportRequestBuilder<TestActionImportNullableTestParameters, TestComplexType | null>
testActionImportNullableTest({ nonNullable: 'someValue' });

// $ExpectType Promise<TestComplexType | null>
testActionImportNullableTest({ nonNullable: 'someValue' }).execute({
  url: 'someUrl'
});
