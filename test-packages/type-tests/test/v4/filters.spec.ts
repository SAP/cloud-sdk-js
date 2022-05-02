import {
  TestEnumType,
  testService
} from '@sap-cloud-sdk/test-services-odata-v4/test-service';

const { testEntityApi } = testService();

const schema = testEntityApi.schema;

// -----------
/*
TODO: Fix the type issue for the following `and(...)` test
It seems that `and()` is ignoring the type of DeSerializersT and treats it as `any`.
Expected: FilterList<TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>>
Got:      FilterList<TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>>, any>

The return type of `filter()` is correct:
OneToManyLink<TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>, TestEntityMultiLinkApi<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>>>

If we cast the return value of `filter()` into the expected type using `as`, the type is still `any` for DeSerializers.
If we replace the third type parameter `TestEntityMultiLinkApi<...>` with `any`, the type will be correct.
*/

// import { and, any } from '@sap-cloud-sdk/odata-v4';
// const { testEntityMultiLinkApi } = testService();
// const multiLinkSchema = testEntityMultiLinkApi.schema;

// // $ExpectType FilterList<TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>>
// and(
//   schema.TO_MULTI_LINK.filter(
//     any(multiLinkSchema.STRING_PROPERTY.equals('test'))
//   )
// );

// -----------

// $ExpectType Filter<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>, string>
schema.ENUM_PROPERTY.equals('Member1');

// $ExpectType Filter<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>, string>
schema.ENUM_PROPERTY.equals(TestEnumType.Member1);

// $ExpectError
schema.ENUM_PROPERTY.equals('string');

// $ExpectError
schema.ENUM_PROPERTY.equals(1);
