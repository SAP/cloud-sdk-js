import {
  TestComplexTypeField,
  TestEntity,
  testService
} from '@sap-cloud-sdk/test-services-odata-v2/test-service';
import {
  and,
  asc,
  desc,
  or,
  OrderableEdmTypeField
} from '@sap-cloud-sdk/odata-common';
import { expectError, expectType } from 'tsd';
import { GetAllRequestBuilder } from '@sap-cloud-sdk/odata-v2';
import { AnyDeserializerV2, DefaultDeSerializerV2 } from '../duplicated-types';

const { testEntityApi } = testService();
const testEntitySchema = testEntityApi.schema;

expectType<
  TestComplexTypeField<
    TestEntity<AnyDeserializerV2>,
    DefaultDeSerializerV2,
    true,
    true
  >
>(testEntitySchema.COMPLEX_TYPE_PROPERTY);

expectType<
  OrderableEdmTypeField<
    TestEntity<AnyDeserializerV2>,
    DefaultDeSerializerV2,
    'Edm.String',
    false,
    false
  >
>(testEntitySchema.COMPLEX_TYPE_PROPERTY.stringProperty);

const getAllTSE = testEntityApi.requestBuilder().getAll();
expectType<
  GetAllRequestBuilder<TestEntity<DefaultDeSerializerV2>, DefaultDeSerializerV2>
>(getAllTSE);

getAllTSE.select(testEntitySchema.COMPLEX_TYPE_PROPERTY);
expectType<
  GetAllRequestBuilder<TestEntity<DefaultDeSerializerV2>, DefaultDeSerializerV2>
>(getAllTSE);

expectError<any>(
  getAllTSE.select(testEntitySchema.COMPLEX_TYPE_PROPERTY.stringProperty)
);

expectType<
  GetAllRequestBuilder<TestEntity<DefaultDeSerializerV2>, DefaultDeSerializerV2>
>(
  getAllTSE.filter(
    testEntitySchema.COMPLEX_TYPE_PROPERTY.stringProperty.equals('test')
  )
);

expectType<
  GetAllRequestBuilder<TestEntity<DefaultDeSerializerV2>, DefaultDeSerializerV2>
>(
  getAllTSE.filter(
    testEntitySchema.COMPLEX_TYPE_PROPERTY.stringProperty.equals('test'),
    testEntitySchema.COMPLEX_TYPE_PROPERTY.stringProperty.notEquals('test')
  )
);

expectType<
  GetAllRequestBuilder<TestEntity<DefaultDeSerializerV2>, DefaultDeSerializerV2>
>(
  getAllTSE.filter(
    and(
      testEntitySchema.COMPLEX_TYPE_PROPERTY.stringProperty.equals('test'),
      testEntitySchema.COMPLEX_TYPE_PROPERTY.stringProperty.notEquals('test')
    )
  )
);

expectType<
  GetAllRequestBuilder<TestEntity<DefaultDeSerializerV2>, DefaultDeSerializerV2>
>(
  getAllTSE.filter(
    or(
      testEntitySchema.COMPLEX_TYPE_PROPERTY.stringProperty.equals('test'),
      testEntitySchema.COMPLEX_TYPE_PROPERTY.stringProperty.notEquals('test')
    )
  )
);

expectType<
  GetAllRequestBuilder<TestEntity<DefaultDeSerializerV2>, DefaultDeSerializerV2>
>(
  getAllTSE.orderBy(asc(testEntitySchema.COMPLEX_TYPE_PROPERTY.stringProperty))
);

expectType<
  GetAllRequestBuilder<TestEntity<DefaultDeSerializerV2>, DefaultDeSerializerV2>
>(
  getAllTSE.orderBy(desc(testEntitySchema.COMPLEX_TYPE_PROPERTY.stringProperty))
);

expectType<
  GetAllRequestBuilder<TestEntity<DefaultDeSerializerV2>, DefaultDeSerializerV2>
>(
  getAllTSE.orderBy(
    asc(testEntitySchema.COMPLEX_TYPE_PROPERTY.stringProperty),
    desc(testEntitySchema.COMPLEX_TYPE_PROPERTY.stringProperty)
  )
);

expectError<any>(
  getAllTSE.orderBy(asc(testEntitySchema.COMPLEX_TYPE_PROPERTY))
);
