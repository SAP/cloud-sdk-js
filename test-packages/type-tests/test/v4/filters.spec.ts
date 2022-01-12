import {
  TestEnumType,
  testService
} from '@sap-cloud-sdk/test-services/v4/test-service';
import { and } from '@sap-cloud-sdk/odata-common/internal';
import { any } from '@sap-cloud-sdk/odata-v4';

const { testEntityApi, testEntityMultiLinkApi } = testService();

const schema = testEntityApi.schema;
const multiLinkSchema = testEntityMultiLinkApi.schema;

// $ExpectType FilterList<TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>, TestEntityMultiLinkApi<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>>>
and(
  schema.TO_MULTI_LINK.filter(
    any(multiLinkSchema.STRING_PROPERTY.equals('test'))
  )
);

// $ExpectType Filter<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>, string>
schema.ENUM_PROPERTY.equals('Member1');

// $ExpectType Filter<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>, string>
schema.ENUM_PROPERTY.equals(TestEnumType.Member1);

// $ExpectError
schema.ENUM_PROPERTY.equals('string');

// $ExpectError
schema.ENUM_PROPERTY.equals(1);
