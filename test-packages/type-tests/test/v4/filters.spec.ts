import { and, any } from '@sap-cloud-sdk/odata-v4';
import {
  TestEnumType,
  testService
} from '@sap-cloud-sdk/test-services-odata-v4/test-service';

const { testEntityApi, testEntitySingleLinkApi, testEntityMultiLinkApi } =
  testService();

const schema = testEntityApi.schema;
const singleLinkSchema = testEntitySingleLinkApi.schema;
const multiLinkSchema = testEntityMultiLinkApi.schema;

// $ExpectType FilterList<TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>>
and(
  schema.TO_MULTI_LINK.filter(
    any(multiLinkSchema.STRING_PROPERTY.equals('test'))
  )
);

// $ExpectType Filter<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>, string>
schema.ENUM_PROPERTY.equals('Member1');

// $ExpectType Filter<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>, string>
schema.ENUM_PROPERTY.equals(TestEnumType.Member1);

// $ExpectType FilterList<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>>
and(
  schema.ENUM_PROPERTY.equals('Member1'),
  schema.STRING_PROPERTY.equals('test')
);

// $ExpectError
schema.ENUM_PROPERTY.equals('string');

// $ExpectError
schema.ENUM_PROPERTY.equals(1);

// $ExpectType OneToManyLink<TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>, TestEntityMultiLinkApi<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>>>
schema.TO_MULTI_LINK.filter(
  any(multiLinkSchema.STRING_PROPERTY.equals('test'))
);

// $ExpectType FilterLink<TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>, TestEntitySingleLinkApi<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>>>
schema.TO_SINGLE_LINK.filter(singleLinkSchema.STRING_PROPERTY.equals('test'));
