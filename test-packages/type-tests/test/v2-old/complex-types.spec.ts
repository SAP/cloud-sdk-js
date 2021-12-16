import { TestEntityApi } from '@sap-cloud-sdk/test-services/v2/test-service';
import { and, asc, desc, or } from '@sap-cloud-sdk/odata-common/internal';

const testEntityApi = new TestEntityApi();
const testEntitySchema = testEntityApi.schema;

// $ExpectType TestComplexTypeField<TestEntity, true, true>
testEntitySchema.COMPLEX_TYPE_PROPERTY;

// $ExpectType EdmTypeField<TestEntity, "Edm.String", false, false>
testEntitySchema.COMPLEX_TYPE_PROPERTY.stringProperty;

// $ExpectType GetAllRequestBuilder<TestEntity>
const getAllTSE = testEntityApi.requestBuilder().getAll();

// $ExpectType GetAllRequestBuilder<TestEntity>
getAllTSE.select(testEntitySchema.COMPLEX_TYPE_PROPERTY);

// $ExpectError
getAllTSE.select(testEntitySchema.COMPLEX_TYPE_PROPERTY.stringProperty);

// $ExpectType GetAllRequestBuilder<TestEntity>
getAllTSE.filter(
  testEntitySchema.COMPLEX_TYPE_PROPERTY.stringProperty.equals('test')
);

// $ExpectType GetAllRequestBuilder<TestEntity>
getAllTSE.filter(
  testEntitySchema.COMPLEX_TYPE_PROPERTY.stringProperty.equals('test'),
  testEntitySchema.COMPLEX_TYPE_PROPERTY.stringProperty.notEquals('test')
);

// $ExpectType GetAllRequestBuilder<TestEntity>
getAllTSE.filter(
  and(
    testEntitySchema.COMPLEX_TYPE_PROPERTY.stringProperty.equals('test'),
    testEntitySchema.COMPLEX_TYPE_PROPERTY.stringProperty.notEquals('test')
  )
);

// $ExpectType GetAllRequestBuilder<TestEntity>
getAllTSE.filter(
  or(
    testEntitySchema.COMPLEX_TYPE_PROPERTY.stringProperty.equals('test'),
    testEntitySchema.COMPLEX_TYPE_PROPERTY.stringProperty.notEquals('test')
  )
);

// $ExpectType GetAllRequestBuilder<TestEntity>
getAllTSE.orderBy(asc(testEntitySchema.COMPLEX_TYPE_PROPERTY.stringProperty));

// $ExpectType GetAllRequestBuilder<TestEntity>
getAllTSE.orderBy(desc(testEntitySchema.COMPLEX_TYPE_PROPERTY.stringProperty));

// $ExpectType GetAllRequestBuilder<TestEntity>
getAllTSE.orderBy(
  asc(testEntitySchema.COMPLEX_TYPE_PROPERTY.stringProperty),
  desc(testEntitySchema.COMPLEX_TYPE_PROPERTY.stringProperty)
);

getAllTSE.orderBy(
  asc(testEntitySchema.COMPLEX_TYPE_PROPERTY) // $ExpectError
);
