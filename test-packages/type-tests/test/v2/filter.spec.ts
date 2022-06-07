import { testService } from '@sap-cloud-sdk/test-services-odata-v2/test-service';
import { and, or } from '@sap-cloud-sdk/odata-v2';

const { testEntityApi, testEntitySingleLinkApi, testEntityMultiLinkApi } =
  testService();
const testEntitySchema = testEntityApi.schema;
const testEntityMultiLinkSchema = testEntityMultiLinkApi.schema;
const testEntitySingleLinkSchema = testEntitySingleLinkApi.schema;

// $ExpectType Filter<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>, string | null>
const stringProp = testEntitySchema.STRING_PROPERTY.equals('test');

// $ExpectType Filter<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>, boolean | null>
const booleanProp = testEntitySchema.BOOLEAN_PROPERTY.equals(true);

// $ExpectType Filter<TestEntityMultiLink<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>, number | null>
const multiLinkInt16Prop = testEntityMultiLinkSchema.INT_16_PROPERTY.equals(15);

// $ExpectType FilterList<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
const filterAnd = and(stringProp, booleanProp);

// $ExpectType FilterList<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
const filterOr = or(stringProp, booleanProp);

// $ExpectType FilterList<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
and(filterAnd, filterOr);

// $ExpectType FilterList<TestEntityMultiLink<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
and(multiLinkInt16Prop);

// $ExpectError
and(stringProp, booleanProp, multiLinkInt16Prop);

// $ExpectError
testEntitySchema.TO_MULTI_LINK.filter;

// $ExpectType FilterLink<TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>, TestEntitySingleLinkApi<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>>
testEntitySchema.TO_SINGLE_LINK.filter(
  testEntitySingleLinkSchema.STRING_PROPERTY.equals('test')
);

// $ExpectType FilterList<TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
and(testEntitySchema.TO_SINGLE_LINK.filter(
 testEntitySingleLinkSchema.STRING_PROPERTY.equals('test')
));

// $ExpectType Filter<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>, string>
// testEntitySchema.COMPLEX_TYPE_PROPERTY.stringProperty.equals('test');

// $ExpectError
// testEntitySchema.COMPLEX_TYPE_PROPERTY.equals('test');

// $ExpectError
testEntitySchema.KEY_PROPERTY_STRING.equals(null);

// $ExpectType Filter<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>, string | null>
testEntitySchema.STRING_PROPERTY.equals(null);

// $ExpectType Filter<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>, number | null>
testEntitySchema.INT_16_PROPERTY.lessThan(123);

// $ExpectType Filter<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>, string | null>
testEntitySchema.STRING_PROPERTY.lessOrEqual('test');

// $ExpectType Filter<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>, boolean | null>
testEntitySchema.BOOLEAN_PROPERTY.greaterThan(true);

// $ExpectType Filter<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>, string | null>
// testEntitySchema.GUID_PROPERTY.greaterOrEqual('test-guid');
