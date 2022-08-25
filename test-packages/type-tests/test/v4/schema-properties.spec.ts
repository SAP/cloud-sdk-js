import { testService } from '@sap-cloud-sdk/test-services-odata-v4/test-service';

const { testEntityApi } = testService();
const testEntitySchema = testEntityApi.schema;

// $ExpectType OrderableEdmTypeField<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>, "Edm.Decimal", true, true>
testEntitySchema.DECIMAL_PROPERTY;
// $ExpectType OrderableEdmTypeField<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>, "Edm.Double", true, true>
testEntitySchema.DOUBLE_PROPERTY;
// $ExpectType OrderableEdmTypeField<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>, "Edm.Float", true, true>
testEntitySchema.FLOAT_PROPERTY;
// $ExpectType OrderableEdmTypeField<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>, "Edm.Guid", false, true>
testEntitySchema.KEY_PROPERTY_GUID;
// $ExpectType OrderableEdmTypeField<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>, "Edm.SByte", true, true>
testEntitySchema.S_BYTE_PROPERTY;
// $ExpectType OneToManyLink<TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>, TestEntityMultiLinkApi<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>>>
testEntitySchema.TO_MULTI_LINK;
// $ExpectType OneToManyLink<TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>, TestEntityMultiLinkApi<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>>>
testEntitySchema.TO_OTHER_MULTI_LINK;
// $ExpectType OneToOneLink<TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>, TestEntitySingleLinkApi<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>>>
testEntitySchema.TO_SINGLE_LINK;
