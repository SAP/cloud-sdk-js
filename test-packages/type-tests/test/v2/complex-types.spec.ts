import { TestEntity } from '@sap-cloud-sdk/test-services/v2/test-service';
import { and, asc, desc, or } from '@sap-cloud-sdk/odata-common/internal';

// $ExpectType TestComplexTypeField<TestEntity, true, true>
TestEntity.COMPLEX_TYPE_PROPERTY;

// $ExpectType EdmTypeField<TestEntity, "Edm.String", false, false>
TestEntity.COMPLEX_TYPE_PROPERTY.stringProperty;

// $ExpectType GetAllRequestBuilder<TestEntity>
const getAllTSE = TestEntity.requestBuilder().getAll();

// $ExpectType GetAllRequestBuilder<TestEntity>
getAllTSE.select(TestEntity.COMPLEX_TYPE_PROPERTY);

// $ExpectError
getAllTSE.select(TestEntity.COMPLEX_TYPE_PROPERTY.stringProperty);

// $ExpectType GetAllRequestBuilder<TestEntity>
getAllTSE.filter(
  TestEntity.COMPLEX_TYPE_PROPERTY.stringProperty.equals('test')
);

// $ExpectType GetAllRequestBuilder<TestEntity>
getAllTSE.filter(
  TestEntity.COMPLEX_TYPE_PROPERTY.stringProperty.equals('test'),
  TestEntity.COMPLEX_TYPE_PROPERTY.stringProperty.notEquals('test')
);

// $ExpectType GetAllRequestBuilder<TestEntity>
getAllTSE.filter(
  and(
    TestEntity.COMPLEX_TYPE_PROPERTY.stringProperty.equals('test'),
    TestEntity.COMPLEX_TYPE_PROPERTY.stringProperty.notEquals('test')
  )
);

// $ExpectType GetAllRequestBuilder<TestEntity>
getAllTSE.filter(
  or(
    TestEntity.COMPLEX_TYPE_PROPERTY.stringProperty.equals('test'),
    TestEntity.COMPLEX_TYPE_PROPERTY.stringProperty.notEquals('test')
  )
);

// $ExpectType GetAllRequestBuilder<TestEntity>
getAllTSE.orderBy(asc(TestEntity.COMPLEX_TYPE_PROPERTY.stringProperty));

// $ExpectType GetAllRequestBuilder<TestEntity>
getAllTSE.orderBy(desc(TestEntity.COMPLEX_TYPE_PROPERTY.stringProperty));

// $ExpectType GetAllRequestBuilder<TestEntity>
getAllTSE.orderBy(
  asc(TestEntity.COMPLEX_TYPE_PROPERTY.stringProperty),
  desc(TestEntity.COMPLEX_TYPE_PROPERTY.stringProperty)
);

getAllTSE.orderBy(
  asc(TestEntity.COMPLEX_TYPE_PROPERTY) // $ExpectError
);
