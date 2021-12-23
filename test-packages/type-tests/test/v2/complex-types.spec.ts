import { testService } from '@sap-cloud-sdk/test-services/v2/test-service';
import { and, asc, desc, or } from '@sap-cloud-sdk/odata-common/internal';

const { testEntityApi } = testService();
const testEntitySchema = testEntityApi.schema;

// $ExpectType TestComplexTypeField<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>, true, true>
testEntitySchema.COMPLEX_TYPE_PROPERTY;

// $ExpectType EdmTypeField<TestEntity<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>, "Edm.String", false, false>
testEntitySchema.COMPLEX_TYPE_PROPERTY.stringProperty;

// $ExpectType GetAllRequestBuilder<TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
const getAllTSE = testEntityApi.requestBuilder().getAll();

// $ExpectType GetAllRequestBuilder<TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
getAllTSE.select(testEntitySchema.COMPLEX_TYPE_PROPERTY);

// $ExpectError
getAllTSE.select(testEntitySchema.COMPLEX_TYPE_PROPERTY.stringProperty);

// $ExpectType GetAllRequestBuilder<TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
getAllTSE.filter(
  testEntitySchema.COMPLEX_TYPE_PROPERTY.stringProperty.equals('test')
);

// $ExpectType GetAllRequestBuilder<TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
getAllTSE.filter(
  testEntitySchema.COMPLEX_TYPE_PROPERTY.stringProperty.equals('test'),
  testEntitySchema.COMPLEX_TYPE_PROPERTY.stringProperty.notEquals('test')
);

// $ExpectType GetAllRequestBuilder<TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
getAllTSE.filter(
  and(
    testEntitySchema.COMPLEX_TYPE_PROPERTY.stringProperty.equals('test'),
    testEntitySchema.COMPLEX_TYPE_PROPERTY.stringProperty.notEquals('test')
  )
);

// $ExpectType GetAllRequestBuilder<TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
getAllTSE.filter(
  or(
    testEntitySchema.COMPLEX_TYPE_PROPERTY.stringProperty.equals('test'),
    testEntitySchema.COMPLEX_TYPE_PROPERTY.stringProperty.notEquals('test')
  )
);

// $ExpectType GetAllRequestBuilder<TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
getAllTSE.orderBy(asc(testEntitySchema.COMPLEX_TYPE_PROPERTY.stringProperty));

// $ExpectType GetAllRequestBuilder<TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
getAllTSE.orderBy(desc(testEntitySchema.COMPLEX_TYPE_PROPERTY.stringProperty));

// $ExpectType GetAllRequestBuilder<TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>, DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
getAllTSE.orderBy(
  asc(testEntitySchema.COMPLEX_TYPE_PROPERTY.stringProperty),
  desc(testEntitySchema.COMPLEX_TYPE_PROPERTY.stringProperty)
);

getAllTSE.orderBy(
  asc(testEntitySchema.COMPLEX_TYPE_PROPERTY) // $ExpectError
);
