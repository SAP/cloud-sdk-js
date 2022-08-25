import { testService } from '@sap-cloud-sdk/test-services-odata-v2/test-service';

const { testEntityApi } = testService();
const testEntitySchema = testEntityApi.schema;

// $ExpectType OrderableEdmTypeField<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>, "Edm.Boolean", true, true>
testEntitySchema.BOOLEAN_PROPERTY;
// $ExpectType OrderableEdmTypeField<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>, "Edm.DateTimeOffset", true, true>
testEntitySchema.DATE_TIME_OFF_SET_PROPERTY;
// $ExpectType OrderableEdmTypeField<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>, "Edm.Int16", true, true>
testEntitySchema.INT_16_PROPERTY;
// $ExpectType OrderableEdmTypeField<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>, "Edm.Single", true, true>
testEntitySchema.SINGLE_PROPERTY;
// $ExpectType OrderableEdmTypeField<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>, "Edm.Guid", true, true>
testEntitySchema.GUID_PROPERTY;
// $ExpectType Link<TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>, TestEntityMultiLinkApi<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>>
testEntitySchema.TO_MULTI_LINK;
// $ExpectType Link<TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>, TestEntityOtherMultiLinkApi<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>>
testEntitySchema.TO_OTHER_MULTI_LINK;
// $ExpectType OneToOneLink<TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>, TestEntitySingleLinkApi<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>>
testEntitySchema.TO_SINGLE_LINK;
