import {
  testService as testServiceV2
} from '@sap-cloud-sdk/test-services-odata-v2/test-service/index';
import {
  testService as testServiceV4
} from '@sap-cloud-sdk/test-services-odata-v4/test-service/index';
import {and, Link, OneToManyLink} from "@sap-cloud-sdk/odata-common";
import {TestEntityMultiLinkApi} from "@sap-cloud-sdk/test-services-odata-v4/test-service/TestEntityMultiLinkApi";

/*

 We have an issue with the and() method that the Deserializer (2nd) generic argument becomes any in the FilterList.
 This only appears in V4 not in V2.
 There must be some difference in the two implementation somewhere.

 If you want to execute the test in the console quickly there is a script -> remember to compile the other packages if you made changes if you use the local script.
 */

const singleLinkSchemaV2 = testServiceV2().testEntitySingleLinkApi.schema
const singleLinkSchemaV4 = testServiceV4().testEntitySingleLinkApi.schema

// $ExpectType FilterLink<TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>, TestEntitySingleLinkApi<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>>
const filterV2 =  testServiceV2().testEntityApi.schema.TO_SINGLE_LINK.filter(
    singleLinkSchemaV2.STRING_PROPERTY.equals('test')
)
// $ExpectType FilterLink<TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, string>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, string>, TestEntitySingleLinkApi<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, string>>>
const filterV4 =  testServiceV4().testEntityApi.schema.TO_SINGLE_LINK.filter(
    singleLinkSchemaV4.STRING_PROPERTY.equals('test')
)

/*
Up to here all the same FilterLink<> with the default serializers is returned.
For fooV4 the second generic argument is any and not DeSerializers<...>
 */

// $ExpectType FilterList<TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
const fooV2 = and(filterV2);

// $ExpectType FilterList<TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, string>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, string>>
const fooV4 = and(filterV4);


