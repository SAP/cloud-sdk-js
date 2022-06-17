import {
  testServiceMinimal as testServiceMinimalV2
} from '@sap-cloud-sdk/test-services-odata-v2/test-service-minimal/index';
import {
  testServiceMinimal as testServiceMinimalV4
} from '@sap-cloud-sdk/test-services-odata-v4/test-service-minimal/index';
import {and} from "@sap-cloud-sdk/odata-common";

/*

 We have an issue with the and() method that the Deserializer (2nd) generic argument becomes any in the FilterList.
 This only appears in V4 not in V2.
 There must be some difference in the two implementation somewhere.

 If you want to execute the test in the console quickly there is a script -> remember to compile the other packages if you made changes if you use the local script.
 */

const singleLinkSchemaMinimalV2 = testServiceMinimalV2().testEntitySingleLinkApi.schema
const singleLinkSchemaMinimalV4 = testServiceMinimalV4().testEntitySingleLinkApi.schema

// $ExpectType FilterLink<TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>, TestEntitySingleLinkApi<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>>
const filterMinimalV2 =  testServiceMinimalV2().testEntityApi.schema.TO_SINGLE_LINK.filter(
    singleLinkSchemaMinimalV2?.KEY_PROPERTY.equals('test')
)
// $ExpectType FilterLink<TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>, TestEntitySingleLinkApi<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>>>
const filterMinimalV4 =  testServiceMinimalV4().testEntityApi.schema.TO_SINGLE_LINK.filter(
    singleLinkSchemaMinimalV4.KEY_PROPERTY_STRING.equals('test')
)

/*
Up to here all the same FilterLink<> with the default serializers is returned.
For fooV4 the second generic argument is any and not DeSerializers<...>
 */

// $ExpectType FilterList<TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
const fooMinimalV2 = and(filterMinimalV2);

// $ExpectType FilterList<TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>>
const fooMinimalV4 = and(filterMinimalV4);

describe('see at runtime',()=>{
  it('runtime test - not really useful because generics are gone',()=>{
    const singleLinkSchemaV2 = testServiceMinimalV2().testEntitySingleLinkApi.schema
    const singleLinkSchemaV4 = testServiceMinimalV4().testEntitySingleLinkApi.schema

    const filterV2 =  testServiceMinimalV2().testEntityApi.schema.TO_SINGLE_LINK.filter(
        singleLinkSchemaV2?.KEY_PROPERTY.equals('test')
    )
    const filterV4 =  testServiceMinimalV4().testEntityApi.schema.TO_SINGLE_LINK.filter(
        singleLinkSchemaV4?.KEY_PROPERTY_STRING.equals('test')
    )

    const fooV2 = and(filterV2);
    const fooV4 = and(filterV4);
    console.log(fooV2,fooV4)

  })
})


