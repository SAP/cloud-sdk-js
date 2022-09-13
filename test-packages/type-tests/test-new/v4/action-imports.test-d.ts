import {
  testActionImportMultipleParameterComplexReturnType, TestActionImportMultipleParameterComplexReturnTypeParameters,
  testActionImportNoParameterNoReturnType, TestActionImportNoParameterNoReturnTypeParameters,
  testActionImportNullableTest, TestActionImportNullableTestParameters,
  testActionImportUnsupportedEdmTypes, TestActionImportUnsupportedEdmTypesParameters
} from '@sap-cloud-sdk/test-services-odata-v4/test-service/action-imports';
import {TestComplexType, testService} from '@sap-cloud-sdk/test-services-odata-v4/test-service/index';
import {expectError, expectType} from "tsd";
import {ActionImportRequestBuilder, DeSerializers} from "@sap-cloud-sdk/odata-v4";
import BigNumber from "bignumber.js";
import {Time} from "@sap-cloud-sdk/odata-common/internal";


/**
 * Type of the default (de-)serializers.
 */
export type DefaultDeSerializersV4 = DeSerializers<
    string,
    boolean,
    number,
    BigNumber,
    number,
    number,
    number,
    number,
    BigNumber,
    string,
    number,
    number,
    string,
    any,
    moment.Moment,
    moment.Moment,
    moment.Duration,
    Time,
    any
    >;

const noReturnTypeRequestBuilder = testActionImportNoParameterNoReturnType({});
expectType<ActionImportRequestBuilder<DefaultDeSerializersV4, TestActionImportNoParameterNoReturnTypeParameters<DefaultDeSerializersV4>,undefined>>(noReturnTypeRequestBuilder)

expectType<Promise<undefined>>(noReturnTypeRequestBuilder.execute({
  url: 'somePath'
}));

const complexReturnTypeRequestBuilder =
  testActionImportMultipleParameterComplexReturnType({
    stringParam: 'stringParam',
    nonNullableStringParam: 'nonNullableStringParam'
  });
expectType<ActionImportRequestBuilder<DefaultDeSerializersV4, TestActionImportMultipleParameterComplexReturnTypeParameters<DefaultDeSerializersV4>,TestComplexType<DefaultDeSerializersV4>>>(complexReturnTypeRequestBuilder)

expectType<Promise<TestComplexType<DefaultDeSerializersV4>>>(complexReturnTypeRequestBuilder.execute({
  url: 'somePath'
}));

const unsupportedEdmTypesRequestBuilder = testActionImportUnsupportedEdmTypes({
  simpleParam: 123
});
expectType<ActionImportRequestBuilder<DefaultDeSerializersV4, TestActionImportUnsupportedEdmTypesParameters<DefaultDeSerializersV4>, any>>(unsupportedEdmTypesRequestBuilder)

expectType<Promise<any>>(unsupportedEdmTypesRequestBuilder.execute({
  url: 'somePath'
}));

expectError<any>(testActionImportNullableTest({}));

expectType<ActionImportRequestBuilder<DefaultDeSerializersV4, TestActionImportNullableTestParameters<DefaultDeSerializersV4>,TestComplexType<DefaultDeSerializersV4>|null>>(testActionImportNullableTest({
  nonNullable: 'someValue',
  nullablePerDefault: null,
  nullableExplicit: null
}));

expectType<ActionImportRequestBuilder<DefaultDeSerializersV4, TestActionImportNullableTestParameters<DefaultDeSerializersV4>,TestComplexType<DefaultDeSerializersV4>|null>>(testActionImportNullableTest({ nonNullable: 'someValue' }));

expectType<Promise<TestComplexType<DefaultDeSerializersV4>|null>>(testActionImportNullableTest({ nonNullable: 'someValue' }).execute({
  url: 'someUrl'
}));

expectType<ActionImportRequestBuilder<DefaultDeSerializersV4, TestActionImportNoParameterNoReturnTypeParameters<DefaultDeSerializersV4>, undefined>>(testService().actionImports.testActionImportNoParameterNoReturnType({}));
